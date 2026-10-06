"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Apresentacao } from "@/data/cases";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

/** Fatia do video que pode ficar de fora e ainda contar como "inteiro". */
const INTEIRO = 0.98;

/** Altura do cabecalho fixo: o que fica por baixo dele nao esta a vista. */
const CABECALHO = "-64px 0px 0px 0px";

type Som = "auto" | "ligado" | "desligado";

/**
 * Video com fala que reage a rolagem, sem player na frente.
 *
 * - So comeca quando aparece inteiro na tela, com a aba em primeiro plano.
 * - Sai da tela (ou a aba fica oculta): pausa. Voltou inteiro: toca de novo,
 *   em loop.
 * - O som acompanha o enquadramento: liga com o video inteiro a vista e cala
 *   quando ele comeca a sair. Se o visitante ligar o som no botao, o som fica
 *   ligado enquanto o video estiver tocando.
 *
 * Os navegadores so deixam um video tocar com som depois de alguma interacao
 * com a pagina (clique, toque, tecla). Antes disso ele toca mudo, e o botao de
 * som pede o toque.
 */
export function VideoEmFoco({
  apresentacao,
  className,
}: {
  apresentacao: Apresentacao;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [deveCarregar, setDeveCarregar] = useState(false);
  const [naTela, setNaTela] = useState(false);
  const [inteiro, setInteiro] = useState(false);
  const abaVisivel = useSyncExternalStore(
    inscreverVisibilidade,
    () => !document.hidden,
    () => true,
  );
  // O valor inicial nao aparece no HTML do servidor: so pesa quando o video
  // ja esta a vista.
  const [interagiu, setInteragiu] = useState(
    () =>
      typeof navigator !== "undefined" &&
      Boolean(navigator.userActivation?.hasBeenActive),
  );
  const [som, setSom] = useState<Som>("auto");
  const [pausadoPeloVisitante, setPausadoPeloVisitante] = useState(false);
  const [tocando, setTocando] = useState(false);

  const semMovimento = useMediaQuery("(prefers-reduced-motion: reduce)");

  // O arquivo tem alguns megabytes: so entra na fila quando a rolagem esta
  // chegando, bem antes de o video precisar tocar.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setDeveCarregar(true);
          observador.disconnect();
        }
      },
      { rootMargin: "600px" },
    );

    observador.observe(video);
    return () => observador.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        setNaTela(entrada.isIntersecting);
        // Saiu da tela: esquece a pausa manual, para que ao voltar ele
        // toque de novo.
        if (!entrada.isIntersecting) setPausadoPeloVisitante(false);
        setInteiro(entrada.intersectionRatio >= INTEIRO);
      },
      { threshold: [0, INTEIRO], rootMargin: CABECALHO },
    );

    observador.observe(video);
    return () => observador.disconnect();
  }, []);

  // Sem uma interacao com a pagina, o navegador recusa o play com som.
  useEffect(() => {
    if (interagiu) return;

    const marcar = () => setInteragiu(true);
    const eventos = ["pointerup", "touchend", "keydown"] as const;
    eventos.forEach((evento) =>
      window.addEventListener(evento, marcar, { once: true, passive: true }),
    );
    return () =>
      eventos.forEach((evento) => window.removeEventListener(evento, marcar));
  }, [interagiu]);

  const emFoco = inteiro && abaVisivel;
  const querSom = som === "ligado" || (som === "auto" && emFoco);
  const comSom = querSom && interagiu;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !comSom;
  }, [comSom]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !deveCarregar) return;

    if (!naTela || !abaVisivel) {
      video.pause();
      return;
    }

    if (emFoco && video.paused && !pausadoPeloVisitante && !semMovimento) {
      video.play().catch(() => {
        // Recusado com som: segue mudo, que o navegador sempre aceita.
        video.muted = true;
        video.play().catch(() => setTocando(false));
      });
    }
  }, [
    deveCarregar,
    naTela,
    abaVisivel,
    emFoco,
    pausadoPeloVisitante,
    semMovimento,
  ]);

  const alternarPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setPausadoPeloVisitante(false);
      setDeveCarregar(true);
      video.play().catch(() => setTocando(false));
    } else {
      setPausadoPeloVisitante(true);
      video.pause();
    }
  };

  const alternarSom = () => {
    // O clique no botao ja e a interacao que o navegador exige.
    setInteragiu(true);
    setSom(comSom ? "desligado" : "ligado");
  };

  return (
    <figure
      className={cn(
        "bg-surface relative aspect-[9/16] overflow-hidden shadow-2xl shadow-black/20",
        className,
      )}
    >
      <video
        ref={videoRef}
        src={deveCarregar ? apresentacao.src : undefined}
        poster={apresentacao.poster}
        className="absolute inset-0 size-full object-cover"
        loop
        muted
        playsInline
        preload="none"
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        aria-label={`${apresentacao.titulo}: ${apresentacao.chamada}`}
      />

      <div className="absolute right-3 bottom-3 flex items-center gap-2">
        {querSom && !interagiu && (
          <span className="rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            Toque para ouvir
          </span>
        )}

        <Botao
          aoClicar={alternarPlay}
          rotulo={tocando ? "Pausar vídeo" : "Tocar vídeo"}
        >
          {tocando ? <IconePausa /> : <IconePlay />}
        </Botao>

        <Botao
          aoClicar={alternarSom}
          rotulo={comSom ? "Desligar o som" : "Ligar o som"}
          aceso={comSom}
        >
          {comSom ? <IconeSom /> : <IconeMudo />}
        </Botao>
      </div>

      <figcaption className="sr-only">
        {apresentacao.titulo}: {apresentacao.chamada}
      </figcaption>
    </figure>
  );
}

function inscreverVisibilidade(avisar: () => void) {
  document.addEventListener("visibilitychange", avisar);
  return () => document.removeEventListener("visibilitychange", avisar);
}

function Botao({
  aoClicar,
  rotulo,
  aceso,
  children,
}: {
  aoClicar: () => void;
  rotulo: string;
  aceso?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      aria-label={rotulo}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border backdrop-blur-sm transition-colors",
        aceso
          ? "bg-brand text-brand-contrast border-transparent"
          : "border-white/25 bg-black/40 text-white hover:border-white/60",
      )}
    >
      {children}
    </button>
  );
}

const tracado = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-4 w-4",
  "aria-hidden": true,
} as const;

function IconePlay() {
  return (
    <svg {...tracado} fill="currentColor" stroke="none">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function IconePausa() {
  return (
    <svg {...tracado} fill="currentColor" stroke="none">
      <path d="M7 5h3v14H7zm7 0h3v14h-3z" />
    </svg>
  );
}

function IconeSom() {
  return (
    <svg {...tracado}>
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="M15.5 9a4 4 0 0 1 0 6" />
      <path d="M18.5 6.5a8 8 0 0 1 0 11" />
    </svg>
  );
}

function IconeMudo() {
  return (
    <svg {...tracado}>
      <path d="M11 5 6 9H3v6h3l5 4z" />
      <path d="m16 9 5 6m0-6-5 6" />
    </svg>
  );
}

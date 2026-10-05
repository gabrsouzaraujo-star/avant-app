"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Apresentacao, Foto } from "@/data/cases";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

/** Quanto do video precisa estar na tela para ele comecar a tocar. */
const VISIVEL = 0.55;

/**
 * Videos institucionais da rede, tocando dentro da pagina.
 *
 * Nao ha player, moldura nem botao de play no meio da tela: o video comeca
 * quando a rolagem chega nele e para quando sai, como qualquer outra parte da
 * pagina que reage ao scroll. As bordas se dissolvem no fundo e um brilho da
 * cor da rede passa por tras — e o que tira dele o ar de "midia colada no
 * site".
 *
 * O autoplay obriga a comecar mudo: e a regra dos navegadores, nao uma
 * escolha. Como esses videos tem fala, o botao de som fica sempre visivel, e
 * o som toca em um de cada vez — ligar num palco cala os outros.
 */
export function VideosImersivos({
  apresentacoes,
  titulo,
  fotos = [],
}: {
  apresentacoes: Apresentacao[];
  titulo: string;
  /** Com dois videos e seis fotos, vira o mosaico (ver `Mosaico`). */
  fotos?: Foto[];
}) {
  const [comSom, setComSom] = useState<string | null>(null);

  if (apresentacoes.length === 0) return null;

  const arranjo = ARRANJOS[apresentacoes.length];
  if (arranjo && fotos.length >= arranjo.fotos.length) {
    return (
      <Mosaico
        arranjo={arranjo}
        apresentacoes={apresentacoes}
        fotos={fotos}
        titulo={titulo}
        comSom={comSom}
        aoAlternarSom={setComSom}
      />
    );
  }

  return (
    <section className="secao relative overflow-hidden">
      <h2 className="container-site text-h2 font-semibold">{titulo}</h2>

      {apresentacoes.map((apresentacao) => (
        <Palco
          key={apresentacao.src}
          apresentacao={apresentacao}
          comSom={comSom === apresentacao.src}
          aoAlternarSom={(ligado) =>
            setComSom(ligado ? apresentacao.src : null)
          }
        />
      ))}
    </section>
  );
}

type Arranjo = {
  /** Classes da grade (celular e desktop). */
  grade: string;
  /** Posicao de cada foto, na ordem de `mosaico` em data/cases.ts. */
  fotos: string[];
  /** Posicao de cada video. */
  videos: string[];
  /** Escurece as fotos para que elas fiquem de fundo e o video na frente. */
  fundo?: boolean;
};

/*
 * Posicao de cada peca do mosaico, por quantidade de videos. A grade e uma
 * so em todas as larguras — so muda o lugar de cada peca —, entao nenhuma
 * imagem e baixada duas vezes.
 */
const ARRANJOS: Record<number, Arranjo> = {
  /*
   * Um video: no desktop, uma foto vertical a esquerda, o video no centro e
   * duas fotos empilhadas a direita. No celular, a foto vertical ao lado do
   * video e as outras duas embaixo.
   */
  1: {
    grade:
      "container-site grid-cols-6 lg:grid-cols-[1.3fr_1fr_1.3fr] lg:grid-rows-2",
    fotos: [
      "col-span-2 col-start-1 row-span-2 row-start-1 lg:col-span-1 lg:col-start-1",
      "col-span-3 col-start-1 row-start-3 aspect-video lg:col-span-1 lg:col-start-3 lg:row-start-1",
      "col-span-3 col-start-4 row-start-3 aspect-video lg:col-span-1 lg:col-start-3 lg:row-start-2",
    ],
    videos: [
      "col-span-4 col-start-3 row-span-2 row-start-1 lg:col-span-1 lg:col-start-2",
    ],
    fundo: true,
  },
  /*
   * Dois videos: no desktop, cinco colunas — fotos, video, fotos, video,
   * fotos —, com duas fotos empilhadas em cada coluna de fotos. No celular,
   * tres fotos em cima, os dois videos lado a lado e tres fotos embaixo.
   */
  2: {
    grade:
      "mx-auto w-full max-w-[1600px] grid-cols-6 px-[clamp(1rem,0.5rem+2.5vw,2.5rem)] lg:grid-cols-[1fr_1.2fr_1fr_1.2fr_1fr] lg:grid-rows-2",
    fotos: [
      "col-span-2 col-start-1 row-start-1 aspect-[4/5] lg:col-span-1 lg:col-start-1 lg:row-start-1",
      "col-span-2 col-start-1 row-start-3 aspect-[4/5] lg:col-span-1 lg:col-start-1 lg:row-start-2",
      "col-span-2 col-start-3 row-start-1 aspect-[4/5] lg:col-span-1 lg:col-start-3 lg:row-start-1",
      "col-span-2 col-start-3 row-start-3 aspect-[4/5] lg:col-span-1 lg:col-start-3 lg:row-start-2",
      "col-span-2 col-start-5 row-start-1 aspect-[4/5] lg:col-span-1 lg:col-start-5 lg:row-start-1",
      "col-span-2 col-start-5 row-start-3 aspect-[4/5] lg:col-span-1 lg:col-start-5 lg:row-start-2",
    ],
    videos: [
      "col-span-3 col-start-1 row-start-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1",
      "col-span-3 col-start-4 row-start-2 lg:col-span-1 lg:col-start-4 lg:row-span-2 lg:row-start-1",
    ],
  },
};

/**
 * Videos cercados de fotos (um ou dois, ver `ARRANJOS`). Os videos seguem a
 * mesma regra dos palcos — tocam mudos e em loop enquanto estao na tela, e o
 * som liga em um de cada vez.
 */
function Mosaico({
  arranjo,
  apresentacoes,
  fotos,
  titulo,
  comSom,
  aoAlternarSom,
}: {
  arranjo: Arranjo;
  apresentacoes: Apresentacao[];
  fotos: Foto[];
  titulo: string;
  comSom: string | null;
  aoAlternarSom: (src: string | null) => void;
}) {
  return (
    <section className="secao relative overflow-hidden">
      <h2 className="container-site text-h2 font-semibold">{titulo}</h2>

      <div className={cn("mt-12 grid gap-2 sm:gap-3", arranjo.grade)}>
        {fotos.slice(0, arranjo.fotos.length).map((foto, indice) => (
          <div
            key={foto.src}
            className={cn(
              "bg-surface relative overflow-hidden lg:aspect-auto",
              arranjo.fotos[indice],
            )}
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 50vw"
              className="object-cover"
            />
            {arranjo.fundo && (
              <span
                aria-hidden="true"
                className="bg-background/35 absolute inset-0"
              />
            )}
          </div>
        ))}

        {apresentacoes.map((apresentacao, indice) => (
          <Palco
            key={apresentacao.src}
            apresentacao={apresentacao}
            compacto
            className={arranjo.videos[indice]}
            comSom={comSom === apresentacao.src}
            aoAlternarSom={(ligado) =>
              aoAlternarSom(ligado ? apresentacao.src : null)
            }
          />
        ))}
      </div>
    </section>
  );
}

function Palco({
  apresentacao,
  comSom,
  aoAlternarSom,
  compacto = false,
  className,
}: {
  apresentacao: Apresentacao;
  comSom: boolean;
  aoAlternarSom: (ligado: boolean) => void;
  /** Versao para o mosaico: preenche a celula e leva a legenda por cima. */
  compacto?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [deveCarregar, setDeveCarregar] = useState(false);
  const [tocando, setTocando] = useState(false);

  const semMovimento = useMediaQuery("(prefers-reduced-motion: reduce)");

  // O arquivo tem alguns megabytes: so entra na fila quando a rolagem esta
  // chegando (`rootMargin`), bem antes de o video precisar tocar.
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

  // Toca enquanto esta na tela, para quando sai. Sem isso, um video com som
  // continuaria falando fora de vista.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !deveCarregar || semMovimento) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          video.play().catch(() => setTocando(false));
        } else {
          video.pause();
        }
      },
      { threshold: VISIVEL },
    );

    observador.observe(video);
    return () => observador.disconnect();
  }, [deveCarregar, semMovimento]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = !comSom;
  }, [comSom]);

  const alternarPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) video.play().catch(() => setTocando(false));
    else video.pause();
  };

  const controles = (
    <>
      <Botao
        aoClicar={alternarPlay}
        rotulo={tocando ? "Pausar vídeo" : "Tocar vídeo"}
      >
        {tocando ? <IconePausa /> : <IconePlay />}
      </Botao>

      <Botao
        aoClicar={() => aoAlternarSom(!comSom)}
        rotulo={comSom ? "Desligar o som" : "Ligar o som"}
        aceso={comSom}
      >
        {comSom ? <IconeSom /> : <IconeMudo />}
      </Botao>
    </>
  );

  if (compacto) {
    return (
      <figure
        className={cn(
          "bg-surface relative aspect-[9/16] overflow-hidden",
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

        <div className="absolute top-2 right-2 flex items-center gap-1.5 sm:top-3 sm:right-3 sm:gap-2">
          {controles}
        </div>

        <figcaption className="from-background/90 absolute inset-x-0 bottom-0 bg-linear-to-t to-transparent p-3 pt-12 sm:p-5 sm:pt-16">
          <p className="text-sm font-medium sm:text-base">
            {apresentacao.titulo}
          </p>
          <p className="text-text-muted mt-0.5 hidden text-xs sm:block sm:text-sm">
            {apresentacao.chamada}
          </p>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="mt-14 flex flex-col items-center px-6">
      <div className="relative">
        {/* Brilho da rede por tras do video: e ele que costura o retangulo ao
            fundo da pagina, junto com a mascara das bordas. */}
        <div
          className="bg-brand/15 absolute -inset-8 -z-10 rounded-[3rem] blur-3xl"
          aria-hidden="true"
        />

        <video
          ref={videoRef}
          src={deveCarregar ? apresentacao.src : undefined}
          poster={apresentacao.poster}
          // As duas mascaras se cruzam (`intersect`) para apagar os quatro
          // lados: o video termina em degrade, sem borda que o recorte da
          // pagina.
          className="h-[min(76svh,760px)] w-auto max-w-full [mask-image:linear-gradient(to_bottom,transparent,#000_7%,#000_93%,transparent),linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] [mask-composite:intersect]"
          loop
          muted
          playsInline
          preload="none"
          onPlay={() => setTocando(true)}
          onPause={() => setTocando(false)}
          aria-label={`${apresentacao.titulo}: ${apresentacao.chamada}`}
        />

        <div className="absolute right-6 bottom-14 flex items-center gap-2">
          {controles}
        </div>
      </div>

      <figcaption className="mt-6 text-center">
        <p className="text-lg font-medium">{apresentacao.titulo}</p>
        <p className="text-text-muted mt-1 text-sm">{apresentacao.chamada}</p>
      </figcaption>
    </figure>
  );
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
          ? "bg-brand text-brand-foreground border-transparent"
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

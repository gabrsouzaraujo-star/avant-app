"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { cn } from "@/lib/utils";

type Estado = "tocando" | "fim";
type Fonte = "desktop" | "mobile";

const semInscricao = () => () => {};

/** Prefixo `use` exigido pelas regras de hooks do React.
 *  `false` durante a renderizacao no servidor, `true` depois da hidratacao. */
function useHidratado() {
  return useSyncExternalStore(
    semInscricao,
    () => true,
    () => false,
  );
}

/** Acompanha uma media query sem sincronizar estado na mao. */
function useMediaQuery(consulta: string) {
  const inscrever = useCallback(
    (avisar: () => void) => {
      const mq = window.matchMedia(consulta);
      mq.addEventListener("change", avisar);
      return () => mq.removeEventListener("change", avisar);
    },
    [consulta],
  );

  return useSyncExternalStore(
    inscrever,
    () => window.matchMedia(consulta).matches,
    () => false,
  );
}

/**
 * Abertura da home: o video institucional roda uma vez e congela no quadro
 * final, com a assinatura da marca.
 *
 * Como as camadas se organizam (de baixo para cima):
 *
 * 1. <picture> com o quadro final em alta resolucao — sempre presente. E o
 *    que fica na tela no fim, e tambem o que aparece sem JS ou com
 *    "reduzir movimento" ligado.
 * 2. <video> por cima, opaco enquanto toca. Ao terminar, desaparece em fade
 *    e revela a imagem de baixo, que e mais nitida que o ultimo quadro
 *    decodificado do video.
 * 3. O conteudo (`children`) entra depois que a abertura termina.
 *
 * O video de desktop e um recorte central do original vertical. A escolha
 * depende da largura da tela, entao o <video> so monta depois da hidratacao
 * — ate la a imagem final ja esta na tela e nao ha salto visual.
 */
export function AberturaAvant({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<Estado>("tocando");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Escolhida uma unica vez, na primeira renderizacao no cliente, e nunca
  // mais alterada. Sem isso, girar o celular no meio da abertura cruzaria o
  // breakpoint, trocaria o arquivo e reiniciaria o video do zero.
  const [fonte] = useState<Fonte>(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches
      ? "desktop"
      : "mobile",
  );

  const hidratado = useHidratado();
  const semMovimento = useMediaQuery("(prefers-reduced-motion: reduce)");

  const encerrar = useCallback(() => setEstado("fim"), []);

  // Quem pediu menos animacao ve direto o quadro final, sem esperar o video.
  const terminou = estado === "fim" || semMovimento;
  const mostrarVideo = hidratado && !semMovimento;

  // Autoplay pode ser bloqueado (modo de economia de bateria, por exemplo).
  // Se o play falhar, encerramos na hora: o conteudo nao pode ficar refem de
  // um video que nunca vai tocar.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || terminou) return;

    video.play().catch(encerrar);
  }, [fonte, terminou, encerrar]);

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-end overflow-hidden px-6 pb-16">
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet="/videos/abertura-final-desktop.webp"
        />
        <img
          src="/videos/abertura-final-mobile.webp"
          alt="AVANT — Consultoria & Franchising"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
      </picture>

      {mostrarVideo && (
        <video
          ref={videoRef}
          key={fonte}
          src={`/videos/abertura-${fonte}.mp4`}
          poster={`/videos/abertura-inicio-${fonte}.webp`}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            terminou && "opacity-0",
          )}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={encerrar}
          onError={encerrar}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      {/* Escurece a base para o conteudo manter contraste sobre a marca. */}
      <div
        className={cn(
          "from-background via-background/70 absolute inset-0 bg-gradient-to-t to-transparent transition-opacity duration-700",
          terminou ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "abertura-conteudo relative z-10 w-full transition-all duration-700 ease-out",
          terminou
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        {children}
      </div>

      {!terminou && (
        <button
          type="button"
          onClick={encerrar}
          className="absolute right-6 bottom-6 z-20 rounded-full border border-white/25 px-5 py-2 text-xs tracking-[0.15em] text-white/70 uppercase transition-colors hover:border-white/60 hover:text-white"
        >
          Pular
        </button>
      )}

      {/* Sem JavaScript o video nunca toca: o conteudo precisa aparecer. */}
      <noscript>
        <style>{`.abertura-conteudo { opacity: 1 !important; transform: none !important; pointer-events: auto !important; }`}</style>
      </noscript>
    </section>
  );
}

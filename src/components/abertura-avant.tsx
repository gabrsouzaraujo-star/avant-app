"use client";

import Image from "next/image";
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

/** Mesma condicao da variante `paisagem` em `globals.css`: acima dela as duas
 *  faixas ficam lado a lado, abaixo dela empilhadas. */
const TELA_DIVIDIDA = "(min-aspect-ratio: 115/100)";

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
 * Abertura da home: a tela e dividida em duas faixas — 65% para o video
 * institucional e 35% para o retrato do socio-fundador — que se encontram
 * numa costura desfocada, sem linha dura entre as duas.
 *
 * Como as camadas se organizam (de baixo para cima):
 *
 * 1. Faixa do video: <picture> com o quadro final em alta resolucao (e o que
 *    fica na tela no fim, e tambem o que aparece sem JS ou com "reduzir
 *    movimento" ligado) e, por cima, o <video>, opaco enquanto toca. Ao
 *    terminar, ele desaparece em fade e revela a imagem de baixo, mais
 *    nitida que o ultimo quadro decodificado.
 * 2. Faixa do retrato, por cima, com a borda voltada para a costura em
 *    degrade. Quem desvanece e so ela: se as duas se dissolvessem, no meio
 *    da costura apareceria o fundo preto por baixo das duas e a juncao
 *    viraria uma faixa escura.
 * 3. Costura: `backdrop-blur` sobre a area de encontro, mascarado nas duas
 *    pontas, mais um brilho da cor da marca — e o que funde as imagens.
 * 4. Veu de contraste e o conteudo (`children`), que entra no alto da tela
 *    depois que a abertura termina.
 *
 * Nas mascaras `#000` nao e cor: mask-image so le o canal alfa, o preto e
 * apenas "opaco aqui".
 *
 * A escolha entre o video vertical e o quadrado depende da proporcao da tela,
 * entao o <video> so monta depois da hidratacao — ate la a imagem final ja
 * esta na tela e nao ha salto visual.
 */
export function AberturaAvant({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<Estado>("tocando");
  const videoRef = useRef<HTMLVideoElement>(null);

  // Escolhida uma unica vez, na primeira renderizacao no cliente, e nunca
  // mais alterada. Sem isso, girar o celular no meio da abertura cruzaria o
  // limite, trocaria o arquivo e reiniciaria o video do zero.
  const [fonte] = useState<Fonte>(() =>
    typeof window !== "undefined" && window.matchMedia(TELA_DIVIDIDA).matches
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
    <section className="paisagem:justify-start paisagem:pt-28 relative flex min-h-svh flex-col items-center justify-end overflow-hidden px-6 pb-16">
      {/* Video: 65% da tela, mas desenhado ate 72% — a sobra fica escondida
          debaixo da parte ja opaca do retrato, entao a borda dura dele nunca
          aparece. */}
      <div className="paisagem:top-0 paisagem:left-0 paisagem:h-full paisagem:w-[72%] absolute inset-x-0 bottom-0 h-[72%]">
        <picture>
          <source
            media={TELA_DIVIDIDA}
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
      </div>

      {/* Retrato: 35% da tela, encostado na borda oposta ao conteudo, por cima
          do video. Empilhado ele fica em cima (o rosto no alto, o corpo saindo
          pela costura); lado a lado, a direita — assim o olhar dele aponta
          para o video. A borda voltada para a costura se dissolve em cima da
          imagem do video, num crossfade de 8% da tela. */}
      <div className="paisagem:top-0 paisagem:right-0 paisagem:left-auto paisagem:h-full paisagem:w-[39%] paisagem:[mask-image:linear-gradient(to_right,transparent,#000_20.5%)] absolute inset-x-0 top-0 h-[39%] [mask-image:linear-gradient(to_bottom,#000_79.5%,transparent)]">
        <Image
          src="/imagens/abertura-lucas-camargo.webp"
          alt="Lucas Camargo, sócio-fundador da AVANT"
          fill
          // A faixa ocupa 39vw, mas e mais alta que larga: o `object-cover`
          // amplia a foto ate a altura da tela, e ai ela precisa de bem mais
          // pixels que a largura da faixa sugere.
          sizes={`${TELA_DIVIDIDA} 80vw, 100vw`}
          priority
          className="paisagem:object-[46%_50%] object-cover object-[50%_18%]"
        />
      </div>

      {/* Costura: desfoca o que ja esta atras, so na faixa de encontro. A
          mascara abre e fecha nas pontas para nao aparecer onde ela comeca. */}
      <div
        className="paisagem:top-0 paisagem:left-[58%] paisagem:h-full paisagem:w-[14%] paisagem:[mask-image:linear-gradient(to_right,transparent,#000_40%,#000_60%,transparent)] absolute inset-x-0 top-[28%] h-[14%] [mask-image:linear-gradient(to_bottom,transparent,#000_40%,#000_60%,transparent)] backdrop-blur-2xl"
        aria-hidden="true"
      />

      {/* Brilho da marca na juncao — o degrade de cor que costura as duas. */}
      <div
        className="via-brand/25 paisagem:top-0 paisagem:left-[59%] paisagem:h-full paisagem:w-[12%] paisagem:bg-gradient-to-r absolute inset-x-0 top-[29%] h-[12%] bg-gradient-to-b from-transparent to-transparent blur-2xl"
        aria-hidden="true"
      />

      {/* Veu que da contraste ao conteudo: escurece o topo, onde ele fica, e a
          base, que precisa morrer no preto da secao seguinte. O meio da tela
          — a assinatura e o rosto — fica limpo. */}
      <div
        className={cn(
          "from-background/70 to-background/70 absolute inset-0 bg-gradient-to-b via-transparent transition-opacity duration-700",
          terminou ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />

      {/* Conteudo centrado na pagina inteira, nao na faixa do video. Lado a
          lado ele fica no alto, acima da assinatura. Empilhado continua
          embaixo: la o topo e o rosto do retrato e o meio da tela e a
          assinatura, entao a base e o unico espaco livre. */}
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

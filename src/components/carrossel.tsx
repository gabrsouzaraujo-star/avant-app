"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { FotoPodcast } from "@/content/avantcast";
import { useMediaQuery } from "@/lib/use-media-query";
import { cn } from "@/lib/utils";

const INTERVALO_MS = 5000;

/**
 * Carrossel de fotos.
 *
 * A troca de slide e feita pelo proprio scroll do navegador (`scroll-snap`),
 * nao por transform. Isso da de graca o arrasto com o dedo, o scroll lateral
 * no trackpad e o comportamento certo quando o usuario chega pelo teclado —
 * e o indicador continua correto mesmo quando o slide muda sem passar pelos
 * botoes, porque quem manda no estado e o evento de scroll.
 *
 * O avanco automatico para quando o ponteiro esta em cima, quando algo ali
 * dentro recebe foco e para quem pediu "reduzir movimento".
 */
export function Carrossel({ fotos }: { fotos: FotoPodcast[] }) {
  const trilhoRef = useRef<HTMLUListElement>(null);
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);

  // Para onde o carrossel esta indo, que nem sempre e onde ele esta: com o
  // scroll suave a viagem dura algumas centenas de ms. Guardar isso fora do
  // estado faz dois cliques seguidos andarem dois slides — pelo estado, o
  // segundo clique ainda leria o indice do render anterior e repetiria o
  // primeiro salto.
  const alvoRef = useRef(0);

  const semMovimento = useMediaQuery("(prefers-reduced-motion: reduce)");

  const irPara = useCallback(
    (indice: number) => {
      const trilho = trilhoRef.current;
      if (!trilho) return;

      // Resto que aceita negativo: passar do ultimo volta ao primeiro e
      // vice-versa.
      const destino = ((indice % fotos.length) + fotos.length) % fotos.length;
      alvoRef.current = destino;

      trilho.scrollTo({
        left: destino * trilho.clientWidth,
        behavior: semMovimento ? "auto" : "smooth",
      });
    },
    [fotos.length, semMovimento],
  );

  const avancar = useCallback(
    (passo: number) => irPara(alvoRef.current + passo),
    [irPara],
  );

  // Quem manda no indicador e o scroll, nao o clique: assim o ponto aceso
  // continua certo quando o slide muda no arrasto.
  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;

    const aoRolar = () => {
      const posicao = trilho.scrollLeft / trilho.clientWidth;
      const indice = Math.round(posicao);
      setAtual(indice);

      // So aceita a posicao como alvo quando ela assentou num slide. No meio
      // de uma animacao os valores intermediarios roubariam o destino.
      if (Math.abs(posicao - indice) < 0.01) alvoRef.current = indice;
    };

    trilho.addEventListener("scroll", aoRolar, { passive: true });
    return () => trilho.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    if (pausado || semMovimento || fotos.length < 2) return;

    const id = setInterval(() => avancar(1), INTERVALO_MS);
    return () => clearInterval(id);
  }, [pausado, semMovimento, fotos.length, avancar]);

  if (fotos.length === 0) return null;

  return (
    <div
      className="relative"
      role="group"
      aria-roledescription="carrossel"
      aria-label="Fotos das gravações"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <ul
        ref={trilhoRef}
        // `scrollbar-width: none` some com a barra sem tirar o scroll: a
        // navegacao continua funcionando no dedo e no trackpad.
        className="border-border flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto rounded-xl border"
      >
        {fotos.map((foto, indice) => (
          <li
            key={foto.src}
            className="w-full shrink-0 snap-center"
            aria-roledescription="slide"
            aria-label={`${indice + 1} de ${fotos.length}`}
          >
            <figure className="relative">
              <Image
                src={foto.src}
                alt={foto.alt}
                width={1200}
                height={1200}
                sizes="(min-width: 1024px) 45vw, 100vw"
                // Nenhuma delas pode ser `lazy`: as proximas estao fora da
                // area visivel do trilho, e o avanco automatico chegaria nelas
                // antes do carregamento comecar. A primeira ainda ganha
                // prioridade — e ela que aparece de cara.
                {...(indice === 0
                  ? { priority: true }
                  : { loading: "eager" as const })}
                className="aspect-square w-full object-cover"
              />

              <figcaption className="from-background/90 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent px-6 pt-16 pb-5 text-sm font-medium">
                {foto.legenda}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <Seta direcao="anterior" aoClicar={() => avancar(-1)} />
      <Seta direcao="proxima" aoClicar={() => avancar(1)} />

      <ul className="mt-5 flex items-center justify-center gap-2.5">
        {fotos.map((foto, indice) => (
          <li key={foto.src}>
            <button
              type="button"
              onClick={() => irPara(indice)}
              aria-label={`Ver foto ${indice + 1} de ${fotos.length}`}
              aria-current={indice === atual}
              className={cn(
                "block h-2 rounded-full transition-all",
                indice === atual
                  ? "bg-brand w-6"
                  : "bg-muted/40 hover:bg-muted w-2",
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Seta({
  direcao,
  aoClicar,
}: {
  direcao: "anterior" | "proxima";
  aoClicar: () => void;
}) {
  const anterior = direcao === "anterior";

  return (
    <button
      type="button"
      onClick={aoClicar}
      aria-label={anterior ? "Foto anterior" : "Próxima foto"}
      className={cn(
        "bg-background/60 hover:bg-background hover:border-brand border-border absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-colors sm:flex",
        anterior ? "left-4" : "right-4",
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("h-5 w-5", anterior ? "-ml-0.5" : "-mr-0.5")}
        aria-hidden="true"
      >
        <path d={anterior ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
      </svg>
    </button>
  );
}

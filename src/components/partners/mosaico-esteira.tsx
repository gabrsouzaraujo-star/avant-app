"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Quatro faixas, cada uma comecando num ponto diferente da lista de fotos. */
const FAIXAS = [
  { inicio: 0, duracao: "140s", reversa: false },
  { inicio: 5, duracao: "120s", reversa: true },
  { inicio: 10, duracao: "150s", reversa: false },
  { inicio: 15, duracao: "130s", reversa: true },
];

/**
 * Mosaico de fotos em esteira infinita, usado como fundo decorativo.
 *
 * - As fotos so entram no DOM quando a secao esta chegando na tela, e entram
 *   todas de uma vez (sem lazy): sao 20 arquivos, repetidos nas faixas, e o
 *   navegador baixa cada um uma unica vez. Com lazy loading, cada copia que
 *   a esteira trazia para a tela disparava um pedido novo.
 * - Fora da tela a animacao pausa — nao gasta CPU de quem esta lendo outra
 *   secao.
 * - As quatro faixas dividem a altura do container, entao o mosaico cobre a
 *   secao inteira em qualquer largura.
 */
export function MosaicoEsteira({
  fotos,
  className,
}: {
  fotos: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [carregar, setCarregar] = useState(false);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        setVisivel(entrada.isIntersecting);
        if (entrada.isIntersecting) setCarregar(true);
      },
      { rootMargin: "400px 0px" },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("flex flex-col gap-3", className)}
    >
      {carregar &&
        FAIXAS.map((faixa) => {
          const ordem = [
            ...fotos.slice(faixa.inicio),
            ...fotos.slice(0, faixa.inicio),
          ];
          return (
            <div
              key={faixa.inicio}
              className="flex min-h-0 w-max flex-1 gap-3"
              style={{
                animation: `esteira ${faixa.duracao} linear infinite`,
                animationDirection: faixa.reversa ? "reverse" : "normal",
                animationPlayState: visivel ? "running" : "paused",
              }}
            >
              {[...ordem, ...ordem].map((src, indice) => (
                // eslint-disable-next-line @next/next/no-img-element -- arquivos ja otimizados (640px, webp); sem o otimizador, cada foto e baixada uma vez so, e nao uma por largura
                <img
                  key={`${src}-${indice}`}
                  src={src}
                  alt=""
                  width={640}
                  height={640}
                  decoding="async"
                  className="bg-surface aspect-square h-full w-auto shrink-0 object-cover"
                />
              ))}
            </div>
          );
        })}
    </div>
  );
}

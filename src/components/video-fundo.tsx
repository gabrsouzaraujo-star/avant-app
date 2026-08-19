"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  poster?: string;
  /** Descricao do que aparece no video, para leitores de tela. */
  descricao: string;
  className?: string;
};

/**
 * Video de fundo em looping, subordinado ao conteudo por cima dele.
 *
 * Decisoes deliberadas:
 * - So carrega o video depois que o elemento entra na viewport, para nao
 *   competir com o carregamento inicial da pagina.
 * - Quem pediu menos animacao (prefers-reduced-motion) ve apenas o poster.
 * - Sem `src`, degrada para um bloco neutro — e o estado atual, enquanto os
 *   videos do cliente nao chegam.
 */
export function VideoFundo({ src, poster, descricao, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [deveCarregar, setDeveCarregar] = useState(false);

  useEffect(() => {
    if (!src) return;

    const menosMovimento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (menosMovimento) return;

    const elemento = containerRef.current;
    if (!elemento) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setDeveCarregar(true);
          observador.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observador.observe(elemento);
    return () => observador.disconnect();
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={cn("bg-surface absolute inset-0 overflow-hidden", className)}
    >
      {poster && !deveCarregar && (
        // eslint-disable-next-line @next/next/no-img-element -- poster do video, precisa casar exatamente com o object-cover do <video>
        <img
          src={poster}
          alt={descricao}
          className="h-full w-full object-cover"
        />
      )}

      {src && deveCarregar && (
        <video
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={descricao}
        />
      )}

      {/* Escurece a midia para o texto por cima manter contraste legivel. */}
      <div className="bg-overlay absolute inset-0" aria-hidden="true" />
    </div>
  );
}

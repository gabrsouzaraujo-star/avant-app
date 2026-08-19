"use client";

import { useState } from "react";
import type { Apresentacao } from "@/content/franquias";

/**
 * Video institucional com fala.
 *
 * Diferente do video de fundo, este tem audio e conteudo — entao nao toca
 * sozinho. Ate a pessoa clicar, so o poster esta na pagina: o arquivo
 * (alguns megabytes) nem comeca a baixar.
 */
export function VideoApresentacao({
  apresentacao,
}: {
  apresentacao: Apresentacao;
}) {
  const [tocando, setTocando] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="text-3xl font-bold tracking-tight">
        {apresentacao.titulo}
      </h2>
      <p className="text-muted mt-3 max-w-xl">{apresentacao.chamada}</p>

      <div className="border-border bg-surface relative mx-auto mt-10 aspect-[9/16] max-w-sm overflow-hidden rounded-xl border">
        {tocando ? (
          <video
            src={apresentacao.src}
            poster={apresentacao.poster}
            className="h-full w-full object-cover"
            controls
            autoPlay
            playsInline
          />
        ) : (
          <button
            type="button"
            onClick={() => setTocando(true)}
            className="group relative h-full w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- poster puro, sem otimizacao adicional */}
            <img
              src={apresentacao.poster}
              alt=""
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 grid place-items-center bg-black/35 transition-colors group-hover:bg-black/20">
              <span className="bg-brand text-brand-foreground grid h-16 w-16 place-items-center rounded-full text-xl">
                ▶
              </span>
            </span>
            <span className="sr-only">
              Assistir ao vídeo: {apresentacao.titulo}
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

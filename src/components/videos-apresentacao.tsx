"use client";

import { useState } from "react";
import type { Apresentacao } from "@/content/franquias";

/**
 * Videos institucionais com fala.
 *
 * Diferente do video de fundo, estes tem audio e conteudo — entao nao tocam
 * sozinhos. Ate o clique so o poster esta na pagina: o arquivo, de alguns
 * megabytes, nem comeca a baixar.
 */
function CartaoVideo({ apresentacao }: { apresentacao: Apresentacao }) {
  const [tocando, setTocando] = useState(false);

  return (
    <li>
      <div className="border-border bg-surface relative aspect-[9/16] overflow-hidden rounded-xl border">
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

      <p className="mt-4 font-semibold">{apresentacao.titulo}</p>
      <p className="text-muted mt-1 text-sm">{apresentacao.chamada}</p>
    </li>
  );
}

export function VideosApresentacao({
  apresentacoes,
  titulo,
}: {
  apresentacoes: Apresentacao[];
  titulo: string;
}) {
  if (apresentacoes.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="text-3xl font-bold tracking-tight">{titulo}</h2>

      <ul className="mx-auto mt-10 grid max-w-sm gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
        {apresentacoes.map((apresentacao) => (
          <CartaoVideo key={apresentacao.src} apresentacao={apresentacao} />
        ))}
      </ul>
    </section>
  );
}

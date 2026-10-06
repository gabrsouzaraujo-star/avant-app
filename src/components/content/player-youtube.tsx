"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";
import { rastrear } from "@/lib/rastreamento";
import { cn } from "@/lib/utils";

type Props = {
  youtubeId: string;
  titulo: string;
  thumbnail: string;
  /** Corta as faixas pretas laterais embutidas em algumas thumbnails. */
  thumbComFaixas?: boolean;
  className?: string;
};

/**
 * Player do YouTube carregado sob demanda.
 *
 * Antes do clique a pagina tem so uma imagem e um botao — nenhum script do
 * YouTube (o iframe sozinho pesa centenas de KB). O embed usa o dominio
 * youtube-nocookie, que nao grava cookies antes de o video tocar.
 */
export function PlayerYoutube({
  youtubeId,
  titulo,
  thumbnail,
  thumbComFaixas,
  className,
}: Props) {
  const [ativo, setAtivo] = useState(false);

  return (
    <div
      className={cn(
        "bg-surface relative aspect-video overflow-hidden",
        className,
      )}
    >
      {ativo ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setAtivo(true);
            rastrear("content_cta", { acao: "play", video: youtubeId });
          }}
          className="group absolute inset-0 size-full"
        >
          <Image
            src={thumbnail}
            alt=""
            fill
            priority
            // A thumbnail ja vem otimizada da CDN do YouTube: passar pelo
            // otimizador do Next so baixaria e recodificaria o mesmo JPG uma
            // vez por largura de tela.
            unoptimized
            className={
              thumbComFaixas ? "scale-[1.19] object-cover" : "object-cover"
            }
          />
          <span
            aria-hidden="true"
            className="bg-background/20 absolute inset-0"
          />
          <span className="bg-brand text-brand-contrast absolute top-1/2 left-1/2 grid size-20 -translate-1/2 place-items-center rounded-full transition-transform group-hover:scale-105">
            <Play
              aria-hidden="true"
              className="size-8 translate-x-0.5 fill-current"
            />
          </span>
          <span className="sr-only">Assistir: {titulo}</span>
        </button>
      )}
    </div>
  );
}

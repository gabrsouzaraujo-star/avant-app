import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { thumbnailYoutube, type Conteudo } from "@/data/conteudos";
import { cn } from "@/lib/utils";

type Props = {
  item: Conteudo;
  /** `destaque`: grande; `compacto`: thumbnail ao lado do texto a partir de lg. */
  formato?: "padrao" | "destaque" | "compacto";
  nivel?: "h2" | "h3";
  className?: string;
};

/**
 * Card de episodio do AvantCast. So a thumbnail do YouTube e carregada — o
 * player entra apenas na pagina do episodio, e mesmo la so depois do clique.
 */
export function ConteudoCard({
  item,
  formato = "padrao",
  nivel: Titulo = "h3",
  className,
}: Props) {
  const destaque = formato === "destaque";
  const compacto = formato === "compacto";

  return (
    <article
      className={cn(
        "group relative",
        compacto && "lg:grid lg:grid-cols-[10rem_1fr] lg:items-start lg:gap-5",
        className,
      )}
    >
      <div className="bg-surface relative aspect-video overflow-hidden">
        <Image
          src={thumbnailYoutube(item.youtubeId)}
          alt=""
          fill
          sizes={
            destaque
              ? "(min-width: 1024px) 58vw, 100vw"
              : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          }
          className={cn(
            "object-cover transition-transform duration-700",
            item.thumbComFaixas
              ? "scale-[1.19] group-hover:scale-[1.22]"
              : "group-hover:scale-[1.03]",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "bg-background/80 text-text group-hover:bg-brand group-hover:text-brand-contrast absolute grid place-items-center rounded-full backdrop-blur transition-colors",
            destaque ? "bottom-6 left-6 size-16" : "bottom-3 left-3 size-10",
          )}
        >
          <Play
            className={cn("fill-current", destaque ? "size-6" : "size-4")}
          />
        </span>
      </div>

      <div>
        <p
          className={cn(
            "text-brand-text mt-5 text-xs font-semibold tracking-[0.18em] uppercase",
            compacto && "lg:mt-0",
          )}
        >
          {item.tema} · {item.tipo}
        </p>
        <Titulo
          className={cn(
            "mt-2 font-medium text-balance",
            destaque ? "text-h3" : "text-lg leading-snug",
            compacto && "lg:text-base",
          )}
        >
          <Link
            href={`/conteudos/${item.slug}`}
            className="after:absolute after:inset-0"
          >
            {item.titulo}
          </Link>
        </Titulo>
        {item.convidados.length > 0 && (
          <p className="text-text-muted mt-2 text-sm">
            Com {item.convidados.join(", ")}
          </p>
        )}
      </div>
    </article>
  );
}

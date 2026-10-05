import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Case } from "@/data/cases";
import { cn } from "@/lib/utils";

type Props = {
  item: Case;
  className?: string;
  /** Titulo do card: h3 dentro de secao, h2 numa listagem. */
  nivel?: "h2" | "h3";
};

/** Card editorial de case: foto, segmento, nome e quem esta por tras. */
export function CaseCard({ item, className, nivel: Titulo = "h3" }: Props) {
  const pessoas = item.personalidades.map((pessoa) => pessoa.nome).join(" e ");

  return (
    <article className={cn("group relative", className)}>
      <div className="bg-surface relative aspect-[4/5] overflow-hidden">
        <Image
          src={item.capa.src}
          alt={item.capa.alt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className={cn(
            "transition-transform duration-700 ease-(--ease-saida) group-hover:scale-[1.04]",
            item.capa.ajuste === "contain"
              ? "bg-background object-contain"
              : "object-cover",
          )}
        />
        <div
          aria-hidden="true"
          className="from-background/70 absolute inset-0 bg-linear-to-t via-transparent to-transparent"
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 sm:mt-5">
        <div>
          <p className="text-brand-text text-[0.65rem] font-semibold tracking-[0.18em] uppercase sm:text-xs">
            {item.segmento}
          </p>
          <Titulo className="mt-2 text-lg font-medium sm:text-2xl">
            <Link
              href={`/cases/${item.slug}`}
              className="after:absolute after:inset-0"
            >
              {item.nome}
            </Link>
          </Titulo>
          {pessoas && (
            <p className="text-text-muted mt-1 text-xs sm:text-sm">
              com {pessoas}
            </p>
          )}
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="text-text-muted group-hover:text-brand mt-6 hidden size-5 shrink-0 transition-colors sm:block"
        />
      </div>
    </article>
  );
}

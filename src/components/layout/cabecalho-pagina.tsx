import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { Sobretitulo } from "@/components/ui/titulo-secao";
import { schemaBreadcrumb } from "@/lib/seo";
import { cn } from "@/lib/utils";

export type Migalha = { nome: string; caminho: string };

type Props = {
  trilha: Migalha[];
  sobretitulo?: string;
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

/**
 * Topo das paginas internas: breadcrumb visivel + BreadcrumbList em JSON-LD
 * (as duas saem da mesma `trilha`, entao nunca divergem), titulo e apoio.
 */
export function CabecalhoPagina({
  trilha,
  sobretitulo,
  titulo,
  descricao,
  children,
  className,
}: Props) {
  return (
    <header
      className={cn("container-site pt-32 pb-16 lg:pt-44 lg:pb-24", className)}
    >
      <JsonLd dados={schemaBreadcrumb(trilha)} />

      <nav aria-label="Você está em">
        <ol className="text-text-muted flex flex-wrap items-center gap-1 text-sm">
          <li>
            <Link href="/" className="hover:text-text">
              Início
            </Link>
          </li>
          {trilha.map((item, indice) => {
            const ultimo = indice === trilha.length - 1;
            return (
              <li key={item.caminho} className="flex items-center gap-1">
                <ChevronRight aria-hidden="true" className="size-3.5" />
                {ultimo ? (
                  <span aria-current="page" className="text-text">
                    {item.nome}
                  </span>
                ) : (
                  <Link href={item.caminho} className="hover:text-text">
                    {item.nome}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="mt-12 max-w-4xl">
        {sobretitulo && <Sobretitulo>{sobretitulo}</Sobretitulo>}
        <h1 className="text-h1 mt-6 font-serif font-normal text-balance">
          {titulo}
        </h1>
        {descricao && (
          <p className="text-text-muted text-lead mt-6 max-w-2xl text-pretty">
            {descricao}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </header>
  );
}

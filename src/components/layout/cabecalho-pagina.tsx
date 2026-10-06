import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MosaicoEsteira } from "@/components/partners/mosaico-esteira";
import { JsonLd } from "@/components/seo/json-ld";
import { fotosEcossistema } from "@/data/marcas";
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
  /** Fundo com o mosaico do ecossistema, congelado. */
  mosaico?: boolean;
  className?: string;
};

/**
 * Topo das paginas internas: breadcrumb visivel + BreadcrumbList em JSON-LD
 * (as duas saem da mesma `trilha`, entao nunca divergem), titulo e apoio.
 */
export function CabecalhoPagina({ mosaico = false, ...props }: Props) {
  if (!mosaico) return <Conteudo {...props} />;

  return (
    <div className="relative isolate overflow-hidden">
      {/* Mosaico parado — decorativo. O veu e mais forte a esquerda, onde
          fica o texto, e deixa as fotos aparecerem a direita. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <MosaicoEsteira
          fotos={fotosEcossistema}
          congelado
          className="absolute inset-0"
        />
        <div className="from-background via-background/85 to-background/40 absolute inset-0 bg-linear-to-r" />
        <div className="from-background absolute inset-x-0 top-0 h-32 bg-linear-to-b to-transparent" />
        <div className="from-background absolute inset-x-0 bottom-0 h-32 bg-linear-to-t to-transparent" />
      </div>

      <Conteudo {...props} />
    </div>
  );
}

function Conteudo({
  trilha,
  sobretitulo,
  titulo,
  descricao,
  children,
  className,
}: Omit<Props, "mosaico">) {
  return (
    <header
      className={cn("container-site pt-32 pb-16 lg:pt-44 lg:pb-24", className)}
    >
      <Migalhas trilha={trilha} />

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

/**
 * Breadcrumb visivel + BreadcrumbList em JSON-LD. Os dois saem da mesma
 * `trilha`, entao nunca divergem.
 */
export function Migalhas({
  trilha,
  className,
}: {
  trilha: Migalha[];
  className?: string;
}) {
  return (
    <>
      <JsonLd dados={schemaBreadcrumb(trilha)} />
      <nav aria-label="Você está em" className={className}>
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
    </>
  );
}

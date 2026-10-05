import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Sobretitulo } from "@/components/ui/titulo-secao";
import { marcasPublicadas } from "@/data/marcas";

/**
 * Prova social logo abaixo do hero: as marcas que a Avant ajudou a crescer.
 *
 * Tipografica, e nao uma faixa de logos: os logos oficiais ainda nao chegaram
 * (TODO no `marcas.ts`) e, mesmo quando chegarem, nome + segmento comunica
 * mais do que uma fileira de escudos de tamanhos diferentes. So entram marcas
 * com relacao de case comprovada.
 */
export function FaixaMarcas() {
  const marcas = marcasPublicadas("case");

  return (
    <section
      aria-labelledby="marcas-titulo"
      className="container-site pt-16 pb-6 lg:pt-20"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <Sobretitulo>
          <span id="marcas-titulo">Negócios que cresceram com a Avant</span>
        </Sobretitulo>
        <Link
          href="/cases"
          className="text-text-muted hover:text-text text-sm underline-offset-4 hover:underline"
        >
          Ver todos os cases
        </Link>
      </div>

      <ul className="border-border mt-8 grid grid-cols-2 border-t md:grid-cols-3 xl:grid-cols-6">
        {marcas.map((marca) => {
          const conteudo = (
            <>
              <span className="text-text block text-lg font-medium sm:text-xl">
                {marca.nome}
              </span>
              <span className="text-text-muted mt-1 block text-xs tracking-wide uppercase">
                {marca.segmento}
              </span>
            </>
          );

          return (
            <li key={marca.nome} className="border-border border-b">
              {marca.caseSlug ? (
                <Link
                  href={`/cases/${marca.caseSlug}`}
                  className="group hover:bg-surface relative block h-full px-1 py-7 transition-colors sm:px-4"
                >
                  {conteudo}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="text-brand absolute top-7 right-2 size-4 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </Link>
              ) : (
                <div className="px-1 py-7 sm:px-4">{conteudo}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

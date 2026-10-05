import Image from "next/image";
import { CaseCard } from "@/components/cases/case-card";
import { BotaoLink } from "@/components/ui/botao";
import { Revelar } from "@/components/ui/revelar";
import { Sobretitulo, TituloSecao } from "@/components/ui/titulo-secao";
import { casePrincipal, casesSecundarios } from "@/data/cases";

/**
 * Cases como protagonistas: um case principal em formato editorial e os
 * demais em sequencia. A ordem e o destaque vem de `data/cases.ts`.
 */
export function CasesVitrine() {
  const principal = casePrincipal;

  return (
    <section aria-labelledby="cases-titulo" className="secao">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <TituloSecao
            id="cases-titulo"
            sobretitulo="Cases"
            serif
            titulo="Marcas que escolheram crescer em rede."
            descricao="Negócios de setores diferentes, com uma mesma decisão: estruturar o modelo antes de multiplicá-lo."
            className="lg:col-span-8"
          />
          <div className="lg:col-span-4 lg:text-right">
            <BotaoLink href="/cases" variante="texto">
              Conhecer os cases
            </BotaoLink>
          </div>
        </div>

        {/* Case principal */}
        <Revelar className="mt-16">
          <article className="border-border grid overflow-hidden border lg:grid-cols-2">
            <div className="bg-surface relative aspect-[720/510] lg:aspect-auto lg:min-h-[32rem]">
              <Image
                src={principal.capa.src}
                alt={principal.capa.alt}
                style={{ objectPosition: principal.capa.foco }}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col p-8 sm:p-12">
              <Sobretitulo>Case em destaque · {principal.segmento}</Sobretitulo>
              <h3 className="text-h1 mt-6 font-serif">{principal.nome}</h3>
              <p className="text-text-muted mt-2 italic">
                {principal.assinatura}
              </p>
              <p className="mt-6 leading-relaxed text-pretty">
                {principal.descricao}
              </p>

              {principal.numeros.length > 0 && (
                <dl className="border-border mt-8 grid grid-cols-2 gap-6 border-t pt-8">
                  {principal.numeros.map((numero) => (
                    <div
                      key={numero.rotulo}
                      className="flex flex-col-reverse gap-2"
                    >
                      <dt className="text-text-muted text-sm">
                        {numero.rotulo}
                      </dt>
                      <dd className="text-numero font-serif">{numero.valor}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-auto pt-10">
                <BotaoLink href={`/cases/${principal.slug}`}>
                  Ler o case
                </BotaoLink>
              </div>
            </div>
          </article>
        </Revelar>

        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {casesSecundarios.map((item, indice) => (
            <Revelar as="li" key={item.slug} atraso={indice * 0.08}>
              <CaseCard item={item} />
            </Revelar>
          ))}
        </ul>
      </div>
    </section>
  );
}

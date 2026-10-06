import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Migalhas } from "@/components/layout/cabecalho-pagina";
import { estiloBotao } from "@/components/ui/botao";
import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { Sobretitulo } from "@/components/ui/titulo-secao";
import type { Case } from "@/data/cases";
import { cn } from "@/lib/utils";

/**
 * Abertura do case, numa unica dobra: o logo da marca (ou a foto de capa)
 * aparece ja ao abrir a pagina, ao lado do nome, do que o negocio faz e da
 * ficha — nada disso fica escondido abaixo da tela.
 *
 * No celular o logo vem primeiro e o texto fica centralizado; no desktop o
 * texto fica a esquerda e o logo a direita, os dois centralizados na altura.
 */
export function CaseHero({ item }: { item: Case }) {
  const logo = item.capa.ajuste === "contain";
  const temVideos = item.apresentacoes.length > 0;

  const ficha = [
    { rotulo: "Segmento", valor: item.segmento },
    ...item.personalidades.map((pessoa) => ({
      rotulo: pessoa.papel,
      valor: pessoa.nome,
    })),
  ];

  return (
    <section
      aria-labelledby="case-titulo"
      className="relative isolate overflow-hidden"
    >
      {/* Brilho da marca atras do logo: e o que da presenca a abertura. */}
      <div
        aria-hidden="true"
        className="bg-brand/10 pointer-events-none absolute top-1/3 right-0 -z-10 size-[42rem] translate-x-1/3 rounded-full blur-3xl"
      />

      <div className="container-site flex min-h-[100svh] flex-col pt-24 pb-12 lg:pt-28 lg:pb-16">
        <Migalhas
          trilha={[
            { nome: "Cases", caminho: "/cases" },
            { nome: item.nome, caminho: `/cases/${item.slug}` },
          ]}
          className="flex justify-center lg:justify-start"
        />

        <div className="grid flex-1 items-center gap-10 pt-8 lg:grid-cols-12 lg:gap-16 lg:pt-6">
          {/* Logo / capa */}
          <div className="lg:order-last lg:col-span-6">
            <div
              className={cn(
                "border-border bg-surface relative mx-auto w-full overflow-hidden border",
                logo
                  ? "aspect-square max-w-[17rem] sm:max-w-sm lg:aspect-[5/4] lg:max-w-none"
                  : "aspect-[4/3] max-w-xl lg:aspect-[5/4] lg:max-w-none",
              )}
            >
              {logo && (
                <span
                  aria-hidden="true"
                  className="from-brand/20 absolute inset-0 bg-radial to-transparent to-70%"
                />
              )}
              <div
                className={cn(
                  "absolute",
                  logo ? "inset-6 sm:inset-10" : "inset-0",
                )}
              >
                <Image
                  src={item.capa.src}
                  alt={item.capa.alt}
                  style={{ objectPosition: item.capa.foco }}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 24rem, 17rem"
                  className={logo ? "object-contain" : "object-cover"}
                />
              </div>
            </div>
          </div>

          {/* Texto */}
          <div className="text-center lg:col-span-6 lg:text-left">
            <Sobretitulo className="justify-center lg:justify-start">
              Case · {item.segmento}
            </Sobretitulo>

            <h1
              id="case-titulo"
              className="text-display mt-5 font-serif font-normal text-balance"
            >
              {item.nome}
            </h1>
            <p className="text-brand-light text-lead mt-3 font-serif italic">
              {item.assinatura}
            </p>

            <div className="mx-auto mt-8 max-w-xl lg:mx-0">
              <h2 className="text-text-muted text-xs font-semibold tracking-[0.22em] uppercase">
                O negócio
              </h2>
              <p className="text-lead text-text/90 mt-3 text-pretty">
                {item.descricao}
              </p>
            </div>

            <dl className="border-border mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-8 gap-y-4 border-t pt-6 lg:mx-0 lg:justify-start">
              {ficha.map((linha) => (
                <div key={`${linha.rotulo}-${linha.valor}`} className="min-w-0">
                  <dt className="text-text-muted text-[0.7rem] tracking-[0.16em] uppercase">
                    {linha.rotulo}
                  </dt>
                  <dd className="mt-1 text-sm font-medium">{linha.valor}</dd>
                </div>
              ))}
              {item.site && (
                <div>
                  <dt className="text-text-muted text-[0.7rem] tracking-[0.16em] uppercase">
                    Site
                  </dt>
                  <dd className="mt-1 text-sm">
                    <a
                      href={item.site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-text inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
                    >
                      {item.site.replace(/^https?:\/\//, "")}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      <span className="sr-only">(abre em nova aba)</span>
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <LinkWhatsapp
                origem="cases"
                complemento={`Conheci o case ${item.nome}.`}
                local="case-hero"
              >
                Conversar sobre expansão
              </LinkWhatsapp>
              {temVideos && (
                <a href="#rede-em-video" className={estiloBotao("secundario")}>
                  Ver a rede em vídeo
                  <ArrowDown aria-hidden="true" className="size-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

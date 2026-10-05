import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { CaseCard } from "@/components/cases/case-card";
import { Equipe } from "@/components/cases/equipe";
import { Galeria } from "@/components/cases/galeria";
import { VideosImersivos } from "@/components/cases/videos-imersivos";
import { ConteudoCard } from "@/components/content/conteudo-card";
import { CabecalhoPagina } from "@/components/layout/cabecalho-pagina";
import { CtaFinal } from "@/components/sections/cta-final";
import { Depoimentos } from "@/components/testimonials/depoimentos";
import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { TituloSecao } from "@/components/ui/titulo-secao";
import { buscarCase, cases } from "@/data/cases";
import { conteudos } from "@/data/conteudos";
import { criarMetadata } from "@/lib/seo";

/** So existem as paginas listadas em `data/cases.ts` — o resto e 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/cases/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = buscarCase(slug);
  if (!item) return {};

  return criarMetadata({
    titulo: `Case ${item.nome}`,
    descricao:
      `${item.nome} (${item.segmento.toLowerCase()}): ${item.descricao}`.slice(
        0,
        160,
      ),
    caminho: `/cases/${item.slug}`,
    imagem: item.capa.src,
    tipo: "article",
  });
}

export default async function CasePage({ params }: PageProps<"/cases/[slug]">) {
  const { slug } = await params;
  const item = buscarCase(slug);
  if (!item) notFound();

  const episodios = conteudos.filter(
    (conteudo) => conteudo.caseSlug === item.slug,
  );
  const outros = cases.filter((outro) => outro.slug !== item.slug).slice(0, 3);
  const pessoas = item.personalidades;

  return (
    <>
      <CabecalhoPagina
        trilha={[
          { nome: "Cases", caminho: "/cases" },
          { nome: item.nome, caminho: `/cases/${item.slug}` },
        ]}
        sobretitulo={`Case · ${item.segmento}`}
        titulo={item.nome}
        descricao={item.assinatura}
      />

      {/* Abertura do case: imagem e ficha */}
      <section
        aria-label={`Sobre a ${item.nome}`}
        className="container-site pb-20"
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="bg-surface relative aspect-[4/3] overflow-hidden lg:col-span-7">
            <Image
              src={item.capa.src}
              alt={item.capa.alt}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className={
                item.capa.ajuste === "contain"
                  ? "bg-background object-contain"
                  : "object-cover"
              }
            />
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-h3 font-medium">O negócio</h2>
            <p className="text-text-muted mt-4 leading-relaxed">
              {item.descricao}
            </p>

            <dl className="border-border mt-10 border-t text-sm">
              <div className="border-border flex justify-between gap-6 border-b py-4">
                <dt className="text-text-muted">Segmento</dt>
                <dd className="text-right font-medium">{item.segmento}</dd>
              </div>
              {pessoas.map((pessoa) => (
                <div
                  key={pessoa.nome}
                  className="border-border flex justify-between gap-6 border-b py-4"
                >
                  <dt className="text-text-muted">{pessoa.papel}</dt>
                  <dd className="text-right font-medium">{pessoa.nome}</dd>
                </div>
              ))}
              {item.site && (
                <div className="border-border flex justify-between gap-6 border-b py-4">
                  <dt className="text-text-muted">Site</dt>
                  <dd>
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
          </div>
        </div>
      </section>

      {/* Narrativa: desafio, atuacao e numeros — so o que existe */}
      {(item.desafio || item.atuacao.length > 0 || item.numeros.length > 0) && (
        <section
          aria-labelledby="narrativa-titulo"
          className="secao-clara secao"
        >
          <div className="container-site grid gap-14 lg:grid-cols-12">
            <TituloSecao
              id="narrativa-titulo"
              sobretitulo="O case"
              serif
              titulo={`${item.nome} e a Avant.`}
              className="lg:col-span-5"
            />

            <div className="space-y-12 lg:col-span-6 lg:col-start-7">
              {item.desafio && (
                <div>
                  <h3 className="text-brand-text text-xs font-semibold tracking-[0.2em] uppercase">
                    O desafio
                  </h3>
                  <p className="text-lead mt-4">{item.desafio}</p>
                </div>
              )}

              {item.atuacao.length > 0 && (
                <div>
                  <h3 className="text-brand-text text-xs font-semibold tracking-[0.2em] uppercase">
                    A atuação da Avant
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {item.atuacao.map((texto) => (
                      <li key={texto} className="text-lead">
                        {texto}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.numeros.length > 0 && (
                <div>
                  <h3 className="text-brand-text text-xs font-semibold tracking-[0.2em] uppercase">
                    A rede hoje
                  </h3>
                  <dl className="border-border mt-6 grid grid-cols-2 gap-x-6 gap-y-8 border-t pt-8 sm:grid-cols-3">
                    {item.numeros.map((numero) => (
                      <div
                        key={numero.rotulo}
                        className="flex flex-col-reverse gap-2"
                      >
                        <dt className="text-text-muted text-sm">
                          {numero.rotulo}
                        </dt>
                        <dd className="text-numero font-serif">
                          {numero.valor}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {item.fonteNumeros && (
                    <p className="text-text-muted mt-6 text-xs">
                      Fonte: {item.fonteNumeros}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <Equipe
        pessoas={item.equipe}
        titulo="Quem está por trás da rede"
        descricao={`Lideranças da ${item.nome}.`}
      />

      <VideosImersivos
        apresentacoes={item.apresentacoes}
        titulo="A rede em vídeo"
        fotos={item.mosaico}
      />

      <Galeria fotos={item.galeria} titulo="Por dentro da operação" />

      <Depoimentos
        depoimentos={item.depoimentos}
        titulo={`Quem vive a ${item.nome}`}
      />

      {episodios.length > 0 && (
        <section aria-labelledby="episodios-titulo" className="secao">
          <div className="container-site">
            <TituloSecao
              id="episodios-titulo"
              sobretitulo="AvantCast"
              titulo={`${item.nome} no AvantCast`}
            />
            <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {episodios.map((episodio) => (
                <li key={episodio.slug}>
                  <ConteudoCard item={episodio} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-surface border-border border-y">
        <div className="container-site flex flex-col gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-h3 max-w-2xl font-medium text-balance">
            Quer estruturar a expansão do seu negócio como a {item.nome}?
          </p>
          <LinkWhatsapp
            origem="cases"
            complemento={`Conheci o case ${item.nome}.`}
            local="case-faixa"
          >
            Conversar sobre expansão
          </LinkWhatsapp>
        </div>
      </section>

      <section aria-labelledby="outros-titulo" className="secao">
        <div className="container-site">
          <TituloSecao
            id="outros-titulo"
            sobretitulo="Outros cases"
            titulo="Continue conhecendo."
          />
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {outros.map((outro) => (
              <li key={outro.slug}>
                <CaseCard item={outro} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaFinal
        origem="cases"
        complemento={`Conheci o case ${item.nome}.`}
        titulo="Sua marca pode ser o próximo case."
      />
    </>
  );
}

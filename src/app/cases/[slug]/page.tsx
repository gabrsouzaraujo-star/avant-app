import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/cases/case-card";
import { CaseHero } from "@/components/cases/case-hero";
import { Equipe } from "@/components/cases/equipe";
import { Galeria } from "@/components/cases/galeria";
import { VideosImersivos } from "@/components/cases/videos-imersivos";
import { ConteudoCard } from "@/components/content/conteudo-card";
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

  return (
    <>
      <CaseHero item={item} />

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

      {/* Ancora do botao "Ver a rede em video" da abertura. */}
      <div id="rede-em-video">
        <VideosImersivos
          apresentacoes={item.apresentacoes}
          titulo="A rede em vídeo"
          fotos={item.mosaico}
        />
      </div>

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

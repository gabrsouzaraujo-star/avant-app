import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ConteudoCard } from "@/components/content/conteudo-card";
import { PlayerYoutube } from "@/components/content/player-youtube";
import { CabecalhoPagina } from "@/components/layout/cabecalho-pagina";
import { JsonLd } from "@/components/seo/json-ld";
import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { TituloSecao } from "@/components/ui/titulo-secao";
import { buscarCase } from "@/data/cases";
import {
  buscarConteudo,
  conteudos,
  thumbnailYoutube,
  urlYoutube,
} from "@/data/conteudos";
import { criarMetadata, schemaVideo } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return conteudos.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/conteudos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = buscarConteudo(slug);
  if (!item) return {};

  return criarMetadata({
    titulo: item.titulo,
    descricao: item.resumo.slice(0, 160),
    caminho: `/conteudos/${item.slug}`,
    imagem: thumbnailYoutube(item.youtubeId),
    tipo: "video.other",
  });
}

const formatoData = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default async function ConteudoPage({
  params,
}: PageProps<"/conteudos/[slug]">) {
  const { slug } = await params;
  const item = buscarConteudo(slug);
  if (!item) notFound();

  const caminho = `/conteudos/${item.slug}`;
  const caseRelacionado = item.caseSlug ? buscarCase(item.caseSlug) : undefined;
  const relacionados = conteudos
    .filter((outro) => outro.slug !== item.slug)
    .sort((a, b) => Number(b.tema === item.tema) - Number(a.tema === item.tema))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        dados={schemaVideo({
          titulo: item.titulo,
          resumo: item.resumo,
          youtubeId: item.youtubeId,
          publicadoEm: item.publicadoEm,
          caminho,
          thumbnail: thumbnailYoutube(item.youtubeId),
        })}
      />

      <CabecalhoPagina
        trilha={[
          { nome: "Conteúdo", caminho: "/conteudos" },
          { nome: item.titulo, caminho },
        ]}
        sobretitulo={`${item.tema} · ${item.tipo}`}
        titulo={item.titulo}
        className="pb-10 lg:pb-14"
      />

      <article className="container-site pb-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <PlayerYoutube
              youtubeId={item.youtubeId}
              titulo={item.titulo}
              thumbnail={thumbnailYoutube(item.youtubeId)}
              thumbComFaixas={item.thumbComFaixas}
            />
            <p className="text-lead mt-10 max-w-2xl text-pretty">
              {item.resumo}
            </p>
          </div>

          <aside className="lg:col-span-4">
            <dl className="border-border border-t text-sm">
              {item.convidados.length > 0 && (
                <div className="border-border border-b py-4">
                  <dt className="text-text-muted">Com</dt>
                  <dd className="mt-1 font-medium">
                    {item.convidados.join(", ")}
                  </dd>
                </div>
              )}
              <div className="border-border border-b py-4">
                <dt className="text-text-muted">Publicado em</dt>
                <dd className="mt-1 font-medium">
                  <time dateTime={item.publicadoEm}>
                    {formatoData.format(new Date(item.publicadoEm))}
                  </time>
                </dd>
              </div>
              {caseRelacionado && (
                <div className="border-border border-b py-4">
                  <dt className="text-text-muted">Case relacionado</dt>
                  <dd className="mt-1">
                    <Link
                      href={`/cases/${caseRelacionado.slug}`}
                      className="text-brand-text font-medium underline-offset-4 hover:underline"
                    >
                      {caseRelacionado.nome}
                    </Link>
                  </dd>
                </div>
              )}
            </dl>

            <a
              href={urlYoutube(item.youtubeId)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text mt-4 inline-flex min-h-11 items-center gap-1 text-sm"
            >
              Assistir no YouTube
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
              <span className="sr-only">(abre em nova aba)</span>
            </a>

            <div className="bg-surface mt-8 p-6">
              <p className="font-medium">
                Pensando em transformar seu negócio em franquia?
              </p>
              <p className="text-text-muted mt-2 text-sm">
                Converse com um especialista da Avant sobre o momento da sua
                empresa.
              </p>
              <LinkWhatsapp
                origem="conteudo"
                complemento={`Assisti ao episódio “${item.titulo}”.`}
                local="conteudo-lateral"
                className="mt-5 w-full"
              >
                Falar com um especialista
              </LinkWhatsapp>
            </div>
          </aside>
        </div>
      </article>

      <section
        aria-labelledby="relacionados-titulo"
        className="secao border-border border-t"
      >
        <div className="container-site">
          <TituloSecao
            id="relacionados-titulo"
            sobretitulo="AvantCast"
            titulo="Continue assistindo."
          />
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((outro) => (
              <li key={outro.slug}>
                <ConteudoCard item={outro} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

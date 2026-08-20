import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cabecalho } from "@/components/cabecalho";
import { CtaAnalise } from "@/components/cta-analise";
import { Equipe } from "@/components/equipe";
import { Galeria } from "@/components/galeria";
import { MarcadorConteudo } from "@/components/marcador-conteudo";
import { Rodape } from "@/components/rodape";
import { VideosApresentacao } from "@/components/videos-apresentacao";
import { VideoFundo } from "@/components/video-fundo";
import { buscarFranquia, franquias } from "@/content/franquias";

export function generateStaticParams() {
  return franquias.map((franquia) => ({ slug: franquia.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/franquias/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const franquia = buscarFranquia(slug);

  if (!franquia) return {};

  return {
    title: franquia.nome,
    description: franquia.descricao,
  };
}

export default async function PaginaFranquia({
  params,
}: PageProps<"/franquias/[slug]">) {
  const { slug } = await params;
  const franquia = buscarFranquia(slug);

  if (!franquia) notFound();

  return (
    <div className={franquia.tema}>
      <Cabecalho />

      {/*
       * Tela dividida: midia de um lado, informacao do outro.
       * A ordem no DOM coloca o texto primeiro — ele e o conteudo principal,
       * o video e ambientacao.
       */}
      <section className="relative grid min-h-svh lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center px-6 py-28 lg:px-12">
          <p className="text-brand font-mono text-xs tracking-[0.3em] uppercase">
            {franquia.setor}
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
            {franquia.nome}
          </h1>

          <p className="mt-6 text-2xl font-semibold text-balance">
            {franquia.chamada}
          </p>

          <p className="text-muted mt-5 max-w-lg">{franquia.descricao}</p>

          {franquia.parceiro && (
            <p className="border-brand mt-8 border-l-2 pl-4 text-sm">
              <span className="font-semibold">{franquia.parceiro.nome}</span>
              <span className="text-muted block">
                {franquia.parceiro.papel}
              </span>
            </p>
          )}

          <CtaAnalise className="mt-10 self-start">
            Quero ser franqueado
          </CtaAnalise>
        </div>

        <div className="relative min-h-[60svh] lg:min-h-full">
          <VideoFundo
            src={franquia.video?.src}
            poster={franquia.video?.poster}
            descricao={`Vídeo de apresentação da rede ${franquia.nome}`}
          />
          {!franquia.video && (
            <div className="relative z-10 flex h-full items-center justify-center p-6">
              <MarcadorConteudo
                rotulo={`Vídeo de fundo — ${franquia.nome}`}
                detalhe="MP4 vertical ou 16:9, sem áudio, 10–20s em loop, com imagem de poster"
              />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-bold tracking-tight">Resultados</h2>

        {franquia.numeros.length > 0 ? (
          <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {franquia.numeros.map((numero) => (
              <div
                key={numero.rotulo}
                className="border-border bg-surface rounded-xl border p-6"
              >
                <dt className="text-muted text-sm">{numero.rotulo}</dt>
                <dd className="text-brand mt-2 text-4xl font-bold">
                  {numero.valor}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <MarcadorConteudo
            className="mt-10"
            rotulo="Números da rede"
            detalhe="Ex.: unidades em operação, faturamento médio, tempo de retorno"
          />
        )}
      </section>

      <Galeria fotos={franquia.galeria} titulo="A casa por dentro" />

      <Equipe
        pessoas={franquia.equipe}
        titulo="Quem está por trás da rede"
        chamada="Por trás de cada unidade existe uma equipe multidisciplinar dedicada a protocolos, processos e crescimento."
      />

      <VideosApresentacao
        apresentacoes={franquia.apresentacoes}
        titulo="A rede por dentro"
      />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="text-3xl font-bold tracking-tight">
          O que dizem os franqueados
        </h2>

        {franquia.depoimentos.length > 0 ? (
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {franquia.depoimentos.map((depoimento) => (
              <li
                key={depoimento.autor}
                className="border-border bg-surface rounded-xl border p-6"
              >
                <blockquote className="text-lg">
                  “{depoimento.texto}”
                </blockquote>
                <p className="mt-4 text-sm font-semibold">{depoimento.autor}</p>
                <p className="text-muted text-sm">{depoimento.papel}</p>
              </li>
            ))}
          </ul>
        ) : (
          <MarcadorConteudo
            className="mt-10"
            rotulo="Depoimentos de franqueados"
            detalhe="Texto, nome, cidade e foto — vídeo também funciona"
          />
        )}
      </section>

      <section className="border-border border-t px-6 py-20 text-center">
        <Link
          href="/#redes"
          className="text-muted hover:text-foreground text-sm tracking-wide uppercase transition-colors"
        >
          Ver as outras redes
        </Link>
      </section>

      <Rodape />
    </div>
  );
}

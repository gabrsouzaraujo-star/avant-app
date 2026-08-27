import Link from "next/link";
import { AberturaAvant } from "@/components/abertura-avant";
import { BotaoCanal } from "@/components/botao-canal";
import { Cabecalho } from "@/components/cabecalho";
import { Carrossel } from "@/components/carrossel";
import { CtaAnalise } from "@/components/cta-analise";
import { MarcadorConteudo } from "@/components/marcador-conteudo";
import { Rodape } from "@/components/rodape";
import { VideoFundo } from "@/components/video-fundo";
import { avantcast } from "@/content/avantcast";
import { franquias } from "@/content/franquias";

export default function Home() {
  return (
    <>
      <Cabecalho />

      {/*
       * Abertura: o video institucional roda uma vez e congela na assinatura
       * da marca. O h1 existe so para busca e leitores de tela — visualmente
       * quem anuncia o nome e o proprio quadro final, com muito mais forca.
       */}
      <AberturaAvant>
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="sr-only">
            AVANT Consultoria &amp; Franchising — transformamos marcas em redes
            de franquias lucrativas
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-balance sm:text-xl">
            Transformamos marcas em redes de franquias lucrativas — e operamos
            as nossas próprias.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <CtaAnalise>Análise de franqueabilidade</CtaAnalise>
            <Link
              href="#redes"
              className="border-border hover:border-foreground rounded-full border px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-colors"
            >
              Nossas redes
            </Link>
          </div>
        </div>
      </AberturaAvant>

      {/* Portal das redes: cada uma leva para a propria pagina. */}
      <section id="redes" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Nossas redes
        </h2>
        <p className="text-muted mt-3 max-w-xl">
          Cinco marcas, cinco mercados. Conheça cada operação por dentro.
        </p>

        {/*
         * As duas ultimas regras evitam o buraco na ultima linha: quando o
         * ultimo card fica sozinho ou em dupla, ele se estica pelo que sobrou.
         * Vale para qualquer quantidade de redes — nada a mexer ao adicionar
         * a proxima.
         */}
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:[&>li:last-child:nth-child(2n+1)]:col-span-2 lg:[&>li:last-child:nth-child(3n+1)]:col-span-3 lg:[&>li:last-child:nth-child(3n+2)]:col-span-2">
          {franquias.map((franquia) => (
            <li key={franquia.slug} className={franquia.tema}>
              <Link
                href={`/franquias/${franquia.slug}`}
                className="group border-border hover:border-brand relative flex min-h-80 flex-col justify-end overflow-hidden rounded-xl border p-6 transition-colors"
              >
                <VideoFundo
                  src={franquia.video?.src}
                  poster={franquia.video?.poster}
                  descricao={`Vídeo institucional da rede ${franquia.nome}`}
                  className="transition-transform duration-500 group-hover:scale-105"
                />

                <div className="relative z-10">
                  <p className="text-brand font-mono text-[0.7rem] tracking-[0.18em] uppercase">
                    {franquia.setor}
                  </p>
                  <p className="mt-2 text-2xl font-bold">{franquia.nome}</p>
                  {franquia.parceiro && (
                    <p className="text-muted mt-1 text-sm">
                      com {franquia.parceiro.nome}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/*
       * AVANTCAST: o conteudo que mostra as redes por dentro. Entra depois do
       * portal e antes do funil de consultoria — quem chegou ate aqui ja viu
       * as marcas e e a hora de mostrar a conversa que existe por tras delas.
       */}
      <section className="border-border border-t px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-brand font-mono text-xs tracking-[0.3em] uppercase">
              Podcast
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {avantcast.nome}
            </h2>

            <p className="mt-4 text-xl font-semibold text-balance">
              {avantcast.chamada}
            </p>

            <p className="text-muted mt-4 leading-relaxed">
              {avantcast.paragrafos[0]}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BotaoCanal href={avantcast.canal} />
              <Link
                href="/avantcast"
                className="border-border hover:border-foreground rounded-full border px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-colors"
              >
                Conheça o AvantCast
              </Link>
            </div>
          </div>

          <Carrossel fotos={avantcast.fotos} />
        </div>
      </section>

      {/* Segundo funil: empresarios que querem franquear a propria marca. */}
      <section className="border-border border-t px-6 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tem uma marca e quer franquear?
            </h2>
            <p className="text-muted mt-4">
              A Análise de Franqueabilidade é uma avaliação detalhada do seu
              negócio para determinar se ele está pronto para ser replicado e
              operado por franqueados.
            </p>
            <CtaAnalise className="mt-8">Agendar análise gratuita</CtaAnalise>
          </div>

          <MarcadorConteudo
            rotulo="Depoimentos e logos de imprensa"
            detalhe="Seção do site atual com depoimentos e a faixa de imprensa"
            className="min-h-64"
          />
        </div>
      </section>

      <Rodape />
    </>
  );
}

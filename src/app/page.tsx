import Link from "next/link";
import { Cabecalho } from "@/components/cabecalho";
import { CtaAnalise } from "@/components/cta-analise";
import { MarcadorConteudo } from "@/components/marcador-conteudo";
import { Rodape } from "@/components/rodape";
import { VideoFundo } from "@/components/video-fundo";
import { franquias } from "@/content/franquias";

export default function Home() {
  return (
    <>
      <Cabecalho />

      {/* Abertura de impacto: video institucional ao fundo, nome da marca por cima. */}
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-6">
        <VideoFundo descricao="Vídeo institucional da AVANT FRANCHISING" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="text-brand font-mono text-xs tracking-[0.3em] uppercase">
            Desde 2010
          </p>

          <h1 className="mt-6 text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl lg:text-8xl">
            AVANT
            <span className="text-brand mt-1 block">FRANCHISING</span>
          </h1>

          <p className="text-muted mx-auto mt-8 max-w-2xl text-lg text-balance sm:text-xl">
            Transformamos marcas em redes de franquias lucrativas — e operamos
            as nossas próprias.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CtaAnalise>Análise de franqueabilidade</CtaAnalise>
            <Link
              href="#redes"
              className="border-border hover:border-foreground rounded-full border px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-colors"
            >
              Nossas redes
            </Link>
          </div>
        </div>
      </section>

      {/* Portal das redes: cada uma leva para a propria pagina. */}
      <section id="redes" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Nossas redes
        </h2>
        <p className="text-muted mt-3 max-w-xl">
          Três marcas, três mercados. Conheça cada operação por dentro.
        </p>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {franquias.map((franquia) => (
            <li key={franquia.slug} className={franquia.tema}>
              <Link
                href={`/franquias/${franquia.slug}`}
                className="group border-border hover:border-brand relative flex min-h-80 flex-col justify-end overflow-hidden rounded-xl border p-6 transition-colors"
              >
                <VideoFundo
                  descricao={`Imagem da rede ${franquia.nome}`}
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
            detalhe="Seção “Veja o que eles dizem sobre nós” e a faixa “na mídia” do site atual"
            className="min-h-64"
          />
        </div>
      </section>

      <Rodape />
    </>
  );
}

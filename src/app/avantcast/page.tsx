import type { Metadata } from "next";
import { Cabecalho } from "@/components/cabecalho";
import { BotaoCanal } from "@/components/botao-canal";
import { Carrossel } from "@/components/carrossel";
import { CtaAnalise } from "@/components/cta-analise";
import { Rodape } from "@/components/rodape";
import { avantcast } from "@/content/avantcast";

export const metadata: Metadata = {
  title: avantcast.nome,
  description: avantcast.paragrafos[0],
};

export default function PaginaAvantcast() {
  return (
    <>
      <Cabecalho />

      <main className="flex-1">
        {/*
         * Texto de um lado, fotos do outro. A ordem no DOM coloca o texto
         * primeiro: e ele que explica o que e o programa — as fotos ilustram.
         */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-36 pb-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-brand font-mono text-xs tracking-[0.3em] uppercase">
              Podcast
            </p>

            <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
              {avantcast.nome}
            </h1>

            <p className="mt-6 text-2xl font-semibold text-balance">
              {avantcast.chamada}
            </p>

            <div className="mt-6 space-y-4">
              {avantcast.paragrafos.map((paragrafo) => (
                <p key={paragrafo} className="text-muted leading-relaxed">
                  {paragrafo}
                </p>
              ))}
            </div>

            <p className="border-brand mt-8 border-l-2 pl-4 font-semibold text-balance">
              {avantcast.fecho}
            </p>

            <BotaoCanal href={avantcast.canal} className="mt-10" />
          </div>

          <Carrossel fotos={avantcast.fotos} />
        </section>

        <section className="border-border mx-auto max-w-6xl border-t px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Sua marca pode ser a próxima história
          </h2>

          <p className="text-muted mx-auto mt-4 max-w-xl">
            Antes do episódio vem a operação. Comece pela análise de
            franqueabilidade.
          </p>

          <CtaAnalise className="mt-8">Análise de franqueabilidade</CtaAnalise>
        </section>
      </main>

      <Rodape />
    </>
  );
}

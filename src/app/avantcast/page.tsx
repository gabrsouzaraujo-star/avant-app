import type { Metadata } from "next";
import { Cabecalho } from "@/components/cabecalho";
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

            <BotaoCanal href={avantcast.canal} />
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

/** Leva ao canal da AVANT no YouTube — o unico lugar onde os episodios moram. */
function BotaoCanal({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-brand text-brand-foreground hover:bg-brand-hover mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
      Assista no YouTube
    </a>
  );
}

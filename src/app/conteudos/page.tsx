import Image from "next/image";
import Link from "next/link";
import { ConteudoCard } from "@/components/content/conteudo-card";
import { PlayerYoutube } from "@/components/content/player-youtube";
import { Migalhas } from "@/components/layout/cabecalho-pagina";
import { CtaFinal } from "@/components/sections/cta-final";
import { IconeYoutube } from "@/components/ui/icones";
import { LinkRastreado } from "@/components/ui/link-rastreado";
import { estiloBotao } from "@/components/ui/botao";
import { Revelar } from "@/components/ui/revelar";
import { Sobretitulo, TituloSecao } from "@/components/ui/titulo-secao";
import {
  avantcast,
  conteudoDestaque,
  conteudos,
  temas,
  thumbnailYoutube,
} from "@/data/conteudos";
import { criarMetadata } from "@/lib/seo";

export const metadata = criarMetadata({
  titulo: "AvantCast e conteúdos sobre franquias",
  descricao:
    "Episódios e cortes do AvantCast, o podcast da Avant: expansão de franquias, gestão de redes, mercado e os bastidores de marcas como Don Kebab e Farma&Farma.",
  caminho: "/conteudos",
});

export default function ConteudosPage() {
  const demais = conteudos.filter(
    (item) => item.slug !== conteudoDestaque.slug,
  );

  return (
    <>
      {/* Topo dividido ao meio: no desktop o AvantCast a esquerda e, a
          direita, a capa do episodio em destaque cobrindo a metade da tela —
          o clique troca a capa pelo video. No celular, texto e depois o
          player. */}
      <section aria-labelledby="avantcast-titulo" className="relative">
        <div className="container-site grid lg:min-h-[min(100svh,54rem)] lg:grid-cols-2 lg:items-center">
          <header className="pt-32 pb-12 lg:pt-36 lg:pr-12 lg:pb-16">
            <Migalhas trilha={[{ nome: "Conteúdo", caminho: "/conteudos" }]} />

            <div className="mt-12">
              <Sobretitulo>{avantcast.nome}</Sobretitulo>
              <h1
                id="avantcast-titulo"
                className="text-h1 mt-6 font-serif font-normal text-balance"
              >
                {avantcast.chamada}
              </h1>
              <p className="text-text-muted text-lead mt-6 text-pretty">
                {avantcast.descricao}
              </p>
              <div className="mt-10">
                <LinkRastreado
                  href={avantcast.canal}
                  target="_blank"
                  rel="noopener noreferrer"
                  evento="social_click"
                  dados={{ rede: "YouTube", local: "conteudos-topo" }}
                  className={estiloBotao("secundario")}
                >
                  <IconeYoutube className="size-5" />
                  Inscrever-se no canal
                  <span className="sr-only">(abre o YouTube em nova aba)</span>
                </LinkRastreado>
              </div>
            </div>
          </header>
        </div>

        <div className="lg:absolute lg:top-16 lg:right-0 lg:bottom-0 lg:w-1/2">
          <PlayerYoutube
            youtubeId={conteudoDestaque.youtubeId}
            titulo={conteudoDestaque.titulo}
            thumbnail={thumbnailYoutube(conteudoDestaque.youtubeId)}
            thumbComFaixas={conteudoDestaque.thumbComFaixas}
            className="lg:aspect-auto lg:h-full"
          />
          {/* Funde a borda esquerda da capa no fundo da pagina. */}
          <div
            aria-hidden="true"
            className="from-background pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-linear-to-r to-transparent lg:block"
          />
        </div>
      </section>

      <section aria-label="Episódio em destaque" className="pb-20">
        <div className="container-site lg:grid lg:grid-cols-2">
          <div className="pt-6 lg:col-start-2 lg:pl-8">
            <p className="text-brand-text text-xs font-semibold tracking-[0.18em] uppercase">
              {conteudoDestaque.tema} · {conteudoDestaque.tipo}
            </p>
            <h2 className="text-h3 mt-2 font-medium text-balance">
              <Link
                href={`/conteudos/${conteudoDestaque.slug}`}
                className="hover:text-brand-text underline-offset-4 hover:underline"
              >
                {conteudoDestaque.titulo}
              </Link>
            </h2>
            {conteudoDestaque.convidados.length > 0 && (
              <p className="text-text-muted mt-2 text-sm">
                Com {conteudoDestaque.convidados.join(", ")}
              </p>
            )}
          </div>
        </div>
      </section>

      {temas.map((tema) => {
        const lista = demais.filter((item) => item.tema === tema);
        if (lista.length === 0) return null;
        const id = `tema-${tema.toLowerCase().replace(/[^a-z]+/g, "-")}`;

        return (
          <section
            key={tema}
            aria-labelledby={id}
            className="container-site border-border border-t py-16"
          >
            <h2 id={id} className="text-h3 font-medium">
              {tema}
            </h2>
            <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {lista.map((item, indice) => (
                <Revelar as="li" key={item.slug} atraso={(indice % 3) * 0.06}>
                  <ConteudoCard item={item} />
                </Revelar>
              ))}
            </ul>
          </section>
        );
      })}

      <section
        aria-labelledby="bastidores-titulo"
        className="secao-clara secao"
      >
        <div className="container-site">
          <TituloSecao
            id="bastidores-titulo"
            sobretitulo="Bastidores"
            titulo="Do estúdio do AvantCast a outros palcos."
          />
          <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {avantcast.bastidores.map((foto) => (
              <li key={foto.src}>
                <figure>
                  <div className="bg-surface relative aspect-square overflow-hidden">
                    <Image
                      src={foto.src}
                      alt={foto.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-text-muted mt-3 text-sm">
                    {foto.legenda}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaFinal origem="conteudo" />
    </>
  );
}

import Image from "next/image";
import { ConteudoCard } from "@/components/content/conteudo-card";
import { CabecalhoPagina } from "@/components/layout/cabecalho-pagina";
import { CtaFinal } from "@/components/sections/cta-final";
import { IconeYoutube } from "@/components/ui/icones";
import { LinkRastreado } from "@/components/ui/link-rastreado";
import { estiloBotao } from "@/components/ui/botao";
import { Revelar } from "@/components/ui/revelar";
import { TituloSecao } from "@/components/ui/titulo-secao";
import {
  avantcast,
  conteudoDestaque,
  conteudos,
  temas,
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
      <CabecalhoPagina
        trilha={[{ nome: "Conteúdo", caminho: "/conteudos" }]}
        sobretitulo={avantcast.nome}
        titulo={avantcast.chamada}
        descricao={avantcast.descricao}
      >
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
      </CabecalhoPagina>

      <section
        aria-label="Episódio em destaque"
        className="container-site pb-20"
      >
        <ConteudoCard
          item={conteudoDestaque}
          formato="destaque"
          nivel="h2"
          className="lg:max-w-4xl"
        />
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

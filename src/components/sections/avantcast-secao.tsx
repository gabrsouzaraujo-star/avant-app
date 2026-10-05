import { ConteudoCard } from "@/components/content/conteudo-card";
import { BotaoLink } from "@/components/ui/botao";
import { Revelar } from "@/components/ui/revelar";
import { TituloSecao } from "@/components/ui/titulo-secao";
import { avantcast, conteudoDestaque, conteudos } from "@/data/conteudos";

const OUTROS = 3;

/** Vitrine editorial do AvantCast na home: um destaque e tres episodios. */
export function AvantcastSecao() {
  const outros = conteudos
    .filter((item) => item.slug !== conteudoDestaque.slug)
    .slice(0, OUTROS);

  return (
    <section aria-labelledby="avantcast-titulo" className="secao">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <TituloSecao
            id="avantcast-titulo"
            sobretitulo={avantcast.nome}
            titulo={avantcast.chamada}
            descricao={avantcast.descricao}
            className="lg:col-span-8"
          />
          <div className="lg:col-span-4 lg:text-right">
            <BotaoLink href="/conteudos" variante="texto">
              Ver todos os episódios
            </BotaoLink>
          </div>
        </div>

        <div className="mt-14 grid gap-x-6 gap-y-12 lg:grid-cols-12">
          <Revelar className="lg:col-span-7">
            <ConteudoCard item={conteudoDestaque} formato="destaque" />
          </Revelar>

          <ul className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-8">
            {outros.map((item, indice) => (
              <Revelar as="li" key={item.slug} atraso={indice * 0.08}>
                <ConteudoCard item={item} formato="compacto" />
              </Revelar>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

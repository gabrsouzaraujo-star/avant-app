import { MosaicoEsteira } from "@/components/partners/mosaico-esteira";
import { BotaoLink } from "@/components/ui/botao";
import { Numeros } from "@/components/sections/numeros";
import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { Sobretitulo } from "@/components/ui/titulo-secao";
import { fotosEcossistema } from "@/data/marcas";
import { site } from "@/data/site";

/**
 * Hero da home.
 *
 * Responde em uma dobra as perguntas do visitante: o que a Avant faz (titulo),
 * para quem e com que resultado (apoio), por que confiar (numeros e marcas
 * reais) e qual o proximo passo (CTA). Ao fundo, o mosaico de bastidores do
 * ecossistema corre em esteira — fotos reais, nada de banco de imagens.
 *
 * Nada aqui usa animacao de entrada: e o LCP da pagina e precisa pintar na
 * primeira passada. O mosaico e decorativo e entra depois, sem atrasar o
 * titulo.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="relative isolate overflow-hidden pt-28 lg:pt-36"
    >
      {/* Mosaico em esteira — decorativo. O veu escurece a esquerda, onde fica
          o texto, e deixa as fotos aparecerem a direita. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <MosaicoEsteira fotos={fotosEcossistema} className="absolute inset-0" />
        <div className="from-background via-background/80 to-background/30 absolute inset-0 bg-linear-to-r" />
        <div className="from-background absolute inset-x-0 top-0 h-32 bg-linear-to-b to-transparent" />
        <div className="from-background via-background/70 absolute inset-x-0 bottom-0 h-56 bg-linear-to-t to-transparent" />
      </div>

      <div className="container-site pb-16 lg:pb-28">
        <div className="max-w-3xl">
          <Sobretitulo>
            Consultoria de franquias · desde {site.fundacao}
          </Sobretitulo>

          <h1
            id="hero-titulo"
            className="text-display mt-7 font-serif font-normal text-balance"
          >
            Transformamos negócios em redes{" "}
            <em className="text-brand-light">prontas para crescer.</em>
          </h1>

          <p className="text-text-muted text-lead mt-7 max-w-xl text-pretty">
            Estratégia, estruturação e expansão para empresários que querem
            transformar um negócio que funciona em uma rede de franquias sólida
            — com método, e não por tentativa.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkWhatsapp origem="hero" evento="hero_cta" local="hero">
              Quero analisar minha empresa
            </LinkWhatsapp>
            <BotaoLink href="/cases" variante="secundario">
              Conhecer os cases
            </BotaoLink>
          </div>
        </div>
      </div>

      {/* Prova de autoridade: numeros publicados pela propria Avant. */}
      <Numeros className="bg-background/70 backdrop-blur-sm" />
    </section>
  );
}

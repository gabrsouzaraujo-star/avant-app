import Image from "next/image";
import { BotaoLink } from "@/components/ui/botao";
import { Numeros } from "@/components/sections/numeros";
import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { Sobretitulo } from "@/components/ui/titulo-secao";
import { site } from "@/data/site";

/**
 * Hero da home.
 *
 * Responde em uma dobra as perguntas do visitante: o que a Avant faz (titulo),
 * para quem e com que resultado (apoio), por que confiar (numeros e marcas
 * reais) e qual o proximo passo (CTA). A imagem e o socio-fundador diante
 * do mural da rede — foto real, nada de banco de imagens.
 *
 * Nada aqui usa animacao de entrada: e o LCP da pagina e precisa pintar na
 * primeira passada.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-titulo"
      className="relative isolate overflow-hidden pt-28 lg:pt-36"
    >
      <div className="container-site grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="pb-4 lg:col-span-7 lg:pb-24">
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

        <figure className="relative lg:col-span-5">
          <div className="relative aspect-[1188/1324] overflow-hidden">
            <Image
              src="/imagens/abertura-lucas-camargo.webp"
              alt="Lucas Camargo, sócio-fundador da Avant, diante de um mural de fotos com empresários e marcas da rede"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top"
            />
            {/* Funde a base da foto no fundo da pagina. */}
            <div
              aria-hidden="true"
              className="from-background absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t to-transparent"
            />
          </div>
          <figcaption className="absolute bottom-6 left-6 text-sm">
            <span className="block font-medium">Lucas Camargo</span>
            <span className="text-text-muted">Sócio-fundador</span>
          </figcaption>
        </figure>
      </div>

      {/* Prova de autoridade: numeros publicados pela propria Avant. */}
      <Numeros className="mt-4 lg:mt-0" />
    </section>
  );
}

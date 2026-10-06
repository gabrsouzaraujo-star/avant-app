import Image from "next/image";
import { CabecalhoPagina } from "@/components/layout/cabecalho-pagina";
import { CtaFinal } from "@/components/sections/cta-final";
import { Fundador } from "@/components/sections/fundador";
import { Numeros } from "@/components/sections/numeros";
import { Pilares } from "@/components/sections/pilares";
import { Revelar } from "@/components/ui/revelar";
import { TituloSecao } from "@/components/ui/titulo-secao";
import { fundador } from "@/data/pessoas";
import { site } from "@/data/site";
import { criarMetadata } from "@/lib/seo";

export const metadata = criarMetadata({
  titulo: "Sobre a Avant",
  descricao: `Desde ${site.fundacao}, a Avant transforma empresas em redes de franquias sustentáveis — com consultoria em formatação, expansão e gestão de redes.`,
  caminho: "/sobre",
});

/*
 * Texto institucional adaptado do proprio site da Avant (www2), sem
 * acrescentar fatos: fundacao em 2010, foco no sucesso do franqueado e
 * suporte continuo depois da venda.
 */
const principios = [
  {
    titulo: "Rede saudável antes de rede grande",
    texto:
      "A missão não é apenas criar franquias, mas garantir que cada uma prospere. Uma rede só cresce de verdade quando os franqueados crescem junto.",
  },
  {
    titulo: "Acompanhamento além do início",
    texto:
      "O trabalho não termina na entrega da formatação. Suporte contínuo, orientação estratégica e soluções para os desafios que surgem com a rede em operação.",
  },
  {
    titulo: "Os dois lados do balcão",
    texto:
      "Quem conduz a Avant conhece a rotina do franqueador e a do franqueado — e desenha o modelo pensando em quem vai operá-lo.",
  },
];

export default function SobrePage() {
  return (
    <>
      <CabecalhoPagina
        mosaico
        trilha={[{ nome: "Sobre", caminho: "/sobre" }]}
        sobretitulo="Sobre a Avant"
        titulo={`Desde ${site.fundacao}, transformando empresas em redes de franquias.`}
        descricao="A Avant é uma consultoria especializada em formatação, expansão e gestão de redes de franquias. Trabalha com empresários que já têm um negócio que funciona e querem multiplicá-lo com estrutura."
      />

      <Numeros />

      {/* No desktop cabe numa tela abaixo do cabecalho: a foto a esquerda,
          com a altura que sobra, e titulo e principios a direita. No
          celular: titulo, foto, principios. */}
      <section
        aria-labelledby="principios-titulo"
        className="secao lg:flex lg:min-h-svh lg:items-center lg:pt-24 lg:pb-8"
      >
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-12">
          <div className="contents lg:col-span-7 lg:col-start-6 lg:block">
            <TituloSecao
              id="principios-titulo"
              sobretitulo="No que acreditamos"
              serif
              compacto
              titulo="O sucesso dos clientes é a medida do nosso."
              className="order-1"
            />
            <ol className="border-border order-3 border-t lg:mt-10">
              {principios.map((principio, indice) => (
                <Revelar
                  as="li"
                  key={principio.titulo}
                  atraso={indice * 0.08}
                  className="border-border grid grid-cols-[3rem_1fr] gap-4 border-b py-6"
                >
                  <span
                    className="text-brand-text font-serif text-2xl"
                    aria-hidden="true"
                  >
                    0{indice + 1}
                  </span>
                  <div>
                    <h3 className="text-h3 font-medium">{principio.titulo}</h3>
                    <p className="text-text-muted mt-2 leading-relaxed">
                      {principio.texto}
                    </p>
                  </div>
                </Revelar>
              ))}
            </ol>
          </div>

          <figure className="relative order-2 mx-auto aspect-[3/4] w-full max-w-md overflow-hidden lg:order-first lg:col-span-5 lg:mx-0 lg:w-[min(100%,calc((100svh-8rem)*0.75))] lg:max-w-none">
            <Image
              src={fundador.fotoSobre}
              alt={fundador.fotoSobreAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent p-6 pt-16 text-sm text-white">
              <span className="block font-medium">{fundador.nome}</span>
              <span className="text-white/75">{fundador.papel}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <Fundador />

      <Pilares />

      <CtaFinal />
    </>
  );
}

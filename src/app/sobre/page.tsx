import { CabecalhoPagina } from "@/components/layout/cabecalho-pagina";
import { CtaFinal } from "@/components/sections/cta-final";
import { Fundador } from "@/components/sections/fundador";
import { Numeros } from "@/components/sections/numeros";
import { Pilares } from "@/components/sections/pilares";
import { Revelar } from "@/components/ui/revelar";
import { TituloSecao } from "@/components/ui/titulo-secao";
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
        trilha={[{ nome: "Sobre", caminho: "/sobre" }]}
        sobretitulo="Sobre a Avant"
        titulo={`Desde ${site.fundacao}, transformando empresas em redes de franquias.`}
        descricao="A Avant é uma consultoria especializada em formatação, expansão e gestão de redes de franquias. Trabalha com empresários que já têm um negócio que funciona e querem multiplicá-lo com estrutura."
      />

      <Numeros />

      <section aria-labelledby="principios-titulo" className="secao">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <TituloSecao
            id="principios-titulo"
            sobretitulo="No que acreditamos"
            serif
            titulo="O sucesso dos clientes é a medida do nosso."
            className="lg:col-span-5"
          />
          <ol className="border-border border-t lg:col-span-6 lg:col-start-7">
            {principios.map((principio, indice) => (
              <Revelar
                as="li"
                key={principio.titulo}
                atraso={indice * 0.08}
                className="border-border border-b py-8"
              >
                <h3 className="text-h3 font-medium">{principio.titulo}</h3>
                <p className="text-text-muted mt-3 leading-relaxed">
                  {principio.texto}
                </p>
              </Revelar>
            ))}
          </ol>
        </div>
      </section>

      <Fundador />

      <Pilares />

      <CtaFinal />
    </>
  );
}

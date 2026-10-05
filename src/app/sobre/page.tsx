import Image from "next/image";
import { CabecalhoPagina } from "@/components/layout/cabecalho-pagina";
import { CtaFinal } from "@/components/sections/cta-final";
import { Numeros } from "@/components/sections/numeros";
import { Pilares } from "@/components/sections/pilares";
import { Revelar } from "@/components/ui/revelar";
import { TituloSecao } from "@/components/ui/titulo-secao";
import { lideranca } from "@/data/pessoas";
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

      <section aria-labelledby="lideranca-titulo" className="secao-clara secao">
        <div className="container-site">
          <TituloSecao
            id="lideranca-titulo"
            sobretitulo="Liderança"
            titulo="Quem conduz a Avant."
          />

          <ul className="mt-14 grid gap-14 lg:grid-cols-2">
            {lideranca.map((pessoa) => (
              <li
                key={pessoa.nome}
                className="grid gap-8 sm:grid-cols-[minmax(0,14rem)_1fr]"
              >
                {pessoa.foto ? (
                  <div className="bg-surface relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={pessoa.foto}
                      alt={`Retrato de ${pessoa.nome}`}
                      fill
                      sizes="(min-width: 640px) 14rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  // TODO(cliente): retrato de Ener Komagata.
                  <div
                    aria-hidden="true"
                    className="bg-surface hidden aspect-[3/4] sm:block"
                  />
                )}
                <div>
                  <p className="font-serif text-4xl">{pessoa.nome}</p>
                  <p className="text-brand-text mt-2 text-xs font-semibold tracking-[0.16em] uppercase">
                    {pessoa.papel}
                  </p>
                  <p className="text-text-muted mt-5 leading-relaxed">
                    {pessoa.bio}
                  </p>
                  {pessoa.credenciaisConfirmadas && pessoa.credenciais && (
                    <ul className="mt-6 space-y-2 text-sm">
                      {pessoa.credenciais.map((credencial) => (
                        <li key={credencial} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="bg-brand mt-2.5 h-px w-3 shrink-0"
                          />
                          {credencial}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Pilares />

      <CtaFinal />
    </>
  );
}

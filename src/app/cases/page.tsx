import { CaseCard } from "@/components/cases/case-card";
import { CabecalhoPagina } from "@/components/layout/cabecalho-pagina";
import { CtaFinal } from "@/components/sections/cta-final";
import { Ecossistema } from "@/components/sections/ecossistema";
import { Revelar } from "@/components/ui/revelar";
import { cases } from "@/data/cases";
import { criarMetadata } from "@/lib/seo";

export const metadata = criarMetadata({
  titulo: "Cases de franquias",
  descricao:
    "MedInfuse, Cão Véio, Move Fitness, Don Kebab e Shogun Team: marcas que a Avant ajudou a estruturar, formatar e expandir como redes de franquias.",
  caminho: "/cases",
});

export default function CasesPage() {
  return (
    <>
      <CabecalhoPagina
        trilha={[{ nome: "Cases", caminho: "/cases" }]}
        sobretitulo="Cases"
        titulo="Negócios que cresceram com a Avant."
        descricao="Gastronomia, saúde, fitness e artes marciais. Setores diferentes, com uma mesma decisão: estruturar o modelo antes de multiplicá-lo."
      />

      <section aria-label="Lista de cases" className="container-site pb-24">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-3">
          {cases.map((item, indice) => (
            <Revelar as="li" key={item.slug} atraso={(indice % 3) * 0.08}>
              <CaseCard item={item} nivel="h2" />
            </Revelar>
          ))}
        </ul>
      </section>

      <Ecossistema />

      <CtaFinal
        origem="cases"
        titulo="Sua marca pode ser o próximo case."
        descricao="Converse com um especialista da Avant sobre o potencial de expansão do seu negócio por meio de franquias."
      />
    </>
  );
}

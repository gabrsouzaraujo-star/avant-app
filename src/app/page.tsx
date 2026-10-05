import { AvantcastSecao } from "@/components/sections/avantcast-secao";
import { CasesVitrine } from "@/components/sections/cases-vitrine";
import { CtaFinal } from "@/components/sections/cta-final";
import { DiagnosticoChamada } from "@/components/sections/diagnostico-chamada";
import { Ecossistema } from "@/components/sections/ecossistema";
import { FaixaMarcas } from "@/components/sections/faixa-marcas";
import { Hero } from "@/components/sections/hero";
import { Metodo } from "@/components/sections/metodo";
import { Pilares } from "@/components/sections/pilares";
import { Problema } from "@/components/sections/problema";
import { Depoimentos } from "@/components/testimonials/depoimentos";
import { depoimentos } from "@/data/pessoas";
import { site } from "@/data/site";
import { criarMetadata } from "@/lib/seo";

export const metadata = criarMetadata({
  descricao: site.descricao,
  caminho: "/",
});

/**
 * Ordem pensada para conversao: promessa e prova na primeira dobra, depois o
 * problema, a solucao, o caminho e os cases — e o diagnostico logo em
 * seguida, quando o visitante ja tem motivo para confiar.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <FaixaMarcas />
      <Problema />
      <Pilares />
      <Metodo />
      <CasesVitrine />
      <DiagnosticoChamada />
      <Ecossistema />
      <Depoimentos depoimentos={depoimentos} />
      <AvantcastSecao />
      <CtaFinal />
    </>
  );
}

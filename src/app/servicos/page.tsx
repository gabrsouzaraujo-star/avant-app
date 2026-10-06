import { CabecalhoPagina } from "@/components/layout/cabecalho-pagina";
import { CtaFinal } from "@/components/sections/cta-final";
import { Metodo } from "@/components/sections/metodo";
import { PilaresComVideo } from "@/components/sections/pilares-com-video";
import { pilares } from "@/data/servicos";
import { criarMetadata } from "@/lib/seo";

export const metadata = criarMetadata({
  titulo: "Soluções em franchising",
  descricao:
    "Análise de franqueabilidade, formatação de franquias, planejamento de expansão, expansão comercial, marketing e gestão de redes — as frentes da consultoria de franquias da Avant.",
  caminho: "/servicos",
});

export default function ServicosPage() {
  return (
    <>
      <CabecalhoPagina
        mosaico
        trilha={[{ nome: "Soluções", caminho: "/servicos" }]}
        sobretitulo="Soluções"
        titulo="Estruturar, expandir e sustentar uma rede de franquias."
        descricao="Cada solução da Avant é uma ferramenta de um momento da rede. O diagnóstico mostra em qual deles o seu negócio está — e por onde começar."
      >
        <nav aria-label="Pilares">
          <ul className="flex flex-wrap gap-3">
            {pilares.map((pilar) => (
              <li key={pilar.id}>
                <a
                  href={`#${pilar.id}`}
                  className="border-border hover:border-text inline-flex min-h-11 items-center gap-2 rounded-sm border px-4 text-sm transition-colors"
                >
                  <span className="text-brand-text font-semibold">
                    {pilar.numero}
                  </span>
                  {pilar.titulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </CabecalhoPagina>

      <PilaresComVideo pilares={pilares} />

      <Metodo />

      <CtaFinal
        origem="servicos"
        titulo="Não sabe por onde começar? A análise de franqueabilidade mostra."
        descricao="Uma conversa com um especialista para entender o momento do seu negócio e quais frentes fazem sentido agora."
      />
    </>
  );
}

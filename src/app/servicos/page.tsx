import { CabecalhoPagina } from "@/components/layout/cabecalho-pagina";
import { CtaFinal } from "@/components/sections/cta-final";
import { Metodo } from "@/components/sections/metodo";
import { Revelar } from "@/components/ui/revelar";
import { pilares } from "@/data/servicos";
import { cn } from "@/lib/utils";
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

      {pilares.map((pilar, indice) => (
        <section
          key={pilar.id}
          id={pilar.id}
          aria-labelledby={`${pilar.id}-titulo`}
          className={cn("secao", indice === 1 && "secao-clara")}
        >
          <div className="container-site grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span
                className="text-brand-text font-serif text-6xl"
                aria-hidden="true"
              >
                {pilar.numero}
              </span>
              <h2 id={`${pilar.id}-titulo`} className="text-h1 mt-4 font-serif">
                {pilar.titulo}
              </h2>
              <p className="text-text-muted mt-5 leading-relaxed">
                {pilar.resumo}
              </p>
            </div>

            <ul className="border-border grid border-t sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {pilar.servicos.map((servico, posicao) => (
                <Revelar
                  as="li"
                  key={servico.nome}
                  atraso={(posicao % 2) * 0.06}
                  className="border-border border-b py-8 sm:odd:pr-8 sm:even:border-l sm:even:pl-8"
                >
                  <h3 className="text-h3 font-medium">{servico.nome}</h3>
                  <p className="text-text-muted mt-3 text-sm leading-relaxed">
                    {servico.descricao}
                  </p>
                </Revelar>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <Metodo />

      <CtaFinal
        origem="servicos"
        titulo="Não sabe por onde começar? A análise de franqueabilidade mostra."
        descricao="Uma conversa com um especialista para entender o momento do seu negócio e quais frentes fazem sentido agora."
      />
    </>
  );
}

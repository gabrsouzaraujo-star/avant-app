import { BotaoLink } from "@/components/ui/botao";
import { Revelar } from "@/components/ui/revelar";
import { TituloSecao } from "@/components/ui/titulo-secao";
import { pilares } from "@/data/servicos";

/**
 * O que a Avant faz, em tres pilares — e nao em doze cards. Cada servico
 * aparece como ferramenta de um momento da rede, o que deixa claro que e uma
 * consultoria de ciclo completo, nao uma agencia com cardapio.
 */
export function Pilares() {
  return (
    <section aria-labelledby="pilares-titulo" className="secao">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <TituloSecao
            id="pilares-titulo"
            sobretitulo="Como a Avant atua"
            titulo="Uma consultoria para todo o ciclo de vida da rede."
            descricao="Da primeira pergunta — “meu negócio pode virar franquia?” — à gestão de uma rede em operação. Cada frente existe para servir a uma só meta: crescer com estrutura."
            className="lg:col-span-8"
          />
          <div className="lg:col-span-4 lg:text-right">
            <BotaoLink href="/servicos" variante="texto">
              Ver todas as soluções
            </BotaoLink>
          </div>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden lg:grid-cols-3">
          {pilares.map((pilar, indice) => (
            <Revelar
              as="li"
              key={pilar.id}
              atraso={indice * 0.1}
              className="border-border flex flex-col border-t pt-8 lg:border-t-0 lg:border-l lg:px-10 lg:pt-0 lg:first:border-l-0 lg:first:pl-0"
            >
              <span
                className="text-brand-text font-serif text-5xl"
                aria-hidden="true"
              >
                {pilar.numero}
              </span>
              <h3 className="text-h2 mt-6 font-medium">{pilar.titulo}</h3>
              <p className="text-text-muted mt-4 leading-relaxed">
                {pilar.resumo}
              </p>

              <ul className="mt-8 space-y-3 pb-10 lg:pb-0">
                {pilar.servicos.map((servico) => (
                  <li key={servico.nome} className="flex gap-3 text-sm">
                    <span
                      aria-hidden="true"
                      className="bg-brand mt-2.5 h-px w-3 shrink-0"
                    />
                    {servico.nome}
                  </li>
                ))}
              </ul>
            </Revelar>
          ))}
        </ol>
      </div>
    </section>
  );
}

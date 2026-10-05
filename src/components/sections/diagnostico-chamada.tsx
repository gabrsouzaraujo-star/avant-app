import { BotaoLink } from "@/components/ui/botao";
import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { Revelar } from "@/components/ui/revelar";
import { TituloSecao } from "@/components/ui/titulo-secao";
import { criterios } from "@/data/metodo";

/**
 * Principal mecanismo de conversao da home: a pergunta que todo empresario
 * da persona ja se fez, os pontos que respondem a ela e o CTA da analise.
 */
export function DiagnosticoChamada() {
  return (
    <section
      id="diagnostico"
      aria-labelledby="diagnostico-titulo"
      className="secao border-border relative overflow-hidden border-y"
    >
      {/* Brilho dourado discreto: unica area "quente" da pagina. */}
      <div
        aria-hidden="true"
        className="bg-brand/10 pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full blur-3xl"
      />

      <div className="container-site relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <TituloSecao
            id="diagnostico-titulo"
            sobretitulo="Análise de franqueabilidade"
            serif
            titulo="Seu negócio está pronto para virar uma franquia?"
            descricao="Faturar bem não basta. Antes de franquear, é preciso olhar para o negócio com os olhos de quem vai replicá-lo — e responder com honestidade a perguntas como estas."
          />

          <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <LinkWhatsapp
              origem="diagnostico"
              evento="diagnostic_cta"
              local="home-diagnostico"
            >
              Quero descobrir se meu negócio pode virar franquia
            </LinkWhatsapp>
          </div>
          <BotaoLink href="/diagnostico" variante="texto" className="mt-4">
            Fazer a autoavaliação
          </BotaoLink>
        </div>

        <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
          {criterios.map((criterio, indice) => (
            <Revelar
              as="li"
              key={criterio.titulo}
              atraso={(indice % 2) * 0.06}
              className="border-border border-t py-6"
            >
              <p className="flex items-baseline gap-3">
                <span className="text-brand-text text-xs font-semibold tabular-nums">
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <span className="font-medium">{criterio.titulo}</span>
              </p>
              <p className="text-text-muted mt-2 pl-8 text-sm leading-relaxed">
                {criterio.pergunta}
              </p>
            </Revelar>
          ))}
        </ol>
      </div>
    </section>
  );
}

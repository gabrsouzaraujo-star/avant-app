import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { Revelar } from "@/components/ui/revelar";
import { TituloSecao } from "@/components/ui/titulo-secao";
import { etapas } from "@/data/metodo";

/**
 * O caminho de um negocio ate virar rede, em seis etapas.
 *
 * Apresentado como representacao do processo, e a propria secao diz isso:
 * nao ha metodologia oficial documentada (ver `data/metodo.ts`).
 */
export function Metodo() {
  return (
    <section aria-labelledby="metodo-titulo" className="secao bg-surface">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <TituloSecao
            id="metodo-titulo"
            sobretitulo="O caminho"
            serif
            titulo="Do negócio que funciona à rede que cresce."
            className="lg:col-span-7"
          />
          <p className="text-text-muted leading-relaxed lg:col-span-4 lg:col-start-9">
            Uma visão simplificada das etapas pelas quais um negócio passa até
            se tornar uma rede de franquias. Cada empresa começa em um ponto
            diferente — o diagnóstico mostra qual.
          </p>
        </div>

        <ol className="mt-16 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {etapas.map((etapa, indice) => (
            <Revelar
              as="li"
              key={etapa.numero}
              atraso={indice * 0.06}
              className="border-border relative border-t pt-6 pb-10"
            >
              {/* Marca a posicao na linha do tempo. */}
              <span
                aria-hidden="true"
                className="bg-brand absolute -top-px left-0 h-px w-10"
              />
              <span className="text-brand-text text-xs font-semibold tracking-[0.2em]">
                {etapa.numero}
              </span>
              <h3 className="mt-3 text-xl font-medium">{etapa.titulo}</h3>
              <p className="text-text-muted mt-3 text-sm leading-relaxed">
                {etapa.descricao}
              </p>
            </Revelar>
          ))}
        </ol>

        <LinkWhatsapp
          origem="metodo"
          local="metodo"
          variante="secundario"
          className="mt-4"
        >
          Conhecer o método Avant
        </LinkWhatsapp>
      </div>
    </section>
  );
}

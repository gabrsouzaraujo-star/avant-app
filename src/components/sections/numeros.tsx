import { Contador } from "@/components/ui/contador";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Os numeros de autoridade da Avant, exatamente como ela os publica
 * (`site.numeros`). Faixa com fios finos: 2 colunas no celular, 4 no desktop.
 */
export function Numeros({ className }: { className?: string }) {
  return (
    <div className={cn("border-border border-y", className)}>
      <dl className="container-site grid grid-cols-2 lg:grid-cols-4">
        {site.numeros.map((numero, indice) => (
          <div
            key={numero.rotulo}
            className={cn(
              "border-border flex flex-col-reverse justify-end gap-2 py-8",
              indice < 2 && "border-b lg:border-b-0",
              indice % 2 === 1 && "border-l pl-5 sm:pl-8",
              indice % 2 === 0 && "pr-4",
              indice === 2 && "lg:border-l lg:pl-8",
              indice > 0 && "lg:pl-8",
            )}
          >
            <dt className="text-text-muted text-sm leading-snug">
              {numero.rotulo}
            </dt>
            <dd className="text-numero font-serif">
              <Contador
                valor={numero.valor}
                prefixo={numero.prefixo}
                sufixo={numero.sufixo}
                animar={numero.animar}
              />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

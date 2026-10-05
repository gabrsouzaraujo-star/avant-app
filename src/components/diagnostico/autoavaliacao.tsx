"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import type { Criterio } from "@/data/metodo";
import { cn } from "@/lib/utils";

/**
 * Autoavaliacao de franqueabilidade.
 *
 * Nao calcula nota nem da veredito — isso exigiria uma metodologia que a
 * Avant nao documentou. O que ela faz: organiza a reflexao do empresario e
 * leva o resultado para a conversa, dentro da mensagem do WhatsApp. Quem
 * atende ja comeca sabendo em que pe o negocio esta.
 */
export function Autoavaliacao({ criterios }: { criterios: Criterio[] }) {
  const [marcados, setMarcados] = useState<string[]>([]);
  const idResumo = useId();

  const alternar = (titulo: string) =>
    setMarcados((atual) =>
      atual.includes(titulo)
        ? atual.filter((item) => item !== titulo)
        : [...atual, titulo],
    );

  // Mantem a ordem original da lista na mensagem.
  const atendidos = criterios.filter((criterio) =>
    marcados.includes(criterio.titulo),
  );
  const complemento =
    atendidos.length > 0
      ? `Na autoavaliação do site, marquei que meu negócio já atende: ${atendidos
          .map((criterio) => criterio.titulo.toLowerCase())
          .join(", ")}.`
      : undefined;

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <fieldset className="lg:col-span-7">
        <legend className="text-text-muted mb-6 text-sm">
          Marque os pontos que o seu negócio já atende hoje.
        </legend>

        <ul className="border-border border-t">
          {criterios.map((criterio, indice) => {
            const ativo = marcados.includes(criterio.titulo);
            const id = `criterio-${indice}`;

            return (
              <li key={criterio.titulo} className="border-border border-b">
                <label
                  htmlFor={id}
                  className="hover:bg-surface flex cursor-pointer items-start gap-5 py-5 transition-colors sm:px-3"
                >
                  <input
                    id={id}
                    type="checkbox"
                    checked={ativo}
                    onChange={() => alternar(criterio.titulo)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "peer-focus-visible:outline-brand mt-0.5 grid size-6 shrink-0 place-items-center rounded-sm border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
                      ativo
                        ? "bg-brand border-brand text-brand-contrast"
                        : "border-text-muted",
                    )}
                  >
                    {ativo && <Check className="size-4" strokeWidth={3} />}
                  </span>
                  <span>
                    <span className="block font-medium">{criterio.titulo}</span>
                    <span className="text-text-muted mt-1 block text-sm leading-relaxed">
                      {criterio.pergunta}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="bg-surface border-border sticky top-24 border p-8">
          <p id={idResumo} aria-live="polite" className="font-serif text-5xl">
            {atendidos.length}
            <span className="text-text-muted text-2xl">
              {" "}
              de {criterios.length}
            </span>
          </p>
          <p className="text-text-muted mt-2 text-sm">pontos marcados</p>

          <p className="mt-6 text-sm leading-relaxed">
            Esta lista não é um diagnóstico — é um ponto de partida. A análise
            de franqueabilidade aprofunda cada um desses pontos com um
            especialista e mostra o que falta para o seu negócio virar rede.
          </p>

          <LinkWhatsapp
            origem="diagnostico"
            complemento={complemento}
            local="autoavaliacao"
            className="mt-8 w-full text-center"
          >
            Quero descobrir se meu negócio pode virar franquia
          </LinkWhatsapp>
          {atendidos.length > 0 && (
            <p className="text-text-muted mt-3 text-xs">
              Os pontos marcados vão junto na mensagem.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

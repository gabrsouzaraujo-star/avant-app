"use client";

import {
  eventoPorOrigem,
  whatsappHref,
  type OrigemWhatsapp,
} from "@/lib/contato";
import { rastrear, type EventoConversao } from "@/lib/rastreamento";
import { cn } from "@/lib/utils";
import { estiloBotao, SetaBotao, type VarianteBotao } from "./botao";
import { IconeWhatsapp } from "./icones";

type Props = {
  origem: OrigemWhatsapp;
  /** Evento especifico, alem do `whatsapp_click`. Padrao: o da origem. */
  evento?: EventoConversao;
  /** Contexto extra na mensagem (ex.: nome do case). */
  complemento?: string;
  /** Onde o botao esta na pagina — so vai para o rastreamento. */
  local?: string;
  children: React.ReactNode;
  variante?: VarianteBotao;
  className?: string;
  icone?: "seta" | "whatsapp" | "nenhum";
};

/**
 * Todo CTA de conversao do site passa por aqui: o link sai de
 * `whatsappHref()` e o clique vira evento no dataLayer.
 *
 * E Client Component so por causa do onClick — o resto e um <a> comum, que
 * funciona com JavaScript desligado.
 */
export function LinkWhatsapp({
  origem,
  evento,
  complemento,
  local,
  children,
  variante = "primario",
  className,
  icone = "seta",
}: Props) {
  return (
    <a
      href={whatsappHref(origem, complemento)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        const dados = { origem, local, contexto: complemento };
        rastrear("whatsapp_click", dados);
        rastrear(evento ?? eventoPorOrigem[origem], dados);
      }}
      className={cn(estiloBotao(variante), className)}
    >
      {icone === "whatsapp" && <IconeWhatsapp className="size-5 shrink-0" />}
      {children}
      <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
      {icone === "seta" && <SetaBotao />}
    </a>
  );
}

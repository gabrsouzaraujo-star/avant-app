import { site } from "@/data/site";
import type { EventoConversao } from "@/lib/rastreamento";

/**
 * Conversao 100% via WhatsApp.
 *
 * Todo CTA do site gera o link por aqui: o numero vive so em `site.ts` e cada
 * origem leva uma mensagem pre-preenchida propria, para quem atende saber de
 * onde a conversa veio sem precisar perguntar.
 */

export const mensagensWhatsapp = {
  hero: "Olá! Vim pelo site da Avant e gostaria de entender se minha empresa possui potencial para expansão através de franquias.",
  diagnostico:
    "Olá! Vim pelo site da Avant e gostaria de realizar uma análise de franqueabilidade da minha empresa.",
  cases:
    "Olá! Vim pelo site da Avant e gostaria de conversar sobre expansão e franquias.",
  servicos:
    "Olá! Vim pelo site da Avant e gostaria de entender como a consultoria pode ajudar a estruturar e expandir minha empresa.",
  metodo:
    "Olá! Vim pelo site da Avant e gostaria de conhecer o método de trabalho da consultoria.",
  conteudo:
    "Olá! Vim pelo site da Avant, depois de assistir ao AvantCast, e gostaria de conversar sobre franquias.",
  contato:
    "Olá! Vim pelo site da Avant e gostaria de falar com um especialista.",
} as const;

export type OrigemWhatsapp = keyof typeof mensagensWhatsapp;

/**
 * Link do WhatsApp com mensagem pre-preenchida.
 *
 * `complemento` acrescenta contexto a mensagem da origem — por exemplo, o
 * nome do case de onde a pessoa veio.
 */
export function whatsappHref(
  origem: OrigemWhatsapp,
  complemento?: string,
): string {
  const texto = complemento
    ? `${mensagensWhatsapp[origem]} ${complemento}`
    : mensagensWhatsapp[origem];

  return `https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export function emailHref(assunto?: string): string {
  const base = `mailto:${site.contato.email}`;
  return assunto ? `${base}?subject=${encodeURIComponent(assunto)}` : base;
}

/** Evento de conversao especifico de cada origem, alem do `whatsapp_click`. */
export const eventoPorOrigem: Record<OrigemWhatsapp, EventoConversao> = {
  hero: "hero_cta",
  diagnostico: "diagnostic_cta",
  cases: "case_cta",
  servicos: "contact_cta",
  metodo: "contact_cta",
  conteudo: "content_cta",
  contato: "contact_cta",
};

/**
 * Rastreamento centralizado.
 *
 * Os eventos vao para o `dataLayer` do Google Tag Manager. Sem GTM
 * configurado (ver `site.analytics.gtmId`), o push acontece do mesmo jeito e
 * simplesmente nao sai do navegador — nenhum componente precisa saber se o
 * GTM esta ativo.
 */

export type EventoConversao =
  | "whatsapp_click"
  | "hero_cta"
  | "diagnostic_cta"
  | "case_cta"
  | "contact_cta"
  | "content_cta"
  | "social_click";

type Dados = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function rastrear(evento: EventoConversao, dados: Dados = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: evento, ...dados });
}

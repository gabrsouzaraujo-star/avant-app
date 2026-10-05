"use client";

import { rastrear, type EventoConversao } from "@/lib/rastreamento";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  evento: EventoConversao;
  dados?: Record<string, string>;
};

/** Link externo comum que registra o clique no dataLayer. */
export function LinkRastreado({ evento, dados, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={(clique) => {
        rastrear(evento, dados);
        onClick?.(clique);
      }}
    />
  );
}

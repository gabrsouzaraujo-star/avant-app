import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * CTA principal do site.
 *
 * O destino ainda nao foi decidido: hoje o site do cliente manda para um
 * Typebot externo (typebot.co/lucas-avant-t81zd2f) e a alternativa e um
 * formulario proprio. Ate a decisao, aponta para a ancora de contato.
 */
export function CtaAnalise({ children, className }: Props) {
  return (
    <a
      href="#contato"
      className={cn(
        "bg-brand text-brand-foreground hover:bg-brand-hover inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold tracking-wide uppercase transition-colors",
        className,
      )}
    >
      {children}
    </a>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type VarianteBotao = "primario" | "secundario" | "texto";

/**
 * Estilo unico dos botoes do site. Exportado como funcao para que links
 * internos, links de WhatsApp e botoes reais compartilhem exatamente a mesma
 * aparencia sem herdar comportamento uns dos outros.
 */
export function estiloBotao(variante: VarianteBotao = "primario") {
  return cn(
    "group/botao inline-flex min-h-12 items-center justify-center gap-3 text-[0.95rem] font-medium transition-[background-color,border-color,color] duration-200",
    variante === "primario" &&
      "bg-brand text-brand-contrast hover:bg-brand-light rounded-sm px-6 py-3",
    variante === "secundario" &&
      "border-text/25 text-text hover:border-text rounded-sm border px-6 py-3",
    variante === "texto" &&
      "text-text hover:text-brand-text min-h-11 underline-offset-8 hover:underline",
  );
}

/** Seta que avanca levemente no hover do botao. */
export function SetaBotao() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 shrink-0 transition-transform duration-200 group-hover/botao:translate-x-1"
    />
  );
}

type Props = {
  href: string;
  children: React.ReactNode;
  variante?: VarianteBotao;
  className?: string;
  comSeta?: boolean;
};

/** Botao que navega dentro do site. */
export function BotaoLink({
  href,
  children,
  variante = "primario",
  className,
  comSeta = true,
}: Props) {
  return (
    <Link href={href} className={cn(estiloBotao(variante), className)}>
      {children}
      {comSeta && <SetaBotao />}
    </Link>
  );
}

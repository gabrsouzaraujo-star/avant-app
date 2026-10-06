import { cn } from "@/lib/utils";

/** Sobretitulo: rotulo curto em caixa alta, com o fio dourado da marca. */
export function Sobretitulo({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-brand-text flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className="bg-brand h-px w-8" />
      {children}
    </p>
  );
}

type Props = {
  sobretitulo?: string;
  titulo: React.ReactNode;
  descricao?: React.ReactNode;
  /** `serif` reserva a serifada editorial para os titulos estrategicos. */
  serif?: boolean;
  /** Serifada um degrau menor, para secoes que precisam caber numa tela. */
  compacto?: boolean;
  centralizado?: boolean;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function TituloSecao({
  sobretitulo,
  titulo,
  descricao,
  serif = false,
  compacto = false,
  centralizado = false,
  as: Tag = "h2",
  id,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        centralizado && "mx-auto text-center [&>p:first-child]:justify-center",
        className,
      )}
    >
      {sobretitulo && <Sobretitulo>{sobretitulo}</Sobretitulo>}
      <Tag
        id={id}
        className={cn(
          "text-balance",
          sobretitulo && "mt-5",
          serif
            ? cn(compacto ? "text-h2" : "text-h1", "font-serif font-normal")
            : "text-h2 font-medium",
        )}
      >
        {titulo}
      </Tag>
      {descricao && (
        <p className="text-text-muted text-lead mt-6 max-w-2xl text-pretty">
          {descricao}
        </p>
      )}
    </div>
  );
}

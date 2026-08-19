import { cn } from "@/lib/utils";

type Props = {
  /** O que vai ocupar este espaco quando o material chegar. */
  rotulo: string;
  /** Detalhe util para quem for produzir o material (formato, duracao). */
  detalhe?: string;
  className?: string;
};

/**
 * Espaco reservado para conteudo que o cliente ainda nao enviou.
 *
 * Existe para deixar explicito o que falta, em vez de preencher a tela com
 * dados de negocio inventados. Todos devem sumir antes do site ir ao ar.
 */
export function MarcadorConteudo({ rotulo, detalhe, className }: Props) {
  return (
    <div
      className={cn(
        "border-border flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed px-6 py-8 text-center",
        className,
      )}
    >
      <span className="text-brand font-mono text-[0.7rem] tracking-[0.18em] uppercase">
        A preencher
      </span>
      <span className="text-sm font-medium">{rotulo}</span>
      {detalhe && <span className="text-muted text-xs">{detalhe}</span>}
    </div>
  );
}

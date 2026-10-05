import { cn } from "@/lib/utils";

/**
 * Logo da AVANT.
 *
 * TODO(cliente): substituir por `public/marca/avant.svg` quando o logo
 * oficial em vetor chegar — hoje ele so existe em raster no site antigo, sem
 * qualidade para telas de alta densidade.
 *
 * Ate la, este placeholder reproduz a estrutura do logo atual: AVANT com o V
 * desenhado como o traco da marca (o mesmo do favicon), e FRANCHISING por
 * baixo. O traco e vetor e usa o token da marca.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        aria-hidden="true"
        className="flex items-end text-[1.35rem] font-light tracking-[0.2em]"
      >
        A
        <svg
          viewBox="0 0 16 20"
          aria-hidden="true"
          className="text-brand mr-[0.2em] mb-[0.12em] h-[0.78em] w-auto"
        >
          <path
            d="M2 0V18.5L15 1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />
        </svg>
        ANT
      </span>
      <span
        aria-hidden="true"
        className="text-text-muted mt-1.5 text-[0.5rem] font-medium tracking-[0.6em]"
      >
        FRANCHISING
      </span>
      <span className="sr-only">AVANT Franchising</span>
    </span>
  );
}

import Link from "next/link";
import { franquias } from "@/content/franquias";

export function Cabecalho() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-6"
      >
        <Link
          href="/"
          className="hover:text-brand text-sm font-bold tracking-[0.2em] uppercase transition-colors"
        >
          Avant
        </Link>

        {/* Com quatro itens a linha nao cabe num celular estreito: em vez de
            cortar, ela quebra e o ultimo item desce. */}
        <ul className="text-muted flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-xs tracking-wide uppercase sm:gap-x-5">
          {franquias.map((franquia) => (
            <li key={franquia.slug}>
              <Link
                href={`/franquias/${franquia.slug}`}
                className="hover:text-foreground transition-colors"
              >
                {franquia.nome}
              </Link>
            </li>
          ))}

          {/* O podcast nao e uma rede: fica destacado, fora da sequencia. */}
          <li>
            <Link
              href="/avantcast"
              className="text-foreground hover:text-brand font-semibold transition-colors"
            >
              AvantCast
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

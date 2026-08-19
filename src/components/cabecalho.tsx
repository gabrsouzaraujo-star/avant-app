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

        <ul className="text-muted flex items-center gap-5 text-xs tracking-wide uppercase">
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
        </ul>
      </nav>
    </header>
  );
}

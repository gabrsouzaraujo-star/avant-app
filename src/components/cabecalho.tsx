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
          className="hover:text-brand shrink-0 text-sm font-bold tracking-[0.2em] uppercase transition-colors"
        >
          Avant
        </Link>

        {/*
         * Sao seis destinos: num celular estreito eles nao cabem numa linha e
         * quebrariam em tres. Ali a lista vira uma faixa que rola no dedo, com
         * a mascara apagando a borda direita para mostrar que continua. A
         * partir de `sm` tudo cabe e ela volta a ser uma linha comum.
         */}
        <ul className="text-muted flex min-w-0 flex-1 [scrollbar-width:none] items-center gap-x-4 overflow-x-auto [mask-image:linear-gradient(to_right,#000_85%,transparent)] text-xs tracking-wide uppercase sm:flex-wrap sm:justify-end sm:gap-x-5 sm:overflow-visible sm:[mask-image:none]">
          {franquias.map((franquia) => (
            <li key={franquia.slug} className="shrink-0">
              <Link
                href={`/franquias/${franquia.slug}`}
                className="hover:text-foreground transition-colors"
              >
                {franquia.nome}
              </Link>
            </li>
          ))}

          {/* O podcast nao e uma rede: fica destacado, fora da sequencia. */}
          <li className="shrink-0">
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

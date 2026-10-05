"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navegacao, site } from "@/data/site";
import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

/**
 * Header fixo. No topo da pagina e transparente e alto; depois de rolar,
 * ganha fundo, borda e encolhe — sem perder legibilidade sobre o hero.
 */
export function Cabecalho() {
  const pathname = usePathname();
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Fecha o menu ao trocar de pagina.
  const [rotaAnterior, setRotaAnterior] = useState(pathname);
  if (rotaAnterior !== pathname) {
    setRotaAnterior(pathname);
    setAberto(false);
  }

  // Menu aberto: trava a rolagem, leva o foco para dentro e fecha no Esc.
  useEffect(() => {
    if (!aberto) return;

    const botao = botaoRef.current;
    document.body.style.overflow = "hidden";
    painelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAberto(false);
    };
    window.addEventListener("keydown", aoTeclar);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", aoTeclar);
      botao?.focus();
    };
  }, [aberto]);

  const ativo = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        rolou || aberto
          ? "bg-background/90 border-border border-b backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <a
        href="#conteudo"
        className="bg-brand text-brand-contrast sr-only z-50 px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>

      <div
        className={cn(
          "container-site flex items-center justify-between gap-6 transition-[height] duration-300",
          rolou || aberto ? "h-16" : "h-20 lg:h-24",
        )}
      >
        <Link
          href="/"
          aria-label={`${site.nome} — página inicial`}
          className="shrink-0"
        >
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={ativo(item.href) ? "page" : undefined}
                  className={cn(
                    "relative py-2 text-sm transition-colors",
                    "after:bg-brand after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100",
                    ativo(item.href)
                      ? "text-text after:scale-x-100"
                      : "text-text-muted hover:text-text",
                  )}
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LinkWhatsapp
            origem="hero"
            evento="hero_cta"
            local="header"
            className="hidden min-h-11 px-5 py-2 text-sm sm:inline-flex"
          >
            Analisar minha empresa
          </LinkWhatsapp>

          <button
            ref={botaoRef}
            type="button"
            onClick={() => setAberto((valor) => !valor)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="text-text -mr-2 grid size-12 place-items-center lg:hidden"
          >
            {aberto ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={painelRef}
        hidden={!aberto}
        className="bg-background fixed inset-x-0 top-16 bottom-0 overflow-y-auto lg:hidden"
      >
        <nav
          aria-label="Menu"
          className="container-site flex min-h-full flex-col py-8"
        >
          <ul className="border-border border-t">
            {navegacao.map((item) => (
              <li key={item.href} className="border-border border-b">
                <Link
                  href={item.href}
                  aria-current={ativo(item.href) ? "page" : undefined}
                  className={cn(
                    "flex min-h-16 items-center text-2xl font-medium",
                    ativo(item.href) ? "text-brand-text" : "text-text",
                  )}
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <LinkWhatsapp
              origem="hero"
              evento="hero_cta"
              local="menu-mobile"
              icone="whatsapp"
              className="w-full"
            >
              Analisar minha empresa
            </LinkWhatsapp>
            <p className="text-text-muted mt-4 text-center text-sm">
              {site.contato.telefoneExibicao} · {site.contato.email}
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}

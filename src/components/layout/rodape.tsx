import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { cases } from "@/data/cases";
import { avantcast } from "@/data/conteudos";
import { pilares } from "@/data/servicos";
import { enderecoCompleto, navegacao, site } from "@/data/site";
import { emailHref } from "@/lib/contato";
import { IconeWhatsapp, iconesRedes } from "@/components/ui/icones";
import { LinkRastreado } from "@/components/ui/link-rastreado";
import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { Logo } from "@/components/ui/logo";

function Coluna({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-text text-xs font-semibold tracking-[0.2em] uppercase">
        {titulo}
      </h2>
      <ul className="mt-5 space-y-1">{children}</ul>
    </div>
  );
}

const estiloLink =
  "text-text-muted hover:text-text inline-flex min-h-10 items-center text-sm transition-colors";

export function Rodape() {
  const ano = new Date().getFullYear();

  return (
    <footer className="border-border bg-background border-t">
      <div className="container-site pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${site.nome} — página inicial`}>
              <Logo />
            </Link>
            <p className="text-text-muted mt-6 max-w-sm text-sm leading-relaxed">
              Consultoria especializada em transformar negócios em redes de
              franquias — da análise de franqueabilidade à expansão e gestão da
              rede. Desde {site.fundacao}.
            </p>

            <LinkWhatsapp
              origem="contato"
              evento="contact_cta"
              local="rodape"
              icone="whatsapp"
              className="mt-8"
            >
              Falar com um especialista
            </LinkWhatsapp>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <Coluna titulo="Navegação">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={estiloLink}>
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </Coluna>

            <Coluna titulo="Soluções">
              {pilares.map((pilar) => (
                <li key={pilar.id}>
                  <Link href={`/servicos#${pilar.id}`} className={estiloLink}>
                    {pilar.titulo}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/diagnostico" className={estiloLink}>
                  Análise de franqueabilidade
                </Link>
              </li>
            </Coluna>

            <Coluna titulo="Cases">
              {cases.map((item) => (
                <li key={item.slug}>
                  <Link href={`/cases/${item.slug}`} className={estiloLink}>
                    {item.nome}
                  </Link>
                </li>
              ))}
            </Coluna>

            <Coluna titulo="Conteúdo">
              <li>
                <Link href="/conteudos" className={estiloLink}>
                  {avantcast.nome}
                </Link>
              </li>
              {site.redes.map((rede) => {
                const Icone = iconesRedes[rede.icone];
                return (
                  <li key={rede.nome}>
                    <LinkRastreado
                      href={rede.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      evento="social_click"
                      dados={{ rede: rede.nome, local: "rodape" }}
                      className={`${estiloLink} gap-2`}
                    >
                      <Icone className="size-4" />
                      {rede.nome}
                    </LinkRastreado>
                  </li>
                );
              })}
            </Coluna>
          </div>
        </div>

        <address className="border-border text-text-muted mt-16 grid gap-4 border-t pt-8 text-sm not-italic sm:grid-cols-3">
          <LinkWhatsapp
            origem="contato"
            evento="contact_cta"
            local="rodape-contato"
            variante="texto"
            icone="nenhum"
            className="text-text-muted justify-start gap-2 text-sm font-normal"
          >
            <IconeWhatsapp className="size-4 shrink-0" />
            {site.contato.telefoneExibicao}
          </LinkWhatsapp>
          <a
            href={emailHref()}
            className="hover:text-text inline-flex min-h-11 items-center gap-2 transition-colors"
          >
            <Mail aria-hidden="true" className="size-4 shrink-0" />
            {site.contato.email}
          </a>
          <p className="inline-flex min-h-11 items-center gap-2">
            <MapPin aria-hidden="true" className="size-4 shrink-0" />
            {enderecoCompleto}
          </p>
        </address>

        <div className="text-text-muted mt-8 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ano} {site.nomeCompleto}. Todos os direitos reservados.
            {site.cnpj && ` CNPJ ${site.cnpj}.`}
          </p>
          <Link
            href="/politica-de-privacidade"
            className="hover:text-text min-h-10 content-center"
          >
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { Revelar } from "@/components/ui/revelar";
import { Sobretitulo } from "@/components/ui/titulo-secao";
import { conteudos } from "@/data/conteudos";
import { fundador } from "@/data/pessoas";
import { site } from "@/data/site";

const CORTES = 3;

/**
 * Lideranca: o socio-fundador em destaque. Retrato grande, as frentes em que
 * ele atua (todas documentadas) e os cortes do AvantCast em que ele fala —
 * prova de autoridade com conteudo real, sem numero nao confirmado.
 */
export function Fundador() {
  const cortes = conteudos
    .filter((item) => item.convidados.includes(fundador.nome))
    .slice(0, CORTES);

  return (
    <section
      aria-labelledby="fundador-titulo"
      className="secao relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="bg-brand/10 pointer-events-none absolute top-1/4 -left-40 -z-10 size-[40rem] rounded-full blur-3xl"
      />

      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Revelar className="lg:col-span-5">
          <figure className="relative">
            <div className="bg-surface relative aspect-[1188/1324] overflow-hidden">
              <Image
                src={fundador.foto}
                alt={fundador.fotoAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="from-background/90 absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t to-transparent"
              />
            </div>
            <figcaption className="absolute bottom-6 left-6">
              <span className="text-brand-text block text-xs font-semibold tracking-[0.2em] uppercase">
                Desde {site.fundacao}
              </span>
              <span className="mt-1 block text-sm">
                À frente da {site.nome}
              </span>
            </figcaption>
            {/* Moldura deslocada: assinatura editorial do retrato. */}
            <span
              aria-hidden="true"
              className="border-brand/40 absolute -right-3 -bottom-3 -z-10 hidden size-full border sm:block"
            />
          </figure>
        </Revelar>

        <div className="lg:col-span-7">
          <Sobretitulo>Liderança</Sobretitulo>
          <h2
            id="fundador-titulo"
            className="text-display mt-5 font-serif font-normal"
          >
            {fundador.nome}
          </h2>
          <p className="text-brand-light mt-2 font-serif text-2xl italic">
            {fundador.papel}
          </p>
          <p className="text-lead text-text/90 mt-6 max-w-2xl text-pretty">
            {fundador.bio}
          </p>

          <ul className="border-border mt-10 grid border-t sm:grid-cols-3">
            {fundador.frentes.map((frente, indice) => {
              const destino = frente.caseSlug
                ? `/cases/${frente.caseSlug}`
                : frente.href;
              return (
                <Revelar
                  as="li"
                  key={frente.titulo}
                  atraso={indice * 0.08}
                  className="border-border border-b py-6 sm:border-b-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0"
                >
                  <span className="text-brand-text font-serif text-3xl">
                    0{indice + 1}
                  </span>
                  <h3 className="mt-3 font-medium">
                    {destino ? (
                      <Link
                        href={destino}
                        className="hover:text-brand-text inline-flex items-center gap-1 underline-offset-4 hover:underline"
                      >
                        {frente.titulo}
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      </Link>
                    ) : (
                      frente.titulo
                    )}
                  </h3>
                  <p className="text-text-muted mt-2 text-sm leading-relaxed">
                    {frente.texto}
                  </p>
                </Revelar>
              );
            })}
          </ul>

          {fundador.credenciaisConfirmadas && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {fundador.credenciais.map((credencial) => (
                <li
                  key={credencial}
                  className="border-border rounded-sm border px-3 py-1.5 text-sm"
                >
                  {credencial}
                </li>
              ))}
            </ul>
          )}

          {cortes.length > 0 && (
            <div className="mt-10">
              <p className="text-text-muted text-xs font-semibold tracking-[0.2em] uppercase">
                {fundador.nome.split(" ")[0]} no AvantCast
              </p>
              <ul className="mt-4 space-y-1">
                {cortes.map((corte) => (
                  <li key={corte.slug}>
                    <Link
                      href={`/conteudos/${corte.slug}`}
                      className="group hover:bg-surface -mx-3 flex min-h-12 items-center gap-4 px-3 py-2 transition-colors"
                    >
                      <span className="border-border group-hover:bg-brand group-hover:text-brand-contrast grid size-9 shrink-0 place-items-center rounded-full border transition-colors">
                        <Play
                          aria-hidden="true"
                          className="size-3.5 translate-x-px fill-current"
                        />
                      </span>
                      <span className="text-sm font-medium">
                        {corte.titulo}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <LinkWhatsapp
            origem="contato"
            local="sobre-fundador"
            className="mt-10"
          >
            Falar com um especialista
          </LinkWhatsapp>
        </div>
      </div>
    </section>
  );
}

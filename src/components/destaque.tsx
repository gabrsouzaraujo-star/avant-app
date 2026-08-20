import Image from "next/image";
import type { Destaque as TipoDestaque } from "@/content/franquias";

/**
 * Bloco de historia/marco da rede: retrato de um lado, texto do outro.
 *
 * A divisao repete a arte original do cliente, que separa foto e mensagem
 * por uma faixa da cor da marca. A diferenca e que aqui o texto e HTML de
 * verdade — reflui, e indexavel e chega a leitores de tela.
 */
export function Destaque({ destaque }: { destaque: TipoDestaque }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Image
          src={destaque.foto}
          alt={destaque.alt}
          width={740}
          height={990}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="border-border w-full rounded-xl border object-cover"
        />

        <div className="border-brand lg:border-l-4 lg:pl-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {destaque.titulo}
          </h2>

          <p className="text-brand mt-4 text-xl font-semibold text-balance">
            {destaque.chamada}
          </p>

          <div className="mt-6 space-y-4">
            {destaque.paragrafos.map((paragrafo) => (
              <p key={paragrafo} className="text-muted leading-relaxed">
                {paragrafo}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

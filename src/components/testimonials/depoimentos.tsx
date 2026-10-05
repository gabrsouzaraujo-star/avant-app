import Image from "next/image";
import { TituloSecao } from "@/components/ui/titulo-secao";
import type { Depoimento } from "@/data/cases";

type Props = {
  depoimentos: Depoimento[];
  titulo?: string;
};

/**
 * Depoimentos reais, com nome, cargo e empresa.
 *
 * Sem depoimentos, nao renderiza nada — e nao ha placeholder: preferimos a
 * ausencia a qualquer texto que pareca inventado. Cada depoimento aparece uma
 * unica vez; a chave e o autor.
 */
export function Depoimentos({
  depoimentos,
  titulo = "Quem trabalhou com a Avant",
}: Props) {
  if (depoimentos.length === 0) return null;

  return (
    <section aria-labelledby="depoimentos-titulo" className="secao">
      <div className="container-site">
        <TituloSecao
          id="depoimentos-titulo"
          sobretitulo="Depoimentos"
          titulo={titulo}
        />

        <ul className="mt-14 grid gap-10 lg:grid-cols-2">
          {depoimentos.map((depoimento) => (
            <li key={depoimento.autor} className="border-border border-t pt-8">
              <figure>
                <blockquote className="font-serif text-2xl leading-snug text-pretty sm:text-3xl">
                  “{depoimento.texto}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  {depoimento.foto && (
                    <Image
                      src={depoimento.foto}
                      alt=""
                      width={56}
                      height={56}
                      className="size-14 rounded-full object-cover"
                    />
                  )}
                  <span>
                    <span className="block font-medium">
                      {depoimento.autor}
                    </span>
                    <span className="text-text-muted text-sm">
                      {depoimento.cargo}, {depoimento.empresa}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

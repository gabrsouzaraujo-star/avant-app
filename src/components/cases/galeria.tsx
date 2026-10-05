import Image from "next/image";
import type { Foto } from "@/data/cases";

type Props = {
  fotos: Foto[];
  titulo: string;
};

/**
 * Fotos reais da operacao do case. A primeira ocupa duas colunas para dar
 * ritmo editorial a grade em vez de um mosaico uniforme.
 */
export function Galeria({ fotos, titulo }: Props) {
  if (fotos.length === 0) return null;

  return (
    <section aria-labelledby="galeria-titulo" className="secao">
      <div className="container-site">
        <h2 id="galeria-titulo" className="text-h2 font-semibold">
          {titulo}
        </h2>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {fotos.map((foto, indice) => (
            <li
              key={foto.src}
              className={
                indice === 0
                  ? "bg-surface relative col-span-2 row-span-2 aspect-square overflow-hidden md:aspect-auto"
                  : "bg-surface relative aspect-[4/5] overflow-hidden"
              }
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes={
                  indice === 0
                    ? "(min-width: 768px) 66vw, 100vw"
                    : "(min-width: 768px) 33vw, 50vw"
                }
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

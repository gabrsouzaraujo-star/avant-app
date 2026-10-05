import Image from "next/image";
import type { Foto } from "@/content/franquias";

type Props = {
  fotos: Foto[];
  titulo: string;
};

/**
 * Grade de fotos da rede.
 *
 * As imagens sao servidas por next/image, entao cada tamanho de tela recebe
 * o arquivo proporcional e o carregamento e adiado ate a rolagem chegar.
 */
export function Galeria({ fotos, titulo }: Props) {
  if (fotos.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="text-3xl font-bold tracking-tight">{titulo}</h2>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {fotos.map((foto) => (
          <li
            key={foto.src}
            className="border-border overflow-hidden rounded-lg border"
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              width={444}
              height={556}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

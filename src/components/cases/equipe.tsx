import Image from "next/image";
import type { Pessoa } from "@/content/franquias";

type Props = {
  pessoas: Pessoa[];
  titulo: string;
  chamada?: string;
};

/**
 * Quem esta por tras da rede.
 *
 * Os retratos foram recortados dos cards de carrossel do cliente; o texto foi
 * transcrito para HTML em vez de continuar dentro da imagem, para poder ser
 * lido por buscadores e leitores de tela, e reflui em qualquer largura.
 */
export function Equipe({ pessoas, titulo, chamada }: Props) {
  if (pessoas.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <h2 className="text-3xl font-bold tracking-tight">{titulo}</h2>
      {chamada && <p className="text-muted mt-3 max-w-2xl">{chamada}</p>}

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pessoas.map((pessoa) => (
          <li
            key={pessoa.nome}
            className="border-border bg-surface overflow-hidden rounded-xl border"
          >
            <Image
              src={pessoa.foto}
              alt={`Retrato de ${pessoa.nome}`}
              width={600}
              height={800}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="aspect-[3/4] w-full object-cover"
            />

            <div className="p-6">
              <p className="text-lg font-bold">{pessoa.nome}</p>
              <p className="text-brand mt-1 font-mono text-[0.7rem] tracking-[0.15em] uppercase">
                {pessoa.papel}
              </p>
              <p className="text-muted mt-4 text-sm leading-relaxed">
                {pessoa.bio}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

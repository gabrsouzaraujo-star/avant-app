import Image from "next/image";
import type { Pessoa } from "@/data/cases";

type Props = {
  pessoas: Pessoa[];
  titulo: string;
  descricao?: string;
};

/**
 * Pessoas por tras do negocio. Os retratos vieram recortados dos cards do
 * cliente; o texto que estava dentro da imagem foi transcrito para HTML, para
 * ser lido por buscadores e leitores de tela.
 */
export function Equipe({ pessoas, titulo, descricao }: Props) {
  if (pessoas.length === 0) return null;

  return (
    <section aria-labelledby="equipe-titulo" className="secao">
      <div className="container-site">
        <h2 id="equipe-titulo" className="text-h2 font-semibold">
          {titulo}
        </h2>
        {descricao && (
          <p className="text-text-muted text-lead mt-4 max-w-2xl">
            {descricao}
          </p>
        )}

        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {pessoas.map((pessoa) => (
            <li key={pessoa.nome}>
              {pessoa.foto && (
                <div className="bg-surface relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={pessoa.foto}
                    alt={`Retrato de ${pessoa.nome}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <p className="mt-5 text-xl font-medium">{pessoa.nome}</p>
              <p className="text-brand-text mt-1 text-xs font-semibold tracking-[0.16em] uppercase">
                {pessoa.papel}
              </p>
              {pessoa.bio && (
                <p className="text-text-muted mt-4 text-sm leading-relaxed">
                  {pessoa.bio}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Revelar } from "@/components/ui/revelar";
import { TituloSecao } from "@/components/ui/titulo-secao";
import { marcasPublicadas } from "@/data/marcas";

/**
 * Ecossistema da Avant: as pessoas publicas ligadas as marcas atendidas.
 *
 * So entram nomes com `publicar: true` em `marcas.ts`. Parceiros,
 * fornecedores e midia ja tem categoria no modelo de dados e ganham bloco
 * proprio aqui quando houver o primeiro item comprovado.
 */
export function Ecossistema() {
  const personalidades = marcasPublicadas("personalidade");
  const casesPorNome = new Map(
    marcasPublicadas("case").map((marca) => [marca.nome, marca.caseSlug]),
  );

  if (personalidades.length === 0) return null;

  return (
    <section aria-labelledby="ecossistema-titulo" className="secao-clara secao">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <TituloSecao
          id="ecossistema-titulo"
          sobretitulo="Ecossistema"
          titulo="Personalidades por trás das marcas."
          descricao="Chefs, atletas e empresários que associaram o próprio nome a negócios que a Avant ajudou a estruturar e expandir."
          className="lg:col-span-5"
        />

        <ul className="border-border border-t lg:col-span-6 lg:col-start-7">
          {personalidades.map((pessoa, indice) => (
            <Revelar
              as="li"
              key={pessoa.nome}
              atraso={indice * 0.05}
              className="border-border grid gap-2 border-b py-7 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
            >
              <div>
                <p className="font-serif text-3xl sm:text-4xl">{pessoa.nome}</p>
                {pessoa.descricao && (
                  <p className="text-text-muted mt-1 text-sm">
                    {pessoa.descricao}
                  </p>
                )}
              </div>
              <p className="text-sm sm:text-right">
                {pessoa.ligadoA?.map((nome, posicao) => {
                  const slug = casesPorNome.get(nome);
                  return (
                    <span key={nome}>
                      {posicao > 0 && " · "}
                      {slug ? (
                        <Link
                          href={`/cases/${slug}`}
                          className="text-brand-text font-medium underline-offset-4 hover:underline"
                        >
                          {nome}
                        </Link>
                      ) : (
                        <span className="font-medium">{nome}</span>
                      )}
                    </span>
                  );
                })}
              </p>
            </Revelar>
          ))}
        </ul>
      </div>
    </section>
  );
}

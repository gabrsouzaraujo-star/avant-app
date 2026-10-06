import Link from "next/link";
import { MosaicoEsteira } from "@/components/partners/mosaico-esteira";
import { Revelar } from "@/components/ui/revelar";
import { TituloSecao } from "@/components/ui/titulo-secao";
import { fotosEcossistema, marcasPublicadas } from "@/data/marcas";
import { cn } from "@/lib/utils";

/**
 * Ecossistema da Avant: as pessoas publicas ligadas as marcas atendidas.
 *
 * Ao fundo, um mosaico de fotos dos bastidores corre em esteira infinita
 * (ver `MosaicoEsteira`): quadros do mesmo tamanho, alinhados em faixas que
 * andam em sentidos alternados. Um veu leve escurece as fotos so o bastante para o conteudo,
 * que fica em paineis translucidos por cima, continuar sendo o foco.
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
    <section
      aria-labelledby="ecossistema-titulo"
      className="secao relative isolate overflow-hidden"
    >
      {/* Mosaico em esteira — decorativo. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <MosaicoEsteira fotos={fotosEcossistema} className="absolute inset-0" />
        {/* Veu leve: as fotos continuam visiveis, mas recuam. */}
        <div className="bg-background/45 absolute inset-0" />
        <div className="from-background absolute inset-x-0 top-0 h-24 bg-linear-to-b to-transparent" />
        <div className="from-background absolute inset-x-0 bottom-0 h-24 bg-linear-to-t to-transparent" />
      </div>

      <div className="container-site grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className={cn(painel, "lg:col-span-5")}>
          <TituloSecao
            id="ecossistema-titulo"
            sobretitulo="Ecossistema"
            titulo="Personalidades por trás das marcas."
            descricao="Chefs, atletas e empresários que associaram o próprio nome a negócios que a Avant ajudou a estruturar e expandir."
          />
        </div>

        <ul className={cn(painel, "py-2 sm:py-2 lg:col-span-7")}>
          {personalidades.map((pessoa, indice) => (
            <Revelar
              as="li"
              key={pessoa.nome}
              atraso={indice * 0.05}
              className="border-border grid gap-2 border-b py-6 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
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

/** Painel translucido que segura o texto legivel sobre o mosaico. */
const painel =
  "border-border/60 bg-background/80 border p-6 backdrop-blur-md sm:p-10";

import { Autoavaliacao } from "@/components/diagnostico/autoavaliacao";
import { CabecalhoPagina } from "@/components/layout/cabecalho-pagina";
import { CtaFinal } from "@/components/sections/cta-final";
import { Metodo } from "@/components/sections/metodo";
import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { TituloSecao } from "@/components/ui/titulo-secao";
import { criterios } from "@/data/metodo";
import { criarMetadata } from "@/lib/seo";

export const metadata = criarMetadata({
  titulo: "Análise de franqueabilidade",
  descricao:
    "Seu negócio está pronto para virar uma franquia? Entenda o que é a análise de franqueabilidade, para quem ela é e faça uma autoavaliação antes de falar com um especialista.",
  caminho: "/diagnostico",
});

/*
 * "Para quem e" vem do proprio site da Avant (www2): sao os quatro perfis de
 * empresario que a analise atende.
 * TODO(cliente): o www2 anuncia a analise como gratuita. Confirmar se ainda
 * e — se for, vale dizer isso no titulo e no CTA.
 */
const perfis = [
  "Tem uma unidade lucrativa e quer montar uma franquia.",
  "Recebe com frequência a pergunta “vocês têm franquia?”.",
  "Já tentou franquear, mas não deu certo.",
  "Já contratou uma franqueadora e teve prejuízo.",
];

export default function DiagnosticoPage() {
  return (
    <>
      <CabecalhoPagina
        trilha={[{ nome: "Diagnóstico", caminho: "/diagnostico" }]}
        sobretitulo="Análise de franqueabilidade"
        titulo="Seu negócio está pronto para virar uma franquia?"
        descricao="Uma empresa de sucesso não está, automaticamente, pronta para ser franqueada. A análise de franqueabilidade avalia em detalhe se o negócio pode ser replicado com sucesso e operado por franqueados."
      >
        <LinkWhatsapp origem="diagnostico" local="diagnostico-topo">
          Quero descobrir se meu negócio pode virar franquia
        </LinkWhatsapp>
      </CabecalhoPagina>

      <section aria-labelledby="perfis-titulo" className="secao-clara secao">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <TituloSecao
            id="perfis-titulo"
            sobretitulo="Para quem é"
            serif
            titulo="A análise é para o empresário que…"
            className="lg:col-span-5"
          />
          <ul className="border-border border-t lg:col-span-6 lg:col-start-7">
            {perfis.map((perfil, indice) => (
              <li
                key={perfil}
                className="border-border grid grid-cols-[3rem_1fr] gap-4 border-b py-6"
              >
                <span
                  className="text-brand-text font-serif text-2xl"
                  aria-hidden="true"
                >
                  0{indice + 1}
                </span>
                <span className="text-lead">{perfil}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="autoavaliacao-titulo" className="secao">
        <div className="container-site">
          <TituloSecao
            id="autoavaliacao-titulo"
            sobretitulo="Autoavaliação"
            titulo="Antes da conversa, olhe para o seu negócio."
            descricao="Dez pontos que uma análise de franqueabilidade costuma observar. Responda com honestidade — o resultado vai junto na mensagem para o especialista."
          />
          <div className="mt-14">
            <Autoavaliacao criterios={criterios} />
          </div>
        </div>
      </section>

      <Metodo />

      <CtaFinal
        origem="diagnostico"
        titulo="Descubra o que falta para o seu negócio virar rede."
        descricao="Converse com um especialista da Avant e entenda, com clareza, o potencial de franqueabilidade da sua empresa."
      />
    </>
  );
}

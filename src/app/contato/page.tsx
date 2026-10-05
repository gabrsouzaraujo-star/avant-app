import { Mail, MapPin } from "lucide-react";
import { CabecalhoPagina } from "@/components/layout/cabecalho-pagina";
import { IconeWhatsapp, iconesRedes } from "@/components/ui/icones";
import { LinkRastreado } from "@/components/ui/link-rastreado";
import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { enderecoCompleto, site } from "@/data/site";
import { emailHref, type OrigemWhatsapp } from "@/lib/contato";
import { criarMetadata } from "@/lib/seo";

export const metadata = criarMetadata({
  titulo: "Contato",
  descricao: `Fale com um especialista da Avant pelo WhatsApp ${site.contato.telefoneExibicao} ou pelo e-mail ${site.contato.email}. ${enderecoCompleto}.`,
  caminho: "/contato",
});

/** Cada intencao abre o WhatsApp com a mensagem certa. */
const intencoes: {
  origem: OrigemWhatsapp;
  titulo: string;
  texto: string;
  cta: string;
}[] = [
  {
    origem: "diagnostico",
    titulo: "Quero franquear meu negócio",
    texto:
      "Para entender se a sua empresa está pronta para virar rede e o que falta.",
    cta: "Quero analisar minha empresa",
  },
  {
    origem: "cases",
    titulo: "Quero acelerar minha rede",
    texto:
      "Para marcas que já franqueiam e precisam de estrutura para crescer.",
    cta: "Conversar sobre expansão",
  },
  {
    origem: "contato",
    titulo: "Outro assunto",
    texto: "Imprensa, parcerias ou qualquer outra conversa com a Avant.",
    cta: "Falar com um especialista",
  },
];

export default function ContatoPage() {
  // Busca do endereco no Google Maps, montada a partir do proprio endereco.
  const mapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`;

  return (
    <>
      <CabecalhoPagina
        trilha={[{ nome: "Contato", caminho: "/contato" }]}
        sobretitulo="Contato"
        titulo="Fale com um especialista da Avant."
        descricao="O atendimento é feito pelo WhatsApp. Escolha o assunto e a conversa já começa com o contexto certo."
      />

      <section aria-label="Assuntos" className="container-site pb-20">
        <ul className="border-border grid border-t lg:grid-cols-3">
          {intencoes.map((intencao) => (
            <li
              key={intencao.origem}
              className="border-border flex flex-col border-b py-10 lg:border-b-0 lg:border-l lg:px-10 lg:first:border-l-0 lg:first:pl-0"
            >
              <h2 className="text-h3 font-medium">{intencao.titulo}</h2>
              <p className="text-text-muted mt-3 mb-8 leading-relaxed">
                {intencao.texto}
              </p>
              <LinkWhatsapp
                origem={intencao.origem}
                evento="contact_cta"
                local={`contato-${intencao.origem}`}
                variante={
                  intencao.origem === "diagnostico" ? "primario" : "secundario"
                }
                className="mt-auto self-start"
              >
                {intencao.cta}
              </LinkWhatsapp>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="canais-titulo" className="secao-clara secao">
        <div className="container-site">
          <h2 id="canais-titulo" className="text-h2 font-semibold">
            Outros canais
          </h2>

          <dl className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-text-muted flex items-center gap-2 text-sm">
                <IconeWhatsapp className="size-4" /> WhatsApp
              </dt>
              <dd className="mt-2">
                <LinkWhatsapp
                  origem="contato"
                  local="contato-canais"
                  variante="texto"
                  icone="nenhum"
                  className="text-lg"
                >
                  {site.contato.telefoneExibicao}
                </LinkWhatsapp>
              </dd>
            </div>
            <div>
              <dt className="text-text-muted flex items-center gap-2 text-sm">
                <Mail aria-hidden="true" className="size-4" /> E-mail
              </dt>
              <dd className="mt-2">
                <a
                  href={emailHref("Contato pelo site")}
                  className="inline-flex min-h-11 items-center text-lg break-all underline-offset-8 hover:underline"
                >
                  {site.contato.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-text-muted flex items-center gap-2 text-sm">
                <MapPin aria-hidden="true" className="size-4" /> Endereço
              </dt>
              <dd className="mt-2">
                <address className="text-lg not-italic">
                  {enderecoCompleto}
                </address>
                <a
                  href={mapa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-text mt-2 inline-flex min-h-11 items-center text-sm font-medium underline-offset-4 hover:underline"
                >
                  Ver no mapa
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-text-muted text-sm">Redes sociais</dt>
              <dd className="mt-2">
                <ul className="flex gap-2">
                  {site.redes.map((rede) => {
                    const Icone = iconesRedes[rede.icone];
                    return (
                      <li key={rede.nome}>
                        <LinkRastreado
                          href={rede.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          evento="social_click"
                          dados={{ rede: rede.nome, local: "contato" }}
                          aria-label={`${rede.nome} da Avant (abre em nova aba)`}
                          className="border-border hover:border-text grid size-12 place-items-center rounded-sm border transition-colors"
                        >
                          <Icone className="size-5" />
                        </LinkRastreado>
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}

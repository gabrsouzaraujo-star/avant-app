import { CabecalhoPagina } from "@/components/layout/cabecalho-pagina";
import { enderecoCompleto, site } from "@/data/site";
import { emailHref } from "@/lib/contato";
import { criarMetadata } from "@/lib/seo";

export const metadata = criarMetadata({
  titulo: "Política de privacidade",
  descricao: `Como o site da ${site.nome} trata dados pessoais, cookies e contatos feitos pelo WhatsApp.`,
  caminho: "/politica-de-privacidade",
});

/*
 * TODO(cliente/juridico): texto PRELIMINAR, escrito a partir do que o site
 * de fato faz hoje (sem formulario, contato so por WhatsApp, GTM opcional).
 * Precisa de validacao juridica e dos dados do controlador: razao social,
 * CNPJ e encarregado (DPO). Atualizar a data abaixo ao publicar a versao
 * revisada.
 */
const ATUALIZADA_EM = "outubro de 2026";

export default function PoliticaPage() {
  const controlador = site.razaoSocial || site.nomeCompleto;

  return (
    <>
      <CabecalhoPagina
        trilha={[
          {
            nome: "Política de privacidade",
            caminho: "/politica-de-privacidade",
          },
        ]}
        titulo="Política de privacidade"
        descricao={`Última atualização: ${ATUALIZADA_EM}.`}
      />

      <article className="container-site pb-24">
        <div className="text-text-muted [&_h2]:text-text [&_h2]:text-h3 [&_a]:text-brand-text max-w-3xl space-y-10 leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mb-3 [&_h2]:font-medium">
          <section>
            <h2>1. Quem somos</h2>
            <p>
              Este site pertence a {controlador}
              {site.cnpj && `, inscrita no CNPJ ${site.cnpj}`}, com endereço na{" "}
              {enderecoCompleto}. Esta política explica como tratamos dados
              pessoais, em conformidade com a Lei Geral de Proteção de Dados
              (Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2>2. Quais dados coletamos</h2>
            <p>
              O site não tem formulários e não pede cadastro. O contato acontece
              pelo WhatsApp: ao clicar em um botão, você é levado ao aplicativo
              com uma mensagem sugerida, que pode ser editada antes do envio. A
              partir daí, recebemos os dados que você decidir compartilhar na
              conversa — como nome, telefone e informações sobre a sua empresa.
            </p>
            <p className="mt-4">
              Podemos também coletar dados de navegação (páginas visitadas,
              cliques em botões, tipo de dispositivo) por meio de ferramentas de
              análise, como o Google Tag Manager e o Google Analytics, quando
              ativadas.
            </p>
          </section>

          <section>
            <h2>3. Para que usamos os dados</h2>
            <p>
              Para responder ao seu contato, apresentar nossos serviços,
              conduzir a análise de franqueabilidade quando solicitada e
              entender como o site é usado, a fim de melhorá-lo. Não vendemos
              dados pessoais.
            </p>
          </section>

          <section>
            <h2>4. Cookies</h2>
            <p>
              Ferramentas de análise podem gravar cookies no seu navegador para
              medir visitas. Você pode bloqueá-los ou apagá-los a qualquer
              momento nas configurações do navegador. Os vídeos do AvantCast
              usam o modo de privacidade aprimorada do YouTube e só carregam o
              player depois que você clica para assistir.
            </p>
          </section>

          <section>
            <h2>5. Compartilhamento</h2>
            <p>
              Os dados podem ser processados por serviços que viabilizam o
              funcionamento do site e do atendimento — como o WhatsApp, o
              YouTube e ferramentas do Google —, cada um com a sua própria
              política de privacidade.
            </p>
          </section>

          <section>
            <h2>6. Seus direitos</h2>
            <p>
              Você pode solicitar a confirmação do tratamento, o acesso, a
              correção ou a exclusão dos seus dados, além de revogar
              consentimentos, pelo e-mail{" "}
              <a href={emailHref("Privacidade e dados pessoais")}>
                {site.contato.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2>7. Alterações</h2>
            <p>
              Esta política pode ser atualizada. A data da versão vigente
              aparece no topo desta página.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}

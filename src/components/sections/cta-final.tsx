import { LinkWhatsapp } from "@/components/ui/link-whatsapp";
import { Sobretitulo } from "@/components/ui/titulo-secao";
import { site } from "@/data/site";
import { eventoPorOrigem, type OrigemWhatsapp } from "@/lib/contato";

type Props = {
  titulo?: React.ReactNode;
  descricao?: string;
  /** Define a mensagem pre-preenchida do CTA principal. */
  origem?: OrigemWhatsapp;
  complemento?: string;
};

/** Fechamento de pagina: uma frase forte e o proximo passo. */
export function CtaFinal({
  titulo = (
    <>
      O próximo passo da sua empresa pode ser{" "}
      <em className="text-brand-light">uma rede.</em>
    </>
  ),
  origem = "hero",
  complemento,
  descricao = "Uma conversa com um especialista da Avant para entender o momento do seu negócio e o que falta para ele crescer por meio de franquias.",
}: Props) {
  return (
    <section
      aria-labelledby="cta-final-titulo"
      className="secao border-border border-t"
    >
      <div className="container-site text-center">
        <Sobretitulo className="justify-center">Fale com a Avant</Sobretitulo>
        <h2
          id="cta-final-titulo"
          className="text-display mx-auto mt-7 max-w-5xl font-serif font-normal text-balance"
        >
          {titulo}
        </h2>
        <p className="text-text-muted text-lead mx-auto mt-7 max-w-2xl text-pretty">
          {descricao}
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkWhatsapp
            origem={origem}
            complemento={complemento}
            evento={eventoPorOrigem[origem]}
            local="cta-final"
            icone="whatsapp"
          >
            Quero analisar minha empresa
          </LinkWhatsapp>
          <LinkWhatsapp
            origem="contato"
            evento="contact_cta"
            local="cta-final"
            variante="secundario"
          >
            Falar com um especialista
          </LinkWhatsapp>
        </div>

        <p className="text-text-muted mt-6 text-sm">
          Atendimento pelo WhatsApp {site.contato.telefoneExibicao}
        </p>
      </div>
    </section>
  );
}

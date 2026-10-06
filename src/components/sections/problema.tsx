import { Revelar } from "@/components/ui/revelar";
import { TituloSecao } from "@/components/ui/titulo-secao";
import { VideoEmFoco } from "@/components/ui/video-em-foco";
import { videoPontoDePartida } from "@/data/site";

const riscos = [
  {
    titulo: "Expandir antes de padronizar",
    texto:
      "O que funciona na primeira unidade costuma depender do olhar do dono. Sem processos, cada nova loja vira uma versão diferente da marca.",
  },
  {
    titulo: "Uma margem que não comporta a rede",
    texto:
      "Royalties, fundo de marketing e retorno do franqueado precisam caber na conta. Quando não cabem, o problema aparece só depois da venda.",
  },
  {
    titulo: "O franqueado errado",
    texto:
      "Vender franquia para quem não tem o perfil da operação compromete a unidade, a reputação e o ritmo de toda a expansão.",
  },
];

/**
 * O problema que a Avant resolve, dito em voz de quem entende do assunto:
 * sucesso de uma unidade nao e o mesmo que franqueabilidade. Secao clara para
 * quebrar o ritmo escuro da home e marcar a virada de argumento.
 */
export function Problema() {
  return (
    <section aria-labelledby="problema-titulo" className="secao-clara secao">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        {/* O titulo ocupa a linha toda: assim o video fica ao lado do texto
            e da lista, e as duas colunas terminam juntas. */}
        <TituloSecao
          id="problema-titulo"
          sobretitulo="O ponto de partida"
          serif
          titulo="Ter sucesso não significa estar pronto para franquear."
          className="lg:col-span-12"
        />

        {/* A largura sai da altura que cabe na tela: o video so toca e ganha
            som quando aparece inteiro, entao ele nunca pode ser maior que o
            visor. */}
        <div className="lg:col-span-5">
          <VideoEmFoco
            apresentacao={videoPontoDePartida}
            className="mx-auto w-[min(100%,calc((100svh-9rem)*0.5625))] lg:mx-0 lg:w-[min(100%,calc((100svh-10rem)*0.5625),26rem)]"
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-lead text-pretty">
            Uma franquia não replica o sucesso de uma empresa — replica o modelo
            que produz esse sucesso. Transformar um negócio em rede exige provar
            que ele funciona sem o dono, nas mãos de outra pessoa e em outra
            cidade.
          </p>

          <ol className="border-border mt-12 border-t">
            {riscos.map((risco, indice) => (
              <Revelar
                as="li"
                key={risco.titulo}
                atraso={indice * 0.08}
                className="border-border grid grid-cols-[3rem_1fr] gap-4 border-b py-8"
              >
                <span
                  className="text-brand-text font-serif text-2xl"
                  aria-hidden="true"
                >
                  0{indice + 1}
                </span>
                <div>
                  <h3 className="text-h3 font-medium">{risco.titulo}</h3>
                  <p className="text-text-muted mt-2 leading-relaxed">
                    {risco.texto}
                  </p>
                </div>
              </Revelar>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

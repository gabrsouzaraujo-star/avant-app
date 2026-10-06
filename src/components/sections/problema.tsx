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
 *
 * No desktop a secao cabe inteira numa tela, abaixo do cabecalho fixo: o
 * video a esquerda, com a altura que sobra, e titulo, texto e os tres riscos
 * a direita. No celular a ordem e titulo, video e texto.
 */
export function Problema() {
  return (
    <section
      aria-labelledby="problema-titulo"
      className="secao-clara secao lg:flex lg:min-h-svh lg:items-center lg:pt-24 lg:pb-8"
    >
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-12">
        {/* `contents` no celular deixa titulo e texto entrarem na grade da
            secao, um de cada lado do video; no desktop viram uma coluna. */}
        <div className="contents lg:col-span-7 lg:col-start-6 lg:block">
          <TituloSecao
            id="problema-titulo"
            sobretitulo="O ponto de partida"
            serif
            compacto
            titulo="Ter sucesso não significa estar pronto para franquear."
            className="order-1"
          />

          <div className="order-3">
            <p className="text-lead text-pretty lg:mt-6">
              Uma franquia não replica o sucesso de uma empresa — replica o
              modelo que produz esse sucesso. Transformar um negócio em rede
              exige provar que ele funciona sem o dono, nas mãos de outra pessoa
              e em outra cidade.
            </p>

            <ol className="border-border mt-8 grid border-t lg:mt-10 lg:grid-cols-3 lg:gap-8 lg:border-t-0">
              {riscos.map((risco, indice) => (
                <Revelar
                  as="li"
                  key={risco.titulo}
                  atraso={indice * 0.08}
                  className="border-border grid grid-cols-[3rem_1fr] gap-4 border-b py-6 lg:block lg:border-t lg:border-b-0 lg:pt-5 lg:pb-0"
                >
                  <span
                    className="text-brand-text font-serif text-2xl lg:block"
                    aria-hidden="true"
                  >
                    0{indice + 1}
                  </span>
                  <div className="lg:mt-3">
                    <h3 className="text-lg font-medium">{risco.titulo}</h3>
                    <p className="text-text-muted mt-2 text-sm leading-relaxed">
                      {risco.texto}
                    </p>
                  </div>
                </Revelar>
              ))}
            </ol>
          </div>
        </div>

        {/* A largura sai da altura que cabe na tela: o video so toca e ganha
            som quando aparece inteiro, entao ele nunca pode ser maior que o
            visor. No desktop ocupa a altura toda que sobra abaixo do
            cabecalho. */}
        <div className="order-2 lg:order-first lg:col-span-5">
          <VideoEmFoco
            apresentacao={videoPontoDePartida}
            className="mx-auto w-[min(100%,calc((100svh-9rem)*0.5625))] lg:w-[min(100%,calc((100svh-8rem)*0.5625))]"
          />
        </div>
      </div>
    </section>
  );
}

import { Revelar } from "@/components/ui/revelar";
import { VideoEmFoco } from "@/components/ui/video-em-foco";
import type { Pilar } from "@/data/servicos";
import { videoSolucoes } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Cor de cada pilar: escuro, claro e dourado. Cada bloco redefine os tokens
 * no proprio escopo (`.secao-clara`, `.secao-dourada`), entao o conteudo e o
 * mesmo nos tres.
 */
const TONS = [
  "bg-surface border-border border",
  "secao-clara",
  "secao-dourada",
];

/**
 * Os tres pilares das solucoes em volta do video: Estruturar a esquerda,
 * Expandir a direita e o video no centro, entre os dois. Sustentar fecha a
 * secao numa faixa dourada de largura inteira — com dois servicos, ele
 * desequilibraria qualquer uma das laterais.
 *
 * No desktop o video fica preso no meio da tela enquanto as laterais rolam —
 * continua inteiro a vista, entao o som segue ligado durante a leitura (ver
 * `VideoEmFoco`). No celular vem o video e depois os pilares, na ordem.
 */
export function PilaresComVideo({ pilares }: { pilares: Pilar[] }) {
  const [esquerda, direita, ...faixas] = pilares;
  if (!esquerda || !direita) return null;

  return (
    <section
      aria-label="Pilares das soluções"
      className="secao pt-0 sm:pt-0 lg:pt-4"
    >
      <div className="container-site grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        {/* A largura sai da altura que cabe na tela: o video so toca e ganha
            som quando aparece inteiro. */}
        <div className="lg:col-start-2 lg:row-start-1">
          <VideoEmFoco
            apresentacao={videoSolucoes}
            className="mx-auto w-[min(100%,calc((100svh-9rem)*0.5625))] lg:sticky lg:top-24 lg:w-[min(26rem,calc((100svh-8rem)*0.5625))]"
          />
        </div>

        <PainelPilar
          pilar={esquerda}
          tom={TONS[0]}
          className="lg:col-start-1 lg:row-start-1"
        />

        <PainelPilar
          pilar={direita}
          tom={TONS[1]}
          className="lg:col-start-3 lg:row-start-1"
        />

        {faixas.map((pilar, indice) => (
          <PainelPilar
            key={pilar.id}
            pilar={pilar}
            tom={TONS[(indice + 2) % TONS.length]}
            largo
            className="lg:col-span-3"
          />
        ))}
      </div>
    </section>
  );
}

function PainelPilar({
  pilar,
  tom,
  largo = false,
  className,
}: {
  pilar: Pilar;
  tom: string;
  /** Faixa de largura inteira: apresentacao de um lado, servicos do outro. */
  largo?: boolean;
  className?: string;
}) {
  return (
    <article
      id={pilar.id}
      aria-labelledby={`${pilar.id}-titulo`}
      className={cn(
        "scroll-mt-24 p-6 sm:p-8 xl:p-10",
        largo && "lg:grid lg:grid-cols-[2fr_3fr] lg:gap-12",
        tom,
        className,
      )}
    >
      <div>
        <div className="flex items-baseline gap-4">
          <span
            className="text-brand-text font-serif text-5xl leading-none"
            aria-hidden="true"
          >
            {pilar.numero}
          </span>
          <h2 id={`${pilar.id}-titulo`} className="text-h2 font-serif">
            {pilar.titulo}
          </h2>
        </div>

        <p className="text-text-muted mt-5 leading-relaxed">{pilar.resumo}</p>
      </div>

      <ul
        className={cn(
          "border-border mt-8 border-t",
          largo && "lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-x-10 lg:border-t-0",
        )}
      >
        {pilar.servicos.map((servico, posicao) => (
          <Revelar
            as="li"
            key={servico.nome}
            atraso={posicao * 0.05}
            className={cn(
              "border-border border-b py-5 last:border-b-0 last:pb-0",
              largo && "lg:border-t lg:border-b-0 lg:pt-5 lg:pb-0",
            )}
          >
            <h3 className="font-medium">{servico.nome}</h3>
            <p className="text-text-muted mt-1.5 text-sm leading-relaxed">
              {servico.descricao}
            </p>
          </Revelar>
        ))}
      </ul>
    </article>
  );
}

import { BotaoLink } from "@/components/ui/botao";
import { Sobretitulo } from "@/components/ui/titulo-secao";

export const metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NaoEncontrada() {
  return (
    <section className="container-site flex min-h-[80dvh] flex-col justify-center pt-32 pb-24">
      <Sobretitulo>Erro 404</Sobretitulo>
      <h1 className="text-h1 mt-6 max-w-3xl font-serif text-balance">
        Esta página não existe — mas o caminho para a sua rede, sim.
      </h1>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <BotaoLink href="/">Voltar para o início</BotaoLink>
        <BotaoLink href="/cases" variante="secundario">
          Conhecer os cases
        </BotaoLink>
      </div>
    </section>
  );
}

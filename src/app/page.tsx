export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
      <p className="text-muted font-mono text-xs tracking-[0.2em] uppercase">
        Projeto em configuração
      </p>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        AVANT <span className="text-brand">FRANCHISING</span>
      </h1>

      <p className="text-muted mt-4 max-w-xl text-lg">
        Base do projeto criada e pronta para desenvolvimento. O escopo funcional
        ainda será definido com o cliente.
      </p>

      <div className="border-border bg-surface mt-10 rounded-lg border p-6">
        <h2 className="text-sm font-semibold">Stack configurada</h2>
        <ul className="text-muted mt-3 space-y-1.5 text-sm">
          <li>Next.js 16 — App Router</li>
          <li>React 19 + TypeScript (modo estrito)</li>
          <li>Tailwind CSS v4 com design tokens da marca</li>
          <li>ESLint + Prettier</li>
        </ul>
      </div>

      <p className="text-muted mt-8 text-sm">
        Próximo passo: definir os módulos do produto. Consulte o{" "}
        <code className="bg-surface rounded px-1.5 py-0.5 font-mono text-xs">
          README.md
        </code>{" "}
        para rodar o projeto localmente.
      </p>
    </main>
  );
}

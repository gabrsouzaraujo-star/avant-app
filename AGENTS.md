<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AVANT APP

Plataforma web da AVANT FRANCHISING (cliente). Ver [README.md](README.md) para
setup e scripts.

## Contexto

O escopo funcional ainda não foi definido com o cliente. Não invente módulos,
entidades de domínio ou fluxos de negócio sem confirmação — o repositório está
propositalmente enxuto.

## Convenções

- Idioma da interface e da documentação: **pt-BR**. Código, nomes de variáveis e
  mensagens de commit em português também, para acompanhar o restante do projeto.
- Estilo exclusivamente via Tailwind consumindo os design tokens de
  `src/app/globals.css`. Não usar cores literais (`bg-[#123456]`, `text-blue-500`)
  em componentes — a paleta da marca ainda é provisória e será trocada nos tokens.
- Usar o helper `cn()` de `src/lib/utils.ts` para compor classes condicionais.
- Alias de import: `@/*` aponta para `src/*`.

## Antes de finalizar uma alteração

```bash
npm run typecheck && npm run lint && npm run format:check
```

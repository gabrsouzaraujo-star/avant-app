<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AVANT APP

Plataforma web da AVANT FRANCHISING (cliente). Ver [README.md](README.md) para
setup e scripts.

## Contexto

Site institucional B2B de uma consultoria de franquias: conversão 100% via
WhatsApp, sem backend. Ver o [README.md](README.md) para páginas, dados e
pendências.

**Nunca invente** números, clientes, depoimentos, resultados ou relações
comerciais. As cinco marcas (Cão Véio, MedInfuse, Move Fitness, Don Kebab e
Shogun Team) são **cases**, e não redes próprias da Avant. O que faltar fica
vazio, com `TODO(cliente)`, e a seção não aparece.

## Convenções

- Idioma da interface e da documentação: **pt-BR**. Código, nomes de variáveis e
  mensagens de commit em português também, para acompanhar o restante do projeto.
- Estilo exclusivamente via Tailwind consumindo os design tokens de
  `src/app/globals.css`. Não usar cores literais (`bg-[#123456]`, `text-blue-500`)
  em componentes — a paleta da marca ainda é provisória e será trocada nos tokens.
- Usar o helper `cn()` de `src/lib/utils.ts` para compor classes condicionais.
- Conteúdo institucional só em `src/data/*`, nunca dentro de componente.
- Todo link de WhatsApp sai de `whatsappHref()` (`src/lib/contato.ts`) ou do
  componente `LinkWhatsapp`. Nunca escreva o número num componente.
- Alias de import: `@/*` aponta para `src/*`.

## Antes de finalizar uma alteração

```bash
npm run typecheck && npm run lint && npm run format:check
```

Para mudanças visíveis, rode também `npm run test:e2e` (com o dev server
parado: o teste faz o próprio build).

## Fluxo de alteração

O hot reload do Next.js pode corromper o cache `.next/` e devolver 500 ou
ENOENT. Não confiar nele: a cada alteração, reiniciar limpo.

1. **Matar** o dev server antes de editar
2. **Editar** os arquivos
3. **Limpar** o `.next`
4. **Subir** o server
5. **Verificar** HTTP 200 na rota alterada
6. **Commitar** — só depois do 200
7. **Avisar** em qual rota conferir

Nesta máquina o Node não está no PATH, então use o caminho completo:

```powershell
Get-CimInstance Win32_Process -Filter "Name='node.exe'" | Where-Object { $_.CommandLine -like '*next*dev*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
& "C:\Program Files\nodejs\npm.cmd" run dev
```

## Commits

Pequenos e frequentes, um por alteração verificada. Prefixo em inglês,
descrição em português: `feat:`, `fix:`, `style:`, `refactor:`, `chore:`,
`wip:`.

**Nunca `git add .` ou `git add -A` sem revisar o que entra.** O repositório é
público e `public/` guarda mídia pesada do cliente — cada versão de um binário
fica no histórico para sempre.

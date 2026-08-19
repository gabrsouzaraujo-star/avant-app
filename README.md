# AVANT APP

Plataforma web da **AVANT FRANCHISING**.

> **Status:** scaffold inicial. A stack está configurada e o projeto roda, mas o
> escopo funcional (módulos e telas) ainda será definido com o cliente.

## Stack

| Camada    | Tecnologia                           |
| --------- | ------------------------------------ |
| Framework | Next.js 16 (App Router)              |
| UI        | React 19 + TypeScript (modo estrito) |
| Estilo    | Tailwind CSS v4 (design tokens)      |
| Qualidade | ESLint + Prettier                    |

Banco de dados e autenticação ainda **não** foram escolhidos — serão definidos
junto com o escopo do produto.

## Requisitos

- Node.js 20 ou superior (validado com a v24)
- npm 10 ou superior

## Como rodar

```bash
npm install
```

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

A aplicação sobe em http://localhost:3000.

## Scripts

| Comando                | O que faz                                |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento              |
| `npm run build`        | Build de produção                        |
| `npm start`            | Sobe o build de produção                 |
| `npm run lint`         | ESLint                                   |
| `npm run typecheck`    | Checagem de tipos com o TypeScript       |
| `npm run format`       | Formata o código com o Prettier          |
| `npm run format:check` | Verifica formatação sem alterar arquivos |

## Estrutura

```
src/
  app/          Rotas, layouts e páginas (App Router)
    globals.css Design tokens e estilos globais
  lib/          Utilitários compartilhados
public/         Arquivos estáticos
```

## Identidade visual

As cores em `src/app/globals.css` são **provisórias**. Ao receber o manual de
marca da AVANT, basta substituir os valores das variáveis CSS em `:root` — a
interface inteira consome apenas esses tokens, então nenhuma outra alteração é
necessária.

## Variáveis de ambiente

Consulte [`.env.example`](.env.example). O arquivo `.env.local` contém segredos
e **não** deve ser versionado.

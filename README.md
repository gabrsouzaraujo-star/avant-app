# AVANT APP

Site institucional da **AVANT Franchising**, consultoria que transforma negócios
em redes de franquias.

> **Status:** v2 completa na branch `redesign`. A v1 (portal das redes com
> abertura em vídeo) continua em `prod-main`. Tudo o que depende do cliente está
> marcado com `TODO(cliente)` no código e resumido em
> [Pendências do cliente](#pendências-do-cliente).

## Objetivo

O visitante, um empresário com um negócio que funciona, precisa entender em
poucos segundos:

1. o que a Avant faz;
2. para quem faz;
3. que transformação entrega;
4. por que confiar;
5. qual é o próximo passo.

O próximo passo é sempre uma conversa no **WhatsApp**. Não há formulário, nem
backend, nem Typebot.

## Páginas

| Rota                              | Conteúdo                                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| `/`                               | Hero, marcas, problema, pilares, método, cases, diagnóstico, ecossistema, AvantCast e CTA |
| `/sobre`                          | Fundação, números, princípios e liderança                                                 |
| `/servicos`                       | Os três pilares (Estruturar, Expandir, Sustentar) e os 11 serviços                        |
| `/cases`, `/cases/[slug]`         | Cinco cases com narrativa editorial                                                       |
| `/diagnostico`                    | Análise de franqueabilidade, com autoavaliação que vai para a mensagem                    |
| `/conteudos`, `/conteudos/[slug]` | Os 15 vídeos reais do AvantCast, com player sob demanda                                   |
| `/contato`                        | WhatsApp por intenção, e-mail, endereço e redes                                           |
| `/politica-de-privacidade`        | Texto preliminar (LGPD) — precisa de validação jurídica                                   |

Todas as páginas são estáticas (SSG), sem Server Action, API Route ou banco. As
rotas da v1 (`/franquias/*`, `/avantcast`) e do WordPress antigo redirecionam
para as novas em `next.config.ts`.

## Stack

| Camada    | Tecnologia                                       |
| --------- | ------------------------------------------------ |
| Framework | Next.js 16 (App Router, Turbopack)               |
| UI        | React 19 + TypeScript (modo estrito)             |
| Estilo    | Tailwind CSS v4 — tokens em `@theme`, sem config |
| Motion    | framer-motion (`LazyMotion`), só no reveal       |
| Ícones    | lucide-react + SVGs próprios para marcas         |
| Testes    | Playwright                                       |
| Deploy    | Vercel                                           |

## Como rodar

Node.js 20 ou superior. Nesta máquina o Node não está no PATH — ver o
[AGENTS.md](AGENTS.md).

```bash
npm install
```

```bash
npm run dev
```

## Scripts

| Comando                | O que faz                                           |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento                         |
| `npm run build`        | Build de produção                                   |
| `npm start`            | Sobe o build de produção                            |
| `npm run lint`         | ESLint                                              |
| `npm run typecheck`    | Checagem de tipos                                   |
| `npm run format:check` | Verifica formatação                                 |
| `npm run test:e2e`     | Playwright: faz o build, sobe na porta 3100 e testa |

Na primeira vez, o Playwright precisa do navegador:

```bash
npx playwright install chromium
```

## Onde editar o conteúdo

Nenhum texto institucional mora em componente. Tudo fica em `src/data/`:

| Arquivo        | O que tem                                                                   |
| -------------- | --------------------------------------------------------------------------- |
| `site.ts`      | WhatsApp, e-mail, endereço, redes sociais, números, navegação, domínio, GTM |
| `cases.ts`     | Os cases: texto, capa, números com fonte, equipe, galeria e vídeos          |
| `marcas.ts`    | Marcas e personalidades, com categoria, fonte da prova e `publicar`         |
| `servicos.ts`  | Os três pilares e os serviços de cada um                                    |
| `metodo.ts`    | As seis etapas do processo e os dez critérios de franqueabilidade           |
| `conteudos.ts` | Episódios do AvantCast (ID do YouTube, resumo, convidados, tema)            |
| `pessoas.ts`   | Liderança da Avant e depoimentos                                            |

### Regra de ouro: nada inventado

- **Relação comercial só com prova.** Toda marca em `marcas.ts` tem `fonte`;
  sem confirmação, fica com `publicar: false` e não aparece.
- **Seção vazia some.** Sem depoimento, a seção de depoimentos não renderiza. O
  mesmo vale para desafio, atuação e números de cada case. Não há placeholder
  visível ao público.
- **Os depoimentos do site antigo são falsos** ("Carlos Mendes 02", "Boutique de
  Moda Eclética") e **nunca** devem ser reaproveitados.
- **As cinco marcas são cases**, e não redes próprias: o site não afirma
  sociedade nem propriedade.

### Adicionar um episódio do AvantCast

Acrescente um item em `src/data/conteudos.ts` com o `youtubeId`. A página
`/conteudos/<slug>`, o sitemap e o card são gerados sozinhos. Os vídeos
recentes do canal estão no feed público:
`https://www.youtube.com/feeds/videos.xml?channel_id=UCa7qPDobD7Hvvod7Roc6X8g`

### Adicionar um case

Acrescente um item em `src/data/cases.ts` e a marca correspondente em
`src/data/marcas.ts` (com `caseSlug` e `fonte`). Só um case pode ter
`principal: true`: é ele que ganha a vitrine editorial.

## Conversão

Todo CTA passa por `whatsappHref(origem, complemento?)` em
[`src/lib/contato.ts`](src/lib/contato.ts). O número vive **só** em `site.ts`, e
cada origem leva uma mensagem própria:

| Origem        | Onde aparece                              |
| ------------- | ----------------------------------------- |
| `hero`        | Hero, header, CTA final                   |
| `diagnostico` | Seção e página do diagnóstico             |
| `cases`       | Cases (com o nome do case na mensagem)    |
| `servicos`    | Página de soluções                        |
| `metodo`      | Seção do método                           |
| `conteudo`    | Episódios do AvantCast                    |
| `contato`     | Rodapé, contato, "falar com especialista" |

O componente `LinkWhatsapp` gera o link e, no clique, envia dois eventos ao
`dataLayer`: `whatsapp_click` e o evento da origem (`hero_cta`,
`diagnostic_cta`, `case_cta`, `contact_cta`, `content_cta`). Cliques em redes
sociais geram `social_click`. Tudo está centralizado em
[`src/lib/rastreamento.ts`](src/lib/rastreamento.ts).

A autoavaliação de `/diagnostico` não dá nota: ela leva os pontos marcados para
dentro da mensagem do WhatsApp.

## Analytics

O GTM é carregado inline no `<head>` do `layout.tsx`, com `preconnect`,
**somente** quando `NEXT_PUBLIC_GTM_ID` (ou `site.analytics.gtmId`) está
preenchido. O site atual não tem GTM nenhum: o ID precisa vir do cliente.

## SEO

- Metadata por página via `criarMetadata()`, em [`src/lib/seo.ts`](src/lib/seo.ts):
  title, description, canonical, Open Graph e Twitter/X.
- Imagem de compartilhamento gerada no build (`src/app/opengraph-image.tsx`).
- `sitemap.xml` e `robots.txt` gerados a partir dos dados. Os previews da Vercel
  não são indexados.
- JSON-LD: `Organization` + `ProfessionalService` e `WebSite` em todas as
  páginas, `BreadcrumbList` nas internas e `VideoObject` nos episódios.

## Design system

Tokens em [`src/app/globals.css`](src/app/globals.css), dentro de `@theme`:

- **Cor:** `--color-background`, `surface`, `text`, `text-muted`, `border`,
  `brand` (`#DA8E1D`), `brand-dark`, `brand-light`, `accent`, `success` e
  `error`.
- **Seção clara:** `.secao-clara` redefine os tokens no próprio escopo. O
  dourado de texto escurece ali para manter o contraste AA.
- **Tipografia:** Poppins no corpo e na interface; Instrument Serif só em
  títulos estratégicos e números grandes. Escala fluida: `text-display`, `h1`,
  `h2`, `h3`, `lead` e `numero`.
- **Forma:** cantos quase retos (2–8px), fios finos no lugar de cards e
  `container-site` com 1320px.

Não use cores literais em componentes, porque a paleta será confirmada com o
manual de marca.

## Pendências do cliente

| #   | Item                                                                                    | Onde trocar                                         |
| --- | --------------------------------------------------------------------------------------- | --------------------------------------------------- |
| 1   | Logo oficial em SVG (hoje há um placeholder tipográfico)                                | `src/components/ui/logo.tsx`, `opengraph-image.tsx` |
| 2   | ID do Google Tag Manager                                                                | `.env` / `site.ts`                                  |
| 3   | Domínio final                                                                           | `.env` / `site.ts`                                  |
| 4   | Razão social, CNPJ e CEP                                                                | `site.ts`                                           |
| 5   | Depoimentos reais sobre a Avant                                                         | `pessoas.ts`                                        |
| 6   | Desafio, atuação e resultados de cada case (só a MedInfuse tem atuação)                 | `cases.ts`                                          |
| 7   | Logos das marcas                                                                        | `marcas.ts`                                         |
| 8   | Confirmar as credenciais do Lucas (+200 marcas, 2.000 unidades), que hoje estão ocultas | `pessoas.ts`                                        |
| 9   | Relação com Alice Salazar/AS Store, Kings MMA e Farma&Farma                             | `marcas.ts`                                         |
| 10  | Se a análise de franqueabilidade continua gratuita                                      | `diagnostico/page.tsx`                              |
| 11  | Validação jurídica da política de privacidade                                           | `politica-de-privacidade/page.tsx`                  |
| 12  | Escopo real de cada serviço e se há método oficial                                      | `servicos.ts`, `metodo.ts`                          |
| 13  | Retrato de Ener Komagata e LinkedIn da empresa                                          | `pessoas.ts`, `site.ts`                             |
| 14  | Laranja `#FD9400` do logo atual × dourado `#DA8E1D` do site                             | `globals.css`                                       |

## Mídia

`public/` é versionado e o repositório é público: cada versão de um binário fica
no histórico para sempre.

- Vídeo longo (acima de ~15 MB) vai para o YouTube, não para `public/`.
- Texto que vem dentro de imagem (arte de rede social) é transcrito para HTML e
  a foto entra recortada. Texto em imagem não é indexado nem lido por leitor de
  tela.
- Imagens entram em `.webp`, já no tamanho de exibição.

Da v1 sobraram em `public/videos/` arquivos que o site novo não usa mais (a
abertura e os loops `rede-*.mp4`, cerca de 6 MB). Eles foram mantidos até a
decisão de removê-los.

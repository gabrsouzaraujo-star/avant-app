# AVANT APP

Plataforma web da **AVANT FRANCHISING**.

> **Status:** estrutura navegável, aguardando conteúdo. As páginas existem e a
> identidade visual está aplicada, mas os textos de negócio, números,
> depoimentos, fotos e vídeos ainda não foram fornecidos pelo cliente — os
> espaços aparecem marcados como "A preencher" na interface.

## Arquitetura

O site atende **dois públicos**:

1. **Candidatos a franqueado** das redes próprias (Cão Véio, MedInfuse e Move
   Fitness) — cada rede tem página própria em `/franquias/[slug]`.
2. **Empresários que querem franquear a própria marca** — levados à Análise de
   Franqueabilidade, o serviço de consultoria da AVANT.

A home funciona como portal: abertura de impacto, acesso às três redes e o
convite para a análise.

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
  app/                      Rotas e páginas (App Router)
    globals.css             Design tokens e acentos por rede
    franquias/[slug]/       Página de cada rede
  components/               Componentes de interface
  content/franquias.ts      Conteúdo das 3 redes — editar aqui
  lib/                      Utilitários compartilhados
public/                     Arquivos estáticos (vídeos e imagens)
```

## Como adicionar conteúdo

Tudo que é texto, número ou depoimento das redes vive em
[`src/content/franquias.ts`](src/content/franquias.ts) — não é preciso mexer em
componente. Para o vídeo de fundo de uma rede, coloque o arquivo em `public/` e
preencha o campo `video`:

```ts
video: { src: "/videos/cao-veio.mp4", poster: "/videos/cao-veio.jpg" }
```

O `poster` é obrigatório: é a imagem exibida antes do vídeo carregar, em
conexões lentas e para quem ativou "reduzir movimento" no sistema.

## Identidade visual

As cores em `src/app/globals.css` são **provisórias**. Ao receber o manual de
marca da AVANT, basta substituir os valores das variáveis CSS em `:root` — a
interface inteira consome apenas esses tokens, então nenhuma outra alteração é
necessária.

## Variáveis de ambiente

Consulte [`.env.example`](.env.example). O arquivo `.env.local` contém segredos
e **não** deve ser versionado.

## Abertura da home

Ao abrir o site, o vídeo institucional roda **uma vez** e congela no quadro
final com a assinatura da marca. O conteúdo (chamada e CTAs) entra depois.

Os arquivos ficam em `public/videos/` e são gerados a partir do master
`Avant Franquias(Abertura).mp4` (360x640, 7,8s):

| Arquivo                  | Uso                                           |
| ------------------------ | --------------------------------------------- |
| `abertura-mobile.mp4`    | Vertical original, telas < 768px              |
| `abertura-desktop.mp4`   | Recorte central 16:9, telas ≥ 768px           |
| `abertura-final-*.webp`  | Quadro final em alta — é o que fica congelado |
| `abertura-inicio-*.webp` | Poster, evita tela preta antes do play        |

Só um vídeo é baixado por dispositivo. O áudio foi removido: autoplay exige
mudo, então a faixa só ocuparia banda.

Para regerar depois de receber um master novo:

```bash
ffmpeg -i master.mp4 -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart public/videos/abertura-mobile.mp4
```

```bash
ffmpeg -i master.mp4 -an -vf "crop=360:202:0:219,hqdn3d=3:3:6:6,scale=960:540:flags=lanczos,unsharp=5:5:0.6:3:3:0.3" -c:v libx264 -crf 25 -preset slow -pix_fmt yuv420p -movflags +faststart public/videos/abertura-desktop.mp4
```

O recorte `crop=360:202:0:219` pega a faixa central do vídeo vertical, onde
fica a animação e a assinatura — **ajustar esses números se o master mudar de
resolução**.

## Vídeos das redes

Cada card em "Nossas Redes" tem o vídeo institucional da marca em looping,
com o pôster como fallback. Ficam em `public/videos/rede-<slug>.mp4`.

Os masters vieram do Instagram em 720x1280 e **têm texto queimado na parte de
baixo** (a partir de ~1,5s). Esse texto seria ilegível no tamanho do card e
brigaria com o rótulo que já existe por cima, então o recorte
`crop=720:510:0:235` descarta a faixa do texto e centraliza o logo:

```bash
ffmpeg -i master.mp4 -an -vf "crop=720:510:0:235" -c:v libx264 -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart public/videos/rede-<slug>.mp4
```

Os vídeos só baixam quando o card entra na tela.

## Galeria e vídeo institucional

Cada rede pode ter uma galeria de fotos (`galeria`) e um vídeo com fala
(`apresentacao`) em `src/content/franquias.ts`. Hoje só o Cão Véio tem.

O vídeo de apresentação **não** toca sozinho: tem áudio e conteúdo, então
espera o clique. Antes disso só o pôster está na página — o arquivo, de
alguns megabytes, nem começa a baixar.

As fotos do Cão Véio vieram de um mosaico 3x3 publicado no Instagram
(1350x1687). Foram fatiadas em 9 arquivos de 444x556, detectando as
divisórias pela variação de pixel por linha e coluna:

```bash
ffmpeg -i mosaico.jpg -vf "crop=444:556:3:3" -c:v libwebp -quality 84 public/imagens/cao-veio-1.webp
```

Os offsets seguem uma grade de 450x562 — repetir para as 9 células.

### Acessibilidade e robustez

- Com "reduzir movimento" ativado, o vídeo não toca: a pessoa vê direto o
  quadro final.
- Se o autoplay for bloqueado, a abertura encerra na hora — o conteúdo nunca
  fica refém de um vídeo que não vai tocar.
- Há um botão "Pular" durante a reprodução.
- Sem JavaScript, o quadro final e o conteúdo aparecem normalmente.

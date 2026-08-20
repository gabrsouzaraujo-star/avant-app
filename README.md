# AVANT APP

Plataforma web da **AVANT FRANCHISING**.

> **Status:** estrutura navegável, com conteúdo parcial. As três redes já têm
> textos, números e mídia. O que falta aparece marcado como "A preencher" na
> interface — hoje, os depoimentos de franqueados das três redes.

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
| `abertura-desktop.mp4`   | Recorte central 16:9 em 720p, telas ≥ 768px   |
| `abertura-final-*.webp`  | Quadro final em alta — é o que fica congelado |
| `abertura-inicio-*.webp` | Poster, evita tela preta antes do play        |

Só um vídeo é baixado por dispositivo. O áudio foi removido: autoplay exige
mudo, então a faixa só ocuparia banda.

Para regerar depois de receber um master novo:

```bash
ffmpeg -i master.mp4 -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart public/videos/abertura-mobile.mp4
```

```bash
ffmpeg -i master.mp4 -an -vf "crop=360:202:0:219,hqdn3d=0:0:5:9,scale=1280:720:flags=lanczos+accurate_rnd+full_chroma_int,unsharp=5:5:1.0:5:5:0.5" -c:v libx264 -crf 22 -preset veryslow -pix_fmt yuv420p -movflags +faststart public/videos/abertura-desktop.mp4
```

O recorte `crop=360:202:0:219` pega a faixa central do vídeo vertical, onde
fica a animação e a assinatura — **ajustar esses números se o master mudar de
resolução**.

O denoise é **só temporal** (`hqdn3d=0:0:5:9`): os dois primeiros valores,
que controlam o espacial, ficam em zero de propósito. Denoise espacial antes
de ampliar apaga o traço fino e deixa o resultado com cara de baixa
resolução — foi exatamente o que aconteceu na primeira versão.

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

Cada rede pode ter uma galeria de fotos (`galeria`) e uma lista de vídeos com
fala (`apresentacoes`) em `src/content/franquias.ts`. A Move Fitness tem
dois; as outras, um.

Esses vídeos **não** tocam sozinhos: têm áudio e conteúdo, então esperam o
clique. Antes disso só o pôster está na página — o arquivo, de alguns
megabytes, nem começa a baixar.

```bash
ffmpeg -i master.mp4 -vf "scale=480:854:flags=lanczos" -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -c:a aac -b:a 80k -movflags +faststart public/videos/<slug>-<nome>.mp4
```

As fotos do Cão Véio vieram de um mosaico 3x3 publicado no Instagram
(1350x1687). Foram fatiadas em 9 arquivos de 444x556, detectando as
divisórias pela variação de pixel por linha e coluna:

```bash
ffmpeg -i mosaico.jpg -vf "crop=444:556:3:3" -c:v libwebp -quality 84 public/imagens/cao-veio-1.webp
```

Os offsets seguem uma grade de 450x562 — repetir para as 9 células.

## Texto que vinha dentro de imagem

Boa parte do material do cliente é arte de rede social com o texto **dentro
do JPEG**. Em todos esses casos a regra aqui é a mesma: recortar a foto e
**transcrever o texto para HTML**. Texto dentro de imagem não é indexado, não
é lido por leitor de tela, não dá para copiar e fica ilegível no celular.

Os campos que existem para isso:

| Campo      | Uso                                                                  |
| ---------- | -------------------------------------------------------------------- |
| `equipe`   | Cards de perfil — retrato, cargo e bio                               |
| `destaque` | Marco da rede — retrato + mensagem (ex.: os 12 anos da Move Fitness) |
| `galeria`  | Fotos sem texto, só imagem                                           |

Ao recortar, **conferir se sobrou informação para trás**: a arte quase sempre
traz números e mensagens que precisam virar conteúdo, não ser descartados
junto com o corte.

## Equipe da rede

A seção "Quem está por trás da rede" vem de `equipe` em
`src/content/franquias.ts`. Hoje só a MedInfuse tem.

Os retratos foram recortados dos cards de carrossel do cliente, onde a
pessoa ocupa a metade direita e o texto a esquerda. **O texto não foi
mantido dentro da imagem** — foi transcrito para HTML, então reflui em
qualquer largura, é indexável e chega a leitores de tela:

```bash
ffmpeg -i card.jpg -vf "crop=490:653:590:130,scale=600:800:flags=lanczos" -c:v libwebp -quality 85 public/imagens/medinfuse-<pessoa>.webp
```

O card do Dr. Edir tem o texto avançando mais à direita e usa
`crop=440:587:640:130`. Ao receber cards novos, conferir o recorte antes:
o offset depende de onde o texto termina.

### Acessibilidade e robustez

- Com "reduzir movimento" ativado, o vídeo não toca: a pessoa vê direto o
  quadro final.
- Se o autoplay for bloqueado, a abertura encerra na hora — o conteúdo nunca
  fica refém de um vídeo que não vai tocar.
- Há um botão "Pular" durante a reprodução.
- Sem JavaScript, o quadro final e o conteúdo aparecem normalmente.

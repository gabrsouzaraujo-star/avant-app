# AVANT APP

Plataforma web da **AVANT FRANCHISING**.

> **Status:** estrutura navegável, com conteúdo parcial. As cinco redes já têm
> textos e mídia. O que falta aparece marcado como "A preencher" na interface —
> hoje, os depoimentos de franqueados das cinco redes e os números da Don Kebab
> e da Shogun Team.

## Arquitetura

O site atende **dois públicos**:

1. **Candidatos a franqueado** das redes próprias (Cão Véio, MedInfuse, Move
   Fitness, Don Kebab e Shogun Team) — cada rede tem página própria em
   `/franquias/[slug]`.
2. **Empresários que querem franquear a própria marca** — levados à Análise de
   Franqueabilidade, o serviço de consultoria da AVANT.

A home funciona como portal: abertura de impacto, acesso às redes e o convite
para a análise. O portal preenche sozinho os buracos da última linha da grade:
quando o último card fica sozinho ou em dupla, ele se estica pelo que sobrou —
nada a mexer ao entrar a próxima rede.

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
    avantcast/              Página do podcast
  components/               Componentes de interface
  content/franquias.ts      Conteúdo das 5 redes — editar aqui
  content/avantcast.ts      Conteúdo do podcast — editar aqui
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

Ao abrir o site a tela é dividida em duas faixas: **65% para o vídeo**
institucional e **35% para o retrato** do sócio-fundador. O vídeo roda **uma
vez** e congela no quadro final com a assinatura da marca; o conteúdo
(chamada e CTAs) entra depois.

Os arquivos de vídeo ficam em `public/videos/` e são gerados a partir do
master `Avant Franquias(Abertura).mp4` (360x640, 7,8s). O retrato é
`public/imagens/abertura-lucas-camargo.webp` (1188x1324).

| Arquivo                  | Uso                                             |
| ------------------------ | ----------------------------------------------- |
| `abertura-mobile.mp4`    | Vertical em 720x1280, faixas empilhadas         |
| `abertura-desktop.mp4`   | Quase quadrado em 1276x1440, faixas lado a lado |
| `abertura-final-*.webp`  | Quadro final em alta — é o que fica congelado   |
| `abertura-inicio-*.webp` | Poster, evita tela preta antes do play          |

Só um vídeo é baixado por dispositivo. O áudio foi removido: autoplay exige
mudo, então a faixa só ocuparia banda.

### A costura entre as duas faixas

A divisa não é uma linha: as duas imagens se fundem numa faixa de ~8% da
tela. Quem desvanece é **só o retrato**, por cima do vídeo. Se as duas
camadas se dissolvessem ao mesmo tempo, no meio da costura apareceria o
fundo preto por baixo das duas e a junção viraria uma faixa escura.

Por cima da costura ainda passam um `backdrop-blur` mascarado nas duas
pontas (o desfoque que mistura as bordas) e um brilho difuso na cor da
marca. O vídeo é desenhado até 72% da tela: a sobra fica escondida debaixo
da parte já opaca do retrato, então a borda dura dele nunca aparece.

### Onde entra a chamada

Quando a abertura termina, a chamada e os CTAs sobem centrados na página
inteira — não na faixa do vídeo. Lado a lado eles ficam **no alto**, acima da
assinatura e sem alcançar o retrato. Empilhado continuam **embaixo**: ali o
topo da tela é o rosto e o meio é a assinatura, então a base é o único
espaço livre.

O véu que dá contraste a eles escurece o topo e a base a 70% e deixa o meio
limpo — é o que mantém a assinatura e o rosto visíveis por baixo.

### A divisão só fica lado a lado em tela larga

A variante `paisagem` de `globals.css` (`min-aspect-ratio: 115/100`) decide o
arranjo, e o mesmo valor está em `TELA_DIVIDIDA` no componente — os dois
precisam andar juntos, porque é ele que escolhe o arquivo de vídeo.

| Proporção da tela | Arranjo                             | Vídeo     |
| ----------------- | ----------------------------------- | --------- |
| ≥ 115/100         | Vídeo à esquerda, retrato à direita | `desktop` |
| < 115/100         | Retrato em cima, vídeo embaixo      | `mobile`  |

Abaixo desse limite a faixa do vídeo ficaria mais alta que larga e o
`object-cover` começaria a comer as **laterais** da assinatura, que sangra
até as bordas do master. Empilhado isso não acontece: a faixa continua mais
larga que o vídeo vertical, e o corte volta a ser em cima e embaixo, onde só
há fundo escuro.

### O desktop é quase quadrado, com margem à direita

O recorte é `crop=360:480` — o dobro da altura real do recorte 3:2 que a
faixa inteira usava antes, porque agora ele ocupa 65% da largura e não
precisa mais ser panorâmico. É o ganho de nitidez mais barato que esta fonte
permite.

Depois do recorte vem `pad=425:480` + `fillborders=right=65:mode=smear`, que
estica a coluna da borda e cria 65px de margem à direita. Sem ela a
assinatura — que sangra até o limite do master — terminaria exatamente
debaixo da costura, e o "T" de AVANT e o "G" de FRANCHISING sumiam sob o
retrato.

**Limite conhecido:** o master tem 360x640, então o recorte usa 360x480
pixels reais esticados até 1276 — 3,5x. É o teto desta fonte. Com um
master em 1080x1920 o `deblock` e o `gradfun` podem sair e a nitidez sobe
muito.

Sobre a cadeia de filtros: `deblock` e `gradfun` limpam blocagem e banding
do master (ele veio a 224 kbps); `hqdn3d=0:0:5:9` é denoise **só temporal**
— os dois primeiros zeros desligam o espacial, que apagaria o traço fino
antes da ampliação; `cas` (contrast adaptive sharpen) afia sem criar halo,
e rendeu bordas mais firmes que `unsharp` sozinho.

O quadro congelado não sai de um frame só. Os últimos 30 quadros do master
são estáticos — diferem entre si apenas 0,13 em 255, ou seja, é o mesmo
desenho com ruído de compressão diferente por cima. Somando os 30
(`tmix=frames=30`) o ruído cai por volta de 5x e sobra mais sinal real para
ampliar. É por isso que a imagem que fica parada na tela é mais limpa que
qualquer quadro isolado do vídeo.

```bash
ffmpeg -i master.mp4 -vf "select='between(n,205,234)',crop=360:480:0:81,tmix=frames=30,select='eq(n,29)',pad=425:480:0:0,fillborders=right=65:mode=smear,gradfun=strength=0.8:radius=16,scale=1276:1440:flags=lanczos+accurate_rnd+full_chroma_int,unsharp=3:3:1.0:3:3:0.3,cas=strength=0.75" -frames:v 1 -c:v libwebp -quality 92 public/videos/abertura-final-desktop.webp
```

O poster sai do primeiro quadro, com a mesma geometria:

```bash
ffmpeg -i master.mp4 -vf "select='eq(n,0)',crop=360:480:0:81,pad=425:480:0:0,fillborders=right=65:mode=smear,gradfun=strength=1.2:radius=16,scale=1276:1440:flags=lanczos+accurate_rnd+full_chroma_int" -frames:v 1 -c:v libwebp -quality 80 public/videos/abertura-inicio-desktop.webp
```

Não adianta encodar acima de 1276 de largura: o master tem 425 pixels reais
depois da margem, então resolução maior só aumenta o arquivo sem acrescentar
detalhe.

Testados e descartados: `xbr` serrilhou as diagonais; `nnedi` exige um
arquivo de pesos que não acompanha o ffmpeg. Entre `lanczos`, `spline` e
`bicubic` a diferença foi imperceptível. Entre CRF 18 e 22 também — daí o
CRF 20, que dá margem para artefatos de movimento sem inflar o arquivo.

Para regerar depois de receber um master novo:

```bash
ffmpeg -i master.mp4 -an -vf "deblock=filter=weak:block=8,gradfun=strength=1.2:radius=16,hqdn3d=0:0:5:9,scale=720:1280:flags=lanczos+accurate_rnd+full_chroma_int,unsharp=3:3:0.7:3:3:0.2,cas=strength=0.65" -c:v libx264 -crf 23 -preset veryslow -pix_fmt yuv420p -movflags +faststart public/videos/abertura-mobile.mp4
```

```bash
ffmpeg -i master.mp4 -an -vf "crop=360:480:0:81,pad=425:480:0:0,fillborders=right=65:mode=smear,deblock=filter=weak:block=8,gradfun=strength=1.2:radius=16,hqdn3d=0:0:5:9,scale=1276:1440:flags=lanczos+accurate_rnd+full_chroma_int,unsharp=3:3:0.7:3:3:0.2,cas=strength=0.65" -c:v libx264 -crf 20 -preset veryslow -pix_fmt yuv420p -movflags +faststart public/videos/abertura-desktop.mp4
```

O recorte `crop=360:480:0:81` centraliza a assinatura, que no master ocupa
`y 254..389`. **Recalcular se o master mudar de resolução.**

O retrato entra sem tratamento, só convertido:

```bash
ffmpeg -i retrato.jpeg -c:v libwebp -quality 88 -compression_level 6 public/imagens/abertura-lucas-camargo.webp
```

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

Os masters da Don Kebab e da Shogun Team **não** têm texto queimado, então
ficam verticais, sem recorte — só reescalados para 540x960:

```bash
ffmpeg -ss <inicio> -t 12 -i master.mp4 -an -vf "scale=540:960:flags=lanczos" -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart public/videos/rede-<slug>.mp4
```

**Recortar um master vertical em paisagem custa caro.** O mesmo arquivo aparece
num card quase quadrado e na metade vertical do topo da página da rede; um
recorte 3:2 vira zoom duplo nos dois lugares, porque o `object-cover` corta de
novo por cima. Mantido vertical, o quadro chega inteiro na horizontal e o corte
fica só em cima e embaixo. O recorte acima existe pelo texto queimado, não por
preferência de formato.

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

## AVANTCAST

A página [`/avantcast`](src/app/avantcast/page.tsx) apresenta o podcast
institucional: texto do cliente, botão para o canal no YouTube e um carrossel
com fotos das gravações. O link no cabeçalho fica destacado — o podcast não é
uma rede, então não entra na sequência das três marcas.

Texto, link do canal e legendas das fotos vivem em
[`src/content/avantcast.ts`](src/content/avantcast.ts).

### O carrossel

Quem troca de slide é o **scroll do próprio navegador** (`scroll-snap`), não
um `transform`. Isso entrega de graça o arrasto com o dedo, o scroll lateral
no trackpad e o comportamento certo para quem navega pelo teclado. O
indicador escuta o evento de scroll, então o ponto aceso continua correto
mesmo quando o slide muda sem passar pelos botões.

O destino da navegação fica num `ref`, não no estado: com o scroll suave a
viagem dura algumas centenas de milissegundos, e dois cliques seguidos pelo
estado leriam o mesmo índice do render anterior — o segundo repetiria o
primeiro salto em vez de avançar.

Nenhuma das fotos é `lazy`: as próximas ficam fora da área visível do trilho
e o avanço automático chegaria nelas antes de o carregamento começar. As
fotos são convertidas com largura máxima de 1200px:

```bash
ffmpeg -i original.jpg -vf "scale='min(1200,iw)':-2:flags=lanczos" -c:v libwebp -quality 82 -compression_level 6 public/imagens/podcast-<nome>.webp
```

O avanço automático (5s) para quando o ponteiro está em cima do carrossel,
quando algo ali dentro recebe foco e para quem pediu "reduzir movimento".

## Don Kebab e Shogun Team

As duas redes entraram a partir de material de redes sociais — fotos e vídeos
das próprias marcas. O que vale registrar:

**As artes de campanha vieram com texto queimado.** Cinco das nove imagens da
Don Kebab eram posts com frase sobreposta. O texto foi transcrito para o
`destaque` da rede em `src/content/franquias.ts` (é HTML de verdade: reflui,
é indexável e chega a leitores de tela) e a foto entrou recortada, só a parte
limpa:

```bash
ffmpeg -i arte.jpg -vf "crop=1080:790:0:290,scale=800:-2:flags=lanczos" -c:v libwebp -quality 84 -compression_level 6 public/imagens/don-kebab-1.webp
```

O offset muda conforme a frase esteja no topo ou na base — conferir antes.

**Os acentos de marca saíram das fotos.** `--brand` de cada uma é o pixel mais
saturado do letreiro em neon (Don Kebab, `#f5d401`) e do logo da academia
(Shogun Team, `#f2760e`), medidos assim:

```bash
ffmpeg -i foto.jpg -vf "crop=600:260:380:60,scale=40:24" -f rawvideo -pix_fmt rgb24 - | xxd -p -c 3 | awk '{r=strtonum("0x" substr($0,1,2)); g=strtonum("0x" substr($0,3,2)); b=strtonum("0x" substr($0,5,2)); mx=(r>g?(r>b?r:b):(g>b?g:b)); mn=(r<g?(r<b?r:b):(g<b?g:b)); s=(mx>0)?(mx-mn)/mx:0; if(s*mx>best){best=s*mx; c=$0}} END{print "#" c}'
```

A média simples do recorte não serve: ela puxa para o fundo escuro e devolve
um marrom. O critério acima (saturação × brilho) isola o traço do neon.

**Números e depoimentos continuam vazios** nas duas. Não há fonte confiável
para unidades em operação ou investimento — o marcador "A preencher" fica na
página até o cliente enviar. O papel do Wanderlei Silva na Don Kebab está como
"Rosto da marca", que é o que o material sustenta; **confirmar se há
sociedade** antes de publicar.

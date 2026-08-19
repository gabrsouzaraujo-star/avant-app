/**
 * Dados das redes de franquia da AVANT.
 *
 * Procedencia do conteudo: textos e numeros de unidades vieram dos videos
 * institucionais enviados pelo cliente (publicados em 28/08/2025). Os demais
 * numeros vieram dos sites das proprias redes e estao marcados na propria
 * linha. Nada aqui foi inventado — o que falta continua vazio.
 */

export type Depoimento = {
  texto: string;
  autor: string;
  papel: string;
};

export type Foto = {
  src: string;
  alt: string;
};

/** Video institucional com fala, tocado sob demanda (nao e fundo). */
export type Apresentacao = {
  src: string;
  poster: string;
  titulo: string;
  chamada: string;
};

export type Numero = {
  valor: string;
  rotulo: string;
};

export type Franquia = {
  slug: string;
  nome: string;
  /** Segmento de atuacao, exibido como sobretitulo. */
  setor: string;
  /** Frase de impacto do topo da pagina. */
  chamada: string;
  /** Paragrafo de apresentacao do negocio. */
  descricao: string;
  /** Classe que redefine o token --brand, dando personalidade a cada rede. */
  tema: string;
  /** Socio/embaixador da marca. */
  parceiro?: { nome: string; papel: string };
  /** Video de fundo. `poster` e obrigatorio: e o que aparece antes do video
   *  carregar, em conexoes lentas e com prefers-reduced-motion. */
  video?: { src: string; poster: string };
  numeros: Numero[];
  depoimentos: Depoimento[];
  galeria: Foto[];
  apresentacao?: Apresentacao;
};

export const franquias: Franquia[] = [
  {
    slug: "cao-veio",
    nome: "Cão Véio",
    setor: "Gastronomia",
    chamada: "Fidelidade até o osso",
    descricao:
      "Restaurante e bar temático de rock and roll criado por Henrique Fogaça e Fernando Badauí. A rede iniciou sua expansão recentemente, levando atmosfera única e cardápio autoral para diferentes cidades do Brasil.",
    tema: "tema-cao-veio",
    parceiro: {
      nome: "Henrique Fogaça e Fernando Badauí",
      papel: "Criadores da marca",
    },
    video: {
      src: "/videos/rede-cao-veio.mp4",
      poster: "/videos/rede-cao-veio.webp",
    },
    numeros: [
      { valor: "16", rotulo: "Unidades na rede" },
      { valor: "10", rotulo: "Em operação" },
      { valor: "6", rotulo: "Em implantação" },
    ],
    depoimentos: [],
    galeria: [
      {
        src: "/imagens/cao-veio-1.webp",
        alt: "Hambúrguer artesanal servido no pão brioche",
      },
      { src: "/imagens/cao-veio-2.webp", alt: "Drink autoral em copo baixo" },
      {
        src: "/imagens/cao-veio-3.webp",
        alt: "Jalapeños recheados e gratinados",
      },
      {
        src: "/imagens/cao-veio-4.webp",
        alt: "Tostadas de camarão com microverdes",
      },
      {
        src: "/imagens/cao-veio-5.webp",
        alt: "Bolinhos empanados com maionese defumada",
      },
      { src: "/imagens/cao-veio-6.webp", alt: "Fritas com cheddar e bacon" },
      {
        src: "/imagens/cao-veio-7.webp",
        alt: "Drink servido em taça, no ambiente do bar",
      },
      {
        src: "/imagens/cao-veio-8.webp",
        alt: "Tartare com gema e batata chips",
      },
      {
        src: "/imagens/cao-veio-9.webp",
        alt: "Coquetel autoral em taça coupe",
      },
    ],
    apresentacao: {
      src: "/videos/cao-veio-convencao.mp4",
      poster: "/videos/cao-veio-convencao.webp",
      titulo: "A rede por dentro",
      chamada: "Bastidores da convenção de franqueados do Cão Véio.",
    },
  },
  {
    slug: "medinfuse",
    nome: "MedInfuse",
    setor: "Saúde e bem-estar",
    chamada: "Pioneira em terapias injetáveis e implantes subcutâneos",
    descricao:
      "Especializada em terapias injetáveis e implantes subcutâneos para emagrecimento, hipertrofia e longevidade. Une medicina integrativa, tecnologia de ponta e acompanhamento médico para promover saúde e bem-estar duradouros.",
    tema: "tema-medinfuse",
    parceiro: { nome: "Dr. Luiz Paulo", papel: "Mentor e sócio" },
    video: {
      src: "/videos/rede-medinfuse.mp4",
      poster: "/videos/rede-medinfuse.webp",
    },
    numeros: [
      { valor: "+20", rotulo: "Unidades no Brasil" },
      { valor: "2025", rotulo: "Início da expansão" },
      // Do site medinfuse.com.br/franqueado — confirmar antes de publicar.
      { valor: "+40", rotulo: "Protocolos validados" },
    ],
    depoimentos: [],
    galeria: [],
  },
  {
    slug: "move-fitness",
    nome: "Move Fitness",
    setor: "Fitness",
    chamada: "Movimente seu corpo. Evolua sua vida.",
    descricao:
      "Rede dedicada à saúde e ao bem-estar, com aulas que fortalecem o corpo, melhoram a postura e aumentam a flexibilidade. Ambiente especializado e equipe qualificada para promover consciência corporal e qualidade de vida em cada movimento.",
    tema: "tema-move-fitness",
    parceiro: { nome: "Alexandre Pato", papel: "Sócio da rede" },
    video: {
      src: "/videos/rede-move-fitness.mp4",
      poster: "/videos/rede-move-fitness.webp",
    },
    numeros: [
      { valor: "5", rotulo: "Unidades na rede" },
      // Do portal.avantfranquias.com.br/movefitness — confirmar antes de publicar.
      { valor: "34 meses", rotulo: "Payback médio" },
      { valor: "R$ 600 mil", rotulo: "Investimento inicial" },
    ],
    depoimentos: [],
    galeria: [],
  },
];

export function buscarFranquia(slug: string): Franquia | undefined {
  return franquias.find((franquia) => franquia.slug === slug);
}

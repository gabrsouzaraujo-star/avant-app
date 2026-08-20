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

/** Marco ou historia da rede: retrato + mensagem. */
export type Destaque = {
  titulo: string;
  chamada: string;
  paragrafos: string[];
  foto: string;
  alt: string;
};

/** Integrante da lideranca da rede. */
export type Pessoa = {
  nome: string;
  papel: string;
  bio: string;
  foto: string;
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
  equipe: Pessoa[];
  apresentacoes: Apresentacao[];
  destaque?: Destaque;
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
    equipe: [],
    apresentacoes: [
      {
        src: "/videos/cao-veio-convencao.mp4",
        poster: "/videos/cao-veio-convencao.webp",
        titulo: "Convenção de franqueados",
        chamada: "Bastidores do encontro da rede.",
      },
    ],
  },
  {
    slug: "medinfuse",
    nome: "MedInfuse",
    setor: "Saúde e bem-estar",
    chamada: "Pioneira em terapias injetáveis e implantes subcutâneos",
    descricao:
      "Especializada em terapias injetáveis e implantes subcutâneos para emagrecimento, hipertrofia e longevidade. Une medicina integrativa, tecnologia de ponta e acompanhamento médico para promover saúde e bem-estar duradouros.",
    tema: "tema-medinfuse",
    parceiro: {
      nome: "Dr. Edir Soccol Jr. e Dr. Felipe Balem",
      papel: "Fundadores da MedInfuse",
    },
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
    equipe: [
      {
        nome: "Dr. Edir Soccol Jr.",
        papel: "Fundador da MedInfuse",
        bio: "Médico há mais de 23 anos, especialista em Medicina Esportiva e Ortopedia, com pós-graduação em Endocrinologia e Nutrologia. Professor universitário, mentor de médicos e palestrante. Na MedInfuse, atua no desenvolvimento dos protocolos médicos e na evolução científica da rede.",
        foto: "/imagens/medinfuse-edir-soccol.webp",
      },
      {
        nome: "Dr. Felipe Balem",
        papel: "Fundador da MedInfuse",
        bio: "Médico há mais de 10 anos, dedica sua atuação ao desenvolvimento de estratégias que unem medicina baseada em evidências, inovação e padronização assistencial. Na MedInfuse, responde pelos protocolos clínicos e pela evolução científica da rede.",
        foto: "/imagens/medinfuse-felipe-balem.webp",
      },
      {
        nome: "Dr. Luiz Paulo",
        papel: "Sócio da MedInfuse",
        bio: "Presidente da Associação Brasileira de Hormonologia, realizou fellowship na Universidade de Harvard e foi o primeiro médico brasileiro treinado pela HTCA (Hormone Therapy Center of America). Professor, palestrante internacional e mentor da rede.",
        foto: "/imagens/medinfuse-luiz-paulo.webp",
      },
      {
        nome: "Pricila Pavani",
        papel: "Diretora executiva",
        bio: "Farmacêutica, especialista em Análises Clínicas e administradora, com ampla experiência em liderança estratégica, estruturação de processos e experiência do paciente. Na MedInfuse, transforma excelência operacional em um modelo replicável para toda a rede.",
        foto: "/imagens/medinfuse-pricila-pavani.webp",
      },
      {
        nome: "Lucas Camargo",
        papel: "Diretor de franquias",
        bio: "Sócio-fundador da AVANT Franquias, acumula mais de 15 anos de experiência no setor, com mais de 200 marcas desenvolvidas e 2.000 unidades comercializadas em quatro países. Na MedInfuse, lidera a estratégia de crescimento e expansão nacional da marca.",
        foto: "/imagens/medinfuse-lucas-camargo.webp",
      },
      {
        nome: "Vitor Shin-Ike",
        papel: "Diretor administrativo",
        bio: "Engenheiro, empresário, franqueado e franqueador, participou da estruturação de diversas redes de franquias em diferentes segmentos. Na MedInfuse, fortalece os processos, o suporte e o crescimento sustentável da rede.",
        foto: "/imagens/medinfuse-vitor-shin-ike.webp",
      },
    ],
    apresentacoes: [
      {
        src: "/videos/medinfuse-apresentacao.mp4",
        poster: "/videos/medinfuse-apresentacao.webp",
        titulo: "O modelo por dentro",
        chamada: "Lucas Camargo, diretor de franquias, sobre a rede.",
      },
    ],
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
      { valor: "12 anos", rotulo: "De história" },
      { valor: "5", rotulo: "Unidades na rede" },
      // Do portal.avantfranquias.com.br/movefitness — confirmar antes de publicar.
      { valor: "34 meses", rotulo: "Payback médio" },
      { valor: "R$ 600 mil", rotulo: "Investimento inicial" },
    ],
    depoimentos: [],
    galeria: [],
    equipe: [],
    destaque: {
      titulo: "12 anos de Move Fitness",
      chamada:
        "Há 12 anos, a Move Fitness cresce porque nunca caminhou sozinha.",
      paragrafos: [
        "Hoje, nossa gratidão é a todos que fazem parte dessa história: funcionários, professores, equipe, franqueados, parceiros e, principalmente, nossos alunos, que acreditam diariamente no nosso propósito.",
        "Obrigado por vestirem a camisa, por confiarem no nosso trabalho e por fazerem da Move Fitness muito mais do que uma academia: uma família.",
        "Que venham muitos anos de evolução, saúde e conquistas. Nosso muito obrigado a cada um de vocês!",
      ],
      foto: "/imagens/move-fitness-12-anos.webp",
      alt: "Dupla de uniforme Move Fitness na campanha de 12 anos da rede — à direita, Alexandre Pato",
    },
    apresentacoes: [
      {
        src: "/videos/move-fitness-apresentacao.mp4",
        poster: "/videos/move-fitness-apresentacao.webp",
        titulo: "A origem da rede",
        chamada: "Alexandre Pato apresenta a Move Fitness.",
      },
      {
        src: "/videos/move-fitness-bastidores.mp4",
        poster: "/videos/move-fitness-bastidores.webp",
        titulo: "Bastidores",
        chamada: "Conversa na sede da rede.",
      },
    ],
  },
];

export function buscarFranquia(slug: string): Franquia | undefined {
  return franquias.find((franquia) => franquia.slug === slug);
}

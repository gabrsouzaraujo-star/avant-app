/**
 * Cases da AVANT — negocios que a consultoria ajudou a estruturar, formatar
 * e/ou expandir por meio do franchising.
 *
 * Regras deste arquivo (decisao do cliente, 2026-10-05):
 * - As marcas sao CASES. Nao sao redes proprias nem empresas da AVANT: nada
 *   aqui afirma sociedade ou propriedade.
 * - Nenhum numero, resultado ou depoimento e inventado. Campo sem fonte fica
 *   vazio, e o componente correspondente simplesmente nao aparece.
 * - Cada numero carrega a propria fonte, exibida como nota no case.
 *
 * Os textos de apresentacao das redes e as contagens de unidades vieram dos
 * videos institucionais das proprias marcas (publicados em 28/08/2025).
 */

export type Foto = {
  src: string;
  alt: string;
};

export type Numero = {
  valor: string;
  rotulo: string;
};

export type Pessoa = {
  nome: string;
  papel: string;
  bio?: string;
  foto?: string;
};

/** Video com fala, tocado dentro da pagina quando a rolagem chega nele. */
export type Apresentacao = {
  src: string;
  poster: string;
  titulo: string;
  chamada: string;
};

/** Depoimento real — nome, cargo e empresa sao obrigatorios. */
export type Depoimento = {
  texto: string;
  autor: string;
  cargo: string;
  empresa: string;
  foto?: string;
};

export type Case = {
  slug: string;
  nome: string;
  segmento: string;
  /** Frase-assinatura da propria marca. */
  assinatura: string;
  /** Apresentacao do negocio, na voz da propria rede. */
  descricao: string;
  /** Imagem principal do case (capa nos cards e no topo da pagina). */
  capa: Foto & {
    largura: number;
    altura: number;
    /** `contain` para logos: a imagem aparece inteira, sem corte. */
    ajuste?: "contain";
    /**
     * Ponto da foto que nunca pode sair do recorte (object-position), para
     * quando a capa larga vira retrato nos cards. Ex.: "30% 50%".
     */
    foco?: string;
  };
  /** Pessoas publicas ligadas a marca, com o papel que o material sustenta. */
  personalidades: Pessoa[];
  /** Site oficial da marca, so quando confirmado. */
  site?: string;

  // ---- Narrativa do case. Vazio ate o cliente enviar. ----
  /** TODO(cliente): qual era o desafio do negocio antes da AVANT. */
  desafio?: string;
  /** TODO(cliente): o que a AVANT fez, frente a frente. */
  atuacao: string[];
  /** Numeros da rede, com a fonte logo abaixo. */
  numeros: Numero[];
  fonteNumeros?: string;
  depoimentos: Depoimento[];

  galeria: Foto[];
  /**
   * Fotos em volta dos videos. Com dois videos: seis fotos, duas em cada
   * lateral e duas no meio. Com um video: tres fotos, uma de um lado e duas
   * do outro.
   */
  mosaico?: Foto[];
  equipe: Pessoa[];
  apresentacoes: Apresentacao[];

  /** O case principal ganha a vitrine editorial na home e em /cases. */
  principal?: boolean;
};

const FONTE_VIDEOS =
  "Dados divulgados pela própria rede em vídeo institucional, agosto de 2025.";

export const cases: Case[] = [
  {
    slug: "medinfuse",
    nome: "MedInfuse",
    segmento: "Saúde e bem-estar",
    assinatura: "Pioneira em terapias injetáveis e implantes subcutâneos",
    descricao:
      "Especializada em terapias injetáveis e implantes subcutâneos para emagrecimento, hipertrofia e longevidade. Une medicina integrativa, tecnologia e acompanhamento médico em um modelo pensado para ser replicado por médicos franqueados.",
    capa: {
      src: "/imagens/medinfuse-recepcao.webp",
      alt: "Recepção de uma clínica MedInfuse, com o logo iluminado na parede e balcão de mármore",
      largura: 1600,
      altura: 900,
      // O logo fica a esquerda do centro: segura ele dentro do recorte.
      foco: "32% 50%",
    },
    personalidades: [
      { nome: "Dr. Edir Soccol Jr.", papel: "Fundador" },
      { nome: "Dr. Felipe Balem", papel: "Fundador" },
    ],
    site: "https://medinfuse.com.br",
    atuacao: [
      // Fato publicado pela propria rede: o socio-fundador da AVANT lidera a
      // expansao da MedInfuse. TODO(cliente): detalhar as frentes do projeto.
      "Lucas Camargo, sócio-fundador da AVANT, atua como diretor de franquias da MedInfuse e lidera a estratégia de crescimento e expansão nacional da marca.",
    ],
    numeros: [
      { valor: "+20", rotulo: "Unidades no Brasil" },
      { valor: "2025", rotulo: "Início da expansão em franquias" },
    ],
    fonteNumeros: FONTE_VIDEOS,
    depoimentos: [],
    galeria: [],
    // Fotos das clinicas em volta do video institucional.
    mosaico: [
      {
        src: "/imagens/medinfuse-recepcao-vertical.webp",
        alt: "Recepção MedInfuse com sofá, plantas e o logo iluminado ao fundo",
      },
      {
        src: "/imagens/medinfuse-letreiro.webp",
        alt: "Letreiro MedInfuse com a assinatura Emagrecimento, Saúde e Bem-estar",
      },
      {
        src: "/imagens/medinfuse-recepcao-marmore.webp",
        alt: "Recepção MedInfuse com parede de mármore e logo em relevo iluminado",
      },
    ],
    equipe: [
      {
        nome: "Dr. Edir Soccol Jr.",
        papel: "Fundador da MedInfuse",
        bio: "Médico há mais de 23 anos, especialista em Medicina Esportiva e Ortopedia, com pós-graduação em Endocrinologia e Nutrologia. Na MedInfuse, atua no desenvolvimento dos protocolos médicos e na evolução científica da rede.",
        foto: "/imagens/medinfuse-edir-soccol.webp",
      },
      {
        nome: "Dr. Felipe Balem",
        papel: "Fundador da MedInfuse",
        bio: "Médico há mais de 10 anos, une medicina baseada em evidências, inovação e padronização assistencial. Na MedInfuse, responde pelos protocolos clínicos e pela evolução científica da rede.",
        foto: "/imagens/medinfuse-felipe-balem.webp",
      },
      {
        nome: "Dr. Luiz Paulo",
        papel: "Sócio da MedInfuse",
        bio: "Presidente da Associação Brasileira de Hormonologia, realizou fellowship na Universidade de Harvard e foi o primeiro médico brasileiro treinado pela HTCA (Hormone Therapy Center of America). Mentor da rede.",
        foto: "/imagens/medinfuse-luiz-paulo.webp",
      },
      {
        nome: "Pricila Pavani",
        papel: "Diretora executiva",
        bio: "Farmacêutica e administradora, com experiência em liderança estratégica e estruturação de processos. Na MedInfuse, transforma excelência operacional em um modelo replicável para toda a rede.",
        foto: "/imagens/medinfuse-pricila-pavani.webp",
      },
      {
        nome: "Lucas Camargo",
        papel: "Diretor de franquias · Sócio-fundador da AVANT",
        bio: "Na MedInfuse, lidera a estratégia de crescimento e expansão nacional da marca.",
        foto: "/imagens/medinfuse-lucas-camargo.webp",
      },
      {
        nome: "Vitor Shin-Ike",
        papel: "Diretor administrativo",
        bio: "Engenheiro, empresário, franqueado e franqueador. Na MedInfuse, fortalece os processos, o suporte e o crescimento sustentável da rede.",
        foto: "/imagens/medinfuse-vitor-shin-ike.webp",
      },
    ],
    apresentacoes: [
      {
        src: "/videos/medinfuse-apresentacao.mp4",
        poster: "/videos/medinfuse-apresentacao.webp",
        titulo: "O modelo por dentro",
        chamada: "Lucas Camargo, diretor de franquias, apresenta a rede.",
      },
    ],
    principal: true,
  },
  {
    slug: "cao-veio",
    nome: "Cão Véio",
    segmento: "Gastronomia",
    assinatura: "Fidelidade até o osso",
    descricao:
      "Restaurante e bar temático de rock and roll criado por Henrique Fogaça e Fernando Badauí. A rede leva atmosfera própria e cardápio autoral para diferentes cidades do Brasil.",
    capa: {
      src: "/imagens/cao-veio-logo.webp",
      alt: "Logo do Cão Véio: cão de monóculo e gravata-borboleta sob a faixa com o nome da casa",
      largura: 485,
      altura: 632,
      // E um logo: mostrar inteiro, sem cortar.
      ajuste: "contain",
    },
    personalidades: [
      { nome: "Henrique Fogaça", papel: "Criador da marca" },
      { nome: "Fernando Badauí", papel: "Criador da marca" },
    ],
    site: "https://caoveio.com.br",
    atuacao: [],
    numeros: [
      { valor: "16", rotulo: "Unidades na rede" },
      { valor: "10", rotulo: "Em operação" },
      { valor: "6", rotulo: "Em implantação" },
    ],
    fonteNumeros: FONTE_VIDEOS,
    depoimentos: [],
    // Fotos oficiais das unidades Batel e Rua da Musica, em Curitiba,
    // recortadas dos mosaicos originais (3300x4096) publicados pela rede.
    galeria: [
      {
        src: "/imagens/cao-veio-salao.webp",
        alt: "Salão do Cão Véio com sofás de couro, painel de azulejos com cães e o logo na parede",
      },
      {
        src: "/imagens/cao-veio-sobremesa.webp",
        alt: "Sobremesa caramelizada com fatias de pêssego, cortada com colher",
      },
      {
        src: "/imagens/cao-veio-jalapenos.webp",
        alt: "Jalapeños gratinados servidos com nachos e molho",
      },
      {
        src: "/imagens/cao-veio-sanduiche.webp",
        alt: "Sanduíche de carne desfiada com agrião, mandioca frita e molhos da casa",
      },
      {
        src: "/imagens/cao-veio-tartare.webp",
        alt: "Steak tartare com gema mole e batata chips",
      },
      {
        src: "/imagens/cao-veio-sliders.webp",
        alt: "Minihambúrgueres servidos à luz de vela",
      },
      {
        src: "/imagens/cao-veio-bar.webp",
        alt: "Balcão do bar com prateleiras de destilados e banquetas de madeira",
      },
      {
        src: "/imagens/cao-veio-sorvete.webp",
        alt: "Sorvete com calda de chocolate e castanhas caramelizadas",
      },
      {
        src: "/imagens/cao-veio-letreiro.webp",
        alt: "Letreiro luminoso do Cão Véio na fachada, à noite",
      },
    ],
    // Fotos em volta dos dois videos: duas em cada lateral e duas no meio.
    mosaico: [
      {
        src: "/imagens/cao-veio-bartender.webp",
        alt: "Bartender preparando drinks no balcão",
      },
      {
        src: "/imagens/cao-veio-drinks.webp",
        alt: "Brinde com dois coquetéis no balcão",
      },
      {
        src: "/imagens/cao-veio-croquetes.webp",
        alt: "Croquetes servidos um a um em travessa preta",
      },
      {
        src: "/imagens/cao-veio-chope.webp",
        alt: "Chope tirado na caneca com o logo do Cão Véio",
      },
      {
        src: "/imagens/cao-veio-salao-cheio.webp",
        alt: "Salão lotado em noite de casa cheia",
      },
      {
        src: "/imagens/cao-veio-entrada.webp",
        alt: "Entrada de uma unidade, com o nome Cão Véio sobre a porta",
      },
    ],
    equipe: [],
    apresentacoes: [
      {
        src: "/videos/cao-veio-rua-da-musica.mp4",
        poster: "/videos/cao-veio-rua-da-musica.webp",
        titulo: "Unidade Rua da Música",
        chamada: "Um giro pela casa em Curitiba.",
      },
      {
        src: "/videos/cao-veio-convencao.mp4",
        poster: "/videos/cao-veio-convencao.webp",
        titulo: "Convenção de franqueados",
        chamada: "Bastidores do encontro da rede.",
      },
    ],
  },
  {
    slug: "move-fitness",
    nome: "Move Fitness",
    segmento: "Fitness",
    assinatura: "Movimente seu corpo. Evolua sua vida.",
    descricao:
      "Rede de estúdios dedicada à saúde e ao bem-estar, com aulas que fortalecem o corpo, melhoram a postura e aumentam a flexibilidade. Ambiente especializado e equipe qualificada em cada unidade.",
    capa: {
      src: "/imagens/move-fitness-12-anos.webp",
      alt: "Dupla com uniforme da Move Fitness na campanha de 12 anos da rede; à direita, Alexandre Pato",
      largura: 740,
      altura: 990,
    },
    personalidades: [{ nome: "Alexandre Pato", papel: "Sócio da rede" }],
    site: "https://movefitness.com.br",
    atuacao: [],
    numeros: [
      { valor: "12 anos", rotulo: "De história" },
      { valor: "5", rotulo: "Unidades na rede" },
    ],
    fonteNumeros: FONTE_VIDEOS,
    depoimentos: [],
    galeria: [],
    equipe: [],
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
  {
    slug: "don-kebab",
    nome: "Don Kebab",
    segmento: "Gastronomia",
    assinatura: "Arab street food",
    descricao:
      "Comida árabe de rua em casa própria: kebab no espeto vertical, wraps montados na hora, falafel e porções. Operação de balcão e fachada em neon — o modelo nasceu em Curitiba e chegou a São José dos Campos em 2025.",
    capa: {
      src: "/imagens/don-kebab-destaque.webp",
      alt: "Wanderlei Silva com uma sacola da rede, sob o letreiro em neon da Don Kebab",
      largura: 800,
      altura: 592,
    },
    personalidades: [
      // O material sustenta "rosto da marca" — nao afirmar sociedade.
      { nome: "Wanderlei Silva", papel: "Rosto da marca" },
    ],
    site: "https://donkebab.com",
    atuacao: [],
    numeros: [],
    depoimentos: [],
    galeria: [
      {
        src: "/imagens/don-kebab-4.webp",
        alt: "Três sócios diante do letreiro em neon da marca, dentro da loja",
      },
      {
        src: "/imagens/don-kebab-2.webp",
        alt: "Wrap recheado servido no papel",
      },
      {
        src: "/imagens/don-kebab-6.webp",
        alt: "Noite de operação na calçada, com a fachada iluminada ao fundo",
      },
      {
        src: "/imagens/don-kebab-5.webp",
        alt: "Equipe da unidade reunida sob o letreiro em neon",
      },
      {
        src: "/imagens/don-kebab-3.webp",
        alt: "Brinde com chope no salão da unidade",
      },
      {
        src: "/imagens/don-kebab-7.webp",
        alt: "Sócios em frente à unidade em noite de casa cheia",
      },
    ],
    equipe: [],
    apresentacoes: [
      {
        src: "/videos/don-kebab-apresentacao.mp4",
        poster: "/videos/don-kebab-apresentacao.webp",
        titulo: "O produto por dentro",
        chamada: "Do espeto ao balcão, a operação em movimento.",
      },
    ],
  },
  {
    slug: "shogun-team",
    nome: "Shogun Team",
    segmento: "Artes marciais",
    assinatura: "Do tatame ao ringue, estrutura de atleta",
    descricao:
      "Academia de artes marciais e MMA com estrutura completa: octógono, ringue oficial, tatame de competição, área de musculação e loja. A rede opera no Brasil e na Suíça.",
    capa: {
      src: "/imagens/shogun-team-logo.webp",
      alt: "Logo da Shogun Team: samurai de elmo com o nome da equipe e três estrelas",
      largura: 447,
      altura: 447,
      // Logo circular com fundo transparente: mostrar inteiro.
      ajuste: "contain",
    },
    personalidades: [
      { nome: "Maurício “Shogun” Rua", papel: "Rosto da marca" },
    ],
    atuacao: [],
    numeros: [],
    depoimentos: [],
    galeria: [
      {
        src: "/imagens/shogun-team-7.webp",
        alt: "Sala de espera com troféus, poltronas e o brasão na parede",
      },
      {
        src: "/imagens/shogun-team-5.webp",
        alt: "Área de musculação e condicionamento, ao lado do octógono",
      },
      {
        src: "/imagens/shogun-team-8.webp",
        alt: "Luvas de MMA e bandagens da equipe em exposição",
      },
      {
        src: "/imagens/shogun-team-9.webp",
        alt: "Camiseta pendurada na parede da academia",
      },
      {
        src: "/imagens/shogun-team-10.webp",
        alt: "Parede com camisetas de equipes e lutadores, algumas autografadas",
      },
      {
        // Horizontal: no celular a ultima foto ocupa a linha toda.
        src: "/imagens/shogun-team-3.webp",
        alt: "Ringue oficial com o logo da equipe no centro da lona",
      },
    ],
    // Fotos em volta dos dois videos: duas em cada lateral e duas no meio.
    mosaico: [
      {
        src: "/imagens/shogun-team-academia.webp",
        alt: "Área de sacos de pancada com as faixas laranja e o logo Shogun Team nas paredes",
      },
      {
        src: "/imagens/shogun-team-2.webp",
        alt: "Tatame amplo com o octógono ao fundo",
      },
      {
        src: "/imagens/shogun-team-equipamentos.webp",
        alt: "Luvas, caneleiras e aparadores com a marca Shogun Team expostos na loja",
      },
      {
        src: "/imagens/shogun-team-1.webp",
        alt: "Recepção da academia, com cinturões expostos e o logo Shogun Team",
      },
      {
        src: "/imagens/shogun-team-4.webp",
        alt: "Sala de treino com a grade do octógono junto às janelas",
      },
      {
        src: "/imagens/shogun-team-6.webp",
        alt: "Ringue visto do canto, com os sacos de pancada na parede",
      },
    ],
    equipe: [],
    apresentacoes: [
      {
        src: "/videos/shogun-team-franquia.mp4",
        poster: "/videos/shogun-team-franquia.webp",
        titulo: "O peso de uma marca mundial",
        chamada: "A franquia Shogun Team na sua cidade.",
      },
      {
        src: "/videos/shogun-team-equipamentos.mp4",
        poster: "/videos/shogun-team-equipamentos.webp",
        titulo: "Equipamentos da marca",
        chamada: "Sacos, luvas e protetores com a identidade da equipe.",
      },
    ],
  },
];

export const casePrincipal = cases.find((item) => item.principal) ?? cases[0];
export const casesSecundarios = cases.filter(
  (item) => item.slug !== casePrincipal.slug,
);

export function buscarCase(slug: string): Case | undefined {
  return cases.find((item) => item.slug === slug);
}

export const segmentos = [...new Set(cases.map((item) => item.segmento))];

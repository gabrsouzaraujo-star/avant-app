/**
 * Conteudos do AvantCast, o podcast institucional da AVANT.
 *
 * Todos os itens sao videos reais do canal @avantfranquias, lidos do feed
 * publico do YouTube em 2026-10-05:
 * https://www.youtube.com/feeds/videos.xml?channel_id=UCa7qPDobD7Hvvod7Roc6X8g
 *
 * Titulo e convidados vem do proprio video; o resumo e a descricao publicada
 * no YouTube, com erros de digitacao corrigidos. Para adicionar um episodio,
 * basta acrescentar um item — a pagina /conteudos/[slug] e gerada sozinha.
 */

export type Tema = "Expansão" | "Gestão de redes" | "Mercado" | "Cases";

export type Conteudo = {
  slug: string;
  youtubeId: string;
  titulo: string;
  resumo: string;
  /** Data de publicacao no YouTube (AAAA-MM-DD). */
  publicadoEm: string;
  tipo: "Episódio" | "Corte";
  tema: Tema;
  convidados: string[];
  /** A thumbnail do YouTube tem faixas pretas laterais: amplia para cortar. */
  thumbComFaixas?: boolean;
  /** Case relacionado, quando o episodio fala de uma marca com pagina. */
  caseSlug?: string;
  destaque?: boolean;
};

export const avantcast = {
  nome: "AvantCast",
  chamada: "Conversas sobre franchising, por quem constrói redes.",
  descricao:
    "O podcast institucional da Avant mergulha nos bastidores dos modelos de negócio de clientes e marcas — com quem estrutura, expande e opera redes de franquias.",
  canal: "https://www.youtube.com/@avantfranquias",
  bastidores: [
    {
      src: "/imagens/podcast-avantcast-estreia.webp",
      alt: "Estreia do AvantCast: três participantes à mesa, com a arte do programa na TV do estúdio",
      legenda: "A estreia do AvantCast",
    },
    {
      src: "/imagens/podcast-avantcast-convidados.webp",
      alt: "Convidados e equipe comemoram de braços erguidos ao fim de uma gravação do AvantCast",
      legenda: "Bastidores de uma gravação",
    },
    {
      src: "/imagens/podcast-flow.webp",
      alt: "Gravação no estúdio do Flow Podcast, com quatro participantes à mesa",
      legenda: "No estúdio do Flow Podcast",
    },
    {
      src: "/imagens/podcast-essa-e-minha-historia.webp",
      alt: "Gravação do podcast Essa é Minha História, com três participantes à mesa",
      legenda: "No Essa é Minha História",
    },
  ],
};

export const conteudos: Conteudo[] = [
  {
    slug: "avantcast-wanderlei-silva-geber-rajar-don-kebab",
    youtubeId: "3XFv9GB_V3A",
    titulo: "AvantCast com Wanderlei Silva e Geber Rajar — Franquia Don Kebab",
    resumo:
      "A lenda do MMA Wanderlei Silva e Geber Rajar, a lenda do kebab curitibano, falam sobre a rede de franquias Don Kebab: um modelo de negócio voltado a todos os públicos, que tem chamado a atenção de investidores que buscam franquias de alimentação.",
    publicadoEm: "2024-05-27",
    tipo: "Episódio",
    tema: "Cases",
    convidados: ["Wanderlei Silva", "Geber Rajar"],
    caseSlug: "don-kebab",
    destaque: true,
    thumbComFaixas: true,
  },
  {
    slug: "como-expandir-a-franquia-depois-da-formatacao",
    youtubeId: "rRo0cVbuKKw",
    titulo: "Como expandir a franquia depois da formatação",
    resumo:
      "Muitas franquias têm o material jurídico e o plano de negócios, mas para expandir é preciso inteligência, equipe comercial, marketing assertivo e capacidade de gestão. É sobre isso que Lucas Camargo, fundador da Avant, fala neste corte.",
    publicadoEm: "2023-12-20",
    tipo: "Corte",
    tema: "Expansão",
    convidados: ["Lucas Camargo"],
  },
  {
    slug: "por-que-as-celebridades-nos-procuram",
    youtubeId: "NX8X8ZLvFkM",
    titulo: "Por que as celebridades nos procuram",
    resumo:
      "Muitos artistas, atletas e pessoas conhecidas costumam ter negócios. Na hora de formatar e expandir uma rede, a credibilidade da empresa conta muito. Lucas Camargo fala sobre a relação com esses empresários e como a Avant trabalha com eles.",
    publicadoEm: "2023-12-20",
    tipo: "Corte",
    tema: "Cases",
    convidados: ["Lucas Camargo"],
  },
  {
    slug: "franquia-nao-e-mais-facil-e-mais-segura",
    youtubeId: "ehxUoOj-zJg",
    titulo: "Franquia não é mais fácil, é mais segura",
    resumo:
      "Franquia não é sinônimo de sucesso: ela não garante retorno nem lucro. Para dar certo, não basta seguir os padrões do franqueador — é preciso fazer a sua parte como empresário, trabalhar junto com o suporte e atuar com visão estratégica.",
    publicadoEm: "2023-12-20",
    tipo: "Corte",
    tema: "Mercado",
    convidados: [],
  },
  {
    slug: "voce-so-entende-quando-esta-do-outro-lado",
    youtubeId: "OHhJKE_B-wQ",
    titulo: "Você só entende quando está do outro lado",
    resumo:
      "Ener Komagata, sócio da Avant, franqueador da Sushiaki e franqueado da Chinainbox, fala sobre a diferença entre ser franqueado e franqueador — e por que conhecer os dois lados muda a visão sobre o negócio.",
    publicadoEm: "2023-12-20",
    tipo: "Corte",
    tema: "Gestão de redes",
    convidados: ["Ener Komagata"],
  },
  {
    slug: "somos-consultores-e-investidores-de-franquias",
    youtubeId: "uIX85IRdyow",
    titulo: "Somos consultores e investidores de franquias",
    resumo:
      "Lucas Camargo e Ener Komagata falam sobre os serviços da Avant e a forma de atuação com as marcas parceiras, em uma consultoria contínua que acompanha todas as frentes da empresa.",
    publicadoEm: "2023-12-20",
    tipo: "Corte",
    tema: "Gestão de redes",
    convidados: ["Lucas Camargo", "Ener Komagata"],
  },
  {
    slug: "gerar-valor-e-mais-importante-que-faturamento",
    youtubeId: "OnKQd_EuJzk",
    titulo:
      "Gerar valor é mais importante: faturamento e lucro são consequência",
    resumo:
      "Construir valor para uma marca é mais importante que faturamento e lucro, que são consequência da forma como o cliente enxerga a empresa e seus produtos. Ener e Lucas citam exemplos de empresas que construíram esse valor.",
    publicadoEm: "2023-12-21",
    tipo: "Corte",
    tema: "Gestão de redes",
    convidados: ["Lucas Camargo", "Ener Komagata"],
  },
  {
    slug: "suporte-para-as-franquias-parceiras",
    youtubeId: "RGc6n6GHNHQ",
    titulo: "O suporte para as franquias parceiras",
    resumo:
      "O suporte às marcas parceiras é fundamental para crescer junto. Quando a Avant enxerga o potencial de uma rede, investe no crescimento dela.",
    publicadoEm: "2023-12-20",
    tipo: "Corte",
    tema: "Gestão de redes",
    convidados: [],
  },
  {
    slug: "vale-a-pena-investir-em-franquia",
    youtubeId: "wm0UIE6VGcg",
    titulo: "Vale a pena investir em franquia em 2024?",
    resumo:
      "Uma leitura do momento do mercado brasileiro de franquias e do potencial de crescimento do setor.",
    publicadoEm: "2023-12-20",
    tipo: "Corte",
    tema: "Mercado",
    convidados: [],
  },
  {
    slug: "a-cultura-come-a-estrategia-no-cafe-da-manha",
    youtubeId: "2LJdE43ndF0",
    titulo: "A cultura come a estratégia no café da manhã",
    resumo:
      "A cultura de uma empresa é a soma de valores, objetivos e interesses de quem faz parte dela. Uma conversa sobre pessoas, cultura organizacional e crescimento.",
    publicadoEm: "2023-12-20",
    tipo: "Corte",
    tema: "Gestão de redes",
    convidados: [],
  },
  {
    slug: "o-kebab-que-encantou-wanderlei-silva",
    youtubeId: "J85e2rpvkYs",
    titulo: "O kebab que encantou Wanderlei Silva",
    resumo:
      "Wanderlei Silva, campeão mundial de MMA, conta como conheceu a rede de franquias Don Kebab.",
    publicadoEm: "2024-05-27",
    tipo: "Corte",
    tema: "Cases",
    convidados: ["Wanderlei Silva"],
    caseSlug: "don-kebab",
  },
  {
    slug: "o-crescimento-precisa-ser-planejado-farma-e-farma",
    youtubeId: "YveFKlcMe0E",
    titulo: "O crescimento precisa ser planejado — Farma&Farma",
    resumo:
      "“Crescer sim, mas com segurança.” Rinaldo Ferreira, diretor da rede Farma&Farma, fala sobre expandir com estudos, consultoria e acompanhamento do franqueado — e sobre o papel dos multifranqueados no crescimento da rede.",
    publicadoEm: "2024-06-15",
    tipo: "Corte",
    tema: "Expansão",
    convidados: ["Rinaldo Ferreira"],
  },
  {
    slug: "historia-da-rede-farma-e-farma",
    youtubeId: "BZWYnrxfZNE",
    titulo: "A história da rede de franquias Farma&Farma",
    resumo:
      "Rinaldo Ferreira, diretor da rede, conta como começou a Farma&Farma, criada para fortalecer pequenos e médios empresários do setor farmacêutico com suporte, negociação coletiva com fornecedores, treinamento e gestão.",
    publicadoEm: "2024-06-15",
    tipo: "Corte",
    tema: "Cases",
    convidados: ["Rinaldo Ferreira"],
  },
  {
    slug: "farmacia-nao-depende-so-de-comprar-bem",
    youtubeId: "4a3xf6SUUhg",
    titulo: "Farmácia não depende só de comprar bem — Farma&Farma",
    resumo:
      "Rinaldo Ferreira, diretor da rede Farma&Farma, fala sobre os diferenciais da rede e explica por que comprar bem não basta: é preciso entregar muito mais ao franqueado.",
    publicadoEm: "2024-06-16",
    tipo: "Corte",
    tema: "Gestão de redes",
    convidados: ["Rinaldo Ferreira"],
  },
  {
    slug: "unidade-de-sucesso-e-chave-para-a-expansao",
    youtubeId: "iRheQpkhEMY",
    titulo: "Uma unidade de sucesso é a chave para continuar a expansão",
    resumo:
      "Uma unidade de sucesso é fundamental para que a rede continue crescendo. O consultor Guilherme fala sobre o tema e a consultora Viviam completa com a importância dos fornecedores para a rede.",
    publicadoEm: "2024-06-16",
    tipo: "Corte",
    tema: "Expansão",
    convidados: ["Guilherme", "Viviam"],
  },
];

export const temas: Tema[] = [
  "Expansão",
  "Gestão de redes",
  "Mercado",
  "Cases",
];

export const conteudoDestaque =
  conteudos.find((item) => item.destaque) ?? conteudos[0];

export function buscarConteudo(slug: string): Conteudo | undefined {
  return conteudos.find((item) => item.slug === slug);
}

export function thumbnailYoutube(
  youtubeId: string,
  qualidade: "maxresdefault" | "hqdefault" = "maxresdefault",
) {
  return `https://i.ytimg.com/vi/${youtubeId}/${qualidade}.jpg`;
}

export function urlYoutube(youtubeId: string) {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

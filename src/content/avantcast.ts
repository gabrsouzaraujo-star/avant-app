/**
 * Conteudo da pagina do AVANTCAST, o podcast institucional da AVANT.
 *
 * O texto e o link do canal vieram do cliente. As legendas das fotos
 * descrevem o que se ve em cada uma — trocar sem medo, nada depende delas.
 */

export type FotoPodcast = {
  src: string;
  alt: string;
  legenda: string;
};

export const avantcast = {
  nome: "AVANTCAST",
  chamada: "O podcast institucional da AVANT",

  paragrafos: [
    "Aqui na Avant Franquias, levamos o universo dos podcasts para um novo patamar. Oferecemos conversas, onde mergulhamos nos bastidores dos modelos de negócios de nossos clientes e marcas.",
    "Como um podcast institucional da Avant, estamos comprometidos em oferecer insights valiosos e inspiradores para empreendedores e entusiastas do mundo dos negócios.",
  ],

  fecho:
    "Descubra histórias fascinantes, estratégias de sucesso e segredos do crescimento empresarial.",

  canal: "https://www.youtube.com/@avantfranquias/featured",

  fotos: [
    {
      src: "/imagens/podcast-avantcast-estreia.webp",
      alt: "Estreia do AVANTCAST: três participantes à mesa, com a arte do programa na TV do estúdio",
      legenda: "A estreia do AVANTCAST",
    },
    {
      src: "/imagens/podcast-flow.webp",
      alt: "Gravação no estúdio do Flow Podcast, com quatro participantes à mesa",
      legenda: "No estúdio do Flow Podcast",
    },
    {
      src: "/imagens/podcast-avantcast-convidados.webp",
      alt: "Convidados e equipe comemoram de braços erguidos ao fim de uma gravação do AVANTCAST",
      legenda: "Bastidores de mais uma gravação",
    },
    {
      src: "/imagens/podcast-essa-e-minha-historia.webp",
      alt: "Gravação do podcast Essa é Minha História, com três participantes à mesa",
      legenda: "Convidado no Essa é Minha História",
    },
  ] satisfies FotoPodcast[],
};

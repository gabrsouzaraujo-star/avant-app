/**
 * Dados das redes de franquia da AVANT.
 *
 * IMPORTANTE: os campos de midia, numeros e depoimentos estao propositalmente
 * vazios. Nenhum dado de negocio foi inventado — resultados, depoimentos e
 * parceiros so entram aqui depois que o cliente enviar o material.
 */

export type Depoimento = {
  texto: string;
  autor: string;
  papel: string;
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
  /** Socio/embaixador da marca. Preencher quando confirmado. */
  parceiro?: { nome: string; papel: string };
  /** Video de fundo do topo. `poster` e obrigatorio: e o que aparece antes
   *  do video carregar, em conexoes lentas e com prefers-reduced-motion. */
  video?: { src: string; poster: string };
  numeros: Numero[];
  depoimentos: Depoimento[];
};

export const franquias: Franquia[] = [
  {
    slug: "cao-veio",
    nome: "Cão Véio",
    setor: "Gastronomia",
    chamada: "A CHAMADA DE IMPACTO ENTRA AQUI",
    descricao:
      "Texto de apresentação da rede a ser fornecido pelo cliente. Deve explicar o conceito do negócio, o diferencial competitivo e por que a marca funciona como franquia.",
    tema: "tema-cao-veio",
    parceiro: { nome: "Henrique Fogaça", papel: "Sócio e chef" },
    numeros: [],
    depoimentos: [],
  },
  {
    slug: "medinfuse",
    nome: "MedInfuse",
    setor: "Saúde e bem-estar",
    chamada: "A CHAMADA DE IMPACTO ENTRA AQUI",
    descricao:
      "Texto de apresentação da rede a ser fornecido pelo cliente. Deve explicar o conceito do negócio, o diferencial competitivo e por que a marca funciona como franquia.",
    tema: "tema-medinfuse",
    numeros: [],
    depoimentos: [],
  },
  {
    slug: "move-fitness",
    nome: "Move Fitness",
    setor: "Fitness",
    chamada: "A CHAMADA DE IMPACTO ENTRA AQUI",
    descricao:
      "Texto de apresentação da rede a ser fornecido pelo cliente. Deve explicar o conceito do negócio, o diferencial competitivo e por que a marca funciona como franquia.",
    tema: "tema-move-fitness",
    numeros: [],
    depoimentos: [],
  },
];

export function buscarFranquia(slug: string): Franquia | undefined {
  return franquias.find((franquia) => franquia.slug === slug);
}

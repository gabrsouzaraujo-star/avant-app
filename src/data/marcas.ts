/**
 * Ecossistema da AVANT: marcas, personalidades e parceiros.
 *
 * A regra que este arquivo protege: nenhuma relacao comercial aparece no site
 * sem prova. Cada entrada tem `fonte` (de onde vem a evidencia) e
 * `publicar`. Os componentes so exibem o que tem `publicar: true` — o resto
 * fica registrado aqui, pronto para entrar quando o cliente confirmar.
 *
 * Categorias possiveis. So "case" e "personalidade" estao comprovadas hoje;
 * as demais existem para quando chegarem dados reais.
 */

export type Categoria =
  "case" | "cliente" | "parceiro" | "fornecedor" | "personalidade" | "midia";

export const rotulosCategoria: Record<Categoria, string> = {
  case: "Case",
  cliente: "Cliente",
  parceiro: "Parceiro estratégico",
  fornecedor: "Fornecedor",
  personalidade: "Personalidade",
  midia: "Na mídia",
};

export type Marca = {
  nome: string;
  categoria: Categoria;
  /** TODO(cliente): logos oficiais em SVG ou PNG transparente. */
  logo?: string;
  /** Somente URLs encontradas em material oficial — nunca deduzidas. */
  url?: string;
  descricao?: string;
  segmento?: string;
  /** Slug do case, quando existe pagina propria. */
  caseSlug?: string;
  /** Marcas ligadas (para personalidades). */
  ligadoA?: string[];
  /** De onde vem a prova da relacao. Obrigatorio. */
  fonte: string;
  publicar: boolean;
};

const WWW2 =
  "www2.avantfranquias.com.br — “Já escalamos marcas como Cão Véio e Jamile, do Chef Henrique Fogaça, MedInfuse, Move Fitness e muitas outras”";
const CONFIRMACAO_2026_10 = "Confirmado pelo cliente em 2026-10-05";

export const marcas: Marca[] = [
  // ---------- Cases ----------
  {
    nome: "MedInfuse",
    categoria: "case",
    segmento: "Saúde e bem-estar",
    caseSlug: "medinfuse",
    url: "https://medinfuse.com.br",
    fonte: WWW2,
    publicar: true,
  },
  {
    nome: "Cão Véio",
    categoria: "case",
    segmento: "Gastronomia",
    caseSlug: "cao-veio",
    url: "https://caoveio.com.br",
    fonte: WWW2,
    publicar: true,
  },
  {
    nome: "Move Fitness",
    categoria: "case",
    segmento: "Fitness",
    caseSlug: "move-fitness",
    url: "https://movefitness.com.br",
    fonte: WWW2,
    publicar: true,
  },
  {
    nome: "Don Kebab",
    categoria: "case",
    segmento: "Gastronomia",
    caseSlug: "don-kebab",
    url: "https://donkebab.com",
    fonte: CONFIRMACAO_2026_10,
    publicar: true,
  },
  {
    nome: "Shogun Team",
    categoria: "case",
    segmento: "Artes marciais",
    caseSlug: "shogun-team",
    fonte: CONFIRMACAO_2026_10,
    publicar: true,
  },
  {
    nome: "Jamile",
    categoria: "case",
    segmento: "Gastronomia",
    descricao: "Restaurante do Chef Henrique Fogaça.",
    fonte: WWW2,
    publicar: true,
  },

  // ---------- Personalidades ----------
  {
    nome: "Henrique Fogaça",
    categoria: "personalidade",
    descricao: "Chef",
    ligadoA: ["Cão Véio", "Jamile"],
    fonte: WWW2,
    publicar: true,
  },
  {
    nome: "Alexandre Pato",
    categoria: "personalidade",
    descricao: "Sócio da Move Fitness",
    ligadoA: ["Move Fitness"],
    fonte: "Vídeo institucional da Move Fitness + www2.avantfranquias.com.br",
    publicar: true,
  },
  {
    nome: "Wanderlei Silva",
    categoria: "personalidade",
    descricao: "Campeão mundial de MMA",
    ligadoA: ["Don Kebab"],
    fonte: "AvantCast com Wanderlei Silva e Geber Rajar (YouTube, 2024-05-27)",
    publicar: true,
  },
  {
    nome: "Maurício “Shogun” Rua",
    categoria: "personalidade",
    descricao: "Lutador de MMA",
    ligadoA: ["Shogun Team"],
    fonte: "www2.avantfranquias.com.br + " + CONFIRMACAO_2026_10,
    publicar: true,
  },

  // ---------- Aguardando confirmacao ----------
  {
    // Citada no www2 entre as personalidades atendidas, sem dizer como.
    nome: "Alice Salazar",
    categoria: "personalidade",
    ligadoA: ["AS Store"],
    fonte:
      "www2.avantfranquias.com.br (lista de personalidades, sem detalhar a relação)",
    publicar: false,
  },
  {
    nome: "AS Store",
    categoria: "cliente",
    fonte: "Logo exibido no site atual, sem relação declarada",
    publicar: false,
  },
  {
    nome: "Kings MMA",
    categoria: "cliente",
    fonte: "Logo exibido no site atual, sem relação declarada",
    publicar: false,
  },
  {
    // A AVANT capta franqueados para a rede (descricoes dos videos do
    // AvantCast), mas a natureza do contrato nao esta documentada.
    nome: "Farma&Farma",
    categoria: "cliente",
    segmento: "Farmácias",
    fonte: "Quatro vídeos do AvantCast (YouTube, 2024-06)",
    publicar: false,
  },
];

export function marcasPublicadas(categoria?: Categoria) {
  return marcas.filter(
    (marca) => marca.publicar && (!categoria || marca.categoria === categoria),
  );
}

/**
 * Fotos de fundo da secao Ecossistema: bastidores da Avant com as redes,
 * enviadas pelo cliente. Sao decorativas (nao afirmam relacao comercial com
 * nenhuma marca que apareca nelas) e ja estao recortadas em quadrado.
 */
export const fotosEcossistema = Array.from(
  { length: 20 },
  (_, indice) =>
    `/imagens/ecossistema-${String(indice + 1).padStart(2, "0")}.webp`,
);

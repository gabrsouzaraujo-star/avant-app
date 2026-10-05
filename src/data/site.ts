/**
 * Dados institucionais da AVANT — a unica fonte para contato, numeros e
 * redes sociais. Nenhum componente deve repetir telefone, e-mail ou link de
 * rede social: todos leem daqui.
 *
 * Procedencia: contato, endereco, redes sociais e numeros vieram do site
 * atual (www.avantfranquias.com.br), conferidos em 2026-10-05.
 */

export const site = {
  nome: "AVANT Franchising",
  nomeCompleto: "Avant Consultoria e Franchising",
  // TODO(cliente): razao social e CNPJ — usados no rodape e no schema.
  razaoSocial: "",
  cnpj: "",

  // TODO(cliente): confirmar o dominio final. Tudo que gera URL absoluta
  // (canonical, sitemap, Open Graph, JSON-LD) le daqui ou da variavel de
  // ambiente, que vence quando definida.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.avantfranquias.com.br"
  ).replace(/\/$/, ""),

  descricao:
    "Consultoria especializada em transformar negócios em redes de franquias: análise de franqueabilidade, formatação, expansão e gestão de redes.",

  fundacao: 2010,

  contato: {
    /** Somente digitos, com DDI e DDD — e o formato que o wa.me aceita. */
    whatsapp: "5541996454705",
    telefoneExibicao: "(41) 99645-4705",
    email: "lucas@avantfranquias.com.br",
    endereco: {
      logradouro: "Rua Buenos Aires, 441",
      bairro: "Batel",
      cidade: "Curitiba",
      uf: "PR",
      pais: "BR",
      // TODO(cliente): CEP nao aparece em nenhum material.
      cep: "",
    },
  },

  redes: [
    {
      nome: "Instagram",
      url: "https://www.instagram.com/avantfranquias/",
      icone: "instagram",
    },
    {
      nome: "YouTube",
      url: "https://www.youtube.com/@avantfranquias",
      icone: "youtube",
    },
    {
      nome: "Facebook",
      url: "https://www.facebook.com/avantfranquias/",
      icone: "facebook",
    },
    // TODO(cliente): LinkedIn da empresa nao foi encontrado.
  ],

  /**
   * Numeros de autoridade, exatamente como a AVANT os publica hoje.
   * "Desde 2010" substitui o "+14 anos" do site atual, que ficou defasado
   * (14 anos era a conta de 2024) e voltaria a envelhecer todo ano.
   */
  numeros: [
    {
      valor: 2010,
      prefixo: "",
      sufixo: "",
      rotulo: "Início da atuação no franchising",
      // Ano nao se conta de 0 a 2010 — fica parado.
      animar: false,
    },
    {
      valor: 50,
      prefixo: "+R$",
      sufixo: "M",
      rotulo: "Em negócios concretizados",
      animar: true,
    },
    {
      valor: 100,
      prefixo: "+",
      sufixo: "",
      rotulo: "Marcas impactadas",
      animar: true,
    },
    {
      valor: 35,
      prefixo: "+",
      sufixo: "",
      rotulo: "Consultores especialistas",
      animar: true,
    },
  ],

  analytics: {
    // TODO(cliente): ID do container do Google Tag Manager (GTM-XXXXXXX).
    // Vazio, o script nao e carregado e os eventos ficam so no dataLayer local.
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  },
} as const;

export type RedeSocial = (typeof site.redes)[number];

export const enderecoCompleto = `${site.contato.endereco.logradouro}, ${site.contato.endereco.bairro} – ${site.contato.endereco.cidade}, ${site.contato.endereco.uf}`;

/** Navegacao principal — header, menu mobile e rodape leem a mesma lista. */
export const navegacao = [
  { rotulo: "Sobre", href: "/sobre" },
  { rotulo: "Soluções", href: "/servicos" },
  { rotulo: "Cases", href: "/cases" },
  { rotulo: "Diagnóstico", href: "/diagnostico" },
  { rotulo: "Conteúdo", href: "/conteudos" },
  { rotulo: "Contato", href: "/contato" },
] as const;

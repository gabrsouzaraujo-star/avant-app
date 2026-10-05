import type { Metadata } from "next";
import { site } from "@/data/site";

type OpcoesMetadata = {
  titulo?: string;
  descricao: string;
  /** Caminho da pagina, comecando com "/". Vira o canonical. */
  caminho: string;
  imagem?: string;
  tipo?: "website" | "article" | "video.other";
};

/**
 * Metadata completa de uma pagina: title, description, canonical, Open Graph
 * e Twitter/X. A imagem padrao de compartilhamento e o `opengraph-image` da
 * raiz — so passe `imagem` quando a pagina tiver uma propria.
 */
export function criarMetadata({
  titulo,
  descricao,
  caminho,
  imagem,
  tipo = "website",
}: OpcoesMetadata): Metadata {
  // O openGraph da pagina substitui o da raiz por inteiro, entao a imagem
  // padrao precisa ser repetida aqui explicitamente.
  const imagens = [{ url: imagem ?? "/opengraph-image" }];

  return {
    // `title: undefined` apagaria o titulo padrao do layout (a home ficava
    // sem <title>): sem titulo proprio, a chave simplesmente nao vai.
    ...(titulo ? { title: titulo } : {}),
    description: descricao,
    alternates: { canonical: caminho },
    openGraph: {
      type: tipo === "video.other" ? "video.other" : tipo,
      locale: "pt_BR",
      siteName: site.nome,
      url: caminho,
      title: titulo ?? site.nome,
      description: descricao,
      images: imagens,
    },
    twitter: {
      card: "summary_large_image",
      title: titulo ?? site.nome,
      description: descricao,
      images: imagens.map((item) => item.url),
    },
  };
}

export function urlAbsoluta(caminho: string) {
  return `${site.url}${caminho === "/" ? "" : caminho}`;
}

// ---------------------------------------------------------------------------
// JSON-LD. So entram dados que existem em `site.ts` — nada de avaliacao,
// preco ou contagem inventada. Campos vazios (CNPJ, CEP) ficam de fora.
// ---------------------------------------------------------------------------

const idOrganizacao = `${site.url}/#organizacao`;

export function schemaOrganizacao() {
  const { endereco } = site.contato;

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": idOrganizacao,
    name: site.nome,
    alternateName: site.nomeCompleto,
    ...(site.razaoSocial ? { legalName: site.razaoSocial } : {}),
    ...(site.cnpj ? { taxID: site.cnpj } : {}),
    url: site.url,
    description: site.descricao,
    foundingDate: String(site.fundacao),
    email: site.contato.email,
    telephone: `+${site.contato.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: endereco.logradouro,
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      addressCountry: endereco.pais,
      ...(endereco.cep ? { postalCode: endereco.cep } : {}),
    },
    areaServed: { "@type": "Country", name: "Brasil" },
    knowsAbout: [
      "Franchising",
      "Análise de franqueabilidade",
      "Formatação de franquias",
      "Expansão de franquias",
      "Gestão de redes de franquias",
    ],
    sameAs: site.redes.map((rede) => rede.url),
  };
}

export function schemaWebsite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.nome,
    inLanguage: "pt-BR",
    publisher: { "@id": idOrganizacao },
  };
}

export function schemaBreadcrumb(itens: { nome: string; caminho: string }[]) {
  const trilha = [{ nome: "Início", caminho: "/" }, ...itens];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trilha.map((item, indice) => ({
      "@type": "ListItem",
      position: indice + 1,
      name: item.nome,
      item: urlAbsoluta(item.caminho),
    })),
  };
}

export function schemaVideo(video: {
  titulo: string;
  resumo: string;
  youtubeId: string;
  publicadoEm: string;
  caminho: string;
  thumbnail: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.titulo,
    description: video.resumo,
    thumbnailUrl: video.thumbnail,
    uploadDate: video.publicadoEm,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
    url: urlAbsoluta(video.caminho),
    publisher: { "@id": idOrganizacao },
  };
}

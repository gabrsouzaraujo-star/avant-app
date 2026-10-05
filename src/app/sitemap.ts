import type { MetadataRoute } from "next";
import { cases } from "@/data/cases";
import { conteudos } from "@/data/conteudos";
import { urlAbsoluta } from "@/lib/seo";

const paginas = [
  { caminho: "/", prioridade: 1 },
  { caminho: "/diagnostico", prioridade: 0.9 },
  { caminho: "/servicos", prioridade: 0.8 },
  { caminho: "/cases", prioridade: 0.8 },
  { caminho: "/sobre", prioridade: 0.7 },
  { caminho: "/conteudos", prioridade: 0.6 },
  { caminho: "/contato", prioridade: 0.6 },
  { caminho: "/politica-de-privacidade", prioridade: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...paginas.map((pagina) => ({
      url: urlAbsoluta(pagina.caminho),
      priority: pagina.prioridade,
    })),
    ...cases.map((item) => ({
      url: urlAbsoluta(`/cases/${item.slug}`),
      priority: 0.7,
    })),
    ...conteudos.map((item) => ({
      url: urlAbsoluta(`/conteudos/${item.slug}`),
      lastModified: item.publicadoEm,
      priority: 0.5,
    })),
  ];
}

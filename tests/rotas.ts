import { cases } from "../src/data/cases";
import { conteudos } from "../src/data/conteudos";

/** Todas as paginas publicas do site, lidas dos mesmos dados que as geram. */
export const rotasFixas = [
  "/",
  "/sobre",
  "/servicos",
  "/cases",
  "/conteudos",
  "/diagnostico",
  "/contato",
  "/politica-de-privacidade",
];

export const rotas = [
  ...rotasFixas,
  ...cases.map((item) => `/cases/${item.slug}`),
  ...conteudos.map((item) => `/conteudos/${item.slug}`),
];

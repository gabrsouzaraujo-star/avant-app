/**
 * Quem faz a AVANT, e depoimentos sobre ela.
 *
 * Procedencia:
 * - Lucas Camargo: card "Os especialistas por tras da MedInfuse" publicado
 *   pelo cliente em 06/07/2026 e descricoes do AvantCast.
 * - Ener Komagata: descricao do corte "Voce so entende quando esta do outro
 *   lado" no canal do AvantCast (2023-12-20).
 */

import type { Depoimento, Pessoa } from "@/data/cases";

export const lideranca: (Pessoa & {
  credenciais?: string[];
  /** So vai para a tela depois de confirmado pelo cliente. */
  credenciaisConfirmadas?: boolean;
})[] = [
  {
    nome: "Lucas Camargo",
    papel: "Sócio-fundador",
    bio: "Fundou a Avant em 2010 e conduz a estratégia de formatação e expansão das marcas atendidas. Também é diretor de franquias da MedInfuse.",
    foto: "/imagens/medinfuse-lucas-camargo.webp",
    // TODO(cliente): confirmar estes numeros antes de publicar. Sao da
    // trajetoria pessoal dele (nao da AVANT) e vieram de material da MedInfuse.
    credenciais: [
      "Mais de 15 anos no setor de franquias",
      "Mais de 200 marcas desenvolvidas",
      "2.000 unidades comercializadas em quatro países",
    ],
    credenciaisConfirmadas: false,
  },
  {
    nome: "Ener Komagata",
    papel: "Sócio",
    bio: "Franqueador da Sushiaki e franqueado da Chinainbox — conhece por dentro os dois lados de uma rede.",
  },
];

/**
 * Depoimentos sobre a AVANT.
 *
 * Vazio de proposito. Os tres depoimentos do site atual sao texto de template
 * ("Carlos Mendes 02", "Boutique de Moda Eclética") e NAO podem ser usados.
 * TODO(cliente): enviar depoimentos reais com nome, cargo, empresa e foto. A
 * secao aparece sozinha quando houver ao menos um.
 */
export const depoimentos: Depoimento[] = [];

/**
 * Quem conduz a AVANT, e depoimentos sobre ela.
 *
 * Procedencia: card "Os especialistas por tras da MedInfuse" publicado pelo
 * cliente em 06/07/2026 e descricoes dos videos do AvantCast.
 */

import type { Depoimento } from "@/data/cases";

export const fundador = {
  nome: "Lucas Camargo",
  papel: "Sócio-fundador",
  bio: "Fundou a Avant em 2010 e conduz a estratégia de formatação e expansão das marcas atendidas. Também é diretor de franquias da MedInfuse.",
  foto: "/imagens/abertura-lucas-camargo.webp",
  fotoAlt:
    "Lucas Camargo, sócio-fundador da Avant, diante de um mural de fotos com empresários e marcas da rede",
  /** Frentes de atuacao — todas documentadas em material do cliente. */
  frentes: [
    {
      titulo: "Fundador da Avant",
      texto: "À frente da consultoria desde 2010, só em franchising.",
    },
    {
      titulo: "Diretor de franquias da MedInfuse",
      texto: "Lidera a estratégia de crescimento e expansão nacional da rede.",
      caseSlug: "medinfuse",
    },
    {
      titulo: "Voz do AvantCast",
      texto:
        "Conversa sobre formatação, expansão e gestão de redes no podcast da Avant.",
      href: "/conteudos",
    },
  ],
  // TODO(cliente): confirmar estes numeros antes de publicar. Sao da
  // trajetoria pessoal dele (nao da AVANT) e vieram de material da MedInfuse.
  credenciais: [
    "Mais de 15 anos no setor de franquias",
    "Mais de 200 marcas desenvolvidas",
    "2.000 unidades comercializadas em quatro países",
  ],
  credenciaisConfirmadas: false,
};

/**
 * Depoimentos sobre a AVANT.
 *
 * Vazio de proposito. Os tres depoimentos do site atual sao texto de template
 * ("Carlos Mendes 02", "Boutique de Moda Eclética") e NAO podem ser usados.
 * TODO(cliente): enviar depoimentos reais com nome, cargo, empresa e foto. A
 * secao aparece sozinha quando houver ao menos um.
 */
export const depoimentos: Depoimento[] = [];

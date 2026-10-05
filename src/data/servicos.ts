/**
 * Solucoes da AVANT, organizadas em tres pilares.
 *
 * Os doze servicos nao aparecem como uma vitrine solta: cada um e uma
 * ferramenta de um dos tres momentos de uma rede — estruturar, expandir e
 * sustentar. A lista de servicos vem do site atual e do briefing do cliente.
 *
 * TODO(cliente): as descricoes sao copy provisoria, escrita a partir da
 * definicao de cada servico. Validar o escopo real de cada entrega.
 */

export type Servico = {
  nome: string;
  descricao: string;
};

export type Pilar = {
  id: string;
  numero: string;
  titulo: string;
  resumo: string;
  servicos: Servico[];
};

export const pilares: Pilar[] = [
  {
    id: "estruturar",
    numero: "01",
    titulo: "Estruturar",
    resumo:
      "Antes de vender a primeira franquia, o negócio precisa provar que pode ser replicado. É aqui que o modelo é avaliado, desenhado e documentado.",
    servicos: [
      {
        nome: "Análise de franqueabilidade",
        descricao:
          "Avaliação do negócio para entender se ele está pronto para ser replicado e operado por franqueados — e o que falta, se não estiver.",
      },
      {
        nome: "Formatação de franquias",
        descricao:
          "Desenho do modelo de franquia: padrões de operação, manuais, modelo financeiro, taxas e estrutura de suporte ao franqueado.",
      },
      {
        nome: "Estudos de mercado",
        descricao:
          "Leitura do mercado, da concorrência e das praças com potencial para orientar onde e como a rede deve crescer.",
      },
      {
        nome: "Planejamento estratégico",
        descricao:
          "Definição de metas, prioridades e etapas para que a expansão aconteça no ritmo que a operação consegue sustentar.",
      },
    ],
  },
  {
    id: "expandir",
    numero: "02",
    titulo: "Expandir",
    resumo:
      "Com o modelo pronto, a rede precisa de demanda qualificada e de um processo comercial capaz de escolher bem quem vai representar a marca.",
    servicos: [
      {
        nome: "Planejamento de expansão",
        descricao:
          "Plano de crescimento por região, formato de unidade e perfil de franqueado, com metas claras de abertura.",
      },
      {
        nome: "Expansão comercial",
        descricao:
          "Estrutura e operação da venda de franquias: captação, qualificação e seleção de candidatos alinhados à marca.",
      },
      {
        nome: "Marketing e tráfego pago",
        descricao:
          "Posicionamento da marca para investidores e campanhas de mídia orientadas à geração de leads qualificados de franquia.",
      },
      {
        nome: "Assessoria de imprensa",
        descricao:
          "Relacionamento com a imprensa para dar visibilidade e credibilidade à marca no mercado de franquias.",
      },
      {
        nome: "Internacionalização",
        descricao:
          "Apoio à marca que quer levar o modelo de franquia para outros países.",
      },
    ],
  },
  {
    id: "sustentar",
    numero: "03",
    titulo: "Sustentar",
    resumo:
      "Uma rede só cresce de verdade quando os franqueados prosperam. O trabalho continua depois da inauguração.",
    servicos: [
      {
        nome: "Gestão de redes",
        descricao:
          "Acompanhamento da rede em operação: indicadores, padronização, relacionamento com franqueados e governança.",
      },
      {
        nome: "Suporte ao crescimento",
        descricao:
          "Consultoria contínua para ajustar o modelo, resolver gargalos e preparar a rede para a próxima fase.",
      },
    ],
  },
];

export const totalServicos = pilares.reduce(
  (total, pilar) => total + pilar.servicos.length,
  0,
);

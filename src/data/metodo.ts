/**
 * Etapas do processo e criterios de franqueabilidade.
 *
 * IMPORTANTE: nao e uma metodologia oficial documentada pela AVANT. O site
 * apresenta as etapas como representacao conceitual do caminho de um negocio
 * ate virar rede, e os criterios como os pontos que uma analise de
 * franqueabilidade costuma observar — nao como checklist proprietario.
 * TODO(cliente): se houver metodo oficial com nome e etapas, substituir aqui.
 */

export type Etapa = {
  numero: string;
  titulo: string;
  descricao: string;
};

export const etapas: Etapa[] = [
  {
    numero: "01",
    titulo: "Diagnóstico",
    descricao:
      "Entender o negócio como ele é hoje: operação, números, mercado e o que precisa mudar para ser replicado.",
  },
  {
    numero: "02",
    titulo: "Estruturação",
    descricao:
      "Organizar processos, papéis e indicadores para que o resultado deixe de depender do dono.",
  },
  {
    numero: "03",
    titulo: "Formatação",
    descricao:
      "Transformar o negócio em modelo de franquia: manuais, modelo financeiro, taxas e suporte.",
  },
  {
    numero: "04",
    titulo: "Posicionamento",
    descricao:
      "Apresentar a marca ao mercado como uma oportunidade clara para o investidor certo.",
  },
  {
    numero: "05",
    titulo: "Expansão",
    descricao:
      "Captar, selecionar e implantar franqueados com critério, região por região.",
  },
  {
    numero: "06",
    titulo: "Crescimento",
    descricao:
      "Acompanhar a rede em operação e ajustar o modelo para sustentar a próxima fase.",
  },
];

export type Criterio = {
  titulo: string;
  pergunta: string;
};

export const criterios: Criterio[] = [
  {
    titulo: "Modelo de negócio",
    pergunta:
      "O negócio gera resultado consistente, e não apenas em bons meses?",
  },
  {
    titulo: "Replicabilidade",
    pergunta:
      "O que faz a operação dar certo pode ser ensinado a outra pessoa?",
  },
  {
    titulo: "Operação",
    pergunta: "A unidade funciona sem a presença constante do dono?",
  },
  {
    titulo: "Processos",
    pergunta: "As rotinas estão documentadas ou vivem na cabeça de alguém?",
  },
  {
    titulo: "Margem",
    pergunta: "A margem comporta royalties e ainda remunera bem o franqueado?",
  },
  {
    titulo: "Posicionamento",
    pergunta: "A marca tem uma proposta clara e diferente da concorrência?",
  },
  {
    titulo: "Mercado",
    pergunta: "Existe demanda para o negócio em outras cidades e regiões?",
  },
  {
    titulo: "Capacidade de expansão",
    pergunta: "Há estrutura para dar suporte a novas unidades ao mesmo tempo?",
  },
  {
    titulo: "Estrutura",
    pergunta: "A empresa tem equipe, caixa e gestão para virar franqueadora?",
  },
  {
    titulo: "Perfil do franqueado",
    pergunta: "Está claro quem é o investidor ideal para representar a marca?",
  },
];

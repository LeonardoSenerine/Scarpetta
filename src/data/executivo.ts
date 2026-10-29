// Menu executivo: é o único cardápio que muda toda semana.
// Para publicar a semana nova, edite só este arquivo.

export type Etapa = {
  nome: string
  opcoes: { nome: string; descricao?: string }[]
}

export const executivo = {
  inicio: '2026-10-29', // quinta
  fim: '2026-10-30', // sexta
  preco: 99,
  fotos: ['arancini-bruschetta', 'carbonara-penne'],
  etapas: [
    {
      nome: 'Entrada',
      opcoes: [
        { nome: 'Arancini di risotto', descricao: 'Bolinhos de risoto com recheio de queijo e geleia de pimenta.' },
        { nome: 'Bruschetta al pomodoro', descricao: 'Pão italiano com tomates marinados no azeite, alho e manjericão.' },
      ],
    },
    {
      nome: 'Principal',
      opcoes: [
        { nome: 'Spaghetti alla carbonara', descricao: 'Molho cremoso de ovos e parmesão, guanciale ou pancetta crocante e pimenta-do-reino.' },
        { nome: 'Penne alla vodka', descricao: 'Molho cremoso de tomate e creme de leite fresco, aromatizado com vodka e finalizado com parmesão.' },
        { nome: 'Insalata con tilapia', descricao: 'Salada fresca com filé de tilápia grelhado.' },
      ],
    },
    {
      nome: 'Sobremesa',
      opcoes: [
        { nome: 'Budino al pistacchio', descricao: 'Pudim cremoso de pistache com pistache crocante por cima.' },
        { nome: 'Frutas da estação' },
      ],
    },
  ] satisfies Etapa[],
}

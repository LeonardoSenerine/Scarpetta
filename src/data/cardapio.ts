// Cardápio fixo, conforme o cardápio digital (Live Menu) da casa.

export type Prato = {
  nome: string
  descricao: string
  preco: number
  foto?: string
  nota?: string
}

export type Categoria = {
  id: string
  nome: string
  intro?: string
  pratos: Prato[]
}

export const cardapio: Categoria[] = [
  {
    id: 'antipasti',
    nome: 'Antipasti',
    intro: 'Para dividir enquanto a massa chega.',
    pratos: [
      { nome: 'Cestino di pani artigianali', descricao: 'Ciabatta, grissini e focaccia com pasta de gorgonzola e nozes, sardella, duo de azeitonas, manteiga com flor de sal e o molho de tomate da casa. Perfeito para fare la scarpetta.', preco: 65 },
      { nome: 'Bruschetta al pomodoro', descricao: 'Pão italiano tostado com tomatinhos marinados no azeite, alho e manjericão.', preco: 48, foto: 'arancini-bruschetta' },
      { nome: 'Arancini di risotto alla milanese', descricao: 'Bolinhos de risoto à milanesa com queijo caciocavallo e geleia de pimenta.', preco: 49 },
      { nome: 'Carpaccio di manzo', descricao: 'Lâminas de filé mignon com molho de limão, mostarda, alcaparras, azeite e parmesão.', preco: 79 },
      { nome: 'Battuta di manzo alla Scarpetta', descricao: 'Filé mignon na ponta da faca com molho da casa de Dijon e conhaque, gema curada, flor de sal e batata crocante.', preco: 88 },
      { nome: 'Tagliere all’italiana', descricao: 'Grana Padano, gorgonzola, brie, presunto de Parma, salame, mortadela italiana, figos frescos e mel.', preco: 159 },
      { nome: 'Monta la tua insalata', descricao: 'Monte sua salada com ingredientes frescos. Adicione búfala, frango ou filé de frango por R$ 20.', preco: 58 },
    ],
  },
  {
    id: 'paste',
    nome: 'Paste',
    intro: 'Massas secas de grano duro e massas frescas feitas na casa.',
    pratos: [
      { nome: 'Penne alla vodka', descricao: 'Molho cremoso de tomate e creme de leite fresco, aromatizado com vodka e finalizado com parmesão.', preco: 86, foto: 'penne' },
      { nome: 'Spaghetti alla carbonara', descricao: 'Molho cremoso de ovos e parmesão, pancetta crocante e pimenta-do-reino.', preco: 98, foto: 'carbonara-penne' },
      { nome: 'Orecchiette al pesto genovese', descricao: 'Massa típica da Puglia com pesto de manjericão fresco, alho, parmesão e pinoli.', preco: 89 },
      { nome: 'Spaghetti al filetto e fonduta', descricao: 'Filé mignon na ponta da faca, demi-glace, molho de tomate e fonduta cremosa de queijos.', preco: 122 },
      { nome: 'Fettuccine Alfredo di Roma', descricao: 'Fettuccine artesanal com molho cremoso de manteiga e parmesão.', preco: 92, foto: 'fettuccine', nota: 'Massa fresca' },
      { nome: 'Agnolotti di carciofi alle erbe', descricao: 'Recheado com alcachofras, manteiga de ervas, raspas de laranja e pinoli tostados.', preco: 120, nota: 'Massa fresca' },
      { nome: 'Capeletti di burrata al limone siciliano', descricao: 'Recheado com burrata e raspas de limão-siciliano, molho de tomates frescos e azeite extravirgem.', preco: 122, nota: 'Massa fresca' },
      { nome: 'Lasagna alla bolognese', descricao: 'Massa fresca, ragù à bolonhesa, bechamel, muçarela de búfala, presunto cozido e parmesão gratinado.', preco: 180, foto: 'lasagna', nota: 'Serve 2 pessoas' },
    ],
  },
  {
    id: 'risotti',
    nome: 'Risotti',
    intro: 'Arroz arbóreo, mexido até o ponto.',
    pratos: [
      { nome: 'Risotto al porro, brie e croccante di Parma', descricao: 'Alho-poró com queijo brie, manteiga, parmesão e crocante de presunto de Parma.', preco: 108, foto: 'risotto-porro' },
      { nome: 'Risotto ai gamberi', descricao: 'Camarões salteados, vinho branco, caldo de peixe, manteiga e parmesão.', preco: 176, foto: 'risotto-gamberi' },
      { nome: 'Risotto ai funghi secchi', descricao: 'Funghi secchi hidratado, vinho branco, caldo de legumes e parmesão.', preco: 98 },
    ],
  },
  {
    id: 'secondi',
    nome: 'Secondi',
    intro: 'Carnes e peixes, com acompanhamento.',
    pratos: [
      { nome: 'Medaglioni di filetto e risotto alla milanese', descricao: 'Medalhões de filé mignon ao molho roti, com risoto de açafrão.', preco: 159, foto: 'medaglioni' },
      { nome: 'Robalo in crosta di erbe', descricao: 'Filé de robalo em crosta de ervas frescas com purê cremoso de mandioquinha.', preco: 149, foto: 'robalo' },
      { nome: 'Filetto alla parmigiana', descricao: 'Filé mignon empanado com molho de tomates frescos, muçarela fior di latte e parmesão gratinado. Com batatas rústicas.', preco: 139, foto: 'parmigiana' },
      { nome: 'Tilapia al burro, gamberi e capperi', descricao: 'Tilápia assada com manteiga, camarões e alcaparras, servida com risoto de limão-siciliano.', preco: 128 },
      { nome: 'Melanzane alla parmigiana', descricao: 'Berinjela grelhada em camadas com molho de tomates frescos, fior di latte e parmesão. Com batatas rústicas.', preco: 84, foto: 'melanzane', nota: 'Vegetariano' },
    ],
  },
  {
    id: 'pizze',
    nome: 'Pizze',
    intro: 'Massa de fermentação natural, 8 pedaços.',
    pratos: [
      { nome: 'Margherita', descricao: 'Molho de tomate San Marzano DOP, mozzarella fior di latte, parmesão e manjericão.', preco: 119 },
      { nome: 'Parma', descricao: 'Fior di latte, rúcula, presunto de Parma, parmesão, stracciatella e redução de aceto balsâmico.', preco: 149, foto: 'pizza-parma' },
      { nome: 'Peperoni', descricao: 'San Marzano DOP, fior di latte, parmesão e peperoni artesanal.', preco: 129, foto: 'pizza-peperoni' },
      { nome: 'Portuguesa', descricao: 'San Marzano DOP, presunto, fior di latte, cebola e ovo caipira cozido.', preco: 129, foto: 'pizza-portuguesa' },
      { nome: 'Zucchine', descricao: 'San Marzano DOP, fior di latte, abobrinha marinada e parmesão.', preco: 119, foto: 'pizza-zucchine' },
      { nome: 'Di Baffi', descricao: 'San Marzano DOP, muçarela, Catupiry, tomatinho cereja e parmesão gratinado.', preco: 129, foto: 'pizza-di-baffi' },
      { nome: 'Mortadela italiana com pistache', descricao: 'Fior di latte, parmesão, mortadela italiana, stracciatella e pistache.', preco: 144 },
      { nome: 'Caprese', descricao: 'San Marzano DOP, fior di latte, pesto rústico, tomate caqui, burrata e manjericão.', preco: 129 },
      { nome: 'Figo & mel', descricao: 'Fior di latte, brie, mel e figos, finalizada com lascas de amêndoas.', preco: 119 },
      { nome: 'Alho-poró & brie', descricao: 'San Marzano DOP, grana padano, fior di latte, alho-poró e brie.', preco: 129 },
      { nome: 'Carbonara', descricao: 'San Marzano DOP, fior di latte, creme de ovos com pimenta-do-reino, parmesão e pancetta.', preco: 129 },
      { nome: 'Diavola', descricao: 'San Marzano DOP, fior di latte, parmesão e calabresa artesanal picante.', preco: 139, nota: 'Apimentada' },
      { nome: 'Castelões', descricao: 'San Marzano DOP, parmesão, calabresa artesanal e fior di latte.', preco: 139 },
      { nome: 'Quattro formaggi', descricao: 'San Marzano DOP, fior di latte, gorgonzola, parmesão e ricota fresca ou Catupiry.', preco: 139 },
      { nome: 'Veridiana', descricao: 'San Marzano DOP, fior di latte, lascas de alho, tomate caqui e parmesão.', preco: 119 },
      { nome: 'Catupiry', descricao: 'San Marzano DOP, Catupiry e mozzarella fior di latte.', preco: 119 },
      { nome: 'Mozzarella', descricao: 'San Marzano DOP e mozzarella fior di latte.', preco: 99 },
      { nome: 'Marinara', descricao: 'San Marzano DOP, lâminas finas de alho, orégano e manjericão.', preco: 99 },
      { nome: 'Crostini rosmarino', descricao: 'Massa fina crocante com azeite extravirgem, sal grosso e alecrim.', preco: 99 },
      { nome: 'Banofee alla Scarpetta', descricao: 'Doce de leite, banana, canela e farofa crocante de biscoito de maisena.', preco: 99, nota: 'Doce' },
      { nome: 'Romeo e Giulietta alla brasiliana', descricao: 'Goiabada cascão cremosa e queijo minas padrão.', preco: 105, nota: 'Doce' },
    ],
  },
  {
    id: 'dolci',
    nome: 'Dolci',
    intro: 'Para fechar a conta com calma.',
    pratos: [
      { nome: 'Budino al pistacchio', descricao: 'Pudim cremoso de pistache com pistache crocante por cima.', preco: 42, foto: 'budino' },
      { nome: 'Tiramisù classico', descricao: 'Leve e cremoso, com toque suave de café.', preco: 45 },
      { nome: 'Vulcano alla Nutella', descricao: 'Bolinho de chocolate quente recheado com Nutella, com gelato de creme ou pistache.', preco: 49 },
      { nome: 'Panna cotta al cachi', descricao: 'Textura leve e cremosa com geleia de caqui, a fruta símbolo de Itatiba.', preco: 39 },
    ],
  },
]

export const especialDoChef: Prato = {
  nome: 'Stinco d’agnello laccato',
  descricao: 'Stinco de cordeiro laqueado com risoto cremoso de aspargos.',
  preco: 176,
}

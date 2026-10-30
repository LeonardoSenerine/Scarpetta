// Dados institucionais. Campos com null ficam fora do site até a casa confirmar o valor.

const enderecoBusca = 'Scarpetta Cucina, Av. Nossa Senhora das Graças, 4793, Itatiba - SP'
const whatsapp = '5511912304242'

export const wa = (mensagem: string) =>
  `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagem)}`

type Avaliacoes = { nota: string; total: number; link: string }

export const info = {
  nome: 'Scarpetta Cucina',
  slogan: 'Cozinha italiana afetiva',
  descricao: 'Até não sobrar nada do molho. Massa fresca, pizza de fermentação natural e risotos num salão no meio do verde, dentro do Doda Training Center em Itatiba/SP. Reserve sua mesa.',
  // Domínio deduzido do e-mail da casa. Confirmar antes de publicar: é usado no Open Graph e no schema.org.
  site: 'https://scarpetta.com.br',
  endereco: {
    rua: 'Av. Nossa Senhora das Graças, 4793',
    bairro: 'Jardim Nossa Senhora das Graças',
    cidade: 'Itatiba, SP',
    cep: '13257-400',
    referencia: 'Dentro do Doda Training Center',
  },
  telefone: '+55 11 91230-4242',
  whatsappExibicao: '(11) 91230-4242',
  email: 'eventos@scarpetta.com.br',
  instagram: 'https://www.instagram.com/scarpetta_br/',
  instagramUsuario: '@scarpetta_br',
  linktree: 'https://linktr.ee/scarpettacucina',
  cardapioDigital: 'https://livemenu.app/menu/6998884d25e0919a71f978e5',
  reserva: wa('Olá! Gostaria de reservar uma mesa no Scarpetta.'), // TODO: trocar pelo widget Tagme
  // Links diretos dos canais de pedido. Enquanto forem null, o site mostra um único botão para o Linktree.
  ifood: null as string | null,
  deliveryProprio: null as string | null,
  rotas: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(enderecoBusca)}`,
  mapaEmbed: `https://www.google.com/maps?q=${encodeURIComponent(enderecoBusca)}&z=15&output=embed`,
  // Preencher só com nota e total conferidos no perfil do Google Business, na data da publicação.
  avaliacoes: null as Avaliacoes | null,
}

// 0 = domingo. Turnos em minutos desde a meia-noite.
export const funcionamento = {
  dias: [4, 5, 6, 0],
  turnos: [
    { nome: 'Almoço', inicio: 12 * 60, fim: 17 * 60 },
    { nome: 'Jantar', inicio: 19 * 60, fim: 22 * 60 },
  ],
}

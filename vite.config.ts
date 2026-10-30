import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { funcionamento, info } from './src/data/info'

const diasSchema = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`
const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

// Endereço público usado nos links absolutos (capa, canonical, schema). Na Vercel vem do domínio de produção
// do projeto; fora dela, de SITE_URL ou de info.site. Sem isso a capa apontaria para um domínio que ainda não existe.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
const site = process.env.SITE_URL ?? (vercel ? `https://${vercel}` : info.site)

// Escreve no <head> a descrição, o Open Graph e o schema.org Restaurant a partir de src/data/info.ts,
// para que prévias de link (WhatsApp, Instagram) e buscadores leiam os dados sem executar o JS.
function metadados(): Plugin {
  const titulo = `${info.nome} · ${info.slogan} em Itatiba/SP`
  // O ?v= muda quando a capa muda, para o WhatsApp não reaproveitar a antiga.
  const imagem = `${site}/og.jpg?v=2`
  const restaurante = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: info.nome,
    description: info.descricao,
    url: site,
    image: imagem,
    telephone: info.telefone,
    email: info.email,
    servesCuisine: 'Italiana',
    acceptsReservations: true,
    hasMenu: info.cardapioDigital,
    sameAs: [info.instagram],
    address: {
      '@type': 'PostalAddress',
      streetAddress: info.endereco.rua,
      addressLocality: 'Itatiba',
      addressRegion: 'SP',
      postalCode: info.endereco.cep,
      addressCountry: 'BR',
    },
    openingHoursSpecification: funcionamento.turnos.map((t) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: funcionamento.dias.map((d) => diasSchema[d]),
      opens: hhmm(t.inicio),
      closes: hhmm(t.fim),
    })),
  }
  const tags = [
    `<title>${titulo}</title>`,
    `<meta name="description" content="${attr(info.descricao)}" />`,
    `<link rel="canonical" href="${site}/" />`,
    `<meta property="og:type" content="restaurant" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="${info.nome}" />`,
    `<meta property="og:title" content="${attr(titulo)}" />`,
    `<meta property="og:description" content="${attr(info.descricao)}" />`,
    `<meta property="og:url" content="${site}/" />`,
    `<meta property="og:image" content="${imagem}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:alt" content="Scarpetta Cucina: até não sobrar nada do molho. Pizza de peperoni da casa vista de cima" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(titulo)}" />`,
    `<meta name="twitter:description" content="${attr(info.descricao)}" />`,
    `<meta name="twitter:image" content="${imagem}" />`,
    `<script type="application/ld+json">${JSON.stringify(restaurante).replace(/</g, '\\u003c')}</script>`,
  ]
  return {
    name: 'metadados',
    transformIndexHtml: (html) => html.replace('<!-- metadados -->', tags.join('\n    ')),
  }
}

export default defineConfig({
  plugins: [react(), metadados()],
  server: { host: true, port: Number(process.env.PORT) || 5173 },
})

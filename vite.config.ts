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
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
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
  // As páginas avulsas têm prévia própria, com a mesma capa. A proposta e a 404 ficam fora dos buscadores.
  const avulsa = (p: { titulo: string; descricao: string; caminho: string; indexar: boolean }) => [
    `<title>${attr(p.titulo)}</title>`,
    `<meta name="description" content="${attr(p.descricao)}" />`,
    `<meta name="robots" content="${p.indexar ? 'index, follow' : 'noindex, nofollow'}" />`,
    ...(p.indexar ? [`<link rel="canonical" href="${site}${p.caminho}" />`] : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="${info.nome}" />`,
    `<meta property="og:title" content="${attr(p.titulo)}" />`,
    `<meta property="og:description" content="${attr(p.descricao)}" />`,
    `<meta property="og:url" content="${site}${p.caminho}" />`,
    `<meta property="og:image" content="${imagem}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]
  const paginas: Record<string, string[]> = {
    '<!-- metadados -->': tags,
    '<!-- metadados-proposta -->': avulsa({
      titulo: `Proposta de site para o ${info.nome} · senerine.dev`,
      descricao: 'Uma solução para melhorar a captação de clientes do Scarpetta: um site com a identidade da casa que centraliza tudo o que hoje está no Linktree.',
      caminho: '/proposta',
      indexar: false,
    }),
    '<!-- metadados-privacidade -->': avulsa({
      titulo: `Política de privacidade e cookies · ${info.nome}`,
      descricao: `Como o site do ${info.nome} trata seus dados: sem cadastro, sem cookies próprios e sem ferramentas de análise ou publicidade.`,
      caminho: '/privacidade',
      indexar: true,
    }),
    '<!-- metadados-404 -->': avulsa({
      titulo: `Página não encontrada · ${info.nome}`,
      descricao: 'Esse prato não está no cardápio. Volte ao início, veja o cardápio ou reserve sua mesa.',
      caminho: '/404',
      indexar: false,
    }),
  }

  // robots.txt e sitemap.xml saem do mesmo endereço público, para nunca apontarem para um domínio errado.
  const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${site}/sitemap.xml`, ''].join('\n')
  const hoje = new Date().toISOString().slice(0, 10)
  const mapa = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[{ caminho: '/', prioridade: '1.0' }, { caminho: '/privacidade', prioridade: '0.3' }].map(
      (u) => `  <url><loc>${site}${u.caminho}</loc><lastmod>${hoje}</lastmod><priority>${u.prioridade}</priority></url>`,
    ),
    '</urlset>',
    '',
  ].join('\n')

  return {
    name: 'metadados',
    transformIndexHtml: (html) =>
      Object.entries(paginas).reduce((h, [marca, t]) => h.replace(marca, t.join('\n    ')), html),
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: mapa })
    },
  }
}

export default defineConfig({
  plugins: [react(), metadados()],
  // O site, a proposta para o cliente (/proposta), a política de privacidade (/privacidade) e a 404,
  // que a Vercel serve sozinha em qualquer endereço que não existe.
  build: {
    rollupOptions: {
      input: { site: 'index.html', proposta: 'proposta.html', privacidade: 'privacidade.html', 404: '404.html' },
    },
  },
  server: { host: true, port: Number(process.env.PORT) || 5173 },
})

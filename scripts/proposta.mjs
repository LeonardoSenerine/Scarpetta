// Capturas do site no celular para a página de proposta (public/proposta/*.webp).
// Rode com o site servido em http://localhost:4173 (`npm run build && npx vite preview --port 4173`):
// `node scripts/proposta.mjs`. O print do Linktree (public/proposta/linktree.webp) veio do celular do cliente.
import { createRequire } from 'node:module'
import sharp from 'sharp'

const { chromium } = createRequire(import.meta.url)('playwright')
const secoes = ['visite', 'reserva', 'cardapio', 'executivo', 'delivery', 'eventos', 'salao']

const navegador = await chromium.launch()
const aba = await navegador.newPage({ viewport: { width: 390, height: 731 }, deviceScaleFactor: 2 })
await aba.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await aba.waitForTimeout(3500)
// A tela inicial, na mesma proporção do print do Linktree, para os dois celulares ficarem iguais.
await sharp(await aba.screenshot()).resize({ width: 600 }).webp({ quality: 80 }).toFile('public/proposta/site.webp')

// Nas seções, sem cabeçalho nem barra fixa por cima.
await aba.addStyleTag({ content: '.cabecalho, .barra-acoes { display: none !important; }' })
for (const id of secoes) {
  await aba.evaluate(async (id) => {
    const el = document.getElementById(id)
    const topo = el.getBoundingClientRect().top + scrollY
    for (let y = topo - 600; y < topo + 900; y += 200) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)) }
    scrollTo(0, topo)
  }, id)
  await aba.waitForTimeout(1200)
  const caixa = await aba.$eval(`#${id}`, (el) => { const r = el.getBoundingClientRect(); return { y: r.top + scrollY, w: r.width, h: r.height } })
  const png = await aba.screenshot({ fullPage: true, clip: { x: 0, y: caixa.y, width: caixa.w, height: Math.min(caixa.h, 640) } })
  await sharp(png).resize({ width: 520 }).webp({ quality: 78 }).toFile(`public/proposta/${id}.webp`)
}
await navegador.close()
console.log('capturas em public/proposta')

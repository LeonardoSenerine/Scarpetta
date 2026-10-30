// Gera a capa do link (public/og.jpg, 1200x630) a partir de scripts/og.html.
// Usa o Playwright instalado na máquina (via require, que também procura no NODE_PATH): `node scripts/og.mjs`.
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const { chromium } = createRequire(import.meta.url)('playwright')

const pagina = new URL('./og.html', import.meta.url).href
const saida = fileURLToPath(new URL('../public/og.jpg', import.meta.url))

const navegador = await chromium.launch()
const aba = await navegador.newPage({ viewport: { width: 1200, height: 630 } })
await aba.goto(pagina, { waitUntil: 'networkidle' })
await aba.evaluate(() => document.fonts.ready)
await aba.screenshot({ path: saida, type: 'jpeg', quality: 86 })
await navegador.close()
console.log(`capa salva em ${saida}`)

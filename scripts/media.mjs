// Gera versões webp otimizadas das fotos originais em raw/img -> public/img
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const map = {
  3: 'robalo-quadrado', 4: 'penne', 5: 'medaglioni-quadrado', 6: 'risotto-porro',
  8: 'risotto-gamberi', 9: 'fettuccine-garfo', 10: 'fettuccine', 11: 'lasagna-detalhe',
  12: 'lasagna', 13: 'melanzane', 14: 'pizza-portuguesa', 15: 'pizza-di-baffi',
  16: 'pizza-peperoni-detalhe', 17: 'pizza-parma', 18: 'pizza-zucchine', 19: 'pizza-peperoni',
  20: 'parmigiana', 21: 'medaglioni', 22: 'robalo', 23: 'forno', 24: 'budino',
  26: 'arancini-bruschetta', 27: 'carbonara-penne',
}
const widths = [640, 1200]

mkdirSync('public/img', { recursive: true })
for (const [n, name] of Object.entries(map)) {
  for (const w of widths) {
    await sharp(`raw/img/${n}.jpg`).resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 74 }).toFile(`public/img/${name}-${w}.webp`)
  }
  // placeholder minúsculo para blur-up
  const tiny = await sharp(`raw/img/${n}.jpg`).resize({ width: 16 }).webp({ quality: 40 }).toBuffer()
  console.log(`${name}: data:image/webp;base64,${tiny.toString('base64')}`)
}

// Hero: a pizza de peperoni (foto 19) em plano aberto, com a tábua e a mesa, até a resolução máxima do original.
for (const w of [640, 1200, 1500]) {
  await sharp('raw/img/19.jpg').resize({ width: w, withoutEnlargement: true }).webp({ quality: 84 }).toFile(`public/img/pizza-mesa-${w}.webp`)
}

// A capa do link (public/og.jpg) é feita à parte, com marca e texto: `node scripts/og.mjs`.

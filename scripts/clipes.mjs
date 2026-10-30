// Recorta trechos curtos dos vídeos originais do Instagram (raw/video) em clipes sem legenda.
// As legendas automáticas ficam na faixa de 75–88% da altura; cada recorte para antes disso.
// Os originais são 720p já comprimidos pelo Instagram: o clipe é codificado numa passada só,
// com qualidade alta, um pouco de redução de ruído e realce leve de nitidez.
// Uso: FFMPEG=/caminho/para/ffmpeg node scripts/clipes.mjs
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import sharp from 'sharp'

const ffmpeg = process.env.FFMPEG || 'ffmpeg'
const L = 720
const A = 900

// trechos: [arquivo, início, fim, y do recorte, altura do recorte (padrão 900)]
// formato: '4:5' (720x900, padrão) ou '1:1' (720x720, para molduras redondas)
// vaivem: trecho curto tocado para frente e para trás, para o loop não dar salto
const clipes = {
  // Experiências
  molho: { trechos: [['v1793290496114', 3.6, 6.4, 20]] },
  girar: { trechos: [['v1793290535649', 2.85, 3.9, 60], ['v1793290535649', 4.0, 5.65, 60]] },
  adocar: { trechos: [['v1793290506895', 3.5, 6.0, 80]] },
  // O salão
  salao: { trechos: [['v1793290933430', 28.35, 30.2, 0]] },
  interior: { trechos: [['v1793290933430', 30.35, 31.4, 100]], vaivem: true },
  caminho: { trechos: [['v1793290933430', 1.5, 3.6, 0], ['v1793290933430', 6.65, 7.4, 0]] },
}

const tmp = 'raw/tmp-clipes'
mkdirSync(tmp, { recursive: true })
mkdirSync('public/media', { recursive: true })

for (const [nome, { trechos, formato = '4:5', vaivem = false }] of Object.entries(clipes)) {
  const alvoA = formato === '1:1' ? L : A
  const entradas = trechos.flatMap(([arquivo, ini, fim]) => ['-ss', String(ini), '-to', String(fim), '-i', `raw/video/${arquivo}.mp4`])
  // Recortes mais baixos que o alvo são ampliados (lanczos) até cobrir o quadro.
  const filtros = trechos.map(([, , , y, h = alvoA], i) => {
    const recorte = h === alvoA
      ? `crop=${L}:${alvoA}:0:${y}`
      : `crop=${L}:${h}:0:${y},scale=-2:${alvoA}:flags=lanczos,crop=${L}:${alvoA}`
    return `[${i}:v]${recorte},setsar=1,fps=30,hqdn3d=1.2:1.2:3:3,unsharp=5:5:0.45:5:5:0[v${i}]`
  })
  const n = trechos.length
  const juntar = vaivem
    ? `[v0]split[ida][volta0];[volta0]reverse[volta];[ida][volta]concat=n=2:v=1:a=0,format=yuv420p[saida]`
    : `${trechos.map((_, i) => `[v${i}]`).join('')}concat=n=${n}:v=1:a=0,format=yuv420p[saida]`
  execFileSync(ffmpeg, ['-v', 'error', '-y', ...entradas, '-filter_complex', [...filtros, juntar].join(';'), '-map', '[saida]',
    '-an', '-c:v', 'libx264', '-crf', '19', '-preset', 'slow', '-tune', 'film', '-profile:v', 'high',
    '-movflags', '+faststart', `public/media/${nome}.mp4`])
  execFileSync(ffmpeg, ['-v', 'error', '-y', '-i', `public/media/${nome}.mp4`, '-frames:v', '1', `${tmp}/${nome}.png`])
  await sharp(`${tmp}/${nome}.png`).webp({ quality: 82 }).toFile(`public/media/${nome}.webp`)
  console.log(nome)
}

rmSync(tmp, { recursive: true, force: true })

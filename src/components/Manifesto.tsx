import { useLayoutEffect, useRef } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'

const TRACO = 'M40 150 C 170 70, 290 210, 450 132 S 740 52, 960 118'

// O traço de molho é "limpo" pelo pão conforme a seção sobe na tela: fare la scarpetta.
export function Manifesto() {
  const palco = useRef<HTMLDivElement>(null)
  const caminho = useRef<SVGPathElement>(null)
  const pao = useRef<SVGGElement>(null)
  const reduzir = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: palco, offset: ['start 0.8', 'start 0.2'] })
  const limpeza = useTransform(scrollYProgress, [0.15, 0.95], [0, 1], { clamp: true })
  const restante = useTransform(limpeza, (v) => 1 - v)
  const manchaPao = useTransform(limpeza, [0, 0.15], [0, 1])

  const posicionarPao = (v: number) => {
    const p = caminho.current
    const g = pao.current
    if (!p || !g) return
    const total = p.getTotalLength()
    const a = p.getPointAtLength(Math.max(0, v * total))
    const b = p.getPointAtLength(Math.min(total, v * total + 2))
    const angulo = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
    g.setAttribute('transform', `translate(${a.x} ${a.y}) rotate(${angulo * 0.6 - 8})`)
  }

  useMotionValueEvent(limpeza, 'change', posicionarPao)
  useLayoutEffect(() => posicionarPao(limpeza.get()))

  return (
    <section className="manifesto" aria-labelledby="manifesto-titulo">
      <div className="manifesto-texto">
        <p className="verbete">
          <span lang="it">scar·pét·ta</span> <em>substantivo feminino</em>
        </p>
        <h2 id="manifesto-titulo">
          <span lang="it">Fare la scarpetta</span> é passar o pão no prato até não sobrar nada do molho.
        </h2>
      </div>

      <div className="molho" ref={palco}>
      <svg viewBox="0 0 1000 240" aria-hidden="true">
        <defs>
          <filter id="borda-molho" x="-5%" y="-30%" width="110%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="10" />
          </filter>
          <linearGradient id="casca" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e3ad5e" />
            <stop offset="1" stopColor="#a8642a" />
          </linearGradient>
        </defs>
        <path ref={caminho} d={TRACO} fill="none" stroke="none" />
        <g filter="url(#borda-molho)">
          <motion.path
            d={TRACO}
            fill="none"
            stroke="var(--pomodoro)"
            strokeWidth="64"
            strokeLinecap="round"
            style={reduzir ? undefined : { pathLength: restante, pathOffset: limpeza }}
          />
          <motion.path
            d={TRACO}
            fill="none"
            stroke="#e0624f"
            strokeWidth="14"
            strokeLinecap="round"
            opacity=".55"
            transform="translate(0 -12)"
            style={reduzir ? undefined : { pathLength: restante, pathOffset: limpeza }}
          />
        </g>
        {!reduzir && (
          <g ref={pao}>
            <g transform="translate(-44 -74) scale(1.35)">
              <rect width="78" height="56" rx="24" fill="url(#casca)" />
              <rect x="7" y="7" width="64" height="40" rx="18" fill="#f2d9a2" />
              <circle cx="24" cy="22" r="3.2" fill="#d9b874" />
              <circle cx="44" cy="30" r="2.4" fill="#d9b874" />
              <circle cx="55" cy="18" r="2" fill="#d9b874" />
              <circle cx="31" cy="36" r="1.8" fill="#d9b874" />
              <motion.rect x="0" y="40" width="78" height="16" rx="8" fill="var(--pomodoro)" style={{ opacity: manchaPao }} />
            </g>
          </g>
        )}
      </svg>
      </div>

      <div className="manifesto-corpo">
        <p>
          É o maior elogio que uma cozinha pode receber. Por isso a nossa começa pelo pão: o cestino chega à mesa com
          ciabatta, grissini, focaccia e o molho de tomate da casa.
        </p>
        <ul className="manifesto-fatos">
          <li><strong>Massa fresca</strong> aberta na casa, do capeletti de burrata ao fettuccine.</li>
          <li><strong>Pizza de fermentação natural</strong> com tomate San Marzano DOP.</li>
          <li><strong>Um salão no meio do verde</strong> dentro do Doda Training Center, em Itatiba.</li>
        </ul>
      </div>
    </section>
  )
}

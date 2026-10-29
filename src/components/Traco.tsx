import { motion } from 'motion/react'

// O traço de molho, curto: a assinatura que se desenha sob o título do cardápio quando ele aparece.
const TRACO = 'M8 26 C 40 10, 70 34, 104 22 S 160 8, 192 18'
// A opacidade esconde o arremate redondo, que apareceria como um ponto antes de o traço começar.
const desenho = {
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true },
  transition: {
    pathLength: { duration: 1.1, delay: 0.35, ease: [0.45, 0, 0.2, 1] as const },
    opacity: { duration: 0.01, delay: 0.35 },
  },
}

export function Traco({ className = '' }: { className?: string }) {
  return (
    <svg className={`traco ${className}`} viewBox="0 0 200 40" aria-hidden="true">
      <motion.path d={TRACO} fill="none" stroke="var(--pomodoro)" strokeWidth="9" strokeLinecap="round" {...desenho} />
      <motion.path d={TRACO} fill="none" stroke="#e0624f" strokeWidth="2.5" strokeLinecap="round" strokeOpacity=".55" transform="translate(0 -2.5)" {...desenho} />
    </svg>
  )
}

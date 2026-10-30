import { motion } from 'motion/react'

// O traço de molho, curto: a assinatura sob o título do cardápio. Se desenha uma vez, como uma pincelada,
// quando entra na tela (com "reduzir movimento", já aparece pronto).
const TRACO = 'M8 26 C 40 10, 70 34, 104 22 S 160 8, 192 18'
const pincelada = {
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true, amount: 0.8 },
  transition: { duration: 0.9, ease: [0.45, 0, 0.2, 1] as const },
}

export function Traco({ className = '' }: { className?: string }) {
  return (
    <svg className={`traco ${className}`} viewBox="0 0 200 40" aria-hidden="true">
      <motion.path d={TRACO} fill="none" stroke="var(--pomodoro)" strokeWidth="9" strokeLinecap="round" {...pincelada} />
      <motion.path d={TRACO} fill="none" stroke="#e0624f" strokeWidth="2.5" strokeLinecap="round" strokeOpacity=".55" transform="translate(0 -2.5)" {...pincelada} />
    </svg>
  )
}

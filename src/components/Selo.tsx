import { useId } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Tomate } from './Marca'

// Selo redondo com o lema da casa em volta do tomate do logo. Gira conforme a página rola.
const TEXTO = 'Fare la scarpetta · Cucina italiana · Itatiba · '

export function Selo({ className = '' }: { className?: string }) {
  const id = useId()
  const reduzir = useReducedMotion()
  const { scrollY } = useScroll()
  const giro = useTransform(scrollY, (v) => (reduzir ? 0 : v * 0.1))

  return (
    <div className={`selo ${className}`} aria-hidden="true">
      <motion.svg viewBox="0 0 200 200" style={{ rotate: giro }}>
        <defs>
          <path id={id} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text className="selo-texto">
          <textPath href={`#${id}`} textLength="474" lengthAdjust="spacing">{TEXTO}</textPath>
        </text>
      </motion.svg>
      <Tomate className="selo-tomate" />
    </div>
  )
}

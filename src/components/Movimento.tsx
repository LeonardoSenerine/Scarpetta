import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'

export const curva = [0.2, 0.7, 0.2, 1] as const

// Título de seção. Fica parado: o movimento da página está concentrado no hero, na leitura do manifesto,
// no carrossel e nos pratos que giram.
export function Titulo({ id, className, children }: { id?: string; className?: string; children: string }) {
  return <h2 id={id} className={className}>{children}</h2>
}

type Trecho = { texto: string; lang?: string; italico?: boolean }

// Frase que vai ganhando tinta conforme a rolagem, como se fosse lida em voz alta.
export function Leitura({ id, trechos }: { id?: string; trechos: Trecho[] }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduzir = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })

  const palavras = trechos.flatMap((t) => t.texto.split(' ').map((p) => ({ ...t, texto: p })))
  const total = palavras.length

  return (
    <h2 id={id} ref={ref}>
      {palavras.map((p, i) => (
        <span key={i}>
          <PalavraLida
            texto={p.texto}
            lang={p.lang}
            italico={p.italico}
            progresso={scrollYProgress}
            ativo={!reduzir}
            de={i / total}
            ate={(i + 1) / total}
          />
          {i < total - 1 && ' '}
        </span>
      ))}
    </h2>
  )
}

function PalavraLida({ texto, lang, italico, progresso, ativo, de, ate }: {
  texto: string; lang?: string; italico?: boolean; progresso: MotionValue<number>; ativo: boolean; de: number; ate: number
}) {
  const opacidade = useTransform(progresso, [de, ate], ativo ? [0.16, 1] : [1, 1])
  return (
    <motion.span lang={lang} className={italico ? 'italico' : undefined} style={{ opacity: opacidade }}>
      {texto}
    </motion.span>
  )
}

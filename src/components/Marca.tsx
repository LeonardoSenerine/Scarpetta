import { motion, useReducedMotion } from 'motion/react'

// Assinatura da casa: "Scarpetta" manuscrito, o tomate do logo e "Cucina" espaçado.
// Com `animar`, o nome se escreve da esquerda para a direita, o tomate cai no lugar e "Cucina" aparece por último.

const curva = [0.45, 0, 0.2, 1] as const

function DesenhoTomate() {
  return (
    <>
      <circle cx="12" cy="14" r="8.5" fill="var(--pomodoro)" />
      <path d="M12 6.2c-1.6-1.8-4.2-1.9-5.6-1 1.6.2 2.6 1 3.2 2-1.7-.2-3 .4-3.8 1.4 1.9-.3 3.6.2 4.6 1 .5-1 1-2 1.6-3.4Zm0 0c1.6-1.8 4.2-1.9 5.6-1-1.6.2-2.6 1-3.2 2 1.7-.2 3 .4 3.8 1.4-1.9-.3-3.6.2-4.6 1-.5-1-1-2-1.6-3.4Z" fill="#3f7a3a" />
      <ellipse cx="9" cy="11.5" rx="2" ry="1.2" fill="#fff" opacity=".28" transform="rotate(-30 9 11.5)" />
    </>
  )
}

export function Tomate({ className = '' }: { className?: string }) {
  return (
    <svg className={`tomate ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <DesenhoTomate />
    </svg>
  )
}

export function Marca({ className = '', comCucina = true, animar = false }: { className?: string; comCucina?: boolean; animar?: boolean }) {
  const reduzir = useReducedMotion()

  if (!animar || reduzir) {
    return (
      <span className={`marca ${className}`}>
        <Tomate />
        <span className="marca-nome">Scarpetta</span>
        {comCucina && <span className="marca-cucina">Cucina</span>}
      </span>
    )
  }

  // whileInView: no hero, dispara assim que a página carrega.
  return (
    <motion.span className={`marca ${className}`} initial="oculto" whileInView="visivel" viewport={{ once: true, amount: 0.6 }}>
      <motion.svg
        className="tomate"
        viewBox="0 0 24 24"
        aria-hidden="true"
        variants={{
          oculto: { x: '-20%', y: '-180%', opacity: 0, rotate: -40 },
          visivel: { x: '-20%', y: '0%', opacity: 1, rotate: 0, transition: { delay: 1.05, type: 'spring', stiffness: 380, damping: 14 } },
        }}
      >
        <DesenhoTomate />
      </motion.svg>
      <motion.span
        className="marca-nome"
        variants={{
          oculto: { clipPath: 'inset(0 100% 0 0)' },
          visivel: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.3, delay: 0.1, ease: curva } },
        }}
      >
        Scarpetta
      </motion.span>
      {comCucina && (
        <motion.span
          className="marca-cucina"
          variants={{
            oculto: { opacity: 0, y: 6 },
            visivel: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.2, ease: curva } },
          }}
        >
          Cucina
        </motion.span>
      )}
    </motion.span>
  )
}

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Marca } from './Marca'
import { BotaoReserva } from './BotaoReserva'
import { useStatus } from '../lib/useStatus'
import { curva } from './Movimento'

// O texto e, ao lado (embaixo no celular), a pizza de peperoni da casa em plano aberto, com a tábua e a mesa.
// A foto abre como uma cortina de baixo para cima e, ao rolar, se afasta devagar.
// O index.html pré-carrega a mesma foto; se trocar aqui, troque lá.
export function Hero() {
  const status = useStatus()
  const quadro = useRef<HTMLDivElement>(null)
  const reduzir = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: quadro, offset: ['start start', 'end start'] })
  const escala = useTransform(scrollYProgress, [0, 1], reduzir ? [1, 1] : [1.04, 1])

  // Slogan, botões e status sobem em sequência logo na entrada.
  const sobe = (ordem: number) => ({
    initial: reduzir ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.35 + ordem * 0.12, ease: curva },
  })

  return (
    <section className="hero" id="topo">
      <div className="hero-conteudo">
        <h1 className="sr-only">Scarpetta Cucina, cozinha italiana afetiva em Itatiba</h1>
        <div className="hero-marca" aria-hidden="true">
          <Marca animar />
        </div>
        <motion.p className="hero-slogan" {...sobe(0)}>
          Massa feita à mão, pizza de fermentação natural e um salão no meio do verde, dentro do Doda Training Center.
        </motion.p>
        <motion.div className="hero-acoes" {...sobe(1)}>
          <BotaoReserva />
          <a className="botao botao-linha" href="#cardapio">Ver cardápio</a>
        </motion.div>
        <motion.p className={`hero-status ${status.aberto ? 'is-aberto' : ''}`} {...sobe(2)}>
          <span className="pulso" aria-hidden="true" />
          {status.texto}
        </motion.p>
      </div>

      <div className="hero-mesa" ref={quadro}>
        <motion.div
          className="hero-mesa-quadro"
          initial={reduzir ? false : { clipPath: 'inset(100% 0% 0% 0% round 4px)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 4px)' }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.65, 0, 0.25, 1] }}
        >
          <motion.img
            src="/img/pizza-mesa-640.webp"
            srcSet="/img/pizza-mesa-640.webp 640w, /img/pizza-mesa-1200.webp 1200w, /img/pizza-mesa-1500.webp 1500w"
            sizes="(min-width: 960px) 44vw, 86vw"
            alt="Pizza de peperoni artesanal da casa sobre a tábua de madeira, vista de cima"
            fetchPriority="high"
            style={{ scale: escala }}
          />
        </motion.div>
      </div>
    </section>
  )
}

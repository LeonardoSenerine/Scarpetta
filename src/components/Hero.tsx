import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Marca } from './Marca'
import { Foto } from './Foto'
import { useStatus } from '../lib/useStatus'
import { useMedia } from '../lib/useMedia'

// O texto à esquerda e, à direita, a pizza de peperoni da casa vista de cima.
// Desktop: a foto em plano aberto, com a tábua e a mesa, num quadro grande.
// Celular: a pizza recortada em círculo, que entra girando e gira com a rolagem.
// O index.html pré-carrega as duas imagens, cada uma só na sua largura de tela.
export function Hero() {
  const status = useStatus()
  const desktop = useMedia('(min-width: 960px)')

  return (
    <section className="hero" id="topo">
      <div className="hero-conteudo">
        <h1 className="sr-only">Scarpetta Cucina, cozinha italiana afetiva em Itatiba</h1>
        <div className="hero-marca" aria-hidden="true">
          <Marca animar />
        </div>
        <p className="hero-slogan">
          Massa feita à mão, pizza de fermentação natural e um salão no meio do verde, dentro do Doda Training Center.
        </p>
        <div className="hero-acoes">
          <a className="botao botao-creme" href="#reserva">Reservar mesa</a>
          <a className="botao botao-linha" href="#cardapio">Ver cardápio</a>
        </div>
        <p className={`hero-status ${status.aberto ? 'is-aberto' : ''}`}>
          <span className="pulso" aria-hidden="true" />
          {status.texto}
        </p>
      </div>

      {desktop ? <PizzaNaMesa /> : <PizzaRecortada />}
    </section>
  )
}

const ALT = 'Pizza de peperoni artesanal da casa, vista de cima'

// A foto abre como uma cortina de baixo para cima e, ao rolar, se afasta devagar.
function PizzaNaMesa() {
  const quadro = useRef<HTMLDivElement>(null)
  const reduzir = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: quadro, offset: ['start start', 'end start'] })
  const escala = useTransform(scrollYProgress, [0, 1], reduzir ? [1, 1] : [1.04, 1])

  return (
    <div className="hero-mesa" ref={quadro}>
      <motion.div
        className="hero-mesa-quadro"
        initial={reduzir ? false : { clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.65, 0, 0.25, 1] }}
      >
        <motion.img
          src="/img/pizza-mesa-1200.webp"
          srcSet="/img/pizza-mesa-1200.webp 1200w, /img/pizza-mesa-1500.webp 1500w"
          sizes="44vw"
          alt={ALT}
          fetchPriority="high"
          style={{ scale: escala }}
        />
      </motion.div>
    </div>
  )
}

function PizzaRecortada() {
  const reduzir = useReducedMotion()
  const { scrollY } = useScroll()
  const giro = useTransform(scrollY, (v) => (reduzir ? 0 : v * 0.06))

  return (
    <div className="hero-prato">
      <motion.div
        className="hero-prato-entrada"
        initial={reduzir ? false : { rotate: -110, scale: 0.82, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div className="hero-prato-giro" style={{ rotate: giro }}>
          <Foto nome="pizza-hero" alt={ALT} sizes="96vw" prioridade />
        </motion.div>
      </motion.div>
    </div>
  )
}

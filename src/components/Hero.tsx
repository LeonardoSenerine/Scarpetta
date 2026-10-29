import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Marca } from './Marca'
import { Foto } from './Foto'
import { useStatus } from '../lib/useStatus'

// A pizza saindo do forno a lenha: o alto da foto é escuro e segura o texto no celular;
// no desktop a foto ocupa a metade direita, de ponta a ponta. O index.html pré-carrega a mesma foto:
// se trocar o nome ou os tamanhos aqui, troque lá também.
const FOTO_HERO = 'forno'
const TAMANHOS_HERO = '(min-width: 960px) 46vw, 165vw'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const status = useStatus()
  const reduzir = useReducedMotion()

  // O conteúdo está visível desde o primeiro quadro; o único movimento é um leve zoom da foto ao rolar.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const escala = useTransform(scrollYProgress, [0, 1], [1, reduzir ? 1 : 1.08])

  return (
    <section className="hero" id="topo" ref={ref}>
      <motion.div className="hero-midia" style={{ scale: escala }}>
        {/* A foto entra levemente aproximada e assenta, como o olhar chegando perto do forno. */}
        <motion.div
          className="hero-assentar"
          initial={reduzir ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <Foto
            nome={FOTO_HERO}
            alt="Pizza de fermentação natural saindo do forno a lenha"
            sizes={TAMANHOS_HERO}
            prioridade
          />
        </motion.div>
      </motion.div>
      <div className="hero-veu" aria-hidden="true" />

      <div className="hero-conteudo">
        <h1 className="sr-only">Scarpetta Cucina, cozinha italiana afetiva em Itatiba</h1>
        <div className="hero-marca" aria-hidden="true">
          <Marca animar />
        </div>

        <p className="hero-slogan">
          Cozinha italiana afetiva, com massa feita à mão e pizza de fermentação natural, num salão cercado de verde em Itatiba.
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
    </section>
  )
}

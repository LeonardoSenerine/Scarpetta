import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Marca } from './Marca'
import { Foto } from './Foto'
import { useStatus } from '../lib/useStatus'

// O texto à esquerda e, à direita, um prato da casa visto de cima: a pizza de peperoni.
// Ela entra girando uma vez e depois só gira conforme a página rola.
export function Hero() {
  const status = useStatus()
  const reduzir = useReducedMotion()
  const { scrollY } = useScroll()
  const giro = useTransform(scrollY, (v) => (reduzir ? 0 : v * 0.06))

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

      <div className="hero-prato">
        <motion.div
          className="hero-prato-entrada"
          initial={reduzir ? false : { rotate: -110, scale: 0.82, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div className="hero-prato-giro" style={{ rotate: giro }}>
            {/* O index.html pré-carrega esta mesma foto; se trocar aqui, troque lá. */}
            <Foto nome="pizza-hero" alt="Pizza de peperoni artesanal da casa, vista de cima" sizes="(min-width: 960px) 46vw, 96vw" prioridade />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

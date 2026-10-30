import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Marca } from './Marca'
import { BotaoReserva } from './BotaoReserva'
import { useStatus } from '../lib/useStatus'
import { curva } from './Movimento'

// Gif transparente de 1px: a <source> que o usa impede o navegador de baixar a foto que não aparece naquela tela.
const VAZIO = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

// No celular, a pizza saindo do forno ocupa a tela toda, atrás do texto: entra com um zoom lento e, ao rolar,
// fica para trás devagar e escurece até a próxima seção. No desktop, o texto e, ao lado, a pizza de peperoni
// em plano aberto, que abre como uma cortina de baixo para cima.
// O index.html pré-carrega as duas fotos, cada uma na sua largura de tela; se trocar aqui, troque lá.
export function Hero() {
  const status = useStatus()
  const secao = useRef<HTMLElement>(null)
  const quadro = useRef<HTMLDivElement>(null)
  const reduzir = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: quadro, offset: ['start start', 'end start'] })
  const escala = useTransform(scrollYProgress, [0, 1], reduzir ? [1, 1] : [1.04, 1])
  const { scrollYProgress: saida } = useScroll({ target: secao, offset: ['start start', 'end start'] })
  const fundoY = useTransform(saida, [0, 1], reduzir ? ['0%', '0%'] : ['0%', '28%'])
  const sombra = useTransform(saida, [0, 0.9], [0, reduzir ? 0 : 0.85])

  // Slogan, botões e status sobem em sequência logo na entrada.
  const sobe = (ordem: number) => ({
    initial: reduzir ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.35 + ordem * 0.12, ease: curva },
  })

  return (
    <section className="hero" id="topo" ref={secao}>
      <motion.div className="hero-fundo" aria-hidden="true" style={{ y: fundoY }}>
        <motion.picture
          initial={reduzir ? false : { scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ scale: { duration: 2.8, ease: [0.25, 0.6, 0.2, 1] }, opacity: { duration: 1.2 } }}
        >
          <source media="(min-width: 960px)" srcSet={VAZIO} />
          <img
            src="/img/forno-640.webp"
            srcSet="/img/forno-640.webp 640w, /img/forno-1200.webp 1200w"
            sizes="100vw"
            alt=""
            fetchPriority="high"
          />
        </motion.picture>
        <motion.span className="hero-fundo-sombra" style={{ opacity: sombra }} />
      </motion.div>

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
          <picture>
            <source media="(max-width: 959px)" srcSet={VAZIO} />
            <motion.img
              src="/img/pizza-mesa-1200.webp"
              srcSet="/img/pizza-mesa-640.webp 640w, /img/pizza-mesa-1200.webp 1200w, /img/pizza-mesa-1500.webp 1500w"
              sizes="44vw"
              alt="Pizza de peperoni artesanal da casa sobre a tábua de madeira, vista de cima"
              fetchPriority="high"
              style={{ scale: escala }}
            />
          </picture>
        </motion.div>
      </div>
    </section>
  )
}

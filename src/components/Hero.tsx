import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Marca } from './Marca'
import { BotaoReserva } from './BotaoReserva'
import { useStatus } from '../lib/useStatus'
import { estadoExecutivo } from '../lib/executivo'
import { executivo } from '../data/executivo'
import { hojeEmItatiba, precoBR } from '../lib/horario'
import { curva } from './Movimento'

const diaDeHoje = () =>
  new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })
    .format(new Date(`${hojeEmItatiba()}T12:00:00Z`))

// A pizza saindo do forno, a mesma foto no celular (atrás do texto) e no desktop (a metade direita, até a borda).
// Entra com um zoom lento e, ao rolar, fica para trás e escurece. O bilhete de papel responde o que se quer saber
// primeiro: se está aberto e se tem executivo hoje.
// O index.html pré-carrega a mesma foto; se trocar aqui, troque lá.
export function Hero() {
  const status = useStatus()
  const secao = useRef<HTMLElement>(null)
  const reduzir = useReducedMotion()
  const { scrollYProgress: saida } = useScroll({ target: secao, offset: ['start start', 'end start'] })
  const fundoY = useTransform(saida, [0, 1], reduzir ? ['0%', '0%'] : ['0%', '22%'])
  const sombra = useTransform(saida, [0, 0.9], [0, reduzir ? 0 : 0.85])
  const { valeHoje, encerrado } = estadoExecutivo()

  // Slogan, botões e bilhete sobem em sequência logo na entrada.
  const sobe = (ordem: number) => ({
    initial: reduzir ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.35 + ordem * 0.12, ease: curva },
  })

  return (
    <section className="hero" id="topo" ref={secao}>
      <motion.div className="hero-fundo" aria-hidden="true" style={{ y: fundoY }}>
        <motion.img
          src="/img/forno-640.webp"
          srcSet="/img/forno-640.webp 640w, /img/forno-1200.webp 1200w"
          sizes="(min-width: 960px) 52vw, 100vw"
          alt=""
          fetchPriority="high"
          initial={reduzir ? false : { scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ scale: { duration: 2.8, ease: [0.25, 0.6, 0.2, 1] }, opacity: { duration: 1.2 } }}
        />
        <motion.span className="hero-fundo-sombra" style={{ opacity: sombra }} />
      </motion.div>

      <div className="hero-conteudo">
        <h1 className="sr-only">Scarpetta Cucina, cozinha italiana afetiva em Itatiba</h1>
        <div className="hero-marca" aria-hidden="true">
          <Marca animar />
        </div>
        <motion.p className="hero-slogan" {...sobe(0)}>
          Venha com fome e sem pressa: massa aberta na casa, pizza de fermentação natural e pão para não deixar
          sobrar nada do molho.
        </motion.p>
        <motion.div className="hero-acoes" {...sobe(1)}>
          <BotaoReserva />
          <a className="botao botao-linha" href="#cardapio">Ver cardápio</a>
        </motion.div>

        <motion.aside className="bilhete" aria-label="Hoje no Scarpetta" {...sobe(2)}>
          <div className="bilhete-papel">
            <p className="bilhete-dia">Hoje, {diaDeHoje()}</p>
            <p className={`bilhete-status ${status.aberto ? 'is-aberto' : ''}`}>
              <span className="pulso" aria-hidden="true" />
              {status.texto}
            </p>
            {!encerrado && (
              <a className="bilhete-executivo" href="#executivo">
                <span>Menu executivo {valeHoje ? 'servido hoje' : 'de quinta e sexta'}</span>
                <span className="pontilhado" aria-hidden="true" />
                <strong>{precoBR(executivo.preco)}</strong>
              </a>
            )}
          </div>
        </motion.aside>
      </div>
    </section>
  )
}

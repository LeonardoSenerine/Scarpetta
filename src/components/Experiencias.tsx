import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { info } from '../data/info'
import { Clipe } from './Clipe'
import { BotaoReserva } from './BotaoReserva'
import { Tomate } from './Marca'
import { Titulo } from './Movimento'

// Cada etapa é um trecho real gravado na cozinha e no salão do Scarpetta.
const etapas = [
  {
    clipe: 'molho',
    estacao: 'No forno',
    verbo: 'Condire',
    texto: 'Tomate San Marzano DOP espalhado na massa de fermentação natural, antes de ir ao forno.',
  },
  {
    clipe: 'girar',
    estacao: 'Na mesa',
    verbo: 'Arrotolare',
    texto: 'Do risoto com crocante de Parma ao spaghetti alla carbonara, enrolado no garfo.',
  },
  {
    clipe: 'adocar',
    estacao: 'Na sobremesa',
    verbo: 'Addolcire',
    texto: 'Vulcano alla Nutella: o bolinho quente se abre e encontra o gelato.',
  },
]

// A rolagem vertical vira um passeio horizontal: a seção fica presa na tela enquanto o trilho anda.
export function Experiencias() {
  const secao = useRef<HTMLElement>(null)
  const trilho = useRef<HTMLDivElement>(null)
  const reduzir = useReducedMotion()
  const [distancia, setDistancia] = useState(0)

  useLayoutEffect(() => {
    const t = trilho.current
    if (!t) return
    const medir = () => setDistancia(Math.max(0, t.scrollWidth - window.innerWidth))
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(t)
    window.addEventListener('resize', medir)
    return () => { ro.disconnect(); window.removeEventListener('resize', medir) }
  }, [])

  const { scrollYProgress } = useScroll({ target: secao, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * distancia)
  const preso = !reduzir && distancia > 0

  return (
    <section
      ref={secao}
      className={`experiencias ${preso ? 'is-presa' : ''}`}
      id="experiencias"
      aria-labelledby="experiencias-titulo"
      style={preso ? { height: `calc(100svh + ${distancia}px)` } : undefined}
    >
      <div className="experiencias-palco">
        <motion.div className="experiencias-trilho" ref={trilho} style={preso ? { x } : undefined}>
          <div className="experiencias-intro">
            <Titulo id="experiencias-titulo">Da bancada à mesa</Titulo>
            <p>
              Tudo o que chega à mesa passa pelas mãos de quem está na casa. São momentos reais, gravados na cozinha e no
              salão do Scarpetta.
            </p>
            <a className="link-claro" href={info.instagram} target="_blank" rel="noreferrer">
              Mais no {info.instagramUsuario}
            </a>
          </div>

          {etapas.map((e) => (
            <article key={e.clipe} className="etapa">
              <div className="etapa-midia">
                <Clipe nome={e.clipe} rotulo={e.texto} />
                <span className="etapa-estacao">{e.estacao}</span>
              </div>
              <h3 lang="it">{e.verbo}</h3>
              <p>{e.texto}</p>
            </article>
          ))}

          <article className="etapa etapa-final">
            <Tomate className="etapa-tomate" />
            <h3 lang="it">Fare la scarpetta</h3>
            <p>E no fim, o pão passa pelo prato até não sobrar nada do molho.</p>
            <BotaoReserva />
          </article>
        </motion.div>

        {preso && (
          <div className="experiencias-progresso" aria-hidden="true">
            <motion.span style={{ scaleX: scrollYProgress }} />
          </div>
        )}
      </div>
    </section>
  )
}

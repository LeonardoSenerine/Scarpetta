import { useRef } from 'react'
import {
  motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity,
} from 'motion/react'
import { turnosResumo } from '../lib/horario'
import { BotaoReserva } from './BotaoReserva'
import { curva } from './Movimento'

const pratos = ['Antipasti', 'Primi', 'Pizze', 'Risotti', 'Dolci']

// Mantém v entre min e max, dando a volta (para a faixa repetida andar sem emenda).
const voltar = (min: number, max: number, v: number) => {
  const faixa = max - min
  return ((((v - min) % faixa) + faixa) % faixa) + min
}

// Faixa de palavras que anda sozinha e acelera com a rolagem; ao rolar para cima, inverte o sentido.
function Faixa({ velocidade, sentido = 1 }: { velocidade: number; sentido?: 1 | -1 }) {
  const ref = useRef<HTMLDivElement>(null)
  const naTela = useInView(ref)
  const reduzir = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const rapidez = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const fator = useTransform(rapidez, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(base, (v) => `${voltar(-50, 0, v)}%`)
  const direcao = useRef<number>(sentido)

  useAnimationFrame((_, delta) => {
    if (!naTela || reduzir) return
    if (fator.get() < 0) direcao.current = -sentido
    else if (fator.get() > 0) direcao.current = sentido
    const passo = direcao.current * velocidade * (delta / 1000)
    base.set(base.get() + passo + passo * Math.abs(fator.get()))
  })

  const texto = pratos.join(' · ') + ' · '
  return (
    <div className="convite-faixa" ref={ref} aria-hidden="true">
      <motion.div className="convite-faixa-trilho" style={{ x }}>
        {[0, 1, 2, 3].map((i) => <span key={i}>{texto}</span>)}
      </motion.div>
    </div>
  )
}

// Chamada final, antes do rodapé: a faixa dos pratos corre com a rolagem e o convite sobe palavra por palavra.
export function Convite() {
  const palavras = ['A', 'mesa', 'está']
  return (
    <section className="convite" aria-labelledby="convite-titulo">
      <Faixa velocidade={2.2} />
      <div className="convite-conteudo">
        <motion.h2
          id="convite-titulo"
          initial="oculto"
          whileInView="visivel"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ staggerChildren: 0.09 }}
        >
          {[...palavras.map((p) => ({ p, italico: false })), { p: 'posta.', italico: true }].map(({ p, italico }) => (
            <span key={p} className="convite-palavra">
              <motion.span
                className={italico ? 'italico' : undefined}
                variants={{ oculto: { y: '110%' }, visivel: { y: '0%', transition: { duration: 0.8, ease: curva } } }}
              >
                {p}
              </motion.span>
            </span>
          ))}
        </motion.h2>
        <p className="convite-texto">Quinta a domingo, {turnosResumo()}.</p>
        <div className="convite-acoes">
          <BotaoReserva />
          <a className="botao botao-linha" href="#cardapio">Ver o cardápio</a>
        </div>
      </div>
      <Faixa velocidade={1.6} sentido={-1} />
    </section>
  )
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import { Tomate } from '../components/Marca'
import { BotaoReserva } from '../components/BotaoReserva'
import { Rodape } from '../components/Rodape'
import { Traco } from '../components/Traco'
import { curva } from '../components/Movimento'
import { TopoSimples } from './TopoSimples'
import '../styles.css'
import './paginas.css'

// Página não encontrada (404.html, servida pela Vercel em qualquer endereço que não existe).
// O zero do 404 é o tomate do logo, que cai no lugar e fica balançando de leve.
function NaoEncontrada() {
  const reduzir = useReducedMotion()
  return (
    <>
      <TopoSimples />
      <main className="erro" id="conteudo">
        <h1 className="sr-only">Página não encontrada</h1>
        <div className="erro-numero" aria-hidden="true">
          <span>4</span>
          <motion.span
            className="erro-tomate"
            initial={reduzir ? false : { y: '-140%', rotate: -50, opacity: 0 }}
            animate={{ y: '0%', rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 13, delay: 0.25 }}
          >
            <motion.span
              className="erro-tomate-balanco"
              animate={reduzir ? undefined : { rotate: [0, -6, 0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            >
              <Tomate />
            </motion.span>
          </motion.span>
          <span>4</span>
        </div>

        <motion.div
          className="erro-texto"
          initial={reduzir ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: curva }}
        >
          <p className="erro-titulo">Esse prato não está no cardápio.</p>
          <Traco />
          <p>
            A página que você procurou não existe ou mudou de lugar. Mas a cozinha continua aberta: escolha por onde
            seguir.
          </p>
          <div className="erro-acoes">
            <a className="botao botao-creme" href="/">Voltar ao início</a>
            <a className="botao botao-linha" href="/#cardapio">Ver o cardápio</a>
            <BotaoReserva variante="linha" href="/#reserva" />
          </div>
        </motion.div>
      </main>
      <Rodape />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <NaoEncontrada />
    </MotionConfig>
  </StrictMode>,
)

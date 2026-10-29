import { MotionConfig } from 'motion/react'
import { Cabecalho } from './components/Cabecalho'
import { Hero } from './components/Hero'
import { Reserva } from './components/Reserva'
import { Manifesto } from './components/Manifesto'
import { Experiencias } from './components/Experiencias'
import { Executivo } from './components/Executivo'
import { Cardapio } from './components/Cardapio'
import { Salao } from './components/Salao'
import { Eventos } from './components/Eventos'
import { EmCasa, Visite } from './components/Visite'
import { BarraAcoes, Rodape } from './components/Rodape'

// Ordem da visita: quem somos, como cozinhamos, o que comer, onde fica, eventos e como chegar.
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <a className="pular" href="#cardapio">Pular para o cardápio</a>
      <Cabecalho />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Reserva />
        <Manifesto />
        <Experiencias />
        <Executivo />
        <Cardapio />
        <Salao />
        <Eventos />
        <Visite />
        <EmCasa />
      </main>
      <Rodape />
      <BarraAcoes />
    </MotionConfig>
  )
}

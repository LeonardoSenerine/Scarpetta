import { MotionConfig } from 'motion/react'
import { Cabecalho } from './components/Cabecalho'
import { Hero } from './components/Hero'
import { Manifesto } from './components/Manifesto'
import { Faixa } from './components/Faixa'
import { Reserva } from './components/Reserva'
import { Executivo } from './components/Executivo'
import { Cardapio } from './components/Cardapio'
import { Cozinha } from './components/Cozinha'
import { Eventos } from './components/Eventos'
import { EmCasa, Visite } from './components/Visite'
import { BarraAcoes, Rodape } from './components/Rodape'

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
        <Faixa />
        <Executivo />
        <Cardapio />
        <Cozinha />
        <Eventos />
        <Visite />
        <EmCasa />
      </main>
      <Rodape />
      <BarraAcoes />
    </MotionConfig>
  )
}

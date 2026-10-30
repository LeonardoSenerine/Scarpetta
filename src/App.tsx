import { MotionConfig } from 'motion/react'
import { Cabecalho } from './components/Cabecalho'
import { Hero } from './components/Hero'
import { Manifesto } from './components/Manifesto'
import { Executivo } from './components/Executivo'
import { Cardapio } from './components/Cardapio'
import { Reserva } from './components/Reserva'
import { Salao } from './components/Salao'
import { Eventos } from './components/Eventos'
import { Visite } from './components/Visite'
import { BarraAcoes, Rodape } from './components/Rodape'
import { RolagemSuave } from './components/RolagemSuave'
import { Convite } from './components/Convite'

// Ordem da visita: primeiro o que se procura (o executivo de hoje, o cardápio, a reserva), depois a casa,
// o lugar, os eventos e como chegar. Fundos alternam entre papel e verde para a página não virar um bloco só.
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RolagemSuave />
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <a className="pular" href="#cardapio">Pular para o cardápio</a>
      <Cabecalho />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Executivo />
        <Cardapio />
        <Reserva />
        <Manifesto />
        <Salao />
        <Eventos />
        <Visite />
        <Convite />
      </main>
      <Rodape />
      <BarraAcoes />
    </MotionConfig>
  )
}

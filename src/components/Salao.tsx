import { info } from '../data/info'
import { Clipe } from './Clipe'
import { Titulo } from './Movimento'
import { BotaoReserva } from './BotaoReserva'

const lugares = [
  {
    clipe: 'interior',
    rotulo: 'Salão do Scarpetta com mesas de madeira, cadeiras de veludo verde e plantas',
    titulo: 'O salão',
    texto: 'Mesas de madeira, cadeiras de veludo verde e janelas amplas que dão para a mata.',
  },
  {
    clipe: 'salao',
    rotulo: 'Fachada do Scarpetta de dia, com o letreiro e a mata ao fundo',
    titulo: 'A varanda',
    texto: 'Mesas do lado de fora, à sombra das árvores. À noite, o varal de lâmpadas acende.',
  },
  {
    clipe: 'caminho',
    rotulo: 'Vista aérea do Doda Training Center, com lagos e mata',
    titulo: 'O caminho',
    texto: 'A casa fica dentro do Doda Training Center, entre lagos e mata, em Itatiba.',
  },
]

// O lugar em três vídeos reais da casa, cada um com seu nome: no celular, cartões que correm de lado;
// no desktop, lado a lado.
export function Salao() {
  return (
    <section className="salao" id="salao" aria-labelledby="salao-titulo">
      <div className="salao-cabeca">
        <p className="sobretitulo">O lugar</p>
        <Titulo id="salao-titulo">Uma casa no meio da mata</Titulo>
        <p className="salao-intro">
          Longe do barulho da cidade, o Scarpetta é um almoço sem pressa com a luz do dia entrando pelas janelas, ou um
          jantar com a varanda acesa.
        </p>
      </div>

      <ul className="salao-cartoes">
        {lugares.map((l) => (
          <li key={l.clipe} className="salao-cartao">
            <div className="salao-midia">
              <Clipe nome={l.clipe} rotulo={l.rotulo} />
            </div>
            <h3>{l.titulo}</h3>
            <p>{l.texto}</p>
          </li>
        ))}
      </ul>

      <div className="salao-acoes">
        <BotaoReserva variante="verde" />
        <a className="botao botao-linha-verde" href={info.rotas} target="_blank" rel="noreferrer">Como chegar</a>
      </div>
    </section>
  )
}

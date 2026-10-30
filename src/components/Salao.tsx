import { useState } from 'react'
import { Clipe } from './Clipe'
import { Titulo } from './Movimento'

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

// O lugar em tela cheia: o vídeo ocupa a seção inteira e as três abas trocam o que se vê.
// Só o vídeo da aba escolhida toca; os outros ficam parados por baixo, prontos para a troca.
export function Salao() {
  const [ativo, setAtivo] = useState(0)
  const lugar = lugares[ativo]

  return (
    <section className="salao" id="salao" aria-labelledby="salao-titulo">
      <div className="salao-videos">
        {lugares.map((l, i) => (
          <div key={l.clipe} className={`salao-video ${i === ativo ? 'is-ativo' : ''}`} aria-hidden={i !== ativo}>
            <Clipe nome={l.clipe} rotulo={l.rotulo} tocar={i === ativo} />
          </div>
        ))}
      </div>

      <div className="salao-conteudo">
        <Titulo id="salao-titulo">Uma casa no meio da mata</Titulo>
        <div className="salao-abas" role="tablist" aria-label="Conheça o lugar">
          {lugares.map((l, i) => (
            <button
              key={l.clipe}
              role="tab"
              id={`salao-aba-${i}`}
              aria-selected={i === ativo}
              aria-controls="salao-legenda"
              onClick={() => setAtivo(i)}
            >
              {l.titulo}
            </button>
          ))}
        </div>
        <p id="salao-legenda" role="tabpanel" aria-labelledby={`salao-aba-${ativo}`} className="salao-legenda" key={lugar.clipe}>
          {lugar.texto}
        </p>
        <a className="salao-rota" href="#visite">Como chegar</a>
      </div>
    </section>
  )
}

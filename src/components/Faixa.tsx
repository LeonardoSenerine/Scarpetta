import { Tomate } from './Marca'

// Faixa que corre devagar com o vocabulário da casa, separado pelo tomate do logo.
// Repete o que o manifesto diz, por isso fica escondida de leitores de tela.
const frases = [
  'Fare la scarpetta',
  'Pasta fresca fatta in casa',
  'Lievitazione naturale',
  'Pomodoro San Marzano DOP',
  'Da giovedì a domenica',
  'Itatiba, SP',
]

export function Faixa() {
  const grupo = (copia: number) => (
    <div className="faixa-grupo" key={copia}>
      {frases.map((f) => (
        <span key={f} className="faixa-item">
          <span lang="it">{f}</span>
          <Tomate />
        </span>
      ))}
    </div>
  )

  return (
    <div className="faixa" aria-hidden="true">
      <div className="faixa-trilho">{[0, 1].map(grupo)}</div>
    </div>
  )
}

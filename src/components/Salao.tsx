import { info } from '../data/info'
import { Clipe } from './Clipe'
import { Tomate } from './Marca'
import { Titulo } from './Movimento'

const ambientes = [
  { titulo: 'Salão com vista para a mata', texto: 'Janelas amplas, mesas de madeira e cadeiras de veludo verde.' },
  { titulo: 'Varanda com luzes', texto: 'À noite, o varal de lâmpadas acende sobre as mesas de fora.' },
  { titulo: 'Dentro do Doda Training Center', texto: 'Entre lagos e mata, na Av. Nossa Senhora das Graças, em Itatiba.' },
]

// O lugar, em vídeos reais da casa: a fachada de dia, o salão por dentro e a vista de cima.
export function Salao() {
  return (
    <section className="salao" id="salao" aria-labelledby="salao-titulo">
      <div className="salao-mosaico">
        {[
          <Clipe key="salao" nome="salao" rotulo="Fachada do Scarpetta de dia, com o letreiro e a mata ao fundo" />,
          <Clipe key="interior" nome="interior" rotulo="Salão do Scarpetta com mesas de madeira, cadeiras de veludo verde e plantas" />,
          <Clipe key="caminho" nome="caminho" rotulo="Vista aérea do Doda Training Center, com lagos e mata" />,
        ].map((midia, i) => (
          <div key={i} className={`salao-tile salao-tile-${i}`}>{midia}</div>
        ))}
      </div>

      <div className="salao-painel">
        <Titulo id="salao-titulo">Um almoço no meio do verde</Titulo>
        <p className="salao-intro">
          O Scarpetta fica dentro do Doda Training Center, cercado de mata. De dia a luz entra pelas janelas; à noite, a
          varanda acende.
        </p>
        <ul className="salao-lista">
          {ambientes.map((a) => (
            <li key={a.titulo}>
              <Tomate />
              <div>
                <h3>{a.titulo}</h3>
                <p>{a.texto}</p>
              </div>
            </li>
          ))}
        </ul>
        <a className="botao botao-verde" href={info.rotas} target="_blank" rel="noreferrer">Como chegar</a>
      </div>
    </section>
  )
}

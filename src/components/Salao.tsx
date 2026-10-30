import type { CSSProperties } from 'react'
import { motion } from 'motion/react'
import { info } from '../data/info'
import { Clipe } from './Clipe'
import { Tomate } from './Marca'
import { Titulo, curva } from './Movimento'

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
          <motion.div
            key={i}
            className={`salao-tile salao-tile-${i}`}
            initial={{ clipPath: 'inset(14% 14% 14% 14% round 24px)', opacity: 0.4 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 24px)', opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, delay: i * 0.15, ease: curva }}
          >
            {midia}
          </motion.div>
        ))}
      </div>

      <div className="salao-painel">
        <p className="salao-chamada">O salão</p>
        <Titulo id="salao-titulo">Um almoço no meio do verde</Titulo>
        <p className="salao-intro" data-revelar>
          O Scarpetta fica dentro do Doda Training Center, cercado de mata. De dia a luz entra pelas janelas; à noite, a
          varanda acende.
        </p>
        <ul className="salao-lista">
          {ambientes.map((a, i) => (
            <li key={a.titulo} data-revelar style={{ '--atraso': `${i * 120}ms` } as CSSProperties}>
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

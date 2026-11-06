import { Vitrine } from './Vitrine'
import { Leitura } from './Movimento'

const fatos = [
  { titulo: 'Massa fresca', texto: 'aberta na casa, do capeletti de burrata ao fettuccine.' },
  { titulo: 'Pizza de fermentação natural', texto: 'com tomate San Marzano DOP.' },
  { titulo: 'Um salão no meio do verde', texto: 'dentro do Doda Training Center, em Itatiba.' },
]

// O nome da casa explicado: fare la scarpetta. A definição ganha tinta conforme é lida e, embaixo,
// a vitrine apresenta os pratos um a um.
export function Manifesto() {
  return (
    <section className="manifesto" aria-labelledby="manifesto-titulo">
      <div className="manifesto-texto">
        <p className="verbete">
          <span lang="it">scar·pét·ta</span> <em>substantivo feminino</em>
        </p>
        <Leitura
          id="manifesto-titulo"
          trechos={[
            { texto: 'Fare la scarpetta', lang: 'it', italico: true },
            { texto: 'é passar o pão no prato até não sobrar nada do molho.' },
          ]}
        />
        <p className="manifesto-intro">
          É o maior elogio que uma cozinha pode receber. Por isso a nossa começa pelo pão: o cestino chega à mesa com
          ciabatta, grissini, focaccia e o molho de tomate da casa.
        </p>
        <ul className="manifesto-fatos">
          {fatos.map((f) => (
            <li key={f.titulo}>
              <strong>{f.titulo}</strong> {f.texto}
            </li>
          ))}
        </ul>
      </div>

      <Vitrine />
    </section>
  )
}

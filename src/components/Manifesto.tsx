import { info } from '../data/info'
import { Clipe } from './Clipe'

const fatos = [
  { titulo: 'Massa fresca', texto: 'aberta na casa, do capeletti de burrata ao fettuccine.' },
  { titulo: 'Pizza de fermentação natural', texto: 'com tomate San Marzano DOP.' },
  { titulo: 'Risotti', texto: 'do alho-poró com brie e crocante de Parma ao de camarão.' },
]

// Três momentos reais gravados na cozinha e no salão, cada um com um verbo da cozinha italiana.
const momentos = [
  { clipe: 'molho', verbo: 'Condire', texto: 'Tomate San Marzano espalhado na massa de fermentação natural, antes do forno.' },
  { clipe: 'girar', verbo: 'Arrotolare', texto: 'Do spaghetti alla carbonara ao risoto com crocante de Parma, enrolado no garfo.' },
  { clipe: 'adocar', verbo: 'Addolcire', texto: 'Vulcano alla Nutella: o bolinho quente se abre e encontra o gelato.' },
]

// A casa: o nome explicado (fare la scarpetta) e, embaixo, a cozinha em três vídeos curtos.
export function Manifesto() {
  return (
    <section className="manifesto" id="casa" aria-labelledby="manifesto-titulo">
      <div className="manifesto-texto">
        <p className="verbete">
          <span lang="it">scar·pét·ta</span> <em>substantivo feminino</em>
        </p>
        <h2 id="manifesto-titulo">
          <span lang="it" className="italico">Fare la scarpetta</span> é passar o pão no prato até não sobrar nada do
          molho.
        </h2>
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

      <ol className="momentos" aria-label="Na cozinha do Scarpetta">
        {momentos.map((m) => (
          <li key={m.clipe} className="momento">
            <div className="momento-midia">
              <Clipe nome={m.clipe} rotulo={m.texto} />
            </div>
            <h3 lang="it">{m.verbo}</h3>
            <p>{m.texto}</p>
          </li>
        ))}
      </ol>
      <a className="manifesto-instagram" href={info.instagram} target="_blank" rel="noreferrer">
        Mais da cozinha no {info.instagramUsuario}
      </a>
    </section>
  )
}

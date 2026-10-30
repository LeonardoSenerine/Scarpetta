import { Foto } from './Foto'
import { Leitura } from './Movimento'

const fatos = [
  { titulo: 'Massa fresca', texto: 'aberta na casa, do capeletti de burrata ao fettuccine.' },
  { titulo: 'Pizza de fermentação natural', texto: 'com tomate San Marzano DOP.' },
  { titulo: 'Um salão no meio do verde', texto: 'dentro do Doda Training Center, em Itatiba.' },
]

// Pratos em que o pão faz a scarpetta: molho de tomate, ragù, manteiga e parmesão.
const pratos = [
  { nome: 'arancini-bruschetta', alt: 'Arancini de risoto e bruschettas de tomate em travessas sobre a mesa de madeira' },
  { nome: 'melanzane', alt: 'Melanzane alla parmigiana sobre molho de tomates frescos, com folhas de manjericão' },
  { nome: 'fettuccine-garfo', alt: 'Garfo enrolando fettuccine fresco ao molho de manteiga e parmesão' },
  { nome: 'parmigiana', alt: 'Filetto alla parmigiana gratinado sobre molho de tomate, com batatas rústicas ao fundo' },
  { nome: 'lasagna-detalhe', alt: 'Lasagna alla bolognese em detalhe, com camadas de massa fresca e sálvia' },
  { nome: 'penne', alt: 'Penne alla vodka no molho cremoso de tomate' },
  { nome: 'robalo-quadrado', alt: 'Robalo em crosta de ervas sobre purê de mandioquinha' },
  { nome: 'budino', alt: 'Budino al pistacchio com calda e pistache crocante' },
]

// O nome da casa explicado: fare la scarpetta. A definição ganha tinta conforme é lida e, embaixo,
// uma faixa de pratos corre devagar de ponta a ponta (parada para quem pede menos movimento).
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

      <div className="faixa" aria-label="Pratos da casa" role="region">
        <ul className="faixa-trilho">
          {[...pratos, ...pratos].map((p, i) => (
            <li key={i} className="faixa-foto" aria-hidden={i >= pratos.length || undefined}>
              <Foto nome={p.nome} alt={i >= pratos.length ? '' : p.alt} sizes="(min-width: 960px) 18rem, 46vw" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

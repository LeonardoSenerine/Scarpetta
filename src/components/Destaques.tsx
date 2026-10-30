import { cardapio } from '../data/cardapio'
import { precoBR } from '../lib/horario'
import { Foto } from './Foto'

// Quatro pratos da casa numa fileira, como pratos vistos de cima: no celular, correm de lado.
// O nome tem de bater com o cardápio, de onde vêm preço e categoria.
const itens = [
  { prato: 'Fettuccine Alfredo di Roma', foto: 'fettuccine' },
  { prato: 'Risotto ai gamberi', foto: 'risotto-gamberi' },
  { prato: 'Parma', foto: 'pizza-parma', rotulo: 'Pizza Parma' },
  { prato: 'Medaglioni di filetto e risotto alla milanese', foto: 'medaglioni-quadrado', rotulo: 'Medaglioni di filetto' },
]

const encontrar = (nome: string) => {
  for (const c of cardapio) {
    const prato = c.pratos.find((p) => p.nome === nome)
    if (prato) return { prato, categoria: c.nome }
  }
  return null
}

export function Destaques() {
  return (
    <ul className="destaques" aria-label="Pratos da casa">
      {itens.map(({ prato: nome, foto, rotulo }) => {
        const dados = encontrar(nome)
        return (
          <li key={foto} className="destaque">
            <div className="destaque-prato">
              <Foto nome={foto} alt={rotulo ?? nome} sizes="(min-width: 960px) 18vw, 56vw" />
            </div>
            {dados && <p className="destaque-categoria" lang="it">{dados.categoria}</p>}
            <h3 lang="it">{rotulo ?? nome}</h3>
            {dados && <p className="destaque-preco">{precoBR(dados.prato.preco)}</p>}
          </li>
        )
      })}
    </ul>
  )
}

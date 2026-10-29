import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { cardapio } from '../data/cardapio'
import { precoBR } from '../lib/horario'
import { Foto } from './Foto'
import { curva } from './Movimento'

// Pratos da casa, servidos um a um: o prato gira devagar conforme passa pela tela.
// O nome tem de bater com o cardápio, de onde vêm descrição, preço e categoria.
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
      {itens.map((d, i) => <Destaque key={d.foto} {...d} indice={i} />)}
    </ul>
  )
}

function Destaque({ prato: nome, foto, rotulo, indice }: (typeof itens)[number] & { indice: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const reduzir = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const sentido = indice % 2 ? -1 : 1
  const giro = useTransform(scrollYProgress, [0, 1], reduzir ? [0, 0] : [-22 * sentido, 22 * sentido])
  const dados = encontrar(nome)

  return (
    <li ref={ref} className={`destaque ${indice % 2 ? 'destaque-invertido' : ''}`}>
      <motion.div className="destaque-prato" style={{ rotate: giro }}>
        <Foto nome={foto} alt={rotulo ?? nome} sizes="(min-width: 960px) 30vw, 62vw" />
      </motion.div>
      <motion.div
        className="destaque-texto"
        initial={{ opacity: 0, x: 30 * sentido }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: curva }}
      >
        {dados && <p className="destaque-categoria" lang="it">{dados.categoria}</p>}
        <h3 lang="it">{rotulo ?? nome}</h3>
        {dados && <p className="destaque-desc">{dados.prato.descricao}</p>}
        {dados && <p className="destaque-preco">{precoBR(dados.prato.preco)}</p>}
      </motion.div>
    </li>
  )
}

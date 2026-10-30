import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cardapio, especialDoChef, type Prato } from '../data/cardapio'
import { info } from '../data/info'
import { precoBR } from '../lib/horario'
import { Foto } from './Foto'
import { Titulo } from './Movimento'
import { Traco } from './Traco'
import { Destaques } from './Destaques'

const LIMITE = 8

export function Cardapio() {
  const [ativa, setAtiva] = useState(cardapio[0].id)
  const [expandida, setExpandida] = useState(false)
  const [aberto, setAberto] = useState<Prato | null>(null)
  const [bordas, setBordas] = useState({ inicio: false, fim: false })
  const trilho = useRef<HTMLDivElement>(null)
  const abas = useRef<Record<string, HTMLButtonElement | null>>({})
  const reduzir = useReducedMotion()

  const categoria = cardapio.find((c) => c.id === ativa)!
  const visiveis = expandida ? categoria.pratos : categoria.pratos.slice(0, LIMITE)
  const ocultos = categoria.pratos.length - visiveis.length

  // Indica se há abas escondidas à esquerda ou à direita (só acontece em telas estreitas).
  const medirBordas = useCallback(() => {
    const t = trilho.current
    if (!t) return
    setBordas({ inicio: t.scrollLeft > 4, fim: t.scrollLeft + t.clientWidth < t.scrollWidth - 4 })
  }, [])

  useEffect(() => {
    medirBordas()
    window.addEventListener('resize', medirBordas)
    return () => window.removeEventListener('resize', medirBordas)
  }, [medirBordas])

  const escolher = (id: string) => {
    setAtiva(id)
    setExpandida(false)
    // Centraliza a aba rolando só a fileira de abas, sem mexer na rolagem da página.
    const t = trilho.current
    const aba = abas.current[id]
    if (t && aba) {
      t.scrollTo({ left: aba.offsetLeft - (t.clientWidth - aba.offsetWidth) / 2, behavior: reduzir ? 'auto' : 'smooth' })
    }
  }

  const navegar = (e: KeyboardEvent) => {
    const i = cardapio.findIndex((c) => c.id === ativa)
    const prox = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null
    if (prox === null) return
    const alvo = cardapio[(prox + cardapio.length) % cardapio.length].id
    escolher(alvo)
    abas.current[alvo]?.focus({ preventScroll: true })
  }

  return (
    <section className="cardapio" id="cardapio" aria-labelledby="cardapio-titulo">
      <div className="cardapio-cabeca">
        <Titulo id="cardapio-titulo">O cardápio</Titulo>
        <Traco />
        <p data-revelar>Receitas italianas de sempre e algumas criações da casa. Os pratos com foto abrem em tamanho maior.</p>
      </div>

      <Destaques />

      <div className={`abas-moldura ${bordas.inicio ? 'tem-antes' : ''} ${bordas.fim ? 'tem-depois' : ''}`}>
        <div className="abas" role="tablist" aria-label="Categorias do cardápio" onKeyDown={navegar} ref={trilho} onScroll={medirBordas}>
          {cardapio.map((c) => (
            <button
              key={c.id}
              ref={(el) => { abas.current[c.id] = el }}
              role="tab"
              id={`aba-${c.id}`}
              aria-selected={c.id === ativa}
              aria-controls="painel-cardapio"
              tabIndex={c.id === ativa ? 0 : -1}
              className="aba"
              onClick={() => escolher(c.id)}
              lang="it"
            >
              {c.nome}
              {c.id === ativa && <motion.span className="aba-marcador" layoutId="aba-marcador" transition={{ type: 'spring', stiffness: 420, damping: 36 }} />}
            </button>
          ))}
        </div>
      </div>

      <div id="painel-cardapio" role="tabpanel" aria-labelledby={`aba-${ativa}`} className="cardapio-painel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={ativa}
            initial={{ opacity: 0, y: reduzir ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduzir ? 0 : -8 }}
            transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {categoria.intro && <p className="cardapio-intro">{categoria.intro}</p>}
            <ul className="pratos">
              {visiveis.map((p, i) => (
                <ItemPrato key={p.nome} prato={p} ordem={i} onVer={() => setAberto(p)} />
              ))}
            </ul>
            {ocultos > 0 && (
              <button className="botao botao-linha cardapio-mais" onClick={() => setExpandida(true)}>
                Ver mais {ocultos} opções
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <aside className="especial" data-revelar>
        <p className="especial-rotulo">Especial do chef</p>
        <p className="especial-nome" lang="it">{especialDoChef.nome}</p>
        <p className="especial-desc">{especialDoChef.descricao}</p>
        <p className="especial-preco">{precoBR(especialDoChef.preco)}</p>
      </aside>

      <p className="cardapio-rodape">
        Drinks, carta de vinhos, piadinas e menu kids estão no{' '}
        <a href={info.cardapioDigital} target="_blank" rel="noreferrer">cardápio digital completo</a>.
      </p>

      {aberto?.foto && <Lupa prato={aberto} foto={aberto.foto} onFechar={() => setAberto(null)} />}
    </section>
  )
}

// Foto ampliada num <dialog> nativo: o navegador prende o foco e torna o resto da página inerte.
// Ao fechar, o foco volta para a miniatura que abriu a foto.
function Lupa({ prato, foto, onFechar }: { prato: Prato; foto: string; onFechar: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    const origem = document.activeElement as HTMLElement | null
    d.showModal()
    document.documentElement.classList.add('sem-rolagem')
    return () => {
      if (d.open) d.close()
      document.documentElement.classList.remove('sem-rolagem')
      origem?.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={ref}
      className="lupa"
      data-lenis-prevent
      aria-label={prato.nome}
      onCancel={(e) => { e.preventDefault(); onFechar() }}
      onClick={(e) => { if (e.target === e.currentTarget) onFechar() }}
    >
      <figure className="lupa-foto">
        {/* A miniatura (já em cache) fica por baixo enquanto a versão grande carrega. */}
        <div className="lupa-imagem" style={{ backgroundImage: `url(/img/${foto}-640.webp)` }}>
          <Foto nome={foto} alt={prato.nome} sizes="(min-width: 900px) 40vw, 92vw" prioridade />
        </div>
        <figcaption>
          <span lang="it">{prato.nome}</span>
          <span>{precoBR(prato.preco)}</span>
        </figcaption>
      </figure>
      <button className="lupa-fechar" onClick={onFechar} autoFocus>Fechar</button>
    </dialog>
  )
}

// `ordem` escalona a entrada dos pratos (animação em CSS) a cada troca de categoria.
function ItemPrato({ prato, ordem, onVer }: { prato: Prato; ordem: number; onVer: () => void }) {
  const estilo = { '--ordem': ordem } as CSSProperties
  const conteudo = (
    <>
      <span className="prato-linha">
        <span className="prato-nome" lang="it">{prato.nome}</span>
        <span className="prato-preco">{precoBR(prato.preco)}</span>
      </span>
      <span className="prato-desc">{prato.descricao}</span>
      {prato.nota && <span className="prato-nota">{prato.nota}</span>}
    </>
  )

  if (!prato.foto) return <li className="prato" style={estilo}>{conteudo}</li>

  return (
    <li className="prato tem-foto" style={estilo}>
      <button className="prato-botao" onClick={onVer} aria-label={`Ver foto: ${prato.nome}`}>
        <span className="prato-miniatura">
          <Foto nome={prato.foto} alt="" sizes="120px" />
        </span>
      </button>
      <span className="prato-texto">{conteudo}</span>
    </li>
  )
}

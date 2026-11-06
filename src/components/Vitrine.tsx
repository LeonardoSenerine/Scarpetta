import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { cardapio } from '../data/cardapio'
import { precoBR } from '../lib/horario'
import { Foto } from './Foto'
import { curva } from './Movimento'

// Pratos em que o pão faz a scarpetta. O nome tem de bater com o cardápio, de onde vêm categoria,
// descrição, preço e observação.
const pratos = [
  { foto: 'lasagna-detalhe', nome: 'Lasagna alla bolognese', alt: 'Lasagna alla bolognese em detalhe, com camadas de massa fresca e sálvia' },
  { foto: 'melanzane', nome: 'Melanzane alla parmigiana', alt: 'Melanzane alla parmigiana sobre molho de tomates frescos, com folhas de manjericão' },
  { foto: 'risotto-porro', nome: 'Risotto al porro, brie e croccante di Parma', alt: 'Risoto de alho-poró com brie e crocante de presunto de Parma, num prato fundo verde' },
  { foto: 'parmigiana', nome: 'Filetto alla parmigiana', alt: 'Filetto alla parmigiana gratinado sobre molho de tomate, com batatas rústicas ao fundo' },
  { foto: 'penne', nome: 'Penne alla vodka', alt: 'Penne alla vodka no molho cremoso de tomate' },
  { foto: 'robalo-quadrado', nome: 'Robalo in crosta di erbe', alt: 'Robalo em crosta de ervas sobre purê de mandioquinha' },
  { foto: 'budino', nome: 'Budino al pistacchio', alt: 'Budino al pistacchio com calda e pistache crocante' },
]

const fichas = pratos.map((p) => {
  for (const c of cardapio) {
    const prato = c.pratos.find((x) => x.nome === p.nome)
    if (prato) return { ...p, categoria: c.nome, prato }
  }
  throw new Error(`Prato fora do cardápio: ${p.nome}`)
})

const INTERVALO = 6500

// Um prato por vez: a foto grande e, ao lado, a ficha do prato como numa carta impressa.
// Avança sozinho devagar enquanto está na tela; para ao passar o mouse, ao focar e no botão de pausa.
// Com "reduzir movimento", só muda quando a pessoa pede. No celular, dá para arrastar para os lados.
export function Vitrine() {
  const raiz = useRef<HTMLDivElement>(null)
  const naTela = useInView(raiz, { amount: 0.4 })
  const reduzir = useReducedMotion()
  const [atual, setAtual] = useState(0)
  const [pausado, setPausado] = useState(false)
  const [suspenso, setSuspenso] = useState(false)
  const inicioArraste = useRef<number | null>(null)

  const total = fichas.length
  const ir = (i: number) => setAtual(i)
  // Relativo ao prato atual no momento do clique, para cliques rápidos seguidos contarem todos.
  const passo = (d: number) => setAtual((a) => (a + d + total) % total)
  const tocando = !reduzir && !pausado && !suspenso && naTela

  useEffect(() => {
    if (!tocando) return
    const id = setTimeout(() => setAtual((a) => (a + 1) % total), INTERVALO)
    return () => clearTimeout(id)
  }, [tocando, atual, total])

  const teclado = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); passo(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); passo(-1) }
  }
  const soltar = (e: PointerEvent) => {
    if (inicioArraste.current === null) return
    const dx = e.clientX - inicioArraste.current
    inicioArraste.current = null
    if (Math.abs(dx) > 40) passo(dx < 0 ? 1 : -1)
  }

  const f = fichas[atual]

  return (
    <div
      ref={raiz}
      className="vitrine"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Pratos da casa"
      onKeyDown={teclado}
      onMouseEnter={() => setSuspenso(true)}
      onMouseLeave={() => setSuspenso(false)}
      onFocus={() => setSuspenso(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setSuspenso(false) }}
    >
      <div
        className="vitrine-quadro"
        onPointerDown={(e) => { inicioArraste.current = e.clientX }}
        onPointerUp={soltar}
        onPointerCancel={() => { inicioArraste.current = null }}
      >
        {fichas.map((p, i) => (
          <div
            key={p.foto}
            className={`vitrine-foto ${i === atual ? 'is-atual' : ''}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${total}`}
            aria-hidden={i !== atual}
          >
            <Foto nome={p.foto} alt={p.alt} sizes="(min-width: 960px) 44vw, 92vw" />
          </div>
        ))}
      </div>

      <div className="vitrine-ficha">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={f.foto}
            initial={reduzir ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduzir ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: curva }}
            aria-live={tocando ? 'off' : 'polite'}
          >
            <p className="vitrine-categoria" lang="it">{f.categoria}</p>
            <h3 lang="it">{f.prato.nome}</h3>
            <p className="vitrine-descricao">{f.prato.descricao}</p>
            <p className="vitrine-preco">
              {precoBR(f.prato.preco)}
              {f.prato.nota && <span>{f.prato.nota}</span>}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="vitrine-controles">
          <ol className="vitrine-indice">
            {fichas.map((p, i) => (
              <li key={p.foto}>
                <button
                  className={i === atual ? 'is-atual' : undefined}
                  aria-label={`Ver ${p.prato.nome}`}
                  aria-current={i === atual || undefined}
                  onClick={() => ir(i)}
                >
                  <span style={i === atual && tocando ? { animationDuration: `${INTERVALO}ms` } : undefined} />
                </button>
              </li>
            ))}
          </ol>
          <p className="vitrine-contador" aria-hidden="true">
            {String(atual + 1).padStart(2, '0')} <span>/ {String(total).padStart(2, '0')}</span>
          </p>
          <div className="vitrine-botoes">
            <button aria-label="Prato anterior" onClick={() => passo(-1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
            <button aria-label="Próximo prato" onClick={() => passo(1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
            {!reduzir && (
              <button aria-label={pausado ? 'Retomar a troca automática' : 'Pausar a troca automática'} aria-pressed={pausado} onClick={() => setPausado((v) => !v)}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {pausado ? <path d="M8 5.5v13l10.5-6.5z" className="cheio" /> : <path d="M8.5 5.5v13M15.5 5.5v13" />}
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'

type Opcao = { valor: string; rotulo: string }

type Props = {
  rotulo: string
  opcional?: boolean
  valor: string
  opcoes: Opcao[]
  onChange: (valor: string) => void
}

// Lista de escolha no estilo do site, no lugar do <select> nativo (cujo menu aberto não aceita estilo).
// Segue o padrão de combobox só de leitura: setas, Home/End, Enter, Esc e busca pela primeira letra.
export function Seletor({ rotulo, opcional, valor, opcoes, onChange }: Props) {
  const id = useId()
  const [aberto, setAberto] = useState(false)
  const [ativo, setAtivo] = useState(0)
  const raiz = useRef<HTMLDivElement>(null)
  const botao = useRef<HTMLButtonElement>(null)
  const lista = useRef<HTMLUListElement>(null)

  const indice = Math.max(0, opcoes.findIndex((o) => o.valor === valor))
  const atual = opcoes[indice]

  // Fecha ao clicar fora.
  useEffect(() => {
    if (!aberto) return
    const fora = (e: PointerEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAberto(false)
    }
    document.addEventListener('pointerdown', fora)
    return () => document.removeEventListener('pointerdown', fora)
  }, [aberto])

  // Mantém a opção ativa visível quando a lista rola.
  useEffect(() => {
    if (aberto) lista.current?.children[ativo]?.scrollIntoView({ block: 'nearest' })
  }, [aberto, ativo])

  const abrir = () => {
    setAtivo(indice)
    setAberto(true)
  }

  const escolher = (i: number) => {
    onChange(opcoes[i].valor)
    setAberto(false)
    botao.current?.focus()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    const ultimo = opcoes.length - 1
    if (!aberto) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        abrir()
      }
      return
    }
    const mover = (i: number) => {
      e.preventDefault()
      setAtivo(Math.min(ultimo, Math.max(0, i)))
    }
    if (e.key === 'ArrowDown') mover(ativo + 1)
    else if (e.key === 'ArrowUp') mover(ativo - 1)
    else if (e.key === 'Home') mover(0)
    else if (e.key === 'End') mover(ultimo)
    else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      escolher(ativo)
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setAberto(false)
    } else if (e.key === 'Tab') setAberto(false)
    else if (e.key.length === 1) {
      const letra = e.key.toLowerCase()
      const achou = opcoes.findIndex((o, i) => i > ativo && o.rotulo.toLowerCase().startsWith(letra))
      const i = achou >= 0 ? achou : opcoes.findIndex((o) => o.rotulo.toLowerCase().startsWith(letra))
      if (i >= 0) mover(i)
    }
  }

  return (
    <div className={`campo seletor ${aberto ? 'is-aberto' : ''}`} ref={raiz}>
      <span id={`${id}-rotulo`}>
        {rotulo} {opcional && <em>(opcional)</em>}
      </span>
      <button
        ref={botao}
        type="button"
        role="combobox"
        className="seletor-botao"
        aria-haspopup="listbox"
        aria-expanded={aberto}
        aria-controls={`${id}-lista`}
        aria-labelledby={`${id}-rotulo ${id}-valor`}
        aria-activedescendant={aberto ? `${id}-${ativo}` : undefined}
        onClick={() => (aberto ? setAberto(false) : abrir())}
        onKeyDown={onKeyDown}
      >
        <span id={`${id}-valor`}>{atual?.rotulo}</span>
        <svg className="seletor-seta" viewBox="0 0 12 8" aria-hidden="true">
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      <AnimatePresence>
        {aberto && (
          <motion.ul
            ref={lista}
            id={`${id}-lista`}
            role="listbox"
            aria-labelledby={`${id}-rotulo`}
            className="seletor-lista"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {opcoes.map((o, i) => (
              <li
                key={o.valor}
                id={`${id}-${i}`}
                role="option"
                aria-selected={o.valor === valor}
                className={`seletor-opcao ${i === ativo ? 'is-ativa' : ''}`}
                onPointerEnter={() => setAtivo(i)}
                onClick={() => escolher(i)}
              >
                <span>{o.rotulo}</span>
                {o.valor === valor && (
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

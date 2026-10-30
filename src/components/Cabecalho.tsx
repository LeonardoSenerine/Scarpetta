import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Marca } from './Marca'
import { BotaoReserva } from './BotaoReserva'
import { info } from '../data/info'
import { useNaReserva } from '../lib/useNaReserva'

const links = [
  { href: '#executivo', rotulo: 'Menu executivo' },
  { href: '#cardapio', rotulo: 'Cardápio' },
  { href: '#reserva', rotulo: 'Reservas' },
  { href: '#salao', rotulo: 'O salão' },
  { href: '#eventos', rotulo: 'Eventos' },
  { href: '#visite', rotulo: 'Como chegar' },
]

export function Cabecalho() {
  const [solido, setSolido] = useState(false)
  const [oculto, setOculto] = useState(false)
  const [aberto, setAberto] = useState(false)
  const naReserva = useNaReserva()

  // Some ao rolar para baixo depois do hero e volta ao rolar para cima.
  useEffect(() => {
    let anterior = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolido(y > window.innerHeight * 0.6)
      if (Math.abs(y - anterior) > 6) {
        setOculto(y > anterior && y > window.innerHeight)
        anterior = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('cabecalho-oculto', oculto && !aberto)
  }, [oculto, aberto])

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aberto])

  return (
    <>
      <header className={`cabecalho ${solido ? 'is-solido' : ''} ${oculto && !aberto ? 'is-oculto' : ''}`}>
        <a href="#topo" className="cabecalho-marca" aria-label="Scarpetta Cucina, início">
          <Marca comCucina={false} />
        </a>
        <nav className="cabecalho-nav" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.rotulo}</a>
          ))}
        </nav>
        <BotaoReserva className={`cabecalho-reserva ${naReserva ? 'is-escondido' : ''}`} />
        <button
          className="cabecalho-menu"
          aria-expanded={aberto}
          aria-controls="menu-movel"
          onClick={() => setAberto((v) => !v)}
        >
          <span className="sr-only">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
          <span className={`hamburguer ${aberto ? 'is-aberto' : ''}`} aria-hidden="true"><i /><i /></span>
        </button>
      </header>

      <AnimatePresence>
        {aberto && (
          <motion.div
            id="menu-movel"
            className="menu-movel"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.6rem) 2.2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.6rem) 2.2rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.6rem) 2.2rem)' }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          >
            <nav aria-label="Menu">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setAberto(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.05, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  {l.rotulo}
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="menu-movel-rodape"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <BotaoReserva onClick={() => setAberto(false)} />
              <p>{info.endereco.rua}<br />{info.endereco.cidade}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

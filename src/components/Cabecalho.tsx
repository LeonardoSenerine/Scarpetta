import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Marca } from './Marca'
import { info } from '../data/info'

const links = [
  { href: '#executivo', rotulo: 'Menu executivo' },
  { href: '#cardapio', rotulo: 'Cardápio' },
  { href: '#cozinha', rotulo: 'Da nossa cozinha' },
  { href: '#eventos', rotulo: 'Eventos' },
  { href: '#visite', rotulo: 'Como chegar' },
]

export function Cabecalho() {
  const [solido, setSolido] = useState(false)
  const [aberto, setAberto] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolido(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [aberto])

  return (
    <>
      <header className={`cabecalho ${solido ? 'is-solido' : ''}`}>
        <a href="#topo" className="cabecalho-marca" aria-label="Scarpetta Cucina, início">
          <Marca comCucina={false} />
        </a>
        <nav className="cabecalho-nav" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href}>{l.rotulo}</a>
          ))}
        </nav>
        <a className="botao botao-creme cabecalho-reserva" href={info.reserva} target="_blank" rel="noreferrer">
          Reservar mesa
        </a>
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
              <a className="botao botao-creme" href={info.reserva} target="_blank" rel="noreferrer">Reservar mesa</a>
              <p>{info.endereco.rua}<br />{info.endereco.cidade}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

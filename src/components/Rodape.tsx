import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { info } from '../data/info'
import { turnosResumo } from '../lib/horario'
import { Marca } from './Marca'

export function Rodape() {
  return (
    <footer className="rodape">
      <Marca className="rodape-marca" />
      <p className="rodape-slogan">{info.slogan} em Itatiba.</p>
      <p className="rodape-endereco">
        {info.endereco.rua} · {info.endereco.cidade}<br />
        Quinta a domingo, {turnosResumo()}
      </p>
      <nav className="rodape-links" aria-label="Contato e redes">
        <a href={info.instagram} target="_blank" rel="noreferrer">Instagram</a>
        <a href={info.reserva} target="_blank" rel="noreferrer">WhatsApp {info.whatsappExibicao}</a>
        <a href={`mailto:${info.email}`}>{info.email}</a>
        <a href={info.cardapioDigital} target="_blank" rel="noreferrer">Cardápio digital</a>
      </nav>
      <p className="rodape-legal">© {new Date().getFullYear()} {info.nome}</p>
    </footer>
  )
}

// Barra fixa no celular: aparece depois do hero e some perto do rodapé.
export function BarraAcoes() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const fim = document.documentElement.scrollHeight - window.innerHeight - 240
      setVisivel(window.scrollY > window.innerHeight * 0.85 && window.scrollY < fim)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visivel && (
        <motion.nav
          className="barra-acoes"
          aria-label="Ações rápidas"
          initial={{ y: '120%' }}
          animate={{ y: 0 }}
          exit={{ y: '120%' }}
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        >
          <a className="barra-principal" href={info.reserva} target="_blank" rel="noreferrer">Reservar mesa</a>
          <a href="#cardapio">Cardápio</a>
          <a href={info.rotas} target="_blank" rel="noreferrer">Rota</a>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

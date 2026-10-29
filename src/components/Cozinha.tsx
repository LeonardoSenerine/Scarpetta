import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { info } from '../data/info'
import { Titulo, curva } from './Movimento'

const reels = [
  { id: '1793290484309', legenda: 'Travessa de gnocchi com cinco molhos' },
  { id: '1793290496114', legenda: 'Giro della pizza, direto do forno' },
  { id: '1793290591008', legenda: 'Peperoni artesanal na fermentação natural' },
  { id: '1793290535649', legenda: 'O salão quando a noite cai' },
  { id: '1793290689481', legenda: 'Melanzane alla parmigiana' },
]

// Vídeos verticais do Instagram. Tocam sem som só enquanto estão visíveis;
// com "reduzir movimento" ligado no sistema, nenhum toca sozinho.
export function Cozinha() {
  return (
    <section className="cozinha" id="cozinha" aria-labelledby="cozinha-titulo">
      <div className="cozinha-cabeca">
        <Titulo id="cozinha-titulo">Da nossa cozinha</Titulo>
        <p>
          Bastidores, pratos novos e as noites especiais. Os vídeos tocam sem som; pause ou ligue o som em cada um, e
          acompanhe tudo no <a href={info.instagram} target="_blank" rel="noreferrer">{info.instagramUsuario}</a>.
        </p>
      </div>
      <ul className="reels">
        {reels.map((r, i) => <Reel key={r.id} indice={i} {...r} />)}
      </ul>
    </section>
  )
}

function Reel({ id, legenda, indice }: { id: string; legenda: string; indice: number }) {
  const video = useRef<HTMLVideoElement>(null)
  const pausadoPeloUsuario = useRef(false)
  const [comSom, setComSom] = useState(false)
  const [tocando, setTocando] = useState(false)
  const reduzir = useReducedMotion()

  useEffect(() => {
    const v = video.current
    if (!v) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!reduzir && !pausadoPeloUsuario.current) v.play().catch(() => {})
        } else {
          v.pause(); v.muted = true; setComSom(false)
        }
      },
      { threshold: 0.6 },
    )
    obs.observe(v)
    return () => obs.disconnect()
  }, [reduzir])

  const alternarPlay = () => {
    const v = video.current
    if (!v) return
    if (v.paused) {
      pausadoPeloUsuario.current = false
      v.play().catch(() => {})
    } else {
      pausadoPeloUsuario.current = true
      v.pause()
    }
  }

  const alternarSom = () => {
    const v = video.current
    if (!v) return
    v.muted = !v.muted
    setComSom(!v.muted)
    if (v.paused) {
      pausadoPeloUsuario.current = false
      v.play().catch(() => {})
    }
  }

  return (
    <motion.li
      className="reel"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: indice * 0.09, ease: curva }}
    >
      <div className="reel-midia">
        <video
          ref={video}
          src={`/video/v${id}.mp4#t=0.5`}
          muted
          loop
          playsInline
          preload="metadata"
          onClick={alternarPlay}
          onPlay={() => setTocando(true)}
          onPause={() => setTocando(false)}
        />
        <div className="reel-controles">
          <button className="reel-botao" onClick={alternarPlay} aria-label={`${tocando ? 'Pausar' : 'Tocar'}: ${legenda}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {tocando
                ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
                : <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />}
            </svg>
          </button>
          <button className={`reel-botao ${comSom ? 'is-ligado' : ''}`} onClick={alternarSom} aria-pressed={comSom} aria-label={`Som: ${legenda}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor" />{comSom ? <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" /> : <path d="m16 9 5 6m0-6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />}</svg>
          </button>
        </div>
      </div>
      <p className="reel-legenda">{legenda}</p>
    </motion.li>
  )
}

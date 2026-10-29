import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

type Props = {
  nome: string
  /** Sem rótulo, o vídeo é tratado como decorativo. */
  rotulo?: string
  className?: string
  /** Quem controla o clipe pode pausá-lo (botão de pausa, carta que não está na frente). */
  tocar?: boolean
  loop?: boolean
  onFim?: () => void
  prioridade?: boolean
}

// Clipe curto em public/media (gerado por scripts/clipes.mjs): só toca enquanto está na tela,
// começa a baixar só quando precisa e, com "reduzir movimento", fica parado no poster.
export function Clipe({ nome, rotulo, className = '', tocar = true, loop = true, onFim, prioridade }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduzir = useReducedMotion()
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.2 })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (tocar && visivel && !reduzir) {
      if (v.ended) v.currentTime = 0
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [tocar, visivel, reduzir])

  return (
    <video
      ref={ref}
      className={`clipe ${className}`}
      src={`/media/${nome}.mp4`}
      poster={`/media/${nome}.webp`}
      muted
      playsInline
      loop={loop}
      preload={prioridade ? 'auto' : 'none'}
      onEnded={onFim}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
    />
  )
}

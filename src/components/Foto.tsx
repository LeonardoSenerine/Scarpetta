import { useState } from 'react'

type Props = {
  nome: string
  alt: string
  sizes?: string
  className?: string
  prioridade?: boolean
}

// Fotos otimizadas em public/img (geradas por `npm run media`), com fade ao carregar.
// Fotos com prioridade (hero, lupa) aparecem direto, sem fade, e carregam antes das outras.
export function Foto({ nome, alt, sizes = '(min-width: 900px) 33vw, 80vw', className = '', prioridade }: Props) {
  const [carregou, setCarregou] = useState(false)
  return (
    <img
      className={`foto ${carregou || prioridade ? 'is-pronta' : ''} ${className}`}
      src={`/img/${nome}-640.webp`}
      srcSet={`/img/${nome}-640.webp 640w, /img/${nome}-1200.webp 1200w`}
      sizes={sizes}
      alt={alt}
      loading={prioridade ? 'eager' : 'lazy'}
      fetchPriority={prioridade ? 'high' : undefined}
      decoding="async"
      onLoad={() => setCarregou(true)}
      ref={(el) => {
        if (el?.complete && el.naturalWidth) setCarregou(true)
      }}
    />
  )
}

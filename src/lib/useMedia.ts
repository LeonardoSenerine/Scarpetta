import { useEffect, useState } from 'react'

// true enquanto a media query casar (ex.: '(min-width: 960px)').
export function useMedia(consulta: string) {
  const [casa, setCasa] = useState(() => window.matchMedia(consulta).matches)
  useEffect(() => {
    const mq = window.matchMedia(consulta)
    const mudar = () => setCasa(mq.matches)
    mudar()
    mq.addEventListener('change', mudar)
    return () => mq.removeEventListener('change', mudar)
  }, [consulta])
  return casa
}

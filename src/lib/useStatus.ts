import { useEffect, useState } from 'react'
import { statusAgora } from './horario'

// Status "aberto agora", recalculado a cada minuto.
export function useStatus() {
  const [status, setStatus] = useState(statusAgora)
  useEffect(() => {
    const id = setInterval(() => setStatus(statusAgora()), 60_000)
    return () => clearInterval(id)
  }, [])
  return status
}

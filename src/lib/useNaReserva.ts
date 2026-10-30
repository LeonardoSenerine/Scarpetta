import { useEffect, useState } from 'react'

// Verdadeiro enquanto a seção de reservas ocupa a tela: os botões "Reservar mesa" somem para não cobrir o formulário.
export function useNaReserva() {
  const [na, setNa] = useState(false)
  useEffect(() => {
    const secao = document.getElementById('reserva')
    if (!secao) return
    const obs = new IntersectionObserver(([e]) => setNa(e.isIntersecting), { rootMargin: '-15% 0px -15% 0px' })
    obs.observe(secao)
    return () => obs.disconnect()
  }, [])
  return na
}

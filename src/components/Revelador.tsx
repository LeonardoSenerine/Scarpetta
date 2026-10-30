import { useEffect } from 'react'

// Revela ao rolar todo elemento marcado com data-revelar (o CSS sobe e acende o bloco).
// Um observador só cuida da página toda, inclusive do que entra depois, como ao trocar de aba no cardápio.
// O atraso de cada bloco vem da variável --atraso no próprio elemento.
export function Revelador() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-visivel')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    const observar = () =>
      document.querySelectorAll('[data-revelar]:not(.is-visivel)').forEach((el) => io.observe(el))
    observar()
    const mo = new MutationObserver(observar)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])
  return null
}

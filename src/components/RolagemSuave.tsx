import { useEffect } from 'react'
import Lenis from 'lenis'

// Rolagem suave (Lenis), como no site da Flanar. Os links de âncora param abaixo do cabeçalho fixo.
// Com "reduzir movimento" ligado, fica a rolagem normal do navegador.
export function RolagemSuave() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cabecalho = window.innerWidth >= 960 ? 76 : 64
    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -(cabecalho + 8) } })
    let quadro = requestAnimationFrame(function rodar(t) {
      lenis.raf(t)
      quadro = requestAnimationFrame(rodar)
    })
    return () => {
      cancelAnimationFrame(quadro)
      lenis.destroy()
    }
  }, [])
  return null
}

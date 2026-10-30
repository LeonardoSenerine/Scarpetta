export const curva = [0.2, 0.7, 0.2, 1] as const

// Título de seção. Fica parado: o movimento da página é o hero, o traço de molho que se desenha e o convite final.
export function Titulo({ id, className, children }: { id?: string; className?: string; children: string }) {
  return <h2 id={id} className={className}>{children}</h2>
}

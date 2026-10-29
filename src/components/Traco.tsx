// O traço de molho do manifesto, parado e curto: a assinatura gráfica que abre as seções principais.
const TRACO = 'M8 26 C 40 10, 70 34, 104 22 S 160 8, 192 18'

export function Traco({ className = '' }: { className?: string }) {
  return (
    <svg className={`traco ${className}`} viewBox="0 0 200 40" aria-hidden="true">
      <path d={TRACO} fill="none" stroke="var(--pomodoro)" strokeWidth="9" strokeLinecap="round" />
      <path d={TRACO} fill="none" stroke="#e0624f" strokeWidth="2.5" strokeLinecap="round" opacity=".55" transform="translate(0 -2.5)" />
    </svg>
  )
}

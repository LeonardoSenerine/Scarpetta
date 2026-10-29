// Assinatura da casa: "Scarpetta" manuscrito, o tomate do logo e "Cucina" espaçado.

export function Tomate({ className = '' }: { className?: string }) {
  return (
    <svg className={`tomate ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="14" r="8.5" fill="var(--pomodoro)" />
      <path d="M12 6.2c-1.6-1.8-4.2-1.9-5.6-1 1.6.2 2.6 1 3.2 2-1.7-.2-3 .4-3.8 1.4 1.9-.3 3.6.2 4.6 1 .5-1 1-2 1.6-3.4Zm0 0c1.6-1.8 4.2-1.9 5.6-1-1.6.2-2.6 1-3.2 2 1.7-.2 3 .4 3.8 1.4-1.9-.3-3.6.2-4.6 1-.5-1-1-2-1.6-3.4Z" fill="#3f7a3a" />
      <ellipse cx="9" cy="11.5" rx="2" ry="1.2" fill="#fff" opacity=".28" transform="rotate(-30 9 11.5)" />
    </svg>
  )
}

export function Marca({ className = '', comCucina = true }: { className?: string; comCucina?: boolean }) {
  return (
    <span className={`marca ${className}`}>
      <Tomate />
      <span className="marca-nome">Scarpetta</span>
      {comCucina && <span className="marca-cucina">Cucina</span>}
    </span>
  )
}

import type { ReactNode } from 'react'

type Props = {
  /** '#reserva' leva à barra de reserva; um link do WhatsApp abre a conversa em outra aba. */
  href?: string
  variante?: 'creme' | 'verde' | 'linha'
  className?: string
  onClick?: () => void
  children?: ReactNode
}

// Botão único para todas as chamadas de reserva: ícone num círculo tomate, texto e uma seta que avança ao passar o mouse.
export function BotaoReserva({ href = '#reserva', variante = 'creme', className = '', onClick, children = 'Reservar mesa' }: Props) {
  const externo = href.startsWith('http')
  return (
    <a
      className={`botao botao-reserva botao-reserva-${variante} ${className}`}
      href={href}
      target={externo ? '_blank' : undefined}
      rel={externo ? 'noreferrer' : undefined}
      onClick={onClick}
    >
      <span className="botao-reserva-icone" aria-hidden="true">
        {externo ? <IconeWhatsApp /> : <IconeMesa />}
      </span>
      <span>{children}</span>
      <svg className="botao-reserva-seta" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

// Garfo e faca cruzados.
function IconeMesa() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M7 3v7a2 2 0 0 0 2 2v9M5 3v5m4-5v5M17 3c-1.7 1.2-2.5 3.3-2.5 6v3H17v9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconeWhatsApp() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M4.5 19.5l1.1-3.6A8 8 0 1 1 8.4 18.6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 8.6c.2-.5.6-.6.9-.6h.4c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .5-.1.6l-.5.6a5.4 5.4 0 0 0 2.3 2.2l.6-.5c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.5v.4c0 .4-.2.8-.6.9-1 .4-2.7.2-4.5-1.5-1.8-1.7-2.2-3.4-1.8-4.4z" fill="currentColor" />
    </svg>
  )
}

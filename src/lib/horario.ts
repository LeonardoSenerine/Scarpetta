import { funcionamento } from '../data/info'

const diasNome = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']

export const hora = (min: number) => `${Math.floor(min / 60)}h${min % 60 ? String(min % 60).padStart(2, '0') : ''}`

// Hora local de Itatiba, independente do fuso de quem visita.
function agoraEmItatiba(data: Date) {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(data)
  const get = (t: string) => partes.find((p) => p.type === t)?.value ?? ''
  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { dia, minutos: Number(get('hour')) * 60 + Number(get('minute')) }
}

export type Status = { aberto: boolean; texto: string }

export function statusAgora(data = new Date()): Status {
  const { dia, minutos } = agoraEmItatiba(data)
  const { dias, turnos } = funcionamento
  const abreHoje = dias.includes(dia)

  if (abreHoje) {
    const atual = turnos.find((t) => minutos >= t.inicio && minutos < t.fim)
    if (atual) return { aberto: true, texto: `Aberto agora, até as ${hora(atual.fim)}` }
    const proximo = turnos.find((t) => minutos < t.inicio)
    if (proximo) {
      return { aberto: false, texto: `${proximo.nome} hoje a partir das ${hora(proximo.inicio)}` }
    }
  }

  for (let i = 1; i <= 7; i++) {
    const d = (dia + i) % 7
    if (dias.includes(d)) {
      const quando = i === 1 ? 'amanhã' : diasNome[d]
      return { aberto: false, texto: `Fechado agora. Abrimos ${quando} às ${hora(turnos[0].inicio)}` }
    }
  }
  return { aberto: false, texto: 'Fechado agora' }
}

// Data de hoje (AAAA-MM-DD) em Itatiba, para comparar com a validade do executivo.
export function hojeEmItatiba(data = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(data)
}

// "12h às 17h e 19h às 22h"
export const turnosResumo = () =>
  funcionamento.turnos.map((t) => `${hora(t.inicio)} às ${hora(t.fim)}`).join(' e ')

export const precoBR =(v: number) => `R$ ${v.toLocaleString('pt-BR')}`

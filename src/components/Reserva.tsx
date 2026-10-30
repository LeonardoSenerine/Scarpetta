import { useMemo, useState } from 'react'
import { funcionamento, wa } from '../data/info'
import { agoraEmItatiba, hojeEmItatiba, hora } from '../lib/horario'
import { Titulo } from './Movimento'
import { BotaoReserva } from './BotaoReserva'

const diasCurto = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const diasLongo = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
const PESSOAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Mais de 10']

type Dia = { iso: string; semana: number; dataCurta: string; rotulo: string; hoje: boolean }

// Horários de chegada a cada 30 min, até uma hora antes de cada turno fechar.
// Hoje, só os que ainda estão a pelo menos uma hora de distância.
function horarios(hoje: boolean) {
  const minimo = hoje ? agoraEmItatiba(new Date()).minutos + 60 : 0
  return funcionamento.turnos.flatMap((t) => {
    const lista: number[] = []
    for (let m = t.inicio; m <= t.fim - 60; m += 30) if (m >= minimo) lista.push(m)
    return lista
  })
}

// Os próximos dias em que a casa abre, contados no fuso de Itatiba.
function proximosDias(qtd = 8): Dia[] {
  const base = new Date(`${hojeEmItatiba()}T12:00:00Z`)
  const dias: Dia[] = []
  for (let i = 0; dias.length < qtd && i < 30; i++) {
    const d = new Date(base.getTime() + i * 864e5)
    const semana = d.getUTCDay()
    if (!funcionamento.dias.includes(semana)) continue
    if (i === 0 && horarios(true).length === 0) continue
    const dataCurta = `${d.getUTCDate()}/${d.getUTCMonth() + 1}`
    const nome = i === 0 ? 'Hoje' : i === 1 ? 'Amanhã' : diasCurto[semana]
    dias.push({ iso: d.toISOString().slice(0, 10), semana, dataCurta, rotulo: `${nome}, ${dataCurta}`, hoje: i === 0 })
  }
  return dias
}

// Barra logo abaixo do hero: escolhe dia, horário e pessoas e abre o WhatsApp com a mensagem pronta.
export function Reserva() {
  const dias = useMemo(() => proximosDias(), [])
  const [diaIso, setDiaIso] = useState(dias[0]?.iso ?? '')
  const dia = dias.find((d) => d.iso === diaIso) ?? dias[0]
  const opcoes = useMemo(() => (dia ? horarios(dia.hoje) : []), [dia])
  const [horario, setHorario] = useState<number | null>(null)
  const [pessoas, setPessoas] = useState('2')

  const escolhido = horario !== null && opcoes.includes(horario) ? horario : opcoes[0]
  const quantas = pessoas === 'Mais de 10' ? 'mais de 10 pessoas' : pessoas === '1' ? '1 pessoa' : `${pessoas} pessoas`
  const quando = dia?.hoje ? 'hoje' : `${dia && (dia.semana === 0 || dia.semana === 6) ? 'no' : 'na'} ${dia ? diasLongo[dia.semana] : ''}`
  const mensagem = dia && escolhido !== undefined
    ? `Olá! Gostaria de reservar uma mesa para ${quantas} ${quando}, ${dia.dataCurta}, às ${hora(escolhido)}.`
    : 'Olá! Gostaria de reservar uma mesa no Scarpetta.'

  return (
    <section className="reserva" id="reserva" aria-labelledby="reserva-titulo">
      <Titulo id="reserva-titulo" className="reserva-titulo">Reserve sua mesa</Titulo>
      <div className="reserva-campos">
        <label className="campo">
          <span>Dia</span>
          <select id="reserva-dia" value={dia?.iso ?? ''} onChange={(e) => setDiaIso(e.target.value)}>
            {dias.map((d) => <option key={d.iso} value={d.iso}>{d.rotulo}</option>)}
          </select>
        </label>
        <label className="campo">
          <span>Horário</span>
          <select id="reserva-horario" value={escolhido ?? ''} onChange={(e) => setHorario(Number(e.target.value))}>
            {opcoes.map((m) => <option key={m} value={m}>{hora(m)}</option>)}
          </select>
        </label>
        <label className="campo">
          <span>Pessoas</span>
          <select id="reserva-pessoas" value={pessoas} onChange={(e) => setPessoas(e.target.value)}>
            {PESSOAS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <BotaoReserva className="reserva-enviar" href={wa(mensagem)}>Reservar pelo WhatsApp</BotaoReserva>
      </div>
      <p className="reserva-nota">
        A confirmação chega pelo WhatsApp. Para grupos maiores e jantares fechados, veja <a href="#eventos">eventos</a>.
      </p>
    </section>
  )
}

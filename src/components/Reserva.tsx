import { useMemo, useState, type FormEvent } from 'react'
import { funcionamento, wa } from '../data/info'
import { agoraEmItatiba, hojeEmItatiba, hora, turnosResumo } from '../lib/horario'
import { Titulo } from './Movimento'
import { IconeWhatsApp } from './BotaoReserva'
import { Seletor, type Opcao } from './Seletor'

const diasCurto = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const diasLongo = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
const MAX_PESSOAS = 10
const OCASIOES = ['Aniversário', 'Encontro a dois', 'Almoço de negócios', 'Comemoração em família']

type Dia = { iso: string; semana: number; dataCurta: string; hoje: boolean; amanha: boolean }

// Horários de chegada a cada 30 min, até uma hora antes de cada turno fechar, com o turno como grupo.
// Hoje, só os que ainda estão a pelo menos uma hora de distância.
function horarios(hoje: boolean): Opcao[] {
  const minimo = hoje ? agoraEmItatiba(new Date()).minutos + 60 : 0
  return funcionamento.turnos.flatMap((t) => {
    const lista: Opcao[] = []
    for (let m = t.inicio; m <= t.fim - 60; m += 30) if (m >= minimo) lista.push({ valor: String(m), rotulo: hora(m), grupo: t.nome })
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
    dias.push({ iso: d.toISOString().slice(0, 10), semana, dataCurta: `${d.getUTCDate()}/${d.getUTCMonth() + 1}`, hoje: i === 0, amanha: i === 1 })
  }
  return dias
}

const maiuscula = (t: string) => t[0].toUpperCase() + t.slice(1)
const textoPessoas = (n: number) => (n > MAX_PESSOAS ? `mais de ${MAX_PESSOAS} pessoas` : n === 1 ? '1 pessoa' : `${n} pessoas`)
const opcoesPessoas: Opcao[] = Array.from({ length: MAX_PESSOAS + 1 }, (_, i) => ({ valor: String(i + 1), rotulo: maiuscula(textoPessoas(i + 1)) }))
const opcoesOcasiao: Opcao[] = [{ valor: '', rotulo: 'Nenhuma em especial' }, ...OCASIOES.map((o) => ({ valor: o, rotulo: o }))]

// Reserva: dia, horário e pessoas em listas próprias e, ao enviar, o WhatsApp abre com a mensagem pronta.
export function Reserva() {
  const dias = useMemo(() => proximosDias(), [])
  const [diaIso, setDiaIso] = useState(dias[0]?.iso ?? '')
  const dia = dias.find((d) => d.iso === diaIso) ?? dias[0]
  const opcoesHorario = useMemo(() => (dia ? horarios(dia.hoje) : []), [dia])
  const [horario, setHorario] = useState('')
  const [pessoas, setPessoas] = useState('2')
  const [nome, setNome] = useState('')
  const [ocasiao, setOcasiao] = useState('')
  const [observacoes, setObservacoes] = useState('')

  const opcoesDia: Opcao[] = dias.map((d) => ({
    valor: d.iso,
    rotulo: d.hoje ? 'Hoje' : d.amanha ? 'Amanhã' : maiuscula(diasLongo[d.semana]),
    detalhe: d.hoje || d.amanha ? `${diasCurto[d.semana]}, ${d.dataCurta}` : d.dataCurta,
  }))
  const escolhido = opcoesHorario.find((o) => o.valor === horario) ?? opcoesHorario[0]
  const quando = dia ? `${dia.hoje ? 'hoje, ' : ''}${diasLongo[dia.semana]}, ${dia.dataCurta}` : ''

  const detalhes = [
    nome.trim() && `Nome: ${nome.trim()}`,
    dia && `Dia: ${quando}`,
    escolhido && `Horário: ${escolhido.rotulo}`,
    `Pessoas: ${textoPessoas(Number(pessoas))}`,
    ocasiao && `Ocasião: ${ocasiao}`,
    observacoes.trim() && `Observações: ${observacoes.trim()}`,
  ].filter(Boolean)
  const mensagem = ['Olá! Gostaria de reservar uma mesa no Scarpetta.', '', ...detalhes].join('\n')

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    window.open(wa(mensagem), '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="reserva" id="reserva" aria-labelledby="reserva-titulo">
      <div className="reserva-cabeca">
        <Titulo id="reserva-titulo">Reserve sua mesa</Titulo>
        <p>Escolha o dia, o horário e quantas pessoas vêm. A mensagem sai pronta no WhatsApp e a confirmação chega por lá.</p>
      </div>

      <form className="reserva-form" onSubmit={enviar}>
        <div className="reserva-campos">
          <Seletor className="reserva-dia" rotulo="Dia" valor={dia?.iso ?? ''} opcoes={opcoesDia} onChange={setDiaIso} />
          <Seletor rotulo="Horário" valor={escolhido?.valor ?? ''} opcoes={opcoesHorario} onChange={setHorario} />
          <Seletor rotulo="Pessoas" valor={pessoas} opcoes={opcoesPessoas} onChange={setPessoas} />
          <label className="campo">
            <span>Seu nome</span>
            <input type="text" name="nome" autoComplete="name" required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como devemos chamar você" />
          </label>
          <Seletor rotulo="Ocasião" opcional valor={ocasiao} opcoes={opcoesOcasiao} onChange={setOcasiao} />
          <label className="campo reserva-obs">
            <span>Observações <em>(opcional)</em></span>
            <textarea rows={2} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} placeholder="Cadeirinha para bebê, restrição alimentar, mesa na varanda…" />
          </label>
        </div>

        <button type="submit" className="botao botao-reserva botao-reserva-creme reserva-enviar">
          <span className="botao-reserva-icone" aria-hidden="true"><IconeWhatsApp /></span>
          <span>Enviar pedido pelo WhatsApp</span>
        </button>
        <p className="reserva-nota">
          Quinta a domingo, {turnosResumo()}. A mesa fica garantida quando confirmarmos pelo WhatsApp.
          Grupos com mais de {MAX_PESSOAS} pessoas ou jantares fechados: veja <a href="#eventos">eventos</a>.
        </p>
      </form>
    </section>
  )
}

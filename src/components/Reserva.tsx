import { useMemo, useState, type FormEvent } from 'react'
import { funcionamento, info, wa } from '../data/info'
import { agoraEmItatiba, hojeEmItatiba, hora } from '../lib/horario'
import { Titulo } from './Movimento'
import { IconeWhatsApp } from './BotaoReserva'
import { Foto } from './Foto'
import { Seletor } from './Seletor'

const diasCurto = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const diasLongo = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
const MAX_PESSOAS = 10
const OCASIOES = ['Aniversário', 'Encontro a dois', 'Almoço de negócios', 'Comemoração em família']

type Dia = { iso: string; semana: number; dataCurta: string; nome: string; hoje: boolean }

// Horários de chegada a cada 30 min, até uma hora antes de cada turno fechar, separados por turno.
// Hoje, só os que ainda estão a pelo menos uma hora de distância.
function horarios(hoje: boolean) {
  const minimo = hoje ? agoraEmItatiba(new Date()).minutos + 60 : 0
  return funcionamento.turnos
    .map((t) => {
      const lista: number[] = []
      for (let m = t.inicio; m <= t.fim - 60; m += 30) if (m >= minimo) lista.push(m)
      return { nome: t.nome, lista }
    })
    .filter((t) => t.lista.length > 0)
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
    dias.push({ iso: d.toISOString().slice(0, 10), semana, dataCurta, nome, hoje: i === 0 })
  }
  return dias
}

const textoPessoas = (n: number) => (n > MAX_PESSOAS ? `mais de ${MAX_PESSOAS} pessoas` : n === 1 ? '1 pessoa' : `${n} pessoas`)

// Seção de reservas: a casa explica como funciona e, ao lado, o pedido é montado em poucos toques.
// Ao enviar, abre o WhatsApp com a mensagem pronta; a confirmação acontece por lá.
export function Reserva() {
  const dias = useMemo(() => proximosDias(), [])
  const [diaIso, setDiaIso] = useState(dias[0]?.iso ?? '')
  const dia = dias.find((d) => d.iso === diaIso) ?? dias[0]
  const turnos = useMemo(() => (dia ? horarios(dia.hoje) : []), [dia])
  const opcoes = turnos.flatMap((t) => t.lista)
  const [horario, setHorario] = useState<number | null>(null)
  const [pessoas, setPessoas] = useState(2)
  const [nome, setNome] = useState('')
  const [ocasiao, setOcasiao] = useState('')
  const [observacoes, setObservacoes] = useState('')

  const escolhido = horario !== null && opcoes.includes(horario) ? horario : opcoes[0]
  const quando = dia ? `${dia.hoje ? 'hoje, ' : ''}${diasLongo[dia.semana]}, ${dia.dataCurta}` : ''

  const detalhes = [
    nome.trim() && `Nome: ${nome.trim()}`,
    dia && `Dia: ${quando}`,
    escolhido !== undefined && `Horário: ${hora(escolhido)}`,
    `Pessoas: ${textoPessoas(pessoas)}`,
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
      <div className="reserva-lado">
        <p className="sobretitulo">Reservas</p>
        <Titulo id="reserva-titulo">Reserve sua mesa</Titulo>
        <p className="reserva-intro">
          Escolha o dia, o horário e quantas pessoas vêm. A mensagem sai pronta no WhatsApp e a confirmação
          chega por lá mesmo.
        </p>

        <ol className="reserva-passos">
          <li><strong>Monte o pedido</strong> Dia, horário, pessoas e, se quiser, a ocasião.</li>
          <li><strong>Envie pelo WhatsApp</strong> A conversa abre com tudo preenchido.</li>
          <li><strong>Receba a confirmação</strong> Respondemos no mesmo WhatsApp.</li>
        </ol>

        <dl className="reserva-info">
          <div>
            <dt>Quando abrimos</dt>
            <dd>
              Quinta a domingo
              {funcionamento.turnos.map((t) => (
                <span key={t.nome}>{t.nome}: {hora(t.inicio)} às {hora(t.fim)}</span>
              ))}
            </dd>
          </div>
          <div>
            <dt>Prefere conversar?</dt>
            <dd>
              <a href={info.reserva} target="_blank" rel="noreferrer">WhatsApp {info.whatsappExibicao}</a>
            </dd>
          </div>
          <div>
            <dt>Grupos e eventos</dt>
            <dd>Mais de {MAX_PESSOAS} pessoas ou salão fechado? Veja <a href="#eventos">eventos</a>.</dd>
          </div>
        </dl>

        <div className="reserva-foto">
          <Foto nome="medaglioni-quadrado" alt="Mesa posta com medalhões de filé e risoto" sizes="(min-width: 960px) 30vw, 90vw" />
        </div>
      </div>

      <form className="reserva-cartao" onSubmit={enviar}>
        <fieldset className="reserva-grupo">
          <legend>Dia</legend>
          <div className="chips chips-dias">
            {dias.map((d) => (
              <label key={d.iso} className="chip chip-dia">
                <input type="radio" name="reserva-dia" value={d.iso} checked={d.iso === dia?.iso} onChange={() => setDiaIso(d.iso)} />
                <span className="chip-dia-nome">{d.nome}</span>
                <span className="chip-dia-data">{d.dataCurta}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="reserva-grupo">
          <legend>Horário</legend>
          {turnos.map((t) => (
            <div key={t.nome} className="reserva-turno">
              <p className="reserva-turno-nome">{t.nome}</p>
              <div className="chips">
                {t.lista.map((m) => (
                  <label key={m} className="chip">
                    <input type="radio" name="reserva-horario" value={m} checked={m === escolhido} onChange={() => setHorario(m)} />
                    <span>{hora(m)}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </fieldset>

        <div className="reserva-grupo reserva-pessoas">
          <span className="reserva-rotulo" id="reserva-pessoas-rotulo">Pessoas</span>
          <div className="contador" role="group" aria-labelledby="reserva-pessoas-rotulo">
            <button type="button" onClick={() => setPessoas((n) => Math.max(1, n - 1))} disabled={pessoas <= 1} aria-label="Menos uma pessoa">−</button>
            <output aria-live="polite">{pessoas > MAX_PESSOAS ? `${MAX_PESSOAS}+` : pessoas}</output>
            <button type="button" onClick={() => setPessoas((n) => Math.min(MAX_PESSOAS + 1, n + 1))} disabled={pessoas > MAX_PESSOAS} aria-label="Mais uma pessoa">+</button>
          </div>
        </div>

        <div className="reserva-linha">
          <label className="campo">
            <span>Seu nome</span>
            <input type="text" name="nome" autoComplete="name" required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como devemos chamar você" />
          </label>
          <Seletor
            rotulo="Ocasião"
            opcional
            valor={ocasiao}
            onChange={setOcasiao}
            opcoes={[{ valor: '', rotulo: 'Nenhuma em especial' }, ...OCASIOES.map((o) => ({ valor: o, rotulo: o }))]}
          />
        </div>

        <label className="campo">
          <span>Observações <em>(opcional)</em></span>
          <textarea rows={2} value={observacoes} onChange={(e) => setObservacoes(e.target.value)} placeholder="Cadeirinha para bebê, restrição alimentar, mesa na varanda…" />
        </label>

        <div className="reserva-resumo" aria-live="polite">
          <span>Mesa para {textoPessoas(pessoas)}</span>
          {dia && <span>{quando}</span>}
          {escolhido !== undefined && <span>{hora(escolhido)}</span>}
        </div>

        <button type="submit" className="botao botao-reserva botao-reserva-verde reserva-enviar">
          <span className="botao-reserva-icone" aria-hidden="true"><IconeWhatsApp /></span>
          <span>Enviar pedido pelo WhatsApp</span>
        </button>
        <p className="reserva-nota">A mesa fica garantida quando confirmarmos pelo WhatsApp.</p>
      </form>
    </section>
  )
}

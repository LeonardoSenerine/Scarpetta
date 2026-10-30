import { useState } from 'react'
import { executivo } from '../data/executivo'
import { info, wa } from '../data/info'
import { hojeEmItatiba, precoBR } from '../lib/horario'
import { Foto } from './Foto'
import { BotaoReserva } from './BotaoReserva'
import { Titulo } from './Movimento'

const dataCurta = (iso: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(iso))

// "29 e 30 de outubro" quando os dois dias caem no mesmo mês.
const periodo = (inicio: string, fim: string) =>
  inicio.slice(0, 7) === fim.slice(0, 7)
    ? `${Number(inicio.slice(8))} e ${dataCurta(fim)}`
    : `${dataCurta(inicio)} e ${dataCurta(fim)}`

export function Executivo() {
  const [detalhes, setDetalhes] = useState(false)
  const hoje = hojeEmItatiba()
  const valeHoje = hoje >= executivo.inicio && hoje <= executivo.fim
  // Depois da sexta, o menu da semana sai do ar até o arquivo ser atualizado.
  const encerrado = hoje > executivo.fim

  const selo = valeHoje
    ? 'Servido hoje'
    : encerrado
      ? 'Novo menu em breve'
      : `A partir de ${dataCurta(executivo.inicio)}`

  return (
    <section className={`executivo ${detalhes ? 'com-detalhes' : ''}`} id="executivo" aria-labelledby="executivo-titulo">
      <div className="executivo-fotos" aria-hidden="true">
        {executivo.fotos.map((f, i) => (
          <div key={f} className="executivo-foto" style={{ rotate: `${i ? 3 : -4}deg` }}>
            <Foto nome={f} alt="" sizes="(min-width: 900px) 22vw, 36vw" />
          </div>
        ))}
      </div>

      <div className="executivo-cartao">
        <header className="executivo-topo">
          <p className={`executivo-selo ${valeHoje ? 'is-hoje' : ''}`}>{selo}</p>
          <Titulo id="executivo-titulo" className="executivo-titulo">Menu executivo</Titulo>
          <p className="executivo-quando">
            <span>{encerrado ? 'Toda quinta e sexta' : `Quinta e sexta, ${periodo(executivo.inicio, executivo.fim)}`}</span>
            <span className="executivo-preco">{precoBR(executivo.preco)}</span>
          </p>
          <p className="executivo-regra">Entrada, principal e sobremesa. Você escolhe um de cada.</p>
        </header>

        {!encerrado && (
          <>
            {executivo.etapas.map((etapa) => (
              <div className="executivo-etapa" key={etapa.nome}>
                <h3><span>{etapa.nome}</span></h3>
                <ul>
                  {etapa.opcoes.map((o) => (
                    <li key={o.nome}>
                      <p className="executivo-prato" lang="it">{o.nome}</p>
                      {o.descricao && <p className="executivo-desc">{o.descricao}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button className="executivo-detalhes" aria-expanded={detalhes} onClick={() => setDetalhes((v) => !v)}>
              {detalhes ? 'Ocultar descrições' : 'Ver descrição dos pratos'}
            </button>
          </>
        )}

        <div className="executivo-acoes">
          {encerrado ? (
            <a className="botao botao-verde" href={info.instagram} target="_blank" rel="noreferrer">
              Ver o próximo menu no {info.instagramUsuario}
            </a>
          ) : (
            <>
              <BotaoReserva variante="verde" href={wa('Olá! Quero reservar para o menu executivo desta semana.')}>
                Reservar para o executivo
              </BotaoReserva>
              <a className="link-sutil" href={info.instagram} target="_blank" rel="noreferrer">
                O menu da próxima semana sai no {info.instagramUsuario}
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

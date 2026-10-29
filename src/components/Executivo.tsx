import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { executivo } from '../data/executivo'
import { info, wa } from '../data/info'
import { hojeEmItatiba, precoBR } from '../lib/horario'
import { Foto } from './Foto'
import { Titulo } from './Movimento'

const dataCurta = (iso: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(new Date(iso))

// "29 e 30 de outubro" quando os dois dias caem no mesmo mês.
const periodo = (inicio: string, fim: string) =>
  inicio.slice(0, 7) === fim.slice(0, 7)
    ? `${Number(inicio.slice(8))} e ${dataCurta(fim)}`
    : `${dataCurta(inicio)} e ${dataCurta(fim)}`

export function Executivo() {
  const reduzir = useReducedMotion()
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
          <motion.div
            key={f}
            className="executivo-foto"
            initial={reduzir ? false : { opacity: 0, rotate: i ? 6 : -6, y: 40 }}
            whileInView={{ opacity: 1, rotate: i ? 3 : -4, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <Foto nome={f} alt="" sizes="(min-width: 900px) 22vw, 36vw" />
          </motion.div>
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
              <a className="botao botao-verde" href={wa('Olá! Quero reservar para o menu executivo desta semana.')} target="_blank" rel="noreferrer">
                Reservar para o executivo
              </a>
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

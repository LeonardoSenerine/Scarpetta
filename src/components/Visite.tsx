import { useState } from 'react'
import { funcionamento, info } from '../data/info'
import { hora } from '../lib/horario'
import { useStatus } from '../lib/useStatus'
import { Titulo } from './Movimento'
import { BotaoReserva } from './BotaoReserva'

export function Visite() {
  const [mapaAtivo, setMapaAtivo] = useState(false)
  const status = useStatus()

  return (
    <section className="visite" id="visite" aria-labelledby="visite-titulo">
      <div className="visite-info">
        <Titulo id="visite-titulo">Como chegar</Titulo>
        <p className="visite-referencia">{info.endereco.referencia}, num espaço cercado de natureza.</p>
        <address data-revelar>
          {info.endereco.rua}<br />
          {info.endereco.bairro}<br />
          {info.endereco.cidade}, {info.endereco.cep}
        </address>

        <table className="horarios">
          <caption>Horário de funcionamento</caption>
          <tbody>
            <tr>
              <th scope="row">Quinta a domingo</th>
              <td>
                {funcionamento.turnos.map((t) => (
                  <span key={t.nome}>{t.nome} {hora(t.inicio)} às {hora(t.fim)}</span>
                ))}
              </td>
            </tr>
            <tr>
              <th scope="row">Segunda a quarta</th>
              <td><span>Fechado</span></td>
            </tr>
          </tbody>
        </table>
        <p className={`visite-status ${status.aberto ? 'is-aberto' : ''}`}>
          <span className="pulso" aria-hidden="true" />{status.texto}
        </p>

        <div className="visite-acoes" data-revelar>
          <a className="botao botao-creme" href={info.rotas} target="_blank" rel="noreferrer">Abrir rota no mapa</a>
          <BotaoReserva variante="linha" href={info.reserva}>Reservar pelo WhatsApp</BotaoReserva>
        </div>

        {info.avaliacoes && (
          <a className="visite-nota" href={info.avaliacoes.link} target="_blank" rel="noreferrer">
            <span className="estrelas" aria-hidden="true">★★★★★</span>
            {info.avaliacoes.nota} no Google, em {info.avaliacoes.total} avaliações
          </a>
        )}
      </div>

      <div className="visite-mapa">
        {mapaAtivo ? (
          <iframe
            title="Mapa do Scarpetta Cucina"
            src={info.mapaEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <button className="visite-mapa-capa" onClick={() => setMapaAtivo(true)}>
            <span className="visite-pino" aria-hidden="true" />
            <span>Mostrar mapa interativo</span>
          </button>
        )}
      </div>
    </section>
  )
}

// Delivery: mostra os canais diretos quando existirem; até lá, um único botão honesto para o Linktree.
export function EmCasa() {
  const canais = [
    info.deliveryProprio && { rotulo: 'Pedir no nosso delivery', href: info.deliveryProprio },
    info.ifood && { rotulo: 'Pedir pelo iFood', href: info.ifood },
  ].filter((c): c is { rotulo: string; href: string } => !!c)

  return (
    <section className="em-casa" id="delivery" aria-labelledby="em-casa-titulo">
      <Titulo id="em-casa-titulo">Scarpetta em casa</Titulo>
      <p>As mesmas massas e pizzas, para pedir por delivery.</p>
      <div className="em-casa-acoes" data-revelar>
        {canais.length > 0 ? (
          canais.map((c, i) => (
            <a key={c.href} className={`botao ${i ? 'botao-linha' : 'botao-creme'}`} href={c.href} target="_blank" rel="noreferrer">{c.rotulo}</a>
          ))
        ) : (
          <a className="botao botao-creme" href={info.linktree} target="_blank" rel="noreferrer">Ver opções de delivery</a>
        )}
      </div>
    </section>
  )
}

import { useState } from 'react'
import { funcionamento, info } from '../data/info'
import { hora } from '../lib/horario'
import { useStatus } from '../lib/useStatus'
import { Titulo } from './Movimento'

export function Visite() {
  const [mapaAtivo, setMapaAtivo] = useState(false)
  const status = useStatus()

  return (
    <section className="visite" id="visite" aria-labelledby="visite-titulo">
      <div className="visite-info">
        <Titulo id="visite-titulo">Como chegar</Titulo>
        <p className="visite-referencia">{info.endereco.referencia}, num espaço cercado de natureza.</p>
        <address>
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

        <div className="visite-acoes">
          <a className="botao botao-creme" href={info.rotas} target="_blank" rel="noreferrer">Abrir rota no mapa</a>
        </div>

        <EmCasa />

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
          <>
            <button className="visite-mapa-capa" onClick={() => setMapaAtivo(true)}>
              <span className="visite-pino" aria-hidden="true" />
              <span>Mostrar mapa interativo</span>
            </button>
            <p className="visite-mapa-aviso">
              O mapa é do Google e pode usar cookies. <a href="/privacidade#cookies">Saiba mais</a>
            </p>
          </>
        )}
      </div>
    </section>
  )
}

// Delivery, dentro de "Como chegar": mostra os canais diretos quando existirem; até lá, um botão para o Linktree.
// Preencha info.ifood e info.deliveryProprio para trocar esse botão pelos links de pedido.
function EmCasa() {
  const canais = [
    info.deliveryProprio && { rotulo: 'Pedir no nosso delivery', href: info.deliveryProprio },
    info.ifood && { rotulo: 'Pedir pelo iFood', href: info.ifood },
  ].filter((c): c is { rotulo: string; href: string } => !!c)

  return (
    <div className="visite-casa" id="delivery">
      <h3>Prefere em casa?</h3>
      <p>As mesmas massas e pizzas, por delivery.</p>
      <div className="visite-casa-acoes">
        {canais.length > 0 ? (
          canais.map((c) => (
            <a key={c.href} className="botao botao-linha" href={c.href} target="_blank" rel="noreferrer">{c.rotulo}</a>
          ))
        ) : (
          <a className="botao botao-linha" href={info.linktree} target="_blank" rel="noreferrer">Ver opções de delivery</a>
        )}
      </div>
    </div>
  )
}

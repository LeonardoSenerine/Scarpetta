import { info, wa } from '../data/info'
import { Foto } from './Foto'
import { Titulo } from './Movimento'

export function Eventos() {
  return (
    <section className="eventos" id="eventos" aria-labelledby="eventos-titulo">
      <div className="eventos-foto">
        <Foto nome="medaglioni" alt="Medalhões de filé com risoto à milanese e uma taça de vinho tinto" sizes="(min-width: 900px) 40vw, 90vw" />
      </div>
      <div className="eventos-texto">
        <Titulo id="eventos-titulo">Eventos e confraternizações</Titulo>
        <p>
          Aniversários, almoços de empresa e jantares fechados no nosso salão. Montamos o menu com você, com
          antepastos para a mesa, massas servidas na travessa e a sobremesa que fecha a noite.
        </p>
        <div className="eventos-acoes">
          <a className="botao botao-verde" href={`mailto:${info.email}?subject=${encodeURIComponent('Evento no Scarpetta')}`}>
            Pedir orçamento por e-mail
          </a>
          <a className="botao botao-linha-verde" href={wa('Olá! Gostaria de fazer um evento no Scarpetta.')} target="_blank" rel="noreferrer">
            Conversar no WhatsApp
          </a>
        </div>
        <p className="eventos-email">{info.email}</p>
      </div>
    </section>
  )
}

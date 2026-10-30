import { info, wa } from '../data/info'
import { Foto } from './Foto'
import { Titulo } from './Movimento'
import { BotaoReserva } from './BotaoReserva'

const ocasioes = ['Aniversários', 'Almoços de empresa', 'Jantares fechados', 'Confraternizações']

// Como o menu de evento chega à mesa, na ordem italiana.
const etapas = [
  { nome: 'Antipasti', texto: 'Antepastos para a mesa toda' },
  { nome: 'Primi', texto: 'Massas servidas na travessa' },
  { nome: 'Dolci', texto: 'A sobremesa que fecha a noite' },
]

// Eventos em destaque: a foto ocupa a borda (em cima no celular, metade da tela no desktop) e, ao lado,
// as ocasiões, um cartão de menu no estilo do executivo e as duas formas de pedir orçamento.
export function Eventos() {
  return (
    <section className="eventos" id="eventos" aria-labelledby="eventos-titulo">
      <div className="eventos-foto">
        <Foto nome="medaglioni" alt="Medalhões de filé com risoto à milanese e uma taça de vinho tinto" sizes="(min-width: 960px) 50vw, 100vw" />
      </div>

      <div className="eventos-conteudo">
        <p className="sobretitulo">Eventos</p>
        <Titulo id="eventos-titulo">Eventos e confraternizações</Titulo>
        <p className="eventos-lead">
          Reunimos sua turma no nosso salão, no meio do verde. O menu é montado com você, do primeiro antepasto à
          sobremesa.
        </p>
        <ul className="eventos-ocasioes">
          {ocasioes.map((o) => <li key={o}>{o}</li>)}
        </ul>

        <div className="eventos-menu">
          <p className="eventos-menu-titulo">Como servimos</p>
          <ol>
            {etapas.map((e) => (
              <li key={e.nome}>
                <span lang="it">{e.nome}</span>
                {e.texto}
              </li>
            ))}
          </ol>
        </div>

        <div className="eventos-acoes">
          <BotaoReserva href={wa('Olá! Gostaria de fazer um evento no Scarpetta.')}>Planejar meu evento</BotaoReserva>
          <a className="botao botao-linha" href={`mailto:${info.email}?subject=${encodeURIComponent('Evento no Scarpetta')}`}>
            Pedir orçamento por e-mail
          </a>
        </div>
        <p className="eventos-email">Ou escreva para <a href={`mailto:${info.email}`}>{info.email}</a></p>
      </div>
    </section>
  )
}

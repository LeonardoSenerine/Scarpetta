import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { info } from '../data/info'
import { Rodape } from '../components/Rodape'
import { TopoSimples } from './TopoSimples'
import '../styles.css'
import './paginas.css'

// Política de privacidade e cookies, escrita a partir do que o site faz de fato: sem cadastro, sem cookies
// próprios, sem análise ou publicidade. Se o site passar a usar algo assim, atualize esta página e a data.
const ATUALIZADA = '30 de outubro de 2026'

const secoes = [
  { id: 'resumo', titulo: 'Resumo' },
  { id: 'dados', titulo: 'Que dados passam por aqui' },
  { id: 'terceiros', titulo: 'Serviços de terceiros' },
  { id: 'cookies', titulo: 'Cookies' },
  { id: 'finalidade', titulo: 'Para que usamos e por quanto tempo' },
  { id: 'direitos', titulo: 'Seus direitos' },
  { id: 'contato', titulo: 'Fale com a gente' },
]

function Privacidade() {
  return (
    <>
      <TopoSimples />
      <main className="documento" id="conteudo">
        <header className="documento-cabeca">
          <p className="sobretitulo">Transparência</p>
          <h1>Política de privacidade e cookies</h1>
          <p className="documento-data">Atualizada em {ATUALIZADA}.</p>
        </header>

        <nav className="documento-indice" aria-label="Nesta página">
          <p>Nesta página</p>
          <ol>
            {secoes.map((s) => <li key={s.id}><a href={`#${s.id}`}>{s.titulo}</a></li>)}
          </ol>
        </nav>

        <section id="resumo">
          <h2>Resumo</h2>
          <p>
            O site do {info.nome} existe para você conhecer a casa, ver o cardápio e pedir uma reserva. Ele{' '}
            <strong>não tem cadastro, não grava cookies próprios e não usa ferramentas de análise ou publicidade</strong>.
            O que você digita no formulário de reserva não fica guardado aqui: serve só para montar a mensagem que abre no
            seu WhatsApp.
          </p>
          <p>
            O responsável pelos dados tratados por meio deste site é o {info.nome}, {info.endereco.rua},{' '}
            {info.endereco.bairro}, {info.endereco.cidade}, CEP {info.endereco.cep}.
          </p>
        </section>

        <section id="dados">
          <h2>Que dados passam por aqui</h2>
          <h3>Pedido de reserva</h3>
          <p>
            Nome, dia, horário, número de pessoas, ocasião e observações. Esses dados ficam só no seu navegador enquanto
            você preenche e são usados para montar a mensagem. Eles só chegam até nós se você tocar em enviar no WhatsApp; a
            partir daí, a conversa também segue as regras do próprio WhatsApp.
          </p>
          <h3>Contato por WhatsApp ou e-mail</h3>
          <p>
            Quando você fala com a gente para reservar, pedir um orçamento de evento ou tirar uma dúvida, recebemos o que você
            escrever e o seu número ou e-mail.
          </p>
          <h3>Dados técnicos de acesso</h3>
          <p>
            Como em qualquer site, o serviço de hospedagem (Vercel) registra dados técnicos das visitas, como endereço IP,
            tipo de navegador e páginas acessadas, para entregar as páginas e proteger o site contra abusos.
          </p>
        </section>

        <section id="terceiros">
          <h2>Serviços de terceiros</h2>
          <ul>
            <li>
              <strong>Google Fonts:</strong> as fontes do site são carregadas dos servidores do Google, que recebe dados
              técnicos do acesso, como o endereço IP.
            </li>
            <li>
              <strong>Google Maps:</strong> o mapa só é carregado quando você toca em “Mostrar mapa interativo”. A partir
              desse momento, o Google pode usar cookies próprios.
            </li>
            <li>
              <strong>Links externos:</strong> WhatsApp, Instagram, iFood, cardápio digital e outros serviços abertos a partir
              do site têm políticas de privacidade próprias, que valem quando você usa esses serviços.
            </li>
          </ul>
        </section>

        <section id="cookies">
          <h2>Cookies</h2>
          <p>
            Cookies são pequenos arquivos que um site grava no seu navegador. <strong>Este site não grava cookies
            próprios</strong> e não usa cookies de análise ou publicidade, por isso não exibe aviso para aceitar cookies.
          </p>
          <p>
            O único caso de cookies de terceiros é o mapa do Google, e só depois que você escolhe abri-lo. Você pode apagar
            ou bloquear cookies a qualquer momento nas configurações do seu navegador.
          </p>
        </section>

        <section id="finalidade">
          <h2>Para que usamos e por quanto tempo</h2>
          <p>
            Usamos os dados que você nos envia apenas para atender ao seu pedido: confirmar e organizar a reserva, responder
            a sua mensagem ou preparar o orçamento do seu evento. Isso se apoia na Lei Geral de Proteção de Dados (Lei
            13.709/2018), para atender a um pedido feito por você (art. 7º, V), e no legítimo interesse de manter o site
            funcionando e seguro (art. 7º, IX).
          </p>
          <p>
            Não vendemos nem compartilhamos seus dados para publicidade. As conversas ficam guardadas pelo tempo necessário
            para atender ao pedido e cumprir obrigações legais.
          </p>
        </section>

        <section id="direitos">
          <h2>Seus direitos</h2>
          <p>Pela LGPD, você pode pedir a qualquer momento:</p>
          <ul>
            <li>a confirmação de que tratamos dados seus e o acesso a eles;</li>
            <li>a correção de dados incompletos ou errados;</li>
            <li>a eliminação dos dados que não precisamos mais guardar;</li>
            <li>informações sobre com quem os dados foram compartilhados.</li>
          </ul>
          <p>
            Se achar que seus dados não foram bem tratados, você também pode reclamar à Autoridade Nacional de Proteção de
            Dados (ANPD).
          </p>
        </section>

        <section id="contato">
          <h2>Fale com a gente</h2>
          <p>Para qualquer pedido ou dúvida sobre os seus dados:</p>
          <ul className="documento-contatos">
            <li>E-mail: <a href={`mailto:${info.email}?subject=${encodeURIComponent('Privacidade')}`}>{info.email}</a></li>
            <li>WhatsApp: <a href={info.reserva} target="_blank" rel="noreferrer">{info.whatsappExibicao}</a></li>
          </ul>
          <p>Se esta política mudar, a nova versão aparece aqui, com a data atualizada no topo.</p>
        </section>
      </main>
      <Rodape />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Privacidade />
  </StrictMode>,
)

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MotionConfig, motion } from 'motion/react'
import { info } from '../data/info'
import { Marca, Tomate } from '../components/Marca'
import { IconeWhatsApp } from '../components/BotaoReserva'
import { curva } from '../components/Movimento'

// Proposta para o Scarpetta: o que muda quando o link da bio deixa de ser o Linktree e passa a ser o site.
// As capturas em public/proposta vêm de scripts/proposta.mjs; o print do Linktree, do celular.

const AUTOR = { nome: 'Leonardo', marca: 'senerine.dev', link: 'https://senerine.dev' }
// O endereço de onde a página está sendo vista: o mesmo do site, seja qual for o domínio.
const host = window.location.host
const titulo = `${info.nome} · ${info.slogan} em Itatiba/SP`

const trocas = [
  {
    de: ['Localização'],
    titulo: 'Como chegar',
    texto: 'Endereço, rota em um toque, mapa e o horário de funcionamento, com o aviso de aberto ou fechado agora.',
    foto: 'visite',
  },
  {
    de: ['Reservas'],
    titulo: 'Reserve sua mesa',
    texto: 'O cliente escolhe dia, horário e número de pessoas, e o WhatsApp da casa recebe a mensagem completa.',
    foto: 'reserva',
  },
  {
    de: ['Menu'],
    titulo: 'O cardápio',
    texto: 'Pratos com foto, descrição e preço, separados por categoria, com os destaques da casa no topo.',
    foto: 'cardapio',
  },
  {
    de: ['Peça pelo Ifood', 'Peça pelo nosso delivery'],
    titulo: 'Scarpetta em casa',
    texto: 'Os canais de pedido reunidos num só lugar, com o iFood e o delivery próprio lado a lado.',
    foto: 'delivery',
  },
  {
    de: ['Eventos e confraternizações'],
    titulo: 'Eventos',
    texto: 'As ocasiões, como o menu é servido e o pedido de orçamento por WhatsApp ou e-mail.',
    foto: 'eventos',
  },
  {
    de: ['Entre em contato'],
    titulo: 'WhatsApp em toda a página',
    texto: 'No celular, o botão de reserva acompanha a rolagem; WhatsApp, e-mail e Instagram ficam no rodapé.',
    foto: null,
  },
]

const usos = [
  { titulo: 'Bio do Instagram', texto: 'O primeiro toque de quem descobre a casa pelo perfil.' },
  { titulo: 'Perfil no Google', texto: 'O site oficial ao lado do mapa e das avaliações.' },
  { titulo: 'WhatsApp', texto: 'Na mensagem de boas-vindas, no status e em cada conversa.' },
  { titulo: 'QR code na mesa', texto: 'Cardápio e reserva no celular de quem já está no salão.' },
]

const mensagem = [
  'Olá! Gostaria de reservar uma mesa no Scarpetta.',
  '',
  'Nome: Ana',
  'Dia: sábado, 7/11',
  'Horário: 20h',
  'Pessoas: 4 pessoas',
  'Ocasião: Aniversário',
]

// Bloco que sobe de leve ao entrar na tela.
function Surge({ children, className, atraso = 0 }: { children: ReactNode; className?: string; atraso?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: atraso, ease: curva }}
    >
      {children}
    </motion.div>
  )
}

function Celular({ children }: { children: ReactNode }) {
  return (
    <div className="celular">
      <div className="celular-tela">{children}</div>
    </div>
  )
}

// O site de verdade dentro do celular: carrega em 390px de largura, como num aparelho, e é reduzido
// para a largura da tela desenhada.
function SiteAoVivo() {
  const ref = useRef<HTMLIFrameElement>(null)
  const [escala, setEscala] = useState(1)
  useEffect(() => {
    const tela = ref.current?.parentElement
    if (!tela) return
    const obs = new ResizeObserver(([e]) => setEscala(e.contentRect.width / 390))
    obs.observe(tela)
    return () => obs.disconnect()
  }, [])
  return (
    <iframe
      ref={ref}
      src="/"
      title={`Site do ${info.nome}`}
      style={{ height: `${100 / escala}%`, transform: `scale(${escala})` }}
    />
  )
}

function Seta() {
  return (
    <svg className="p-seta" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Proposta() {
  const [lado, setLado] = useState<'hoje' | 'site'>('hoje')
  const [navegando, setNavegando] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <header className="p-topo">
        <a className="p-autor" href={AUTOR.link} target="_blank" rel="noreferrer">{AUTOR.marca}</a>
        <span>Proposta para o {info.nome}</span>
      </header>

      <main>
        {/* Abertura: a promessa, o link do site e como ele aparece quando é compartilhado. */}
        <section className="p-abertura">
          <Surge className="p-abertura-texto">
            <p className="sobretitulo">Proposta · {info.nome}</p>
            <h1>Mais clientes chegando pelo <em>link da bio.</em></h1>
            <p className="p-lead">
              Desenvolvi uma solução para melhorar a captação de clientes do Scarpetta: um site com a identidade da
              casa que centraliza, num só endereço, tudo o que hoje está espalhado pelo Linktree.
            </p>
            <a className="p-endereco" href="/" target="_blank" rel="noreferrer">
              <span className="p-endereco-rotulo">Veja o site</span>
              <strong>{host}</strong>
              <Seta />
            </a>
            <a className="p-descer" href="#comparacao">Ver a comparação com o Linktree</a>
          </Surge>

          <Surge className="p-previa" atraso={0.15}>
            <figure>
              <div className="p-previa-cartao">
                <img src="/og.jpg?v=2" alt="Capa do link do Scarpetta: até não sobrar nada do molho, com a pizza da casa" width="1200" height="630" />
                <div className="p-previa-texto">
                  <strong>{titulo}</strong>
                  <span>{info.descricao}</span>
                  <small>{host}</small>
                </div>
              </div>
              <figcaption>Assim o link aparece quando é compartilhado no WhatsApp.</figcaption>
            </figure>
          </Surge>
        </section>

        {/* Hoje e com o site: no celular, um de cada vez; no desktop, lado a lado. */}
        <section className="p-comparacao" id="comparacao" aria-labelledby="comparacao-titulo">
          <Surge className="p-cabeca">
            <p className="sobretitulo">Hoje × com o site</p>
            <h2 id="comparacao-titulo">O mesmo link da bio, <em>dois resultados.</em></h2>
          </Surge>

          <div className="p-alternar" role="tablist" aria-label="Comparar">
            <button role="tab" aria-selected={lado === 'hoje'} aria-controls="lado-hoje" onClick={() => setLado('hoje')}>Hoje</button>
            <button role="tab" aria-selected={lado === 'site'} aria-controls="lado-site" onClick={() => setLado('site')}>Com o site</button>
          </div>

          <div className="p-lados">
            <article id="lado-hoje" className={`p-lado p-lado-hoje ${lado === 'hoje' ? 'is-ativo' : ''}`}>
              <div className="p-lado-cabeca">
                <span className="p-etiqueta">Hoje</span>
                <h3>Linktree</h3>
              </div>
              <Celular>
                <img src="/proposta/linktree.webp" alt="Página atual do Scarpetta no Linktree: o nome, dois ícones e sete botões brancos sobre fundo cinza" />
              </Celular>
              <ul className="p-pontos">
                <li>Uma lista de botões em fundo cinza, igual à de qualquer outro perfil: nada do verde, do creme ou da assinatura da casa.</li>
                <li>Nenhum prato, foto do salão ou preço. Quem ainda está decidindo onde comer não encontra motivo para escolher o Scarpetta.</li>
                <li>Cada toque manda o cliente para outro lugar (mapa, cardápio digital, iFood, e-mail), e nem sempre ele volta.</li>
              </ul>
            </article>

            <article id="lado-site" className={`p-lado p-lado-site ${lado === 'site' ? 'is-ativo' : ''}`}>
              <div className="p-lado-cabeca">
                <span className="p-etiqueta">Com o site</span>
                <h3>{host}</h3>
              </div>
              <Celular>
                {navegando ? (
                  <SiteAoVivo />
                ) : (
                  <button className="p-capa-site" onClick={() => setNavegando(true)}>
                    <img src="/proposta/site.webp" alt={`Abertura do site do ${info.nome} no celular`} />
                    <span className="p-tocar">Toque para navegar no site</span>
                  </button>
                )}
              </Celular>
              <ul className="p-pontos">
                <li>A cara da casa: verde garrafa, creme, o tomate do logo e a assinatura manuscrita.</li>
                <li>Cardápio com fotos e preços, menu executivo da semana, o salão em vídeo e os eventos, antes do primeiro contato.</li>
                <li>Reserva, rota, delivery e WhatsApp sem sair da página.</li>
              </ul>
            </article>
          </div>
        </section>

        {/* Onde cada botão do Linktree passa a morar. */}
        <section className="p-trocas" aria-labelledby="trocas-titulo">
          <Surge className="p-cabeca">
            <p className="sobretitulo">Nada se perde</p>
            <h2 id="trocas-titulo">Cada botão do Linktree ganha <em>um lugar no site.</em></h2>
          </Surge>
          <ol className="p-trocas-lista">
            {trocas.map((t) => (
              <li key={t.titulo}>
                <Surge className="p-troca">
                  <div className="p-troca-de">
                    {t.de.map((d) => <span key={d} className="p-botao-lt">{d}</span>)}
                  </div>
                  <Seta />
                  <div className={`p-troca-para ${t.foto ? '' : 'sem-foto'}`}>
                    {t.foto ? (
                      <img src={`/proposta/${t.foto}.webp`} alt={`Seção ${t.titulo} do site no celular`} loading="lazy" />
                    ) : (
                      <span className="p-troca-icone" aria-hidden="true"><IconeWhatsApp /></span>
                    )}
                    <div>
                      <h3>{t.titulo}</h3>
                      <p>{t.texto}</p>
                    </div>
                  </div>
                </Surge>
              </li>
            ))}
          </ol>

          <Surge className="p-extras">
            <h3>E o que o Linktree não mostra</h3>
            <div className="p-extras-grade">
              <figure>
                <img src="/proposta/executivo.webp" alt="Menu executivo da semana no site, com preço e o selo servido hoje" loading="lazy" />
                <figcaption><strong>Menu executivo da semana</strong> Com as datas, o preço e o selo de servido hoje.</figcaption>
              </figure>
              <figure>
                <img src="/proposta/salao.webp" alt="Seção do salão no site, com vídeos da casa" loading="lazy" />
                <figcaption><strong>O salão em vídeo</strong> O salão, a varanda e o caminho entre lagos e mata.</figcaption>
              </figure>
            </div>
          </Surge>
        </section>

        {/* A reserva como chega no WhatsApp da casa. */}
        <section className="p-reserva" aria-labelledby="reserva-titulo">
          <Surge className="p-reserva-texto">
            <p className="sobretitulo">Reservas</p>
            <h2 id="reserva-titulo">A reserva chega <em>pronta.</em></h2>
            <p>
              O cliente escolhe dia, horário e pessoas no site, e o WhatsApp da casa recebe a mensagem completa, com nome e
              ocasião. A equipe só confirma.
            </p>
          </Surge>
          <Surge className="p-conversa" atraso={0.1}>
            <div className="p-conversa-topo">
              <span className="p-conversa-foto" aria-hidden="true"><Tomate /></span>
              <div><strong>{info.nome}</strong><small>WhatsApp</small></div>
            </div>
            <div className="p-conversa-corpo">
              <p className="p-bolha">
                {mensagem.map((linha, i) => <span key={i}>{linha || ' '}</span>)}
                <small>20:14 ✓✓</small>
              </p>
            </div>
          </Surge>
        </section>

        {/* Onde usar o link. */}
        <section className="p-usos" aria-labelledby="usos-titulo">
          <Surge className="p-cabeca">
            <p className="sobretitulo">Um endereço só</p>
            <h2 id="usos-titulo">Um link para <em>tudo.</em></h2>
          </Surge>
          <ul className="p-usos-lista">
            {usos.map((u, i) => (
              <li key={u.titulo}>
                <Surge atraso={i * 0.06}>
                  <span className="p-usos-numero">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{u.titulo}</h3>
                  <p>{u.texto}</p>
                </Surge>
              </li>
            ))}
          </ul>
        </section>

        {/* Convite para a conversa com quem decide. */}
        <section className="p-convite" aria-labelledby="convite-titulo">
          <Surge className="p-convite-caixa">
            <Marca className="p-convite-marca" />
            <h2 id="convite-titulo">Vamos conversar?</h2>
            <p>
              Gostaria de falar com a pessoa responsável pelo Scarpetta, seja o dono ou quem cuida do marketing, para
              mostrar em 15 minutos como o site funcionaria no dia a dia de vocês. Sem compromisso.
            </p>
            <div className="p-convite-acoes">
              <a className="botao botao-verde" href="/" target="_blank" rel="noreferrer">Abrir o site</a>
              <a className="botao botao-linha-verde" href={AUTOR.link} target="_blank" rel="noreferrer">Falar com o {AUTOR.nome}</a>
            </div>
            <p className="p-assinatura">{AUTOR.nome} · <a href={AUTOR.link} target="_blank" rel="noreferrer">{AUTOR.marca}</a></p>
          </Surge>
        </section>
      </main>

      <footer className="p-rodape">
        Proposta preparada por {AUTOR.marca} para o {info.nome}. Fotos, pratos e informações da própria casa.
      </footer>
    </MotionConfig>
  )
}

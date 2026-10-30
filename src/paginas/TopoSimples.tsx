import { Marca } from '../components/Marca'
import { BotaoReserva } from '../components/BotaoReserva'

// Topo das páginas avulsas (404, privacidade): a assinatura leva de volta ao site e a reserva fica à mão.
export function TopoSimples() {
  return (
    <header className="topo-simples">
      <a href="/" className="topo-simples-marca" aria-label="Scarpetta Cucina, voltar ao início">
        <Marca comCucina={false} />
      </a>
      <BotaoReserva href="/#reserva" className="topo-simples-reserva" />
    </header>
  )
}

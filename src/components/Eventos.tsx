import { motion, useReducedMotion } from 'motion/react'
import { info, wa } from '../data/info'
import { Foto } from './Foto'
import { Titulo } from './Movimento'

export function Eventos() {
  const reduzir = useReducedMotion()
  return (
    <section className="eventos" id="eventos" aria-labelledby="eventos-titulo">
      <motion.div
        className="eventos-foto"
        initial={reduzir ? false : { clipPath: 'inset(12% 12% 12% 12% round 200px 200px 0 0)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 200px 200px 0 0)' }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <Foto nome="medaglioni" alt="Medalhões de filé com risoto à milanese e uma taça de vinho tinto" sizes="(min-width: 900px) 40vw, 90vw" />
      </motion.div>
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

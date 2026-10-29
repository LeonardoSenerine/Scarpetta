import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Clipe } from './Clipe'
import { Leitura, curva } from './Movimento'
import { Selo } from './Selo'

const fatos = [
  { titulo: 'Massa fresca', texto: 'aberta na casa, do capeletti de burrata ao fettuccine.' },
  { titulo: 'Pizza de fermentação natural', texto: 'com tomate San Marzano DOP.' },
  { titulo: 'Um salão no meio do verde', texto: 'dentro do Doda Training Center, em Itatiba.' },
]

// O nome da casa explicado: fare la scarpetta. A definição ganha tinta conforme é lida,
// e ao lado o prato com molho e a pizza se sobrepõem em velocidades diferentes.
export function Manifesto() {
  const colagem = useRef<HTMLDivElement>(null)
  const reduzir = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: colagem, offset: ['start end', 'end start'] })
  const yPao = useTransform(scrollYProgress, [0, 1], reduzir ? [0, 0] : [40, -40])
  const yMassa = useTransform(scrollYProgress, [0, 1], reduzir ? [0, 0] : [110, -110])

  return (
    <section className="manifesto" aria-labelledby="manifesto-titulo">
      <div className="manifesto-texto">
        <p className="verbete">
          <span lang="it">scar·pét·ta</span> <em>substantivo feminino</em>
        </p>
        <Leitura
          id="manifesto-titulo"
          trechos={[
            { texto: 'Fare la scarpetta', lang: 'it', italico: true },
            { texto: 'é passar o pão no prato até não sobrar nada do molho.' },
          ]}
        />
        <p className="manifesto-intro">
          É o maior elogio que uma cozinha pode receber. Por isso a nossa começa pelo pão: o cestino chega à mesa com
          ciabatta, grissini, focaccia e o molho de tomate da casa.
        </p>
        <ul className="manifesto-fatos">
          {fatos.map((f, i) => (
            <motion.li
              key={f.titulo}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: curva }}
            >
              <strong>{f.titulo}</strong> {f.texto}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="manifesto-colagem" ref={colagem}>
        <motion.div className="colagem-pao" style={{ y: yPao }}>
          <Clipe nome="prato" rotulo="Capeletti di burrata servido no molho de tomate da casa" />
        </motion.div>
        <motion.div className="colagem-massa" style={{ y: yMassa }}>
          <Clipe nome="peperoni" rotulo="Pizza de peperoni artesanal sendo cortada" />
        </motion.div>
        <Selo className="colagem-selo" />
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Foto } from './Foto'
import { Leitura, curva } from './Movimento'

const fatos = [
  { titulo: 'Massa fresca', texto: 'aberta na casa, do capeletti de burrata ao fettuccine.' },
  { titulo: 'Pizza de fermentação natural', texto: 'com tomate San Marzano DOP.' },
  { titulo: 'Um salão no meio do verde', texto: 'dentro do Doda Training Center, em Itatiba.' },
]

// O nome da casa explicado: fare la scarpetta. A definição ganha tinta conforme é lida,
// e ao lado duas fotos se revelam como cortina e se sobrepõem em velocidades diferentes.
export function Manifesto() {
  const colagem = useRef<HTMLDivElement>(null)
  const reduzir = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: colagem, offset: ['start end', 'end start'] })
  const yGrande = useTransform(scrollYProgress, [0, 1], reduzir ? [0, 0] : [40, -40])
  const yPequena = useTransform(scrollYProgress, [0, 1], reduzir ? [0, 0] : [120, -120])

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
        {[
          { classe: 'colagem-grande', y: yGrande, nome: 'lasagna-detalhe', alt: 'Lasagna alla bolognese em detalhe, com camadas de massa fresca e sálvia', sizes: '(min-width: 960px) 30vw, 66vw' },
          { classe: 'colagem-pequena', y: yPequena, nome: 'fettuccine-garfo', alt: 'Garfo enrolando fettuccine fresco ao molho de manteiga e parmesão', sizes: '(min-width: 960px) 20vw, 48vw' },
        ].map((f, i) => (
          // O gatilho fica no pai: um elemento 100% recortado não conta como visível.
          <motion.div
            key={f.nome}
            className={f.classe}
            style={{ y: f.y }}
            initial={reduzir ? false : 'oculta'}
            whileInView="visivel"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="colagem-revela"
              variants={{
                oculta: { clipPath: 'inset(0% 0% 100% 0%)' },
                visivel: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, delay: i * 0.25, ease: [0.65, 0, 0.25, 1] } },
              }}
            >
              <Foto nome={f.nome} alt={f.alt} sizes={f.sizes} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

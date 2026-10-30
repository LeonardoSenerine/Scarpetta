import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Foto } from './Foto'
import { Leitura } from './Movimento'

const fatos = [
  { titulo: 'Massa fresca', texto: 'aberta na casa, do capeletti de burrata ao fettuccine.' },
  { titulo: 'Pizza de fermentação natural', texto: 'com tomate San Marzano DOP.' },
  { titulo: 'Um salão no meio do verde', texto: 'dentro do Doda Training Center, em Itatiba.' },
]

// O nome da casa explicado: fare la scarpetta. A definição ganha tinta conforme é lida,
// e ao lado duas fotos se sobrepõem e correm em velocidades diferentes com a rolagem.
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
          {fatos.map((f) => (
            <li key={f.titulo}>
              <strong>{f.titulo}</strong> {f.texto}
            </li>
          ))}
        </ul>
      </div>

      <div className="manifesto-colagem" ref={colagem}>
        {[
          { classe: 'colagem-grande', y: yGrande, nome: 'lasagna-detalhe', alt: 'Lasagna alla bolognese em detalhe, com camadas de massa fresca e sálvia', sizes: '(min-width: 960px) 30vw, 66vw' },
          { classe: 'colagem-pequena', y: yPequena, nome: 'fettuccine-garfo', alt: 'Garfo enrolando fettuccine fresco ao molho de manteiga e parmesão', sizes: '(min-width: 960px) 20vw, 48vw' },
        ].map((f) => (
          <motion.div key={f.nome} className={f.classe} style={{ y: f.y }}>
            <div className="colagem-revela">
              <Foto nome={f.nome} alt={f.alt} sizes={f.sizes} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Proposta } from './Proposta'
import '../styles.css'
import './proposta.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Proposta />
  </StrictMode>,
)

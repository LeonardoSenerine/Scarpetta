import { executivo } from '../data/executivo'
import { hojeEmItatiba } from './horario'

// Em que pé está o menu executivo da semana, no dia de hoje em Itatiba.
export function estadoExecutivo(hoje = hojeEmItatiba()) {
  const valeHoje = hoje >= executivo.inicio && hoje <= executivo.fim
  // Depois da sexta, o menu da semana sai do ar até o arquivo ser atualizado.
  const encerrado = hoje > executivo.fim
  return { valeHoje, encerrado }
}

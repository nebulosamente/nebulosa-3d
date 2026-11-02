import { CeuLiquido } from './components/sections/CeuLiquido'
import { useMobileReveal } from './hooks/useMobileReveal'

function App() {
  useMobileReveal()
  return <CeuLiquido />
}

export default App

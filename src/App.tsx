import { CeuLiquido } from './components/sections/CeuLiquido'
import { useMobileReveal } from './hooks/useMobileReveal'
import { navigateTo } from './lib/links'

function App() {
  useMobileReveal()
  return <CeuLiquido onNavigate={navigateTo} />
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

/** Le point d'exclamation est une assertion de non-nullité en TypeScript qui indique
 * que document.getElementById("root") ne sera jamais null */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fuentes autoalojadas (sin round-trip a fonts.googleapis.com). `wght.css` trae
// sólo los pesos variables normales, sin itálicas.
import '@fontsource-variable/plus-jakarta-sans/wght.css'
import '@fontsource-variable/outfit/wght.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

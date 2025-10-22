import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Myweather from './Myweather'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Myweather/>
  </StrictMode>,
)

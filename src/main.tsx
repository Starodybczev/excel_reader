import { createRoot } from 'react-dom/client'
import "./styles/index.css"
import App from './App.tsx'
import { DataProvider } from './context/DataContext.tsx'

createRoot(document.getElementById('root')!).render(<DataProvider><App /></DataProvider>)

import { createRoot } from 'react-dom/client'
import "./styles/index.css"
import App from './App.tsx'
import { DataProvider } from './context/DataContext.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!)
    .render(
        <BrowserRouter>
            <DataProvider>
                <App />
            </DataProvider>
        </BrowserRouter>
    )

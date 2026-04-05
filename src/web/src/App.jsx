import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthProvider'
import AppRoutes from './routes'
import BarraLateral from './components/Sidebar'; // Importando o Sidebar
import './App.css'; // Onde está o layout de colunas

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ display: 'flex' }}> 
          
          <BarraLateral />

          {/* Conteúdo das páginas à direita */}
          <main style={{ flex: 1, marginLeft: '320px', padding: '20px' }}>
        <AppRoutes />
        </main>

        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
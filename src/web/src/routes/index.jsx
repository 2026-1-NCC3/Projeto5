import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Patients from '../pages/Pacientes'
import Layout from '../components/Layout' // Importando o novo Layout com a Sidebar
import EsqueceuSenha from '../pages/EsqueceuSenha/EsqueceuSenha'
import ResetSenha from '../pages/EsqueceuSenha/ResetSenha'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública: Login (Sem Sidebar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
      <Route path="/reset-senha" element={<ResetSenha />} />

      {/* Rotas Privadas com Layout (Sidebar inclusa) */}
      <Route
        element={
          <PrivateRoute>
            <Layout /> {/* O Layout agora é o "pai" das páginas internas */}
          </PrivateRoute>
        }
      >
        {/* As páginas abaixo aparecem dentro do 'Outlet' do Layout */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
      </Route>

      {/* Redirecionamento padrão caso a rota não exista */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Patients from '../pages/Pacientes/Pacientes'
import Layout from '../components/Layout'
import EsqueceuSenha from '../pages/EsqueceuSenha/EsqueceuSenha'
import ResetSenha from '../pages/EsqueceuSenha/ResetSenha'
import Agenda from '../pages/Agenda/Agenda'
import Conteudo from '../pages/Conteudo/Exercicios' // 👈 adicione o import
import Exercicios from '../pages/Conteudo/Exercicios'
import Configuracoes from '../pages/Configuracoes/Configuracoes'

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
      <Route path="/reset-senha" element={<ResetSenha />} />

      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/clinica" element={<Patients />} />
        <Route path="/conteudo" element={<Exercicios />} /> 
        <Route path="/configuracoes" element={<Configuracoes/>} /> // 
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
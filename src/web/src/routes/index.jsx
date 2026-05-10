import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Pacientes from '../pages/Pacientes/Pacientes'
import Layout from '../components/Layout'
import EsqueceuSenha from '../pages/EsqueceuSenha/EsqueceuSenha'
import ResetSenha from '../pages/EsqueceuSenha/ResetSenha'
import Agenda from '../pages/Agenda/Agenda'
import Conteudo from '../pages/Conteudo/Exercicios' 
import Exercicios from '../pages/Conteudo/Exercicios'
import Configuracoes from '../pages/Configuracoes/Configuracoes'
import Prontuario from '../pages/Prontuario/Prontuario'
import Ajuda from '../pages/Ajuda/Ajuda'
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
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/clinica" element={<Pacientes />} />
        <Route path="/paciente/:id" element={<Prontuario />} />
        <Route path="/conteudo" element={<Exercicios />} /> 
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/configuracoes" element={<Configuracoes/>} /> 
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
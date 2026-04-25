import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import Patients from '../pages/Pacientes/Pacientes'
import Layout from '../components/Layout' // Importando o novo Layout com a Sidebar
import EsqueceuSenha from '../pages/EsqueceuSenha/EsqueceuSenha'
import ResetSenha from '../pages/EsqueceuSenha/ResetSenha'
import Agenda from '../pages/Agenda/Agenda'

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
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}
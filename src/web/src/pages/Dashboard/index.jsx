import { useAuth } from '../../hooks/useAuth'

export default function Dashboard() {
  const { user, logout } = useAuth()
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Logado como: {user?.email}</p>
      <button onClick={logout}>Sair</button>
    </div>
  )
}
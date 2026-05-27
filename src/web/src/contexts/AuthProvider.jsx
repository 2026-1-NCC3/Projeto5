import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { supabase } from '../services/supabase'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("maya_user")
    return stored ? JSON.parse(stored) : null
  })

  // Sincroniza o token com o Supabase — mantém localStorage["token"] sempre fresco
  useEffect(() => {
    // Ao montar: pega a sessão atual (caso o usuário já esteja logado)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        localStorage.setItem("token", session.access_token)
        sessionStorage.setItem("maya_user", JSON.stringify(session.user))
        setUser(session.user)
      }
    })

    // Escuta renovações automáticas do token (a cada ~1h o Supabase renova)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          // Atualiza o token no localStorage toda vez que for renovado
          localStorage.setItem("token", session.access_token)
          sessionStorage.setItem("maya_user", JSON.stringify(session.user))
          setUser(session.user)
        } else {
          // Sessão encerrada (logout ou expiração definitiva)
          localStorage.removeItem("token")
          sessionStorage.removeItem("maya_user")
          sessionStorage.removeItem("maya_token")
          setUser(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const login = (userData, token) => {
    if (token) localStorage.setItem("token", token)
    sessionStorage.setItem("maya_token", token ?? '')
    sessionStorage.setItem("maya_user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("token")
    sessionStorage.removeItem("maya_token")
    sessionStorage.removeItem("maya_user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
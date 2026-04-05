import { useState } from 'react'
import { AuthContext } from './AuthContext'
 
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem("maya_user")
    return stored ? JSON.parse(stored) : null
  })
 
  const login = (userData, token) => {
    sessionStorage.setItem("maya_token", token)
    sessionStorage.setItem("maya_user", JSON.stringify(userData))
    setUser(userData)
  }
 
  const logout = () => {
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
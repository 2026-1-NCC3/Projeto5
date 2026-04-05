import { useState } from 'react'
import { AuthContext } from './AuthContext'
 
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("maya_user")
    return stored ? JSON.parse(stored) : null
  })
 
  const login = (userData, token) => {
    localStorage.setItem("maya_token", token)
    localStorage.setItem("maya_user", JSON.stringify(userData))
    setUser(userData)
  }
 
  const logout = () => {
    localStorage.removeItem("maya_token")
    localStorage.removeItem("maya_user")
    setUser(null)
  }
 
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
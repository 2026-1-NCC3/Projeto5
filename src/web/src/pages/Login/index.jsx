import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './Login.module.css'
import maya from '../../assets/Maya.png'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (loading) return
    if (!email || !password) {
      setError('Preencha todos os campos.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      console.error(err)
      setError('E-mail ou senha incorretos.')
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>

        <div className={styles.leftPanel}>
          <img src={maya} alt="Maya Yamamoto" className={styles.photo} />
          <div className={styles.leftOverlay} />
          <div className={styles.leftContent}>
            <h1 className={styles.clinicName}>Clínica Maya Yamamoto</h1>
            <p className={styles.clinicSpecialty}>Especialista em RPG</p>
          </div>
        </div>

        <div className={styles.rightPanel}>
          <h2 className={styles.welcomeTitle}>Bem-vindo!</h2>
          <p className={styles.welcomeSubtitle}>
            Acesse sua conta para gerenciar seus pacientes e consultas.
          </p>

          <div className={styles.formCard}>

            {/* EMAIL */}
            <div className={styles.fieldWrapper}>
              <input
                className={styles.fieldInput}
                type="email"
                placeholder=" "
                id="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  setError('')
                }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                disabled={loading}
              />
              <label className={styles.fieldLabel} htmlFor="email">E-mail</label>

              {email && (
                <svg
                  className={styles.clearIcon}
                  viewBox="0 0 24 24"
                  onClick={() => setEmail('')}
                  style={{ cursor: 'pointer' }}
                >
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                </svg>
              )}
            </div>

            {/* SENHA */}
            <div className={styles.fieldWrapper}>
              <input
                className={styles.fieldInput}
                type={showPassword ? 'text' : 'password'}
                placeholder=" "
                id="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                  setError('')
                }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                disabled={loading}
              />
              <label className={styles.fieldLabel} htmlFor="password">Senha</label>

              {/* 👁️ mostrar/ocultar senha */}
              <svg
                className={styles.eyeIcon}
                viewBox="0 0 24 24"
                onClick={() => setShowPassword(prev => !prev)}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? (
                  <path d="M2 4.27L3.28 3 21 20.72 19.73 22l-2.45-2.45C15.99 20.16 14.05 20.5 12 20.5c-5 0-9.27-3.11-11-7.5 1.01-2.56 2.94-4.67 5.37-5.97L2 4.27z" />
                ) : (
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 11c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                )}
              </svg>

              {password && (
                <svg
                  className={styles.clearIcon}
                  viewBox="0 0 24 24"
                  onClick={() => setPassword('')}
                  style={{ cursor: 'pointer' }}
                >
                  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
                </svg>
              )}
            </div>

            {error && <p className={styles.errorMsg}>{error}</p>}

            <button
              className={styles.btnLogin}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}
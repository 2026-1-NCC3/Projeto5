import axios from 'axios' // para criar uma instância do axios com a URL do deploy que eu subi no render
import {supabase} from './supabase'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})
api.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession()
  const token = data?.session?.access_token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
export default api;
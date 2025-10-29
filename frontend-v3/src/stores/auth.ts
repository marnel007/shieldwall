import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export interface User {
  id: string
  email: string
  username: string
  verified: boolean
  two_factor_enabled: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  const login = async (email: string, password: string) => {
    const response = await api.post('/login', { email, password })
    const { token: authToken, user: userData } = response.data
    setToken(authToken)
    setUser(userData)
    return response.data
  }

  const register = async (email: string, password: string, username: string) => {
    const response = await api.post('/register', { email, password, username })
    return response.data
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  const fetchUser = async () => {
    if (!token.value) return
    try {
      const response = await api.get('/user')
      setUser(response.data)
    } catch (error) {
      logout()
      throw error
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
    setToken,
    setUser,
  }
})

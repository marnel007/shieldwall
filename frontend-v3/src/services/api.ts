import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8666',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add organization ID
    const currentOrgId = localStorage.getItem('currentOrgId')
    if (currentOrgId && config.headers) {
      config.headers['X-Organization-ID'] = currentOrgId
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status
      const message = (error.response.data as any)?.message || error.message

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token')
          localStorage.removeItem('currentOrgId')
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
          ElMessage.error('Session expired. Please login again.')
          break
        case 403:
          ElMessage.error('You do not have permission to perform this action.')
          break
        case 404:
          ElMessage.error('Resource not found.')
          break
        case 500:
          ElMessage.error('Server error. Please try again later.')
          break
        default:
          ElMessage.error(message || 'An error occurred.')
      }
    } else if (error.request) {
      ElMessage.error('Network error. Please check your connection.')
    } else {
      ElMessage.error('An unexpected error occurred.')
    }

    return Promise.reject(error)
  }
)

export default api

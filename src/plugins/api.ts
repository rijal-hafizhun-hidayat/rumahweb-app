import axios, { AxiosError } from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  if (sessionStorage.getItem('token')) {
    config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const err = error as AxiosError
    if (err.response?.status === 403) {
      router.push({
        name: 'login.index',
      })
    }
    return Promise.reject(error)
  },
)

export default api

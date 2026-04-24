import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      // TODO: handle unauthorized (redirect to login, clear auth state, etc.)
    }
    return Promise.reject(error)
  },
)

export default client

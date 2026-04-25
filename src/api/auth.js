import client from './client'

export function login({ email, password }) {
  return client.post('/api/auth/login/', { email, password })
}

export function refresh(refreshToken) {
  return client.post('/api/auth/refresh/', { refresh: refreshToken })
}

export function logout(refreshToken) {
  return client.post('/api/auth/logout/', { refresh: refreshToken })
}

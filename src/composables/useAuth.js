import { reactive, computed } from 'vue'
import { login as apiLogin, logout as apiLogout } from '@/api/auth'

const state = reactive({
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
  accessToken: localStorage.getItem('auth_token') || null,
  refreshToken: localStorage.getItem('refresh_token') || null,
})

function setSession({ access, refresh, user }) {
  state.accessToken = access
  state.refreshToken = refresh
  state.user = user
  localStorage.setItem('auth_token', access)
  localStorage.setItem('refresh_token', refresh)
  localStorage.setItem('auth_user', JSON.stringify(user))
}

function clearSession() {
  state.accessToken = null
  state.refreshToken = null
  state.user = null
  localStorage.removeItem('auth_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('auth_user')
}

export function useAuth() {
  const isAuthenticated = computed(() => !!state.accessToken)

  async function login(email, password) {
    const { data } = await apiLogin({ email, password })
    setSession(data)
    return data
  }

  async function logout() {
    try {
      if (state.refreshToken) {
        await apiLogout(state.refreshToken)
      }
    } finally {
      clearSession()
    }
  }

  return {
    user: computed(() => state.user),
    isAuthenticated,
    login,
    logout,
    clearSession,
  }
}

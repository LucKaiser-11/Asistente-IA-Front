import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.rol === 'admin')

  function setUser(userData) {
    user.value = userData
  }

  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function logout() {
    authService.logout()
    user.value = null
    token.value = null
  }

  async function loadUser() {
    if (token.value && !user.value) {
      try {
        const response = await authService.getCurrentUser()
        user.value = response.usuario
      } catch (error) {
        console.error('Error al cargar usuario:', error)
        logout()
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    setUser,
    setToken,
    logout,
    loadUser
  }
})

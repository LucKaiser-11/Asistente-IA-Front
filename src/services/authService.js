import apiClient from './api'

export const authService = {
  // Login
  async login(email, password) {
    const response = await apiClient.post('/auth/login', {
      email,
      password
    })
    return response.data
  },

  // Registro
  async register(userData) {
    const response = await apiClient.post('/auth/register', {
      nombres: userData.nombres,
      apellido_paterno: userData.apellido_paterno,
      apellido_materno: userData.apellido_materno || null,
      telefono: userData.telefono || null,
      fecha_nacimiento: userData.fecha_nacimiento || null,
      email: userData.email,
      password: userData.password
    })
    return response.data
  },

  // Logout
  logout() {
    localStorage.removeItem('token')
  }
}

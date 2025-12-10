<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-teal-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <!-- Logo o título -->
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-sky-600">Asistente Médico</h1>
        <p class="text-gray-500 mt-2">Inicia sesión para continuar</p>
      </div>

      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {{ errorMessage }}
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleLogin">
        <!-- Email -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Correo electrónico</label>
          <input
            v-model="email"
            type="email"
            placeholder="ejemplo@correo.com"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            required
          />
        </div>

        <!-- Contraseña -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-medium mb-2">Contraseña</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
            required
          />
        </div>

        <!-- Botón -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
        </button>
      </form>

      <!-- Link a registro -->
      <p class="text-center text-gray-500 mt-6">
        ¿No tienes cuenta?
        <button @click="showRegisterModal = true" class="text-teal-600 hover:underline">
          Regístrate
        </button>
      </p>
    </div>

    <!-- Modal de Registro -->
    <div
      v-if="showRegisterModal"
      @click="showRegisterModal = false"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        @click.stop
        class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all max-h-[90vh] overflow-y-auto"
      >
        <!-- Header del modal -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-sky-600">Crear cuenta</h2>
          <button
            @click="showRegisterModal = false"
            class="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <!-- Mensaje de éxito -->
        <div v-if="registerSuccess" class="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {{ registerSuccess }}
        </div>

        <!-- Mensaje de error -->
        <div v-if="registerError" class="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {{ registerError }}
        </div>

        <!-- Formulario de registro -->
        <form @submit.prevent="handleRegister">
          <!-- Nombre(s) -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">
              Nombre(s) <span class="text-red-500">*</span>
            </label>
            <input
              v-model="registerNombre"
              type="text"
              placeholder="Juan Carlos"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              required
            />
          </div>

          <!-- Apellido Paterno -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">
              Apellido Paterno <span class="text-red-500">*</span>
            </label>
            <input
              v-model="registerApellidoPaterno"
              type="text"
              placeholder="Pérez"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              required
            />
          </div>

          <!-- Apellido Materno (opcional) -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">
              Apellido Materno <span class="text-gray-400 text-xs">(opcional)</span>
            </label>
            <input
              v-model="registerApellidoMaterno"
              type="text"
              placeholder="García"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            />
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">
              Correo electrónico <span class="text-red-500">*</span>
            </label>
            <input
              v-model="registerEmail"
              type="email"
              placeholder="ejemplo@correo.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              required
            />
          </div>

          <!-- Contraseña -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">
              Contraseña <span class="text-red-500">*</span>
              <span class="text-gray-400 text-xs">(mínimo 6 caracteres)</span>
            </label>
            <input
              v-model="registerPassword"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              required
            />
          </div>

          <!-- Confirmar contraseña -->
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-medium mb-2">
              Confirmar contraseña <span class="text-red-500">*</span>
            </label>
            <input
              v-model="registerConfirmPassword"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              required
            />
          </div>

          <!-- Botón -->
          <button
            type="submit"
            :disabled="registerLoading"
            class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ registerLoading ? 'Registrando...' : 'Registrarse' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { authService } from '../services/authService'

const router = useRouter()
const authStore = useAuthStore()

// Login
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

// Registro
const showRegisterModal = ref(false)
const registerNombre = ref('')
const registerApellidoPaterno = ref('')
const registerApellidoMaterno = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const registerConfirmPassword = ref('')
const registerLoading = ref(false)
const registerError = ref('')
const registerSuccess = ref('')

// Función para limpiar el formulario de registro
const clearRegisterForm = () => {
  registerNombre.value = ''
  registerApellidoPaterno.value = ''
  registerApellidoMaterno.value = ''
  registerEmail.value = ''
  registerPassword.value = ''
  registerConfirmPassword.value = ''
  registerError.value = ''
  registerSuccess.value = ''
}

// Limpiar formulario cuando se cierra el modal
watch(showRegisterModal, (newValue) => {
  if (!newValue) {
    clearRegisterForm()
  }
})

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    const response = await authService.login(email.value, password.value)
    authStore.setToken(response.token)
    authStore.setUser(response.usuario)
    router.push('/asistente')
  } catch (error) {
    console.error('Error en login:', error)
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else if (error.response?.status === 401) {
      errorMessage.value = 'Email o contraseña incorrectos'
    } else {
      errorMessage.value = 'Error al iniciar sesión. Intenta de nuevo.'
    }
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  registerError.value = ''
  registerSuccess.value = ''
  registerLoading.value = true
  
  try {
    if (registerPassword.value !== registerConfirmPassword.value) {
      registerError.value = 'Las contraseñas no coinciden'
      registerLoading.value = false
      return
    }
    
    if (registerPassword.value.length < 6) {
      registerError.value = 'La contraseña debe tener al menos 6 caracteres'
      registerLoading.value = false
      return
    }
    
    if (!registerNombre.value.trim()) {
      registerError.value = 'El nombre es obligatorio'
      registerLoading.value = false
      return
    }
    
    const response = await authService.register({
      nombres: registerNombre.value.trim(),
      apellido_paterno: registerApellidoPaterno.value.trim() || 'Sin apellido',
      apellido_materno: registerApellidoMaterno.value.trim() || null,
      email: registerEmail.value,
      password: registerPassword.value
    })
    
    registerSuccess.value = '¡Cuenta creada exitosamente! Redirigiendo...'
    authStore.setToken(response.token)
    authStore.setUser(response.usuario)
    
    setTimeout(() => {
      showRegisterModal.value = false
      router.push('/asistente')
    }, 1000)
    
  } catch (error) {
    console.error('Error en registro:', error)
    if (error.response?.data?.message) {
      registerError.value = error.response.data.message
    } else if (error.response?.status === 409) {
      registerError.value = 'Este email ya está registrado'
    } else {
      registerError.value = 'Error al registrar. Intenta de nuevo.'
    }
  } finally {
    registerLoading.value = false
  }
}
</script>


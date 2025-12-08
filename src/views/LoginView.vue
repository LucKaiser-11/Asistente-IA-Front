<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-teal-100">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <!-- Logo o título -->
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-sky-600">Asistente Médico</h1>
        <p class="text-gray-500 mt-2">Inicia sesión para continuar</p>
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
          class="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Iniciar sesión
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
        class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all"
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

        <!-- Formulario de registro -->
        <form @submit.prevent="handleRegister">
          <!-- Nombre completo -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">Nombre completo</label>
            <input
              v-model="registerNombre"
              type="text"
              placeholder="Juan Pérez"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              required
            />
          </div>

          <!-- Email -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">Correo electrónico</label>
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
            <label class="block text-gray-700 text-sm font-medium mb-2">Contraseña</label>
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
            <label class="block text-gray-700 text-sm font-medium mb-2">Confirmar contraseña</label>
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
            class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Registrarse
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

const router = useRouter()
const authStore = useAuthStore()
// Login
const email = ref('')
const password = ref('')

// Registro
const showRegisterModal = ref(false)
const registerNombre = ref('')
const registerEmail = ref('')
const registerPassword = ref('')
const registerConfirmPassword = ref('')

// Función para limpiar el formulario de registro
const clearRegisterForm = () => {
  registerNombre.value = ''
  registerEmail.value = ''
  registerPassword.value = ''
  registerConfirmPassword.value = ''
}

// Limpiar formulario cuando se cierra el modal
watch(showRegisterModal, (newValue) => {
  if (!newValue) {
    clearRegisterForm()
  }
})

const handleLogin = async () => {
  try {
    // Simulación - después conectarás con tu backend
    authStore.setToken('fake-jwt-token')
    authStore.setUser({
      id: 1,
      nombres: 'Lucas',
      email: email.value,
      rol: 'cliente'
    })
    
    router.push('/evaluacion')
  } catch (error) {
    alert('Error al iniciar sesión')
  }
}

const handleRegister = async () => {
  // Validar que las contraseñas coincidan
  if (registerPassword.value !== registerConfirmPassword.value) {
    alert('Las contraseñas no coinciden')
    return
  }

  // Aquí irá la llamada al backend
  console.log('Registro:', {
    nombre: registerNombre.value,
    email: registerEmail.value,
    password: registerPassword.value
  })

  // Cerrar modal (el watch se encargará de limpiar)
  showRegisterModal.value = false
}
</script>

<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3">
          <div class="bg-sky-500 text-white w-12 h-12 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm2 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-2-4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"/>
            </svg>
          </div>
          <div>
            <div class="text-lg font-bold text-sky-700">Diagnóstico Médico IA</div>
            <div class="text-sm text-gray-600">Sistema Inteligente de Salud</div>
          </div>
        </router-link>

        <!-- Navigation -->
        <div class="flex items-center space-x-8">
          <!-- Sin autenticación -->
          <template v-if="!authStore.isAuthenticated">
            <router-link to="/" class="text-gray-700 hover:text-sky-600 font-medium transition">
              Inicio
            </router-link>
            <a href="#sobre" class="text-gray-700 hover:text-sky-600 font-medium transition">
              Sobre el Asistente
            </a>
            <router-link to="/login" class="bg-sky-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-sky-600 transition">
              Iniciar Sesión
            </router-link>
          </template>

          <!-- Con autenticación -->
          <template v-else>
            <router-link to="/" class="text-gray-700 hover:text-sky-600 font-medium transition">
              Inicio
            </router-link>
            
            <!-- Usuario y logout -->
            <div class="flex items-center space-x-4">
              <span class="text-gray-700 font-medium">{{ authStore.user?.nombres }}</span>
              <button @click="handleLogout" class="bg-red-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition">
                Cerrar Sesión
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

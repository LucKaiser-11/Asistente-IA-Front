<template>
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3">
          <div class="bg-sky-500 text-white w-12 h-12 rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
              <defs>
                <linearGradient id="gradientCore" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#0891b2;stop-opacity:1" />
                </linearGradient>
              </defs>
              
              <!-- Cruz médica central -->
              <rect x="85" y="60" width="30" height="80" fill="url(#gradientCore)" rx="4"/>
              <rect x="60" y="85" width="80" height="30" fill="url(#gradientCore)" rx="4"/>
              
              <!-- Puntos de red neuronal (nodos) -->
              <circle cx="40" cy="50" r="6" fill="#0891b2" opacity="0.8"/>
              <circle cx="160" cy="50" r="6" fill="#0891b2" opacity="0.8"/>
              <circle cx="40" cy="150" r="6" fill="#0891b2" opacity="0.8"/>
              <circle cx="160" cy="150" r="6" fill="#0891b2" opacity="0.8"/>
              
              <!-- Líneas de conexión (circuito) -->
              <line x1="40" y1="50" x2="85" y2="85" stroke="#0891b2" stroke-width="2" opacity="0.5"/>
              <line x1="160" y1="50" x2="115" y2="85" stroke="#0891b2" stroke-width="2" opacity="0.5"/>
              <line x1="40" y1="150" x2="85" y2="115" stroke="#0891b2" stroke-width="2" opacity="0.5"/>
              <line x1="160" y1="150" x2="115" y2="115" stroke="#0891b2" stroke-width="2" opacity="0.5"/>
              
              <!-- Pulso cardíaco estilizado -->
              <path d="M 30 100 L 50 100 L 60 80 L 70 120 L 80 100 L 170 100" 
                    stroke="#1e3a8a" 
                    stroke-width="3" 
                    fill="none" 
                    opacity="0.6"/>
            </svg>
          </div>
          <div>
            <div class="text-lg font-bold text-sky-700">MediCore</div>
            <div class="text-sm text-gray-600">Asistente Inteligente Médico</div>
          </div>
        </router-link>

        <!-- Navigation -->
        <div class="flex items-center space-x-8">
          <!-- Sin autenticación -->
          <template v-if="!authStore.isAuthenticated">
            <router-link to="/" class="text-gray-700 hover:text-sky-600 font-medium transition">
              Inicio
            </router-link>
            <router-link to="/login" class="bg-sky-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-sky-600 transition">
              Iniciar Sesión
            </router-link>
          </template>

          <!-- Con autenticación -->
          <template v-else>
            <router-link 
              to="/" 
              class="text-gray-700 hover:text-sky-600 font-medium transition"
              active-class="text-sky-600 font-semibold"
            >
              Inicio
            </router-link>

            <router-link 
              to="/asistente" 
              class="text-gray-700 hover:text-sky-600 font-medium transition"
              active-class="text-sky-600 font-semibold"
            >
              Asistente
            </router-link>

            <router-link 
              to="/historial" 
              class="text-gray-700 hover:text-sky-600 font-medium transition"
              active-class="text-sky-600 font-semibold"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Historial</span>
              </div>
            </router-link>
            
            <!-- Usuario y logout -->
            <div class="flex items-center space-x-4 border-l border-gray-200 pl-6">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span class="text-gray-700 font-medium">{{ authStore.user?.nombres }}</span>
              </div>
              <button 
                @click="handleLogout" 
                class="bg-red-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-600 transition"
              >
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

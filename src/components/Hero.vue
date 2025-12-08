<template>
  <section id="sobre" class="bg-gradient-to-br from-sky-100 to-teal-100 py-16 lg:py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Columna izquierda -->
        <div class="space-y-6">
          <span class="inline-block bg-sky-100 text-sky-800 text-sm font-semibold px-4 py-2 rounded-full border border-sky-200">
            Tecnología de Inteligencia Artificial Avanzada
          </span>
          
          <h1 class="text-4xl lg:text-5xl font-bold text-sky-900 leading-tight">
            Sistema Inteligente de Diagnóstico Médico
          </h1>
          
          <p class="text-lg text-gray-600 leading-relaxed">
            Analiza tus síntomas usando procesamiento de lenguaje natural avanzado. 
            Recibe diagnósticos diferenciales precisos y orientación médica personalizada 
            mediante nuestro chatbot inteligente.
          </p>

          <!-- Features -->
          <div class="space-y-4 pt-4">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-gray-700">Análisis de síntomas en lenguaje natural</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-gray-700">Diagnósticos diferenciales basados en IA</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-gray-700">Alertas automáticas para casos graves</span>
            </div>
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-teal-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-gray-700">Chatbot médico interactivo</span>
            </div>
          </div>

          <!-- Botón dinámico -->
          <router-link 
            :to="authStore.isAuthenticated ? '/asistente' : '/login'" 
            class="inline-flex items-center space-x-2 bg-sky-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-sky-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>{{ authStore.isAuthenticated ? 'Ir al Asistente Médico' : 'Iniciar Evaluación Médica' }}</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </router-link>

          <p class="flex items-center space-x-2 text-sm text-gray-500 pt-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>Herramienta de apoyo - No reemplaza la consulta médica profesional</span>
          </p>
        </div>

        <!-- Columna derecha - Imagen -->
        <div class="relative">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800" 
            alt="Médico utilizando tecnología" 
            class="rounded-2xl shadow-2xl w-full h-auto"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

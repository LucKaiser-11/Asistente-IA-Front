<template>
  <div class="bg-white rounded-2xl shadow-sm p-8 mb-8">
    <div class="flex items-center space-x-3 mb-6">
      <div class="bg-blue-600 rounded-full p-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Resultados del Análisis NLP</h2>
        <p class="text-gray-600">Síntomas detectados por nuestros modelos de IA</p>
      </div>
    </div>
    
    <div class="bg-blue-50 rounded-xl p-4 mb-6">
      <p class="text-sm text-gray-700">
        <span class="font-semibold">Texto analizado:</span> {{ analyzedText }}
      </p>
    </div>
    
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  analyzedText: {
    type: String,
    required: true
  }
})
</script>

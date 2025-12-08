<template>
  <div class="bg-blue-50 rounded-2xl shadow-sm p-6 mb-8">
    <div class="flex items-center space-x-3 mb-4">
      <div class="bg-blue-600 rounded-full p-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
        </svg>
      </div>
      <span class="text-sm text-gray-600 font-medium">Diagnóstico más probable</span>
    </div>
    
    <h3 class="text-3xl font-bold text-gray-900 mb-2">{{ diagnosis.name }}</h3>
    <p class="text-blue-600 font-semibold text-lg">Probabilidad: {{ diagnosis.probability }}%</p>
  </div>
</template>

<script setup>
defineProps({
  diagnosis: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
    <div class="flex items-start space-x-4">
      <div class="bg-green-500 rounded-full p-2 flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      
      <div class="flex-1">
        <h3 class="font-bold text-green-900 text-lg mb-2">Análisis completado exitosamente</h3>
        <p class="text-green-800 mb-4">
          Se detectaron {{ symptomCount }} síntomas con un modelo de IA avanzado. El siguiente paso es
          generar diagnósticos diferenciales basados en estos síntomas.
        </p>
        
        <button
          @click="$emit('generate-diagnosis')"
          class="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          <span>Generar diagnóstico diferencial</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  symptomCount: {
    type: Number,
    default: 3
  }
})

defineEmits(['generate-diagnosis'])
</script>

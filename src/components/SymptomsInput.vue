<template>
  <div class="bg-white rounded-2xl shadow-sm p-6 mb-8">
    <h2 class="text-lg font-semibold text-gray-800 mb-4">Describe tus síntomas</h2>
    
    <textarea
      v-model="symptoms"
      @input="updateCharCount"
      placeholder="Ejemplo: Tengo dolor de cabeza intenso desde hace dos días, además siento náuseas y sensibilidad a la luz. También he notado que la temperatura de mi cuerpo está elevada..."
      class="w-full h-64 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    ></textarea>
    
    <div class="flex justify-between items-center mt-4">
      <span class="text-sm text-gray-500">{{ charCount }} caracteres</span>
      
      <button
        @click="analyzeSymptoms"
        :disabled="symptoms.length === 0"
        class="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Analizar síntomas con IA</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const symptoms = ref('')
const emit = defineEmits(['analyze'])

const charCount = computed(() => symptoms.value.length)

const updateCharCount = () => {
  // El computed ya actualiza automáticamente
}

const analyzeSymptoms = () => {
  emit('analyze', symptoms.value)
}
</script>

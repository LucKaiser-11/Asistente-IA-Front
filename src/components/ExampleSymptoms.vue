<template>
  <div class="bg-white rounded-2xl shadow-sm p-6 mb-8">
    <h3 class="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
      <span>Ejemplos de síntomas</span>
    </h3>
    
    <div class="space-y-3">
      <button
        v-for="(example, index) in examples"
        :key="index"
        @click="selectExample(example)"
        class="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition text-gray-700"
      >
        {{ example }}
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['select'])

const examples = [
  'Tengo dolor de cabeza intenso desde hace dos días',
  'Siento dolor en el pecho al respirar profundo',
  'He tenido fiebre y tos durante una semana',
  'Me duele el estómago después de comer'
]

const selectExample = (example) => {
  emit('select', example)
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm p-6 mb-8">
    <h3 class="text-xl font-bold text-gray-800 mb-6">Comparación de Probabilidades</h3>
    
    <div class="space-y-4">
      <div 
        v-for="(diagnosis, index) in diagnoses" 
        :key="index"
        class="relative"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-700 font-medium">{{ diagnosis.name }}</span>
          <span class="text-gray-600 text-sm">{{ diagnosis.probability }}%</span>
        </div>
        
        <div class="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-500 ease-out"
            :class="index === 0 ? 'bg-blue-600' : 'bg-blue-500'"
            :style="{ width: diagnosis.probability + '%' }"
          ></div>
        </div>
        
        <!-- Tooltip al hacer hover -->
        <div 
          v-if="hoveredIndex === index"
          class="absolute right-0 top-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm shadow-lg z-10 transform -translate-y-full mt-[-8px]"
        >
          {{ diagnosis.name }}<br>
          <span class="font-semibold">Probabilidad: {{ diagnosis.probability }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  diagnoses: {
    type: Array,
    required: true
  }
})

const hoveredIndex = ref(null)
</script>

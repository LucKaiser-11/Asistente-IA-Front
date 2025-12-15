<template>
  <div 
    class="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105"
    :class="cardColor"
  >
    <!-- Header -->
    <div class="p-6 text-white relative">
      <div class="flex justify-between items-start mb-2">
        <div>
          <p class="text-sm opacity-90 mb-1">#{{ rank }}</p>
          <h3 class="text-2xl font-bold">{{ diagnosis.name }}</h3>
        </div>
        <span class="text-6xl font-bold opacity-20">#{{ rank }}</span>
      </div>
    </div>
    
    <!-- Body -->
    <div class="bg-white p-6">
      <h4 class="font-semibold text-gray-800 mb-3">Criterios identificados:</h4>
      
      <div class="space-y-2 mb-4">
        <div 
          v-for="(criteria, index) in diagnosis.criteria" 
          :key="index"
          class="flex items-start space-x-2"
        >
          <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
          <span class="text-gray-700 text-sm">{{ criteria }}</span>
        </div>
      </div>
      
      <!-- Progress bar -->
      <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          class="h-full rounded-full transition-all duration-700"
          :class="rank === 1 ? 'bg-blue-600' : 'bg-gray-600'"
          :style="{ width: diagnosis.probability + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  diagnosis: {
    type: Object,
    required: true
  },
  rank: {
    type: Number,
    required: true
  }
})

const cardColor = computed(() => {
  if (props.rank === 1) return 'bg-gradient-to-br from-blue-600 to-blue-700'
  if (props.rank === 2) return 'bg-gradient-to-br from-gray-600 to-gray-700'
  return 'bg-gradient-to-br from-gray-700 to-gray-800'
})
</script>

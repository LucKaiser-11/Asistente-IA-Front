<template>
  <div class="grid md:grid-cols-2 gap-6">
    <DiagnosisCard 
      v-for="(diagnosis, index) in diagnoses" 
      :key="index"
      :diagnosis="diagnosis"
      :rank="index + 1"
    />
  </div>
</template>

<script setup>
import DiagnosisCard from './DiagnosisCard.vue'

defineProps({
  diagnoses: {
    type: Array,
    required: true
  }
})
</script>

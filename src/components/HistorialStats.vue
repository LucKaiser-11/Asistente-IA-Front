<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    
    <!-- Total de consultas -->
    <div class="bg-blue-600 rounded-xl p-6 text-white">
      <div class="text-5xl font-bold mb-2">{{ stats.total }}</div>
      <div class="text-blue-100 text-sm font-medium">Total de consultas</div>
    </div>

    <!-- Gravedad baja -->
    <div class="bg-green-600 rounded-xl p-6 text-white">
      <div class="text-5xl font-bold mb-2">{{ stats.baja }}</div>
      <div class="text-green-100 text-sm font-medium">Gravedad baja</div>
    </div>

    <!-- Gravedad moderada -->
    <div class="bg-orange-500 rounded-xl p-6 text-white">
      <div class="text-5xl font-bold mb-2">{{ stats.moderada }}</div>
      <div class="text-orange-100 text-sm font-medium">Gravedad moderada</div>
    </div>

    <!-- Gravedad alta -->
    <div class="bg-red-600 rounded-xl p-6 text-white">
      <div class="text-5xl font-bold mb-2">{{ stats.alta }}</div>
      <div class="text-red-100 text-sm font-medium">Gravedad alta</div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Object,
    required: true,
    default: () => ({ total: 0, baja: 0, moderada: 0, alta: 0 })
  }
});
</script>

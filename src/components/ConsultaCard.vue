<template>
  <div
    @click="$emit('click')"
    class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 cursor-pointer border border-gray-100"
  >
    <div class="flex items-start justify-between">
      
      <!-- Icono y contenido -->
      <div class="flex items-start flex-1">
        <!-- Icono documento -->
        <div class="bg-blue-50 rounded-lg p-3 mr-4">
          <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <!-- Información -->
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ consulta.diagnostico }}</h3>
          
          <!-- Fecha -->
          <div class="flex items-center text-sm text-gray-500 mb-3">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ consulta.fecha }}
          </div>

          <!-- Síntomas -->
          <div class="flex flex-wrap gap-2 mb-3">
            <span
              v-for="(sintoma, index) in consulta.sintomas"
              :key="index"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
            >
              {{ sintoma }}
            </span>
          </div>

          <!-- Badge de gravedad -->
          <div class="flex items-center">
            <span class="text-sm text-gray-600 mr-2">Gravedad:</span>
            <span
              :class="getBadgeClass(consulta.gravedad)"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            >
              {{ getGravedadLabel(consulta.gravedad) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Flecha -->
      <div class="ml-4">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  consulta: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);

const getBadgeClass = (gravedad) => {
  const classes = {
    baja: 'bg-green-100 text-green-800',
    moderada: 'bg-orange-100 text-orange-800',
    alta: 'bg-red-100 text-red-800'
  };
  return classes[gravedad] || 'bg-gray-100 text-gray-800';
};

const getGravedadLabel = (gravedad) => {
  const labels = {
    baja: 'Baja',
    moderada: 'Moderada',
    alta: 'Alta'
  };
  return labels[gravedad] || 'Desconocida';
};
</script>

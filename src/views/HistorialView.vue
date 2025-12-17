<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Contenido principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center mb-2">
          <div class="bg-blue-600 rounded-xl p-3 mr-4">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Historial de Consultas</h1>
            <p class="text-gray-500 mt-1">Tus evaluaciones médicas anteriores</p>
          </div>
        </div>
      </div>

      <!-- Barra de búsqueda y filtros -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchBar v-model="searchQuery" />
          <FilterDropdown v-model="selectedFilter" />
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="cargando" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600">Cargando historial...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
        <div class="flex items-center">
          <svg class="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 class="text-red-800 font-medium">Error al cargar historial</h3>
            <p class="text-red-600 text-sm">{{ error }}</p>
          </div>
        </div>
        <button 
          @click="cargarHistorial" 
          class="mt-3 text-red-700 hover:text-red-800 font-medium text-sm"
        >
          Intentar nuevamente
        </button>
      </div>

      <!-- Content -->
      <template v-else>
        <!-- Tarjetas de estadísticas -->
        <HistorialStats :stats="stats" class="mb-8" />

        <!-- Lista de consultas -->
        <div class="space-y-4">
          <ConsultaCard
            v-for="consulta in filteredConsultas"
            :key="consulta.id"
            :consulta="formatearConsulta(consulta)"
            @click="verDetalle(consulta.id)"
          />

          <!-- Mensaje si no hay resultados -->
          <div v-if="filteredConsultas.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No hay consultas</h3>
            <p class="mt-1 text-sm text-gray-500">
              {{ searchQuery || selectedFilter !== 'todas' 
                ? 'No se encontraron consultas con estos criterios' 
                : 'Aún no tienes consultas en tu historial' 
              }}
            </p>
            <router-link
              v-if="!searchQuery && selectedFilter === 'todas'"
              to="/asistente"
              class="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ir al Asistente
            </router-link>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import HistorialStats from '@/components/HistorialStats.vue';
import SearchBar from '@/components/SearchBar.vue';
import FilterDropdown from '@/components/FilterDropdown.vue';
import ConsultaCard from '@/components/ConsultaCard.vue';
import diagnosticoService from '@/services/diagnosticoService'


const router = useRouter();
const searchQuery = ref('');
const selectedFilter = ref('todas');
const consultas = ref([]);
const cargando = ref(false);
const error = ref(null);

// ========================================
// CARGAR HISTORIAL DESDE API
// ========================================
onMounted(async () => {
  await cargarHistorial();
});

const cargarHistorial = async () => {
  try {
    cargando.value = true;
    error.value = null;
    
    console.log('📥 Cargando historial desde API...');
    
    // ✅ LLAMADA REAL A TU API
    consultas.value = await diagnosticoService.obtenerHistorial();
    
    console.log('✅ Historial cargado:', consultas.value);
    
  } catch (err) {
    console.error('❌ Error al cargar historial:', err);
    error.value = err.message || 'Error al cargar el historial';
    
    // Si no hay token, redirigir a login
    if (err.message.includes('token') || err.message.includes('autenticación')) {
      router.push('/login');
    }
  } finally {
    cargando.value = false;
  }
};

// ========================================
// FORMATEAR CONSULTA PARA CONSULTACARD
// ========================================
const formatearConsulta = (consulta) => {
  return {
    ...consulta,
    // Formatear fecha legible
    fecha: new Date(consulta.fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    // Asegurar que síntomas sea array
    sintomas: Array.isArray(consulta.sintomas) 
      ? consulta.sintomas 
      : consulta.sintomas.split(', ')
  };
};

// ========================================
// ESTADÍSTICAS CALCULADAS
// ========================================
const stats = computed(() => ({
  total: consultas.value.length,
  baja: consultas.value.filter(c => c.gravedad === 'baja').length,
  moderada: consultas.value.filter(c => c.gravedad === 'moderada').length,
  alta: consultas.value.filter(c => c.gravedad === 'alta').length
}));

// ========================================
// FILTRADO DE CONSULTAS
// ========================================
const filteredConsultas = computed(() => {
  let filtered = consultas.value;

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(c => {
      // Buscar en diagnóstico
      const matchDiagnostico = c.diagnostico.toLowerCase().includes(query);
      
      // Buscar en síntomas
      const matchSintomas = Array.isArray(c.sintomas) 
        ? c.sintomas.some(s => s.toLowerCase().includes(query))
        : c.sintomas.toLowerCase().includes(query);
      
      return matchDiagnostico || matchSintomas;
    });
  }

  // Filtrar por gravedad
  if (selectedFilter.value !== 'todas') {
    filtered = filtered.filter(c => c.gravedad === selectedFilter.value);
  }

  return filtered;
});

// ========================================
// VER DETALLE
// ========================================
const verDetalle = async (id) => {
  try {
    const consulta = await diagnosticoService.obtenerConsulta(id);
    // Aquí puedes abrir un modal o navegar a una vista de detalle
    console.log('Detalle de consulta:', consulta);
    // router.push(`/consulta/${id}`); // Si tienes una ruta de detalle
  } catch (err) {
    console.error('Error al obtener detalle:', err);
    alert('Error al cargar el detalle de la consulta');
  }
};

// ========================================
// ELIMINAR CONSULTA (Desde ConsultaCard si tiene botón)
// ========================================
const eliminarConsulta = async (id) => {
  if (!confirm('¿Estás seguro de que deseas eliminar esta consulta?')) {
    return;
  }

  try {
    console.log(`🗑️ Eliminando consulta ${id}...`);
    
    await diagnosticoService.eliminarConsulta(id);
    
    // Recargar historial
    await cargarHistorial();
    
    console.log('✅ Consulta eliminada exitosamente');
    
  } catch (err) {
    console.error('❌ Error al eliminar consulta:', err);
    alert('Error al eliminar la consulta. Por favor, intenta nuevamente.');
  }
};
</script>

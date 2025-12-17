<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Sección de Análisis de Síntomas -->
      <template v-if="!showDiagnosis">
        <AnalysisHeader />
        
        <div class="max-w-4xl mx-auto">
          <SymptomsInput 
            v-if="!showResults"
            @analyze="handleAnalyze" 
          />
        </div>
        
        <div class="grid lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <ExampleSymptoms 
              v-if="!showResults"
              @select="handleSelectExample" 
            />
            
            <template v-if="showResults">
              <AnalysisResults :analyzed-text="analyzedText">
                <div class="space-y-4">
                  <div 
                    v-for="symptom in detectedSymptoms" 
                    :key="symptom.name" 
                    class="flex justify-between items-center"
                  >
                    <span class="text-gray-700">{{ symptom.name }}</span>
                    <span class="text-blue-600 font-semibold">{{ symptom.confidence }}%</span>
                  </div>
                </div>
              </AnalysisResults>
              
              <SuccessMessage 
                :symptom-count="detectedSymptoms.length"
                @generate-diagnosis="handleGenerateDiagnosis"
              />
            </template>
          </div>
          
          <div class="lg:col-span-1">
            <ImportantWarning />
          </div>
        </div>
      </template>

      <!-- Sección de Diagnóstico -->
      <template v-if="showDiagnosis">
        <DiagnosisHeader />
        
        <!-- 🩺 MENSAJE DEL ASISTENTE CON EXPLICACIÓN -->
        <div v-if="mensajeAsistente" class="mb-8">
          <div class="bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-600 rounded-2xl shadow-2xl p-6 border-2 border-purple-200">
            <div class="flex items-center gap-3 mb-4">
              <span class="text-4xl">🤖</span>
              <h3 class="text-2xl font-bold text-white">
                Análisis del Asistente Médico IA
              </h3>
            </div>
            
            <div class="bg-white rounded-xl p-6 shadow-xl border-2 border-indigo-100">
              <div class="prose prose-lg max-w-none">
                <div v-html="formatMessage(mensajeAsistente)" class="text-gray-800 leading-relaxed whitespace-pre-line"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 📊 TOP 3 DIAGNÓSTICOS POSIBLES -->
        <div v-if="top3Diagnosticos && top3Diagnosticos.length > 0" class="mb-8">
          <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-6 border-2 border-blue-200">
            <div class="flex items-center gap-3 mb-6">
              <span class="text-4xl">📊</span>
              <h3 class="text-2xl font-bold text-white">
                Top 3 Diagnósticos Más Probables
              </h3>
            </div>
            
            <div class="space-y-4">
              <div 
                v-for="(diag, index) in top3Diagnosticos" 
                :key="index"
                class="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2"
                :class="getBorderClass(index)"
              >
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <span class="text-3xl">{{ getMedalIcon(index) }}</span>
                    <div>
                      <p class="text-sm font-semibold text-gray-500">Posición #{{ diag.posicion }}</p>
                      <h4 class="text-2xl font-bold text-gray-900">{{ diag.enfermedad }}</h4>
                    </div>
                  </div>
                  <span 
                    class="text-3xl font-bold px-4 py-2 rounded-xl"
                    :class="getConfidenceClass(diag.confianza)"
                  >
                    {{ diag.confianza }}%
                  </span>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <div 
                    class="h-full rounded-full transition-all duration-700"
                    :class="getColorClass(diag.confianza)"
                    :style="{ width: diag.confianza + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ⚠️ ADVERTENCIA MÉDICA -->
        <div v-if="recomendacion" class="mb-8">
          <div class="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-6 border-2 border-amber-300 shadow-xl">
            <div class="flex items-start gap-4">
              <span class="text-4xl">⚠️</span>
              <div>
                <h4 class="text-xl font-bold text-amber-900 mb-2">Importante: Consulta Médica Necesaria</h4>
                <p class="text-amber-800 leading-relaxed">
                  {{ recomendacion }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Botón para volver -->
        <div class="mt-8 text-center">
          <button 
            @click="resetAnalysis"
            class="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-10 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border-2 border-blue-300"
          >
            ← Realizar nuevo análisis
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import diagnosticoService from '../services/diagnosticoService'
import AnalysisHeader from '../components/AnalysisHeader.vue'
import SymptomsInput from '../components/SymptomsInput.vue'
import ExampleSymptoms from '../components/ExampleSymptoms.vue'
import ImportantWarning from '../components/ImportantWarning.vue'
import AnalysisResults from '../components/AnalysisResults.vue'
import SuccessMessage from '../components/SuccessMessage.vue'
import DiagnosisHeader from '../components/DiagnosisHeader.vue'

const showResults = ref(false)
const showDiagnosis = ref(false)
const analyzedText = ref('')
const detectedSymptoms = ref([])

// Variables para la respuesta del backend
const top3Diagnosticos = ref([])
const mensajeAsistente = ref('')
const recomendacion = ref('')
const diagnosticoFinal = ref('')
const confianzaFinal = ref(0)

const handleAnalyze = async (text) => {
  analyzedText.value = text
  
  detectedSymptoms.value = [
    { name: 'Dolor de cabeza', confidence: 95 },
    { name: 'Fiebre', confidence: 88 },
    { name: 'Fatiga', confidence: 82 }
  ]
  
  showResults.value = true

  try {
    const data = await diagnosticoService.searchBySymptoms(text)
    console.log('✅ RESPUESTA COMPLETA DEL BACKEND:', JSON.stringify(data, null, 2))

    // ✅ VALIDAR Y CARGAR DATOS
    if (data) {
      // Top 3
      if (data.top3 && Array.isArray(data.top3) && data.top3.length > 0) {
        top3Diagnosticos.value = data.top3
        console.log('📊 Top 3:', top3Diagnosticos.value)
      } else {
        console.warn('⚠️ No hay top3 en la respuesta')
      }

      // Mensaje del asistente
      if (data.mensaje) {
        mensajeAsistente.value = data.mensaje
        console.log('🤖 Mensaje:', mensajeAsistente.value)
      } else {
        console.warn('⚠️ No hay mensaje en la respuesta')
      }

      // Diagnóstico principal
      if (data.diagnostico) {
        diagnosticoFinal.value = data.diagnostico
        confianzaFinal.value = data.confianza || 0
        console.log('🏆 Diagnóstico:', diagnosticoFinal.value, confianzaFinal.value + '%')
      } else {
        console.warn('⚠️ No hay diagnóstico en la respuesta')
      }

      // Recomendación
      recomendacion.value = data.recomendacion || '⚠️ Consulta con un médico profesional para confirmación.'

      // ========================================
      // 💾 GUARDAR AUTOMÁTICAMENTE EN BD (NUEVO)
      // ========================================
      if (data.diagnostico && !data.necesita_mas_info) {
        try {
          console.log('💾 Guardando diagnóstico en base de datos...')
          
          await diagnosticoService.guardarDiagnostico({
            diagnostico: data.diagnostico,
            confianza: data.confianza,
            sintomas: text,
            top3: data.top3
          })
          
          console.log('✅ Diagnóstico guardado exitosamente en historial')
        } catch (error) {
          console.error('❌ Error al guardar diagnóstico:', error)
          // No bloquear el flujo si falla el guardado
        }
      }
      // ========================================

      // Mostrar sección de diagnóstico
      showDiagnosis.value = true
      console.log('✅ showDiagnosis activado')
      
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      console.error('❌ La respuesta del backend está vacía')
    }
  } catch (error) {
    console.error('❌ Error al llamar al backend:', error)
    console.error('Detalles:', error.response?.data || error.message)
  }
}


const handleSelectExample = (example) => {
  console.log('Ejemplo seleccionado:', example)
}

const handleGenerateDiagnosis = () => {
  showDiagnosis.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetAnalysis = () => {
  showDiagnosis.value = false
  showResults.value = false
  analyzedText.value = ''
  detectedSymptoms.value = []
  top3Diagnosticos.value = []
  mensajeAsistente.value = ''
  recomendacion.value = ''
  diagnosticoFinal.value = ''
  confianzaFinal.value = 0
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Formatear mensaje con Markdown básico
// Formatear mensaje con Markdown básico
const formatMessage = (text) => {
  if (!text) return ''
  
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-indigo-700 font-bold">$1</strong>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
}


// Iconos para el podio
const getMedalIcon = (index) => {
  const icons = ['🥇', '🥈', '🥉']
  return icons[index] || '🏅'
}

// Bordes según posición
const getBorderClass = (index) => {
  if (index === 0) return 'border-yellow-400'
  if (index === 1) return 'border-gray-400'
  if (index === 2) return 'border-amber-600'
  return 'border-gray-300'
}

// Clase de confianza para el texto grande
const getConfidenceClass = (confianza) => {
  if (confianza >= 80) return 'text-green-600 bg-green-50'
  if (confianza >= 60) return 'text-blue-600 bg-blue-50'
  if (confianza >= 40) return 'text-yellow-600 bg-yellow-50'
  return 'text-red-600 bg-red-50'
}

// Colores médicos para las barras
const getColorClass = (confianza) => {
  if (confianza >= 80) return 'bg-gradient-to-r from-green-500 to-emerald-600'
  if (confianza >= 60) return 'bg-gradient-to-r from-blue-500 to-cyan-600'
  if (confianza >= 40) return 'bg-gradient-to-r from-yellow-500 to-amber-600'
  return 'bg-gradient-to-r from-red-500 to-rose-600'
}

// Colores médicos para el texto
const getTextColorClass = (confianza) => {
  if (confianza >= 80) return 'text-green-700'
  if (confianza >= 60) return 'text-blue-700'
  if (confianza >= 40) return 'text-yellow-700'
  return 'text-red-700'
}
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1rem;
}
</style>

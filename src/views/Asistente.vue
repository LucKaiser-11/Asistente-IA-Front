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
        
        <!-- Sección de Algoritmos (Colores médicos: azul + teal) -->
        <div v-if="algoritmos.length > 0" class="mb-8">
          <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 rounded-2xl shadow-2xl p-6 border-2 border-blue-200">
            <div class="flex items-center justify-center gap-3 mb-6">
              <span class="text-4xl">🔬</span>
              <h3 class="text-2xl font-bold text-white text-center">
                Análisis por Algoritmo de Inteligencia Artificial
              </h3>
            </div>
            
            <!-- Grid de 2 columnas -->
            <div class="grid md:grid-cols-2 gap-6">
              <div 
                v-for="(algo, index) in algoritmos" 
                :key="index"
                class="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-blue-100"
              >
                <div class="flex items-center gap-3 mb-4 pb-3 border-b-2 border-blue-100">
                  <span class="text-4xl">{{ getAlgoritmoIcon(algo.nombre) }}</span>
                  <h4 class="font-bold text-blue-900 text-sm">{{ algo.nombre }}</h4>
                </div>
                
                <div class="space-y-3">
                  <p class="text-xl font-bold text-gray-900">{{ algo.prediccion }}</p>
                  
                  <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                    <div 
                      class="h-full rounded-full transition-all duration-500 shadow-lg"
                      :class="getColorClass(algo.confianza)"
                      :style="{ width: algo.confianza + '%' }"
                    ></div>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <p class="text-sm font-semibold text-gray-600">
                      Confianza:
                    </p>
                    <span class="text-lg font-bold" :class="getTextColorClass(algo.confianza)">
                      {{ algo.confianza }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Diagnóstico Consensuado (Verde hospital + cruz médica) -->
        <div v-if="diagnosticoFinal" class="mb-8">
          <div class="bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 rounded-2xl shadow-2xl p-6 border-2 border-green-200">
            <div class="flex justify-between items-center mb-4">
              <div class="flex items-center gap-3">
                <span class="text-4xl">⚕️</span>
                <h3 class="text-2xl font-bold text-white">
                  Diagnóstico Sugerido
                </h3>
              </div>
              <span class="bg-white/90 text-emerald-700 px-5 py-2 rounded-full font-bold text-sm shadow-lg border-2 border-white">
                {{ votosAlgoritmos }}/2 algoritmos
              </span>
            </div>
            
            <div class="bg-white rounded-xl p-6 shadow-xl border-2 border-green-100">
              <div class="flex items-start gap-4">
                <span class="text-5xl mt-1">🏥</span>
                <div class="flex-1">
                  <h2 class="text-3xl font-bold text-gray-900 mb-2">
                    {{ diagnosticoFinal }}
                  </h2>
                  <div class="flex items-center gap-3 mt-3">
                    <div class="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <div 
                        class="h-full rounded-full transition-all duration-500"
                        :class="getColorClass(confianzaFinal)"
                        :style="{ width: confianzaFinal + '%' }"
                      ></div>
                    </div>
                    <span class="text-xl font-bold" :class="getTextColorClass(confianzaFinal)">
                      {{ confianzaFinal }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Botón para volver (Azul médico) -->
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
import { diagnosticoService } from '../services/diagnosticoService'
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

// Variables para los 2 algoritmos
const algoritmos = ref([])
const diagnosticoFinal = ref('')
const confianzaFinal = ref(0)
const votosAlgoritmos = ref(0)

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
    console.log('Respuesta backend IA:', data)

    if (data.algoritmos && data.algoritmos.length > 0) {
      algoritmos.value = data.algoritmos
      diagnosticoFinal.value = data.diagnostico
      confianzaFinal.value = data.confianza
      votosAlgoritmos.value = data.votos
      
      console.log('✅ Algoritmos cargados:', algoritmos.value)
    }

    showDiagnosis.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    console.error('Error al llamar al backend IA:', error)
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
  algoritmos.value = []
  diagnosticoFinal.value = ''
  confianzaFinal.value = 0
  votosAlgoritmos.value = 0
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const getAlgoritmoIcon = (nombre) => {
  if (nombre.includes('Naive')) return '🧬'
  if (nombre.includes('Logistic')) return '💊'
  return '🩺'
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

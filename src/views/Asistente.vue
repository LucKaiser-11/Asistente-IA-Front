<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Sección de Análisis de Síntomas -->
      <template v-if="!showDiagnosis">
        <!-- Header ocupa todo el ancho -->
        <AnalysisHeader />
        
        <!-- Input de síntomas centrado con ancho limitado -->
        <div class="max-w-4xl mx-auto">
          <SymptomsInput 
            v-if="!showResults"
            @analyze="handleAnalyze" 
          />
        </div>
        
        <!-- Grid de 2 columnas debajo del input -->
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Columna principal (izquierda) -->
          <div class="lg:col-span-2">
            <ExampleSymptoms 
              v-if="!showResults"
              @select="handleSelectExample" 
            />
            
            <!-- Resultados del análisis -->
            <template v-if="showResults">
              <AnalysisResults :analyzed-text="analyzedText">
                <!-- Síntomas detectados -->
                <div class="space-y-4">
                  <div v-for="symptom in detectedSymptoms" :key="symptom.name" class="flex justify-between items-center">
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
          
          <!-- Columna derecha (sidebar) -->
          <div class="lg:col-span-1">
            <ImportantWarning />
            <TipsCard />
          </div>
        </div>
      </template>

      <!-- Sección de Diagnóstico Diferencial -->
      <template v-if="showDiagnosis">
        <DiagnosisHeader />
        
        <TopDiagnosis :diagnosis="topDiagnosis" />
        
        <ProbabilityChart :diagnoses="diagnosisList" />
        
        <DiagnosisList :diagnoses="diagnosisList" />
        
        <!-- Botón para volver -->
        <div class="mt-8 text-center">
          <button 
            @click="resetAnalysis"
            class="bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition shadow-lg"
          >
            ← Realizar nuevo análisis
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AnalysisHeader from '../components/AnalysisHeader.vue'
import SymptomsInput from '../components/SymptomsInput.vue'
import ExampleSymptoms from '../components/ExampleSymptoms.vue'
import ImportantWarning from '../components/ImportantWarning.vue'
import TipsCard from '../components/TipsCard.vue'
import AnalysisResults from '../components/AnalysisResults.vue'
import SuccessMessage from '../components/SuccessMessage.vue'
import DiagnosisHeader from '../components/DiagnosisHeader.vue'
import TopDiagnosis from '../components/TopDiagnosis.vue'
import ProbabilityChart from '../components/ProbabilityChart.vue'
import DiagnosisList from '../components/DiagnosisList.vue'

const showResults = ref(false)
const showDiagnosis = ref(false)
const analyzedText = ref('')
const detectedSymptoms = ref([])

// Datos de diagnóstico simulados
const diagnosisList = ref([
  {
    name: 'Migraña',
    probability: 72,
    criteria: [
      'Dolor de cabeza unilateral',
      'Sensibilidad a la luz (fotofobia)',
      'Náuseas asociadas',
      'Duración > 4 horas'
    ]
  },
  {
    name: 'Gripe (Influenza)',
    probability: 65,
    criteria: [
      'Fiebre elevada',
      'Fatiga generalizada',
      'Dolor de cabeza',
      'Síntomas sistémicos'
    ]
  },
  {
    name: 'Sinusitis Aguda',
    probability: 48,
    criteria: [
      'Dolor de cabeza frontal',
      'Congestión nasal asociada',
      'Presión facial'
    ]
  },
  {
    name: 'Cefalea Tensional',
    probability: 35,
    criteria: [
      'Dolor de cabeza bilateral',
      'Sensación de presión',
      'No empeora con actividad física'
    ]
  }
])

const topDiagnosis = computed(() => diagnosisList.value[0])

const handleAnalyze = (text) => {
  analyzedText.value = text
  
  // Simulación de análisis (después conectarás con el backend)
  detectedSymptoms.value = [
    { name: 'Dolor de cabeza', confidence: 95 },
    { name: 'Fiebre', confidence: 88 },
    { name: 'Fatiga', confidence: 82 }
  ]
  
  showResults.value = true
}

const handleSelectExample = (example) => {
  // Aquí podrías auto-rellenar el textarea con el ejemplo
  console.log('Ejemplo seleccionado:', example)
}

const handleGenerateDiagnosis = () => {
  // Simular delay de procesamiento
  showDiagnosis.value = true
  
  // Scroll suave hacia arriba
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetAnalysis = () => {
  showDiagnosis.value = false
  showResults.value = false
  analyzedText.value = ''
  detectedSymptoms.value = []
  
  // Scroll suave hacia arriba
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

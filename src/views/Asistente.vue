<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Columna principal (izquierda) -->
        <div class="lg:col-span-2">
          <AnalysisHeader />
          
          <SymptomsInput 
            v-if="!showResults"
            @analyze="handleAnalyze" 
          />
          
          <ExampleSymptoms 
            v-if="!showResults"
            @select="handleSelectExample" 
          />
          
          <!-- Resultados del análisis -->
          <template v-if="showResults">
            <AnalysisResults :analyzed-text="analyzedText">
              <!-- Aquí irían los síntomas detectados -->
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AnalysisHeader from '../components/AnalysisHeader.vue'
import SymptomsInput from '../components/SymptomsInput.vue'
import ExampleSymptoms from '../components/ExampleSymptoms.vue'
import ImportantWarning from '../components/ImportantWarning.vue'
import TipsCard from '../components/TipsCard.vue'
import AnalysisResults from '../components/AnalysisResults.vue'
import SuccessMessage from '../components/SuccessMessage.vue'

const showResults = ref(false)
const analyzedText = ref('')
const detectedSymptoms = ref([])

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
  console.log('Generar diagnóstico diferencial')
  // Aquí irá la lógica para generar el diagnóstico
}
</script>

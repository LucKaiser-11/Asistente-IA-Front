// src/services/diagnosticoService.js

export const diagnosticoService = {
  async searchBySymptoms(text) {
    try {
      // Limpiar y convertir texto en array de síntomas
      const sintomas = text
        .toLowerCase()
        .split(/[\s,.;¡!¿?]+/)
        .filter(w => w && w.length > 2)

      console.log('Síntomas enviados al backend:', sintomas)

      // ✅ LLAMADA AL BACKEND
      const response = await fetch('http://localhost:3000/api/diagnostico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sintomas })
      })

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`)
      }

      const data = await response.json()
      console.log('✅ Respuesta completa del backend:', data)

      // ✅ RETORNAR TODA LA RESPUESTA DEL BACKEND
      // (top3, mensaje, explicacion, recomendacion, etc.)
      return data
      
    } catch (error) {
      console.error('❌ Error en diagnosticoService:', error)
      throw error
    }
  }
}

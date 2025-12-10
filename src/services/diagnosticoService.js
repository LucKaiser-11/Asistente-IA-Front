// src/services/diagnosticoService.js

export const diagnosticoService = {
  async searchBySymptoms(text) {
    const sintomas = text
      .toLowerCase()
      .split(/[\s,.;¡!¿?]+/)
      .filter(w => w && w.length > 2)

    console.log('Síntomas enviados al backend:', sintomas)

    const response = await fetch('http://localhost:3000/api/diagnostico', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sintomas })
    })

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`)
    }

    const data = await response.json()

    // 1 principal + alternativas => ranking
    const resultados = [
      {
        title: data.diagnostico,
        confidence: data.confianza,
        probability: data.confianza,
        source: 'IA AsistMedic (backend)',
        pubdate: new Date().toISOString().slice(0, 10)
      },
      ...(data.alternativas || []).map(alt => ({
        title: alt.diagnostico,
        confidence: alt.confianza,
        probability: alt.confianza,
        source: 'IA AsistMedic (backend)',
        pubdate: new Date().toISOString().slice(0, 10)
      }))
    ]

    return { results: resultados }
  }
}

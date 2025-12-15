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

    // 1 principal + alternativas => ranking CON SÍNTOMAS
    const resultados = [
      {
        title: data.diagnostico,
        confidence: data.confianza,
        probability: data.confianza,
        source: 'IA MediCore (backend)',
        pubdate: new Date().toISOString().slice(0, 10),
        criteria: data.sintomas_enfermedad || ['Sin información disponible'] // ← AGREGADO
      },
      ...(data.alternativas || []).map(alt => ({
        title: alt.diagnostico,
        confidence: alt.confianza,
        probability: alt.confianza,
        source: 'IA MediCore (backend)',
        pubdate: new Date().toISOString().slice(0, 10),
        criteria: alt.sintomas || ['Sin información disponible'] // ← AGREGADO
      }))
    ]

    // NUEVO: Devolver también los datos de los 3 algoritmos
    return { 
      results: resultados,
      diagnostico: data.diagnostico,
      confianza: data.confianza,
      votos: data.votos,
      algoritmos: data.algoritmos || []  // Array con info de los 3 algoritmos
    }
  }
}

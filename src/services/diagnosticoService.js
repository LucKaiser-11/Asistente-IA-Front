// src/services/diagnosticoService.js

const diagnosticoService = {
  // ========================================
  // DIAGNÓSTICO CON IA
  // ========================================
  async searchBySymptoms(text) {
    try {
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
      console.log('✅ Respuesta completa del backend:', data)

      return data
      
    } catch (error) {
      console.error('❌ Error en diagnosticoService:', error)
      throw error
    }
  },

  // ========================================
  // GUARDAR DIAGNÓSTICO EN BD
  // ========================================
  async guardarDiagnostico(data) {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        throw new Error('No hay token de autenticación')
      }

      console.log('📤 Guardando diagnóstico:', data)

      const response = await fetch('http://localhost:3000/api/diagnosticos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          diagnostico: data.diagnostico,
          confianza: data.confianza,
          sintomas: data.sintomas,
          top3: data.top3
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error HTTP ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ Diagnóstico guardado:', result)
      
      return result.data

    } catch (error) {
      console.error('❌ Error al guardar diagnóstico:', error)
      throw error
    }
  },

  // ========================================
  // OBTENER HISTORIAL
  // ========================================
  async obtenerHistorial() {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        throw new Error('No hay token de autenticación')
      }

      console.log('📥 Obteniendo historial...')

      const response = await fetch('http://localhost:3000/api/diagnosticos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ Historial obtenido:', result.data)
      
      return result.data

    } catch (error) {
      console.error('❌ Error al obtener historial:', error)
      throw error
    }
  },

  // ========================================
  // OBTENER CONSULTA ESPECÍFICA
  // ========================================
  async obtenerConsulta(id) {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        throw new Error('No hay token de autenticación')
      }

      console.log(`📥 Obteniendo consulta ${id}...`)

      const response = await fetch(`http://localhost:3000/api/diagnosticos/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ Consulta obtenida:', result.data)
      
      return result.data

    } catch (error) {
      console.error('❌ Error al obtener consulta:', error)
      throw error
    }
  },

  // ========================================
  // OBTENER ESTADÍSTICAS
  // ========================================
  async obtenerEstadisticas() {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        throw new Error('No hay token de autenticación')
      }

      console.log('📊 Obteniendo estadísticas...')

      const response = await fetch('http://localhost:3000/api/diagnosticos/estadisticas', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ Estadísticas obtenidas:', result.data)
      
      return result.data

    } catch (error) {
      console.error('❌ Error al obtener estadísticas:', error)
      throw error
    }
  },

  // ========================================
  // ELIMINAR CONSULTA
  // ========================================
  async eliminarConsulta(id) {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        throw new Error('No hay token de autenticación')
      }

      console.log(`🗑️ Eliminando consulta ${id}...`)

      const response = await fetch(`http://localhost:3000/api/diagnosticos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`)
      }

      const result = await response.json()
      console.log('✅ Consulta eliminada:', result)
      
      return result

    } catch (error) {
      console.error('❌ Error al eliminar consulta:', error)
      throw error
    }
  }
}

// ✅ EXPORT DEFAULT
export default diagnosticoService

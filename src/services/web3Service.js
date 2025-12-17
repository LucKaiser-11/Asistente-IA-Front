import { ethers } from 'ethers'


const CONTRACT_ADDRESS = "0x52D664787a993B2fa33BAa1E9B172C3aD9F115e2"

const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_enfermedad", "type": "string" },
      { "internalType": "uint256", "name": "_confianza", "type": "uint256" },
      { "internalType": "string", "name": "_sintomas", "type": "string" }
    ],
    "name": "guardarDiagnostico",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "obtenerHistorial",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "enfermedad", "type": "string" },
          { "internalType": "uint256", "name": "confianza", "type": "uint256" },
          { "internalType": "string", "name": "sintomas", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "address", "name": "paciente", "type": "address" }
        ],
        "internalType": "struct DiagnosticoMedico.Diagnostico[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contarDiagnosticos",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalDiagnosticos",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
]

class Web3Service {
  constructor() {
    this.provider = null
    this.signer = null
    this.contract = null
    this.walletAddress = null
  }

  async conectarWallet() {
    if (!window.ethereum) {
      throw new Error('Por favor instala MetaMask: https://metamask.io/download/')
    }

    try {
      this.provider = new ethers.BrowserProvider(window.ethereum)
      await this.provider.send("eth_requestAccounts", [])
      this.signer = await this.provider.getSigner()
      this.walletAddress = await this.signer.getAddress()
      
      this.contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        this.signer
      )

      const network = await this.provider.getNetwork()
      if (network.chainId !== 80001n) {
        throw new Error('⚠️ Por favor cambia a Mumbai Testnet en MetaMask')
      }

      console.log('✅ Wallet conectada:', this.walletAddress)
      return this.walletAddress
    } catch (error) {
      console.error('❌ Error conectando wallet:', error)
      throw error
    }
  }

  async guardarDiagnostico(enfermedad, confianza, sintomas) {
    if (!this.contract) {
      throw new Error('Conecta tu wallet primero')
    }

    try {
      console.log('📝 Guardando en blockchain...')
      const tx = await this.contract.guardarDiagnostico(
        enfermedad,
        confianza,
        sintomas
      )

      console.log('⏳ Esperando confirmación...', tx.hash)
      const receipt = await tx.wait()
      
      console.log('✅ Guardado en blockchain:', receipt.hash)
      return receipt.hash
    } catch (error) {
      console.error('❌ Error guardando:', error)
      throw error
    }
  }

  async obtenerHistorial() {
    if (!this.contract) {
      throw new Error('Conecta tu wallet primero')
    }

    try {
      const historial = await this.contract.obtenerHistorial()
      
      return historial.map(d => ({
        enfermedad: d.enfermedad,
        confianza: Number(d.confianza),
        sintomas: d.sintomas,
        fecha: new Date(Number(d.timestamp) * 1000).toLocaleString('es-BO'),
        timestamp: Number(d.timestamp)
      }))
    } catch (error) {
      console.error('❌ Error obteniendo historial:', error)
      throw error
    }
  }

  isConectado() {
    return this.walletAddress !== null
  }

  getAddressCorta() {
    if (!this.walletAddress) return ''
    return `${this.walletAddress.slice(0, 6)}...${this.walletAddress.slice(-4)}`
  }
}

export const web3Service = new Web3Service()

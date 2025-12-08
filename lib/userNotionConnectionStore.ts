import type { UserNotionConnectionStore } from './types'

/**
 * Factory principal para obter o UserNotionConnectionStore.
 * 
 * Este arquivo decide qual implementação usar:
 * - Vercel KV (Redis) em produção
 * - In-Memory em desenvolvimento local (fallback)
 * 
 * Configuração:
 * - FORCE_IN_MEMORY_STORE=true: Força uso de in-memory
 * - Padrão: Tenta usar Vercel KV, fallback para in-memory
 */

// Singleton instance
let storeInstance: UserNotionConnectionStore | null = null

/**
 * Retorna a instância global do UserNotionConnectionStore.
 * 
 * Estratégia de seleção:
 * 1. Se FORCE_IN_MEMORY_STORE=true → in-memory
 * 2. Se variáveis Vercel KV disponíveis → Vercel KV
 * 3. Fallback → in-memory com warning
 */
export function getUserNotionConnectionStore(): UserNotionConnectionStore {
  if (!storeInstance) {
    const forceInMemory = process.env.FORCE_IN_MEMORY_STORE === 'true'
    const hasVercelKV = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    
    if (forceInMemory) {
      console.warn('⚠️ FORCE_IN_MEMORY_STORE enabled: Using in-memory storage (data will be lost on restart)')
      const { InMemoryUserNotionConnectionStore } = require('./userNotionConnectionStore.memory')
      storeInstance = new InMemoryUserNotionConnectionStore()
    } else if (hasVercelKV) {
      try {
        console.log('✅ Vercel KV detected: Using persistent Redis storage')
        const { getUserNotionConnectionStore: getKVStore } = require('./userNotionConnectionStore.kv')
        return getKVStore()
      } catch (error) {
        console.error('Failed to initialize Vercel KV store:', error)
        console.warn('⚠️ Falling back to in-memory storage')
        const { InMemoryUserNotionConnectionStore } = require('./userNotionConnectionStore.memory')
        storeInstance = new InMemoryUserNotionConnectionStore()
      }
    } else {
      console.warn('⚠️ Vercel KV not configured: Using in-memory storage (data will be lost on restart)')
      console.warn('ℹ️  To use persistent storage, configure Vercel KV in your project dashboard')
      const { InMemoryUserNotionConnectionStore } = require('./userNotionConnectionStore.memory')
      storeInstance = new InMemoryUserNotionConnectionStore()
    }
  }
  return storeInstance
}

/**
 * Reseta a instância singleton (útil para testes).
 */
export function resetStoreInstance(): void {
  storeInstance = null
}


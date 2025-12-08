import { kv } from '@vercel/kv'
import type { UserNotionConnection, UserNotionConnectionStore } from './types'

/**
 * Implementação do UserNotionConnectionStore usando Vercel KV (Redis).
 * 
 * Esta implementação persiste dados entre deploys e restarts do servidor.
 * 
 * Requisitos:
 * - Vercel KV configurado no projeto (Dashboard → Storage → KV)
 * - Variáveis de ambiente automáticas da Vercel KV
 * 
 * @see https://vercel.com/docs/storage/vercel-kv
 */
class VercelKVUserNotionConnectionStore implements UserNotionConnectionStore {
  private readonly KEY_PREFIX = 'notion:connection:'

  /**
   * Gera a chave Redis para um userId
   */
  private getKey(userId: string): string {
    return `${this.KEY_PREFIX}${userId}`
  }

  async getByUserId(userId: string): Promise<UserNotionConnection | null> {
    try {
      const key = this.getKey(userId)
      const data = await kv.get<UserNotionConnection>(key)
      
      if (!data) return null

      // Converter strings ISO de volta para Date objects
      return {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      }
    } catch (error) {
      console.error('Error getting connection from KV:', error)
      throw new Error('Failed to retrieve Notion connection')
    }
  }

  async saveOrUpdate(connection: UserNotionConnection): Promise<void> {
    try {
      const key = this.getKey(connection.userId)
      const existing = await this.getByUserId(connection.userId)

      const dataToStore: UserNotionConnection = {
        ...connection,
        createdAt: existing?.createdAt || new Date(),
        updatedAt: new Date(),
      }

      // Salvar no Redis com expiração de 90 dias (opcional)
      // Se o usuário não usar por 90 dias, a conexão expira automaticamente
      await kv.set(key, dataToStore, {
        ex: 60 * 60 * 24 * 90, // 90 dias em segundos
      })

      console.log(`✅ Notion connection saved for user ${connection.userId}`)
    } catch (error) {
      console.error('Error saving connection to KV:', error)
      throw new Error('Failed to save Notion connection')
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      const key = this.getKey(userId)
      await kv.del(key)
      console.log(`🗑️ Notion connection deleted for user ${userId}`)
    } catch (error) {
      console.error('Error deleting connection from KV:', error)
      throw new Error('Failed to delete Notion connection')
    }
  }

  /**
   * Método auxiliar para listar todas as conexões (útil para admin/debug).
   * ATENÇÃO: Use com cuidado em produção, pode ser pesado se houver muitos usuários.
   */
  async listAll(): Promise<UserNotionConnection[]> {
    try {
      const pattern = `${this.KEY_PREFIX}*`
      const keys = await kv.keys(pattern)
      
      if (!keys || keys.length === 0) return []

      const connections: UserNotionConnection[] = []
      
      for (const key of keys) {
        const data = await kv.get<UserNotionConnection>(key)
        if (data) {
          connections.push({
            ...data,
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
          })
        }
      }

      return connections
    } catch (error) {
      console.error('Error listing connections from KV:', error)
      return []
    }
  }

  /**
   * Método auxiliar para obter estatísticas (útil para monitoramento).
   */
  async getStats(): Promise<{ totalConnections: number }> {
    try {
      const pattern = `${this.KEY_PREFIX}*`
      const keys = await kv.keys(pattern)
      return { totalConnections: keys?.length || 0 }
    } catch (error) {
      console.error('Error getting stats from KV:', error)
      return { totalConnections: 0 }
    }
  }
}

// Singleton instance
let storeInstance: UserNotionConnectionStore | null = null

/**
 * Retorna a instância global do UserNotionConnectionStore.
 * 
 * Em desenvolvimento local SEM Vercel KV configurado, retorna a versão in-memory.
 * Em produção ou desenvolvimento COM Vercel KV, retorna a versão persistente.
 * 
 * Para forçar o uso de in-memory (ex: testes), configure:
 * FORCE_IN_MEMORY_STORE=true
 */
export function getUserNotionConnectionStore(): UserNotionConnectionStore {
  if (!storeInstance) {
    const forceInMemory = process.env.FORCE_IN_MEMORY_STORE === 'true'
    
    if (forceInMemory) {
      console.warn('⚠️ Using IN-MEMORY store (data will be lost on restart)')
      // Importar versão in-memory apenas quando necessário
      const { InMemoryUserNotionConnectionStore } = require('./userNotionConnectionStore.memory')
      storeInstance = new InMemoryUserNotionConnectionStore()
    } else {
      try {
        // Tentar usar Vercel KV
        storeInstance = new VercelKVUserNotionConnectionStore()
        console.log('✅ Using Vercel KV store (persistent)')
      } catch (error) {
        console.error('Failed to initialize Vercel KV store:', error)
        console.warn('⚠️ Falling back to IN-MEMORY store')
        const { InMemoryUserNotionConnectionStore } = require('./userNotionConnectionStore.memory')
        storeInstance = new InMemoryUserNotionConnectionStore()
      }
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


import Redis from 'ioredis'
import type { UserNotionConnection, UserNotionConnectionStore } from './types'

/**
 * Implementação do UserNotionConnectionStore usando Redis externo (ioredis).
 * 
 * Esta implementação persiste dados usando qualquer Redis compatível.
 * 
 * Requisitos:
 * - Variável de ambiente REDIS_URL configurada
 * 
 * Exemplo:
 * REDIS_URL="redis://default:password@host:port"
 */
class RedisUserNotionConnectionStore implements UserNotionConnectionStore {
  private readonly KEY_PREFIX = 'notion:connection:'
  private redis: Redis

  constructor(redisUrl: string) {
    this.redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: false,
    })

    this.redis.on('error', (err) => {
      console.error('❌ Redis connection error:', err)
    })

    this.redis.on('connect', () => {
      console.log('✅ Redis connected successfully')
    })
  }

  /**
   * Gera a chave Redis para um userId
   */
  private getKey(userId: string): string {
    return `${this.KEY_PREFIX}${userId}`
  }

  async getByUserId(userId: string): Promise<UserNotionConnection | null> {
    try {
      const key = this.getKey(userId)
      const data = await this.redis.get(key)
      
      if (!data) return null

      const parsed = JSON.parse(data)

      // Converter strings ISO de volta para Date objects
      return {
        ...parsed,
        createdAt: new Date(parsed.createdAt),
        updatedAt: new Date(parsed.updatedAt),
      }
    } catch (error) {
      console.error('Error getting connection from Redis:', error)
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
      const expirationSeconds = 60 * 60 * 24 * 90 // 90 dias
      await this.redis.set(key, JSON.stringify(dataToStore), 'EX', expirationSeconds)

      console.log(`✅ Notion connection saved in Redis for user ${connection.userId}`)
    } catch (error) {
      console.error('Error saving connection to Redis:', error)
      throw new Error('Failed to save Notion connection')
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      const key = this.getKey(userId)
      await this.redis.del(key)
      console.log(`🗑️ Notion connection deleted from Redis for user ${userId}`)
    } catch (error) {
      console.error('Error deleting connection from Redis:', error)
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
      const keys = await this.redis.keys(pattern)
      
      if (!keys || keys.length === 0) return []

      const connections: UserNotionConnection[] = []
      
      for (const key of keys) {
        const data = await this.redis.get(key)
        if (data) {
          const parsed = JSON.parse(data)
          connections.push({
            ...parsed,
            createdAt: new Date(parsed.createdAt),
            updatedAt: new Date(parsed.updatedAt),
          })
        }
      }

      return connections
    } catch (error) {
      console.error('Error listing connections from Redis:', error)
      return []
    }
  }

  /**
   * Método auxiliar para obter estatísticas (útil para monitoramento).
   */
  async getStats(): Promise<{ totalConnections: number }> {
    try {
      const pattern = `${this.KEY_PREFIX}*`
      const keys = await this.redis.keys(pattern)
      return { totalConnections: keys?.length || 0 }
    } catch (error) {
      console.error('Error getting stats from Redis:', error)
      return { totalConnections: 0 }
    }
  }

  /**
   * Fecha a conexão Redis (útil para testes e shutdown gracioso).
   */
  async disconnect(): Promise<void> {
    await this.redis.quit()
  }
}

// Singleton instance
let storeInstance: UserNotionConnectionStore | null = null

/**
 * Retorna a instância global do UserNotionConnectionStore usando Redis externo.
 */
export function getUserNotionConnectionStore(): UserNotionConnectionStore {
  if (!storeInstance) {
    const redisUrl = process.env.REDIS_URL
    
    if (!redisUrl) {
      throw new Error('REDIS_URL environment variable is required')
    }

    try {
      storeInstance = new RedisUserNotionConnectionStore(redisUrl)
      console.log('✅ Using Redis store (persistent)')
    } catch (error) {
      console.error('Failed to initialize Redis store:', error)
      throw error
    }
  }
  
  if (!storeInstance) {
    throw new Error('Failed to initialize UserNotionConnectionStore')
  }
  
  return storeInstance
}

/**
 * Reseta a instância singleton (útil para testes).
 */
export function resetStoreInstance(): void {
  storeInstance = null
}




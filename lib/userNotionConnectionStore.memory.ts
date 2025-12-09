import type { UserNotionConnection, UserNotionConnectionStore } from './types'

/**
 * Implementação em memória do UserNotionConnectionStore.
 * 
 * ⚠️ ATENÇÃO: Esta implementação é apenas para desenvolvimento e testes iniciais.
 * Os dados serão perdidos quando o servidor reiniciar.
 * 
 * Para produção, use a versão Vercel KV em `userNotionConnectionStore.kv.ts`
 */
export class InMemoryUserNotionConnectionStore implements UserNotionConnectionStore {
  private connections: Map<string, UserNotionConnection> = new Map()

  async getByUserId(userId: string): Promise<UserNotionConnection | null> {
    const connection = this.connections.get(userId)
    return connection ?? null
  }

  async saveOrUpdate(connection: UserNotionConnection): Promise<void> {
    const existing = this.connections.get(connection.userId)
    
    if (existing) {
      // Atualizar existente
      this.connections.set(connection.userId, {
        ...connection,
        createdAt: existing.createdAt,
        updatedAt: new Date(),
      })
    } else {
      // Criar novo
      this.connections.set(connection.userId, {
        ...connection,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }

  async delete(userId: string): Promise<void> {
    this.connections.delete(userId)
  }

  // Método auxiliar para desenvolvimento/debug (não faz parte da interface)
  async listAll(): Promise<UserNotionConnection[]> {
    return Array.from(this.connections.values())
  }
}



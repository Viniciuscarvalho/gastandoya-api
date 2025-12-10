/**
 * Testes unitários para UserNotionConnectionStore (in-memory)
 */

import { getUserNotionConnectionStore } from '@/lib/userNotionConnectionStore'
import type { UserNotionConnection } from '@/lib/types'

describe('UserNotionConnectionStore', () => {
  let store: ReturnType<typeof getUserNotionConnectionStore>

  beforeEach(() => {
    // Obter a instância singleton (cuidado: estado é compartilhado)
    store = getUserNotionConnectionStore()
  })

  it('deve retornar null para usuário não existente', async () => {
    const result = await store.getByUserId('usuario-inexistente')
    expect(result).toBeNull()
  })

  it('deve salvar e recuperar uma conexão', async () => {
    const connection: UserNotionConnection = {
      userId: 'test-user-1',
      accessToken: 'secret_token_123',
      workspaceId: 'workspace-abc',
      expensesDatabaseId: 'database-xyz',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await store.saveOrUpdate(connection)
    
    const retrieved = await store.getByUserId('test-user-1')
    expect(retrieved).not.toBeNull()
    expect(retrieved?.accessToken).toBe('secret_token_123')
    expect(retrieved?.workspaceId).toBe('workspace-abc')
    expect(retrieved?.expensesDatabaseId).toBe('database-xyz')
  })

  it('deve atualizar uma conexão existente', async () => {
    const connection: UserNotionConnection = {
      userId: 'test-user-2',
      accessToken: 'token_original',
      workspaceId: 'workspace-abc',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await store.saveOrUpdate(connection)
    
    // Atualizar com databaseId
    await store.saveOrUpdate({
      ...connection,
      expensesDatabaseId: 'novo-database-id',
    })

    const retrieved = await store.getByUserId('test-user-2')
    expect(retrieved?.expensesDatabaseId).toBe('novo-database-id')
    expect(retrieved?.accessToken).toBe('token_original')
  })

  it('deve deletar uma conexão', async () => {
    const connection: UserNotionConnection = {
      userId: 'test-user-3',
      accessToken: 'token_123',
      workspaceId: 'workspace-xyz',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await store.saveOrUpdate(connection)
    expect(await store.getByUserId('test-user-3')).not.toBeNull()

    await store.delete('test-user-3')
    expect(await store.getByUserId('test-user-3')).toBeNull()
  })
})










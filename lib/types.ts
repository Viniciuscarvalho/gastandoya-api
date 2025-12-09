/**
 * Representa o vínculo de um usuário do GastandoYa com sua conta Notion.
 * Armazena o token de acesso OAuth e metadados necessários para consultar
 * o database de despesas no Notion.
 */
export interface UserNotionConnection {
  userId: string
  accessToken: string
  workspaceId: string
  expensesDatabaseId?: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Interface para armazenar e recuperar conexões Notion por usuário.
 * Implementações podem usar memória, arquivo, banco de dados relacional, KV store, etc.
 */
export interface UserNotionConnectionStore {
  /**
   * Busca a conexão Notion de um usuário específico.
   * @param userId - ID único do usuário no GastandoYa
   * @returns A conexão se existir, null caso contrário
   */
  getByUserId(userId: string): Promise<UserNotionConnection | null>

  /**
   * Salva ou atualiza a conexão Notion de um usuário.
   * @param connection - Dados completos da conexão a persistir
   */
  saveOrUpdate(connection: UserNotionConnection): Promise<void>

  /**
   * Remove a conexão Notion de um usuário (útil para desconectar/revoke).
   * @param userId - ID único do usuário no GastandoYa
   */
  delete(userId: string): Promise<void>
}

/**
 * Tipo para o DTO de despesas retornado pela API.
 */
export type ExpenseDTO = {
  id: string
  description: string
  date: string // ISO 8601
  amount: number // em centavos
  currency: string // fixo "BRL" na V1
  category?: string
  createdAt: string // ISO 8601
  updatedAt?: string // ISO 8601
}







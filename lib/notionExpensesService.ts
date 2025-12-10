import { createNotionClient } from './notionClient'
import { getUserNotionConnectionStore } from './userNotionConnectionStore'
import { normalizeNotionId } from './notionId'
import type { ExpenseDTO } from './types'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

/**
 * Serviço para buscar despesas do Notion de um usuário específico.
 * Encapsula a lógica de consulta ao database, paginação e transformação para ExpenseDTO.
 */
export class NotionExpensesService {
  /**
   * Busca todas as despesas de um usuário a partir do database configurado no Notion.
   * 
   * @param userId - ID do usuário do GastandoYa
   * @returns Lista de despesas normalizadas
   * @throws Error se o usuário não tiver conexão Notion ou se houver falha na API
   */
  async fetchExpensesForUser(userId: string): Promise<ExpenseDTO[]> {
    console.log('🔍 [notionExpensesService] Fetching expenses for userId:', userId)
    
    // 1. Buscar conexão Notion do usuário
    const store = getUserNotionConnectionStore()
    console.log('📦 [notionExpensesService] Getting connection from store...')
    const connection = await store.getByUserId(userId)

    if (!connection) {
      console.error('❌ [notionExpensesService] No connection found for user:', userId)
      throw new Error(`User ${userId} does not have a Notion connection`)
    }
    
    console.log('✅ [notionExpensesService] Connection found:', {
      userId: connection.userId,
      hasAccessToken: !!connection.accessToken,
      expensesDatabaseId: connection.expensesDatabaseId,
    })

    if (!connection.expensesDatabaseId) {
      console.error('❌ [notionExpensesService] No database configured for user:', userId)
      throw new Error(`User ${userId} has not configured an expenses database`)
    }

    const normalizedDatabaseId = normalizeNotionId(connection.expensesDatabaseId)
    console.log('🆔 [notionExpensesService] Normalized databaseId:', {
      raw: connection.expensesDatabaseId,
      normalized: normalizedDatabaseId,
    })

    // 2. Criar client autenticado
    console.log('🔐 [notionExpensesService] Creating Notion client...')
    const notion = createNotionClient(connection.accessToken)

    // 3. Consultar database com paginação
    console.log('📊 [notionExpensesService] Querying Notion database:', normalizedDatabaseId)
    const allPages: any[] = []
    let hasMore = true
    let startCursor: string | undefined = undefined

    while (hasMore) {
      try {
        const response: QueryDatabaseResponse = await notion.databases.query({
          database_id: normalizedDatabaseId,
          start_cursor: startCursor,
          page_size: 100, // Máximo permitido pela Notion API
        })

        console.log(`📄 [notionExpensesService] Retrieved ${response.results.length} pages, hasMore: ${response.has_more}`)
        allPages.push(...response.results)
        hasMore = response.has_more
        startCursor = response.next_cursor ?? undefined
      } catch (error: any) {
        console.error('❌ [notionExpensesService] Error querying Notion database:', {
          message: error.message,
          code: error.code,
          status: error.status,
        })

        // Erros típicos de database inexistente ou sem acesso
        if (error.code === 'object_not_found' || error.code === 'validation_error') {
          throw new Error(`NOTION_DATABASE_NOT_FOUND: ${error.message}`)
        }

        throw new Error(`Failed to fetch expenses from Notion: ${error.message}`)
      }
    }

    console.log(`✅ [notionExpensesService] Total pages retrieved: ${allPages.length}`)

    // 4. Transformar páginas em ExpenseDTO
    const expenses: ExpenseDTO[] = []
    for (const page of allPages) {
      try {
        const expense = notionPageToExpenseDTO(page)
        if (expense) {
          expenses.push(expense)
        }
      } catch (error) {
        // Ignorar páginas com dados inválidos
        console.warn('⚠️ [notionExpensesService] Failed to parse page:', page.id, error)
      }
    }

    console.log(`✅ [notionExpensesService] Parsed ${expenses.length} expenses successfully`)
    return expenses
  }
}

/**
 * Converte uma página do Notion em ExpenseDTO.
 * 
 * Mapeia as propriedades esperadas do database de despesas:
 * - Description (title ou rich_text) → description
 * - Date (date) → date
 * - Amount (number) → amount (em centavos)
 * - Category (select ou rich_text) → category
 * 
 * @param page - Página do Notion retornada pela API
 * @returns ExpenseDTO ou null se a página não puder ser parseada
 */
function notionPageToExpenseDTO(page: any): ExpenseDTO | null {
  if (!page.properties) return null

  const props = page.properties

  // Extrair descrição (campo title ou rich_text chamado "Description", "Name", "Título", etc.)
  const description = extractText(
    props.Description || props.Name || props.Título || props.Title
  )
  if (!description) return null // Descrição é obrigatória

  // Extrair data
  const dateValue = extractDate(props.Date || props.Data)
  if (!dateValue) return null // Data é obrigatória

  // Extrair valor (em reais, converter para centavos)
  const amountInBRL = extractNumber(props.Amount || props.Valor || props.Value)
  if (amountInBRL === null) return null // Valor é obrigatório

  const amountInCents = Math.round(amountInBRL * 100)

  // Extrair categoria (opcional)
  const category = extractSelect(props.Category || props.Categoria) 
    || extractText(props.Category || props.Categoria)

  // Metadados da página
  const createdAt = page.created_time || new Date().toISOString()
  const updatedAt = page.last_edited_time || createdAt

  return {
    id: page.id,
    description,
    date: dateValue,
    amount: amountInCents,
    currency: 'BRL', // Fixo na V1
    category: category ?? undefined, // Converter null para undefined
    createdAt,
    updatedAt,
  }
}

/**
 * Extrai texto de propriedades title ou rich_text do Notion.
 */
function extractText(prop: any): string | null {
  if (!prop) return null

  if (prop.type === 'title' && Array.isArray(prop.title)) {
    return prop.title.map((t: any) => t.plain_text).join('') || null
  }

  if (prop.type === 'rich_text' && Array.isArray(prop.rich_text)) {
    return prop.rich_text.map((t: any) => t.plain_text).join('') || null
  }

  return null
}

/**
 * Extrai data de propriedade date do Notion.
 * Retorna a data no formato ISO 8601 (apenas YYYY-MM-DD).
 */
function extractDate(prop: any): string | null {
  if (!prop || prop.type !== 'date' || !prop.date) return null

  // prop.date.start pode ser "2025-01-31" ou "2025-01-31T10:00:00.000Z"
  const start = prop.date.start
  if (!start) return null

  // Se já está no formato YYYY-MM-DD, retornar
  if (/^\d{4}-\d{2}-\d{2}$/.test(start)) {
    return start
  }

  // Se tem timestamp, extrair apenas a data
  return start.split('T')[0]
}

/**
 * Extrai número de propriedade number do Notion.
 */
function extractNumber(prop: any): number | null {
  if (!prop || prop.type !== 'number') return null
  return typeof prop.number === 'number' ? prop.number : null
}

/**
 * Extrai texto de propriedade select do Notion.
 */
function extractSelect(prop: any): string | null {
  if (!prop || prop.type !== 'select' || !prop.select) return null
  return prop.select.name || null
}

// Export singleton instance
export const notionExpensesService = new NotionExpensesService()


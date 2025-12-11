import { createNotionClient } from './notionClient'
import { getUserNotionConnectionStore } from './userNotionConnectionStore'
import { normalizeNotionId } from './notionId'
import type { ExpenseDTO } from './types'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'

/**
 * Cache para nomes de páginas relacionadas (evita chamadas duplicadas à API)
 * Key: page_id, Value: page title
 */
const pageTitleCache = new Map<string, string>()

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
        const expense = await notionPageToExpenseDTO(page, notion)
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
 * - Category (select, rich_text ou relation) → category
 * 
 * @param page - Página do Notion retornada pela API
 * @param notion - Client autenticado do Notion (para buscar relations)
 * @returns ExpenseDTO ou null se a página não puder ser parseada
 */
async function notionPageToExpenseDTO(page: any, notion: any): Promise<ExpenseDTO | null> {
  if (!page.properties) return null

  const props = page.properties

  // Extrair descrição (priorizar nomes em português)
  const description = extractText(
    props.Descrição || props.Description || props.Name || props.Título || props.Title
  )
  if (!description) return null // Descrição é obrigatória

  // Extrair data (priorizar nomes em português)
  const dateValue = extractDate(props.Data || props.Date)
  if (!dateValue) return null // Data é obrigatória

  // Extrair valor (priorizar nomes em português, em reais converter para centavos)
  const amountInBRL = extractNumber(props.Valor || props.Amount || props.Value)
  if (amountInBRL === null) return null // Valor é obrigatório

  const amountInCents = Math.round(amountInBRL * 100)

  // Extrair categoria (opcional - pode ser select, rich_text ou relation)
  let category: string | undefined = undefined
  
  // Tentar extract em ordem de preferência:
  const categoryProp = props.Category || props.Categoria
  
  if (categoryProp) {
    // 1. Tentar como select
    category = extractSelect(categoryProp) ?? undefined
    
    // 2. Tentar como rich_text/title
    if (!category) {
      category = extractText(categoryProp) ?? undefined
    }
    
    // 3. Tentar como relation (buscar nome da página relacionada)
    if (!category) {
      const relationIds = extractRelation(categoryProp)
      if (relationIds && relationIds.length > 0) {
        // Buscar apenas o primeiro relacionamento
        const firstRelationId = relationIds[0]
        category = await fetchPageTitle(notion, firstRelationId)
      }
    }
  }

  // Metadados da página
  const createdAt = page.created_time || new Date().toISOString()
  const updatedAt = page.last_edited_time || createdAt

  return {
    id: page.id,
    description,
    date: dateValue,
    amount: amountInCents,
    currency: 'BRL', // Fixo na V1
    category,
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

/**
 * Extrai IDs de páginas relacionadas de uma propriedade relation do Notion.
 */
function extractRelation(prop: any): string[] | null {
  if (!prop || prop.type !== 'relation' || !Array.isArray(prop.relation)) return null
  return prop.relation.map((rel: any) => rel.id).filter(Boolean)
}

/**
 * Busca o título de uma página do Notion pelo ID.
 * Utiliza cache para evitar chamadas duplicadas à API.
 * 
 * @param notion - Client autenticado do Notion
 * @param pageId - ID da página a ser buscada
 * @returns Título da página ou undefined em caso de erro
 */
async function fetchPageTitle(notion: any, pageId: string): Promise<string | undefined> {
  // Verificar cache primeiro
  if (pageTitleCache.has(pageId)) {
    console.log(`📦 [fetchPageTitle] Cache hit for pageId: ${pageId}`)
    return pageTitleCache.get(pageId)
  }

  try {
    console.log(`🔍 [fetchPageTitle] Fetching page title for: ${pageId}`)
    const page = await notion.pages.retrieve({ page_id: pageId })

    // Extrair título da página
    let title: string | undefined = undefined

    if (page.properties) {
      // Procurar propriedade title
      for (const [, prop] of Object.entries(page.properties)) {
        const propAny = prop as any
        if (propAny.type === 'title' && Array.isArray(propAny.title)) {
          title = propAny.title.map((t: any) => t.plain_text).join('').trim()
          if (title) break
        }
      }
    }

    // Se não encontrou title, tentar usar o nome da página (fallback)
    if (!title && page && (page as any).url) {
      title = pageId.slice(0, 8) // Usar primeiros caracteres do ID como fallback
    }

    if (title) {
      console.log(`✅ [fetchPageTitle] Found title "${title}" for pageId: ${pageId}`)
      pageTitleCache.set(pageId, title)
      return title
    }

    console.warn(`⚠️ [fetchPageTitle] No title found for pageId: ${pageId}`)
    return undefined
  } catch (error: any) {
    console.error(`❌ [fetchPageTitle] Error fetching page ${pageId}:`, {
      message: error.message,
      code: error.code,
    })
    // Em caso de erro (ex: acesso negado), retornar undefined
    return undefined
  }
}

// Export singleton instance
export const notionExpensesService = new NotionExpensesService()


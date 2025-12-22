import { isFullBlock } from '@notionhq/client'
import type {
  BlockObjectResponse,
  DatabaseObjectResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { createNotionClient } from './notionClient'
import { normalizeNotionId } from './notionId'
import { getUserNotionConnectionStore } from './userNotionConnectionStore'

export type DatabaseCandidateSource = 'page_blocks' | 'search'

export type DatabaseCandidate = {
  id: string // normalized notion id (no dashes)
  title: string
  source: DatabaseCandidateSource
  pageId?: string // normalized notion id (no dashes)
}

function richTextToPlainText(richText: any[] | undefined): string {
  if (!richText || !Array.isArray(richText)) return ''
  return richText
    .map((t) => {
      if (!t) return ''
      if (typeof t.plain_text === 'string') return t.plain_text
      if (t.type === 'text' && typeof t.text?.content === 'string') return t.text.content
      return ''
    })
    .join('')
    .trim()
}

function databaseTitle(database: DatabaseObjectResponse): string {
  // Notion DB title is rich_text[]
  const title = richTextToPlainText((database as any).title)
  return title || 'Database (sem título)'
}

/**
 * Serviço para descobrir databases acessíveis ao usuário.
 * Caso 1 (principal): descobrir databases inline dentro de uma página via Blocks API.
 */
export class NotionDatabaseDiscoveryService {
  /**
   * Descobre databases contidos dentro de uma página (inline database), via Blocks API.
   *
   * Regras:
   * - Retorna candidatos encontrados como `child_database` (mais comum).
   * - Suporta paginação (`next_cursor`) até completar.
   * - Busca o título do database via `databases.retrieve` para UX.
   */
  async findDatabasesInPageForUser(userId: string, pageId: string): Promise<DatabaseCandidate[]> {
    const normalizedPageId = normalizeNotionId(pageId)

    const store = getUserNotionConnectionStore()
    const connection = await store.getByUserId(userId)
    if (!connection) {
      throw new Error(`User ${userId} does not have a Notion connection`)
    }

    const notion = createNotionClient(connection.accessToken)

    const databaseBlockIds: string[] = []
    let startCursor: string | undefined

    // Paginação: varre todos os blocos filhos da página
    // Notion API max page_size = 100
    for (;;) {
      let resp: ListBlockChildrenResponse
      try {
        resp = await notion.blocks.children.list({
          block_id: normalizedPageId,
          start_cursor: startCursor,
          page_size: 100,
        })
      } catch (error: any) {
        // Importante: não logar token
        console.error('❌ [notionDatabaseDiscovery] Failed to list page blocks:', {
          userId,
          pageId: normalizedPageId,
          message: error?.message,
          code: error?.code,
          status: error?.status,
        })

        if (error?.code === 'object_not_found') {
          throw new Error(
            'NOTION_PAGE_NOT_FOUND_OR_NOT_SHARED: Não foi possível acessar a página. Verifique se a página foi compartilhada com a integração GastandoYa.',
          )
        }
        throw new Error(`NOTION_BLOCKS_LIST_FAILED: ${error?.message || 'Unknown error'}`)
      }

      for (const block of resp.results as Array<BlockObjectResponse | any>) {
        if (!isFullBlock(block)) continue
        if (block.type === 'child_database') {
          databaseBlockIds.push(normalizeNotionId(block.id))
        }

        // Incremental: suportar link_to_page se apontar para database
        // Alguns layouts podem expor um link para um database existente
        if (block.type === 'link_to_page') {
          const link = (block as any).link_to_page
          if (link?.type === 'database_id' && typeof link?.database_id === 'string') {
            databaseBlockIds.push(normalizeNotionId(link.database_id))
          }
        }
      }

      if (!resp.has_more || !resp.next_cursor) break
      startCursor = resp.next_cursor
    }

    // Deduplicar mantendo ordem
    const uniqueDbIds = Array.from(new Set(databaseBlockIds))

    // Buscar títulos (UX)
    const candidates: DatabaseCandidate[] = []
    for (const dbId of uniqueDbIds) {
      try {
        const db = (await notion.databases.retrieve({
          database_id: dbId,
        })) as DatabaseObjectResponse

        candidates.push({
          id: normalizeNotionId(dbId),
          title: databaseTitle(db),
          source: 'page_blocks',
          pageId: normalizedPageId,
        })
      } catch (error: any) {
        console.error('⚠️ [notionDatabaseDiscovery] Failed to retrieve database title:', {
          userId,
          databaseId: dbId,
          message: error?.message,
          code: error?.code,
          status: error?.status,
        })

        // Ainda assim retorna o candidato sem título “bonito”
        candidates.push({
          id: normalizeNotionId(dbId),
          title: 'Database (não foi possível ler título)',
          source: 'page_blocks',
          pageId: normalizedPageId,
        })
      }
    }

    return candidates
  }

  /**
   * Busca databases acessíveis ao usuário pelo nome via Search API.
   * Útil quando o usuário sabe o nome do DB (ex.: "GASTOS") ou quando não quer depender da estrutura da página.
   */
  async searchDatabasesForUser(userId: string, query: string): Promise<DatabaseCandidate[]> {
    const q = (query || '').trim()
    if (!q) return []

    const store = getUserNotionConnectionStore()
    const connection = await store.getByUserId(userId)
    if (!connection) {
      throw new Error(`User ${userId} does not have a Notion connection`)
    }

    const notion = createNotionClient(connection.accessToken)

    let searchResponse: any
    try {
      searchResponse = await notion.search({
        query: q,
        filter: { property: 'object', value: 'database' },
        page_size: 50,
      })
    } catch (error: any) {
      console.error('❌ [notionDatabaseDiscovery] Failed to search databases:', {
        userId,
        query: q,
        message: error?.message,
        code: error?.code,
        status: error?.status,
      })
      throw new Error(`NOTION_SEARCH_FAILED: ${error?.message || 'Unknown error'}`)
    }

    const results: any[] = Array.isArray(searchResponse?.results) ? searchResponse.results : []
    const databases = results.filter((r) => r && r.object === 'database')

    const candidates: DatabaseCandidate[] = databases.map((db) => {
      const id = normalizeNotionId(String(db.id || ''))
      const title = richTextToPlainText(db.title) || 'Database (sem título)'
      return { id, title, source: 'search' }
    })

    // Dedup por id
    const uniqueById = new Map<string, DatabaseCandidate>()
    for (const c of candidates) {
      if (!c.id) continue
      if (!uniqueById.has(c.id)) uniqueById.set(c.id, c)
    }
    return Array.from(uniqueById.values())
  }
}



import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'
import { NotionDatabaseDiscoveryService } from '@/lib/notionDatabaseDiscoveryService'

export const dynamic = 'force-dynamic'

/**
 * GET /api/notion/databases/list
 *
 * Lista databases acessíveis para o usuário via:
 * - Descoberta por pageId (Blocks API) ou
 * - Busca por nome (Search API)
 *
 * Headers obrigatórios:
 * - x-api-key
 * - x-user-id
 *
 * Query params:
 * - pageId?: string
 * - q?: string
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Validar x-api-key
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey || apiKey !== config.app.apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Extrair userId
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Missing x-user-id header' }, { status: 400 })
    }

    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId') || undefined
    const q = searchParams.get('q') || undefined

    if (!pageId && !q) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Provide pageId and/or q query param' },
        { status: 400 },
      )
    }

    const discovery = new NotionDatabaseDiscoveryService()
    const databases = [
      ...(pageId ? await discovery.findDatabasesInPageForUser(userId, pageId) : []),
      ...(q ? await discovery.searchDatabasesForUser(userId, q) : []),
    ]

    // Dedup por id (preferir page_blocks)
    const byId = new Map<string, (typeof databases)[number]>()
    for (const db of databases) {
      if (!db?.id) continue
      const existing = byId.get(db.id)
      if (!existing) {
        byId.set(db.id, db)
        continue
      }
      if (existing.source !== 'page_blocks' && db.source === 'page_blocks') {
        byId.set(db.id, db)
      }
    }

    return NextResponse.json({ databases: Array.from(byId.values()) }, { status: 200 })
  } catch (error: any) {
    console.error('❌ [notion/databases/list] Error:', { message: error?.message })
    return NextResponse.json({ error: 'Internal error', message: error?.message }, { status: 500 })
  }
}





import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'
import { getUserNotionConnectionStore } from '@/lib/userNotionConnectionStore'
import { createNotionClient } from '@/lib/notionClient'
import { normalizeNotionId } from '@/lib/notionId'

export const dynamic = 'force-dynamic'

/**
 * GET /api/notion/debug
 * 
 * Rota de diagnóstico para verificar o que a integração consegue ver no Notion.
 * 
 * Headers obrigatórios:
 * - x-api-key: Token de autenticação do app iOS
 * - x-user-id: ID do usuário
 * 
 * Query params opcionais:
 * - testDatabaseId: ID do database para testar acesso
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Validar x-api-key
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey || apiKey !== config.app.apiKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Extrair userId
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json(
        { error: 'Missing x-user-id header' },
        { status: 400 }
      )
    }

    // 3. Buscar conexão
    const store = getUserNotionConnectionStore()
    const connection = await store.getByUserId(userId)

    if (!connection) {
      return NextResponse.json(
        { error: 'No Notion connection found for this user' },
        { status: 404 }
      )
    }

    const notion = createNotionClient(connection.accessToken)

    // 4. Buscar search parameter (testDatabaseId)
    const { searchParams } = new URL(request.url)
    const testDatabaseId = searchParams.get('testDatabaseId')

    const diagnostics: any = {
      userId,
      workspaceId: connection.workspaceId,
      configuredDatabaseId: connection.expensesDatabaseId || 'Not configured',
      searchResults: null,
      databaseTest: null,
    }

    // 5. Buscar databases/páginas visíveis
    try {
      console.log('🔍 [debug] Searching for accessible databases...')
      const searchResponse = await notion.search({
        filter: {
          property: 'object',
          value: 'database',
        },
        page_size: 20,
      })

      diagnostics.searchResults = {
        count: searchResponse.results.length,
        databases: searchResponse.results.map((db: any) => ({
          id: db.id,
          title: db.title?.[0]?.plain_text || 'Untitled',
          url: db.url,
          created_time: db.created_time,
        })),
      }

      console.log(`✅ [debug] Found ${searchResponse.results.length} accessible databases`)
    } catch (error: any) {
      console.error('❌ [debug] Error searching databases:', error.message)
      diagnostics.searchResults = {
        error: error.message,
        code: error.code,
      }
    }

    // 6. Testar acesso ao database específico
    if (testDatabaseId) {
      const normalizedId = normalizeNotionId(testDatabaseId)
      console.log('🧪 [debug] Testing access to database:', normalizedId)

      try {
        const dbRetrieve = await notion.databases.retrieve({
          database_id: normalizedId,
        })

        diagnostics.databaseTest = {
          success: true,
          id: dbRetrieve.id,
          title: (dbRetrieve as any).title?.[0]?.plain_text || 'Untitled',
          url: (dbRetrieve as any).url,
          created_time: (dbRetrieve as any).created_time,
        }

        console.log('✅ [debug] Database access successful:', dbRetrieve.id)
      } catch (error: any) {
        console.error('❌ [debug] Database access failed:', error.message)
        diagnostics.databaseTest = {
          success: false,
          testedId: normalizedId,
          error: error.message,
          code: error.code,
          hint: error.code === 'object_not_found' 
            ? 'This database is not shared with your integration or the ID is incorrect'
            : 'Unknown error',
        }
      }
    }

    return NextResponse.json(diagnostics, { status: 200 })
  } catch (error: any) {
    console.error('❌ [debug] Error in debug route:', error)
    return NextResponse.json(
      { error: 'Internal error', message: error.message },
      { status: 500 }
    )
  }
}


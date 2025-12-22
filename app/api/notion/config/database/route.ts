import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'
import { getUserNotionConnectionStore } from '@/lib/userNotionConnectionStore'
import { normalizeNotionId } from '@/lib/notionId'
import { createNotionClient } from '@/lib/notionClient'
import { NotionDatabaseDiscoveryService } from '@/lib/notionDatabaseDiscoveryService'

// Força renderização dinâmica (necessário para headers e body)
export const dynamic = 'force-dynamic'

/**
 * POST /api/notion/config/database
 * 
 * Configura o database_id de despesas para um usuário que já conectou o Notion.
 * 
 * Headers obrigatórios:
 * - x-api-key: Token de autenticação do app iOS
 * - x-user-id: ID do usuário
 * 
 * Body JSON:
 * {
 *   "databaseId": "abc123..." // ID do database de despesas no Notion
 *   "pageId": "005ae70f..."   // (opcional) ID de uma página que contém um database inline
 * }
 * 
 * Respostas:
 * - 200: Configuração salva com sucesso
 * - 400: Parâmetros inválidos
 * - 401: x-api-key inválido
 * - 404: Usuário não possui conexão Notion
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Validar x-api-key
    const apiKey = request.headers.get('x-api-key')
    
    if (!apiKey || apiKey !== config.app.apiKey) {
      console.error('❌ Unauthorized: API key mismatch')
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

    // 3. Parse body
    const body = await request.json()
    const { databaseId, pageId } = body

    const hasDatabaseId = typeof databaseId === 'string' && databaseId.trim().length > 0
    const hasPageId = typeof pageId === 'string' && pageId.trim().length > 0

    if (!hasDatabaseId && !hasPageId) {
      return NextResponse.json({ error: 'Invalid request', message: 'Provide databaseId or pageId' }, { status: 400 })
    }

    // 4. Buscar conexão existente
    const store = getUserNotionConnectionStore()
    const connection = await store.getByUserId(userId)

    if (!connection) {
      console.error('❌ No Notion connection found for user:', userId)
      return NextResponse.json(
        { error: 'User does not have a Notion connection' },
        { status: 404 }
      )
    }

    const notion = createNotionClient(connection.accessToken)

    let normalizedDatabaseId: string | null = null

    // 5. Resolver databaseId
    if (hasDatabaseId) {
      normalizedDatabaseId = normalizeNotionId(databaseId)
    } else if (hasPageId) {
      const discovery = new NotionDatabaseDiscoveryService()
      const candidates = await discovery.findDatabasesInPageForUser(userId, pageId)

      if (candidates.length === 0) {
        return NextResponse.json(
          {
            error: 'Notion database not found in page',
            message:
              'Nenhum database foi encontrado dentro desta página. Verifique se o database está dentro da página e se a página/database foi compartilhada com a integração GastandoYa.',
          },
          { status: 400 },
        )
      }

      if (candidates.length > 1) {
        return NextResponse.json(
          {
            error: 'Multiple databases found in page',
            message: 'Mais de um database foi encontrado dentro da página. Selecione qual deseja usar.',
            databases: candidates,
          },
          { status: 409 },
        )
      }

      normalizedDatabaseId = normalizeNotionId(candidates[0].id)
    }

    if (!normalizedDatabaseId) {
      return NextResponse.json({ error: 'Failed to resolve databaseId' }, { status: 500 })
    }

    // 6. Validar se o database realmente existe e é acessível pela integração
    try {
      await notion.databases.retrieve({ database_id: normalizedDatabaseId })
    } catch (error: any) {
      console.error('❌ Failed to validate Notion database:', {
        message: error.message,
        code: error.code,
        status: error.status,
      })

      // Erros típicos de ID inválido ou database não compartilhado
      if (error.code === 'object_not_found' || error.code === 'validation_error') {
        return NextResponse.json(
          {
            error: 'Invalid Notion database',
            message:
              'Could not find database with this ID. Check that the ID is correct and that the database is shared with the GastandoYa integration.',
          },
          { status: 400 },
        )
      }

      return NextResponse.json({ error: 'Failed to validate Notion database' }, { status: 500 })
    }

    // 7. Atualizar com o databaseId validado
    await store.saveOrUpdate({
      ...connection,
      expensesDatabaseId: normalizedDatabaseId,
    })

    console.log('✅ Database configured successfully for user:', userId, {
      rawDatabaseId: databaseId,
      normalizedDatabaseId,
    })

    return NextResponse.json({
      success: true,
      message: 'Expenses database configured successfully',
      databaseId: normalizedDatabaseId,
    })
  } catch (error: any) {
    console.error('Error configuring database:', error.message)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


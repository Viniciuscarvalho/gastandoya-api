import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'
import { getUserNotionConnectionStore } from '@/lib/userNotionConnectionStore'

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
    const { databaseId } = body

    if (!databaseId || typeof databaseId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid databaseId' },
        { status: 400 }
      )
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

    // 5. Atualizar com o databaseId
    await store.saveOrUpdate({
      ...connection,
      expensesDatabaseId: databaseId,
    })
    
    console.log('✅ Database configured successfully for user:', userId)

    return NextResponse.json({
      success: true,
      message: 'Expenses database configured successfully',
    })
  } catch (error: any) {
    console.error('Error configuring database:', error.message)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


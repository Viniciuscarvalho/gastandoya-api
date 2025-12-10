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
    
    // Debug logs
    console.log('🔎 [config/database] x-api-key header:', JSON.stringify(apiKey))
    console.log('🔎 [config/database] APP_API_KEY (config.app.apiKey):', JSON.stringify(config.app.apiKey))
    console.log('🔎 [config/database] Match:', apiKey === config.app.apiKey)
    
    if (!apiKey || apiKey !== config.app.apiKey) {
      console.error('❌ [config/database] Unauthorized: API key mismatch')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    console.log('✅ [config/database] API key validated successfully')

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
    console.log('🔍 [config/database] Looking for connection for userId:', userId)
    const store = getUserNotionConnectionStore()
    const connection = await store.getByUserId(userId)

    console.log('🔍 [config/database] Connection found:', {
      found: !!connection,
      userId: connection?.userId,
      hasAccessToken: !!connection?.accessToken,
      workspaceId: connection?.workspaceId,
    })

    if (!connection) {
      console.error('❌ [config/database] No Notion connection found for user:', userId)
      return NextResponse.json(
        { error: 'User does not have a Notion connection' },
        { status: 404 }
      )
    }

    // 5. Atualizar com o databaseId
    console.log('💾 [config/database] Updating connection with databaseId:', databaseId)
    await store.saveOrUpdate({
      ...connection,
      expensesDatabaseId: databaseId,
    })
    
    console.log('✅ [config/database] Database configured successfully for user:', userId)

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


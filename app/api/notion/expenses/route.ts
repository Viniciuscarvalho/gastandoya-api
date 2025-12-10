import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'
import { notionExpensesService } from '@/lib/notionExpensesService'

// Força renderização dinâmica (necessário para headers)
export const dynamic = 'force-dynamic'

/**
 * GET /api/notion/expenses
 * 
 * Retorna a lista de despesas do Notion para o usuário autenticado.
 * 
 * Headers obrigatórios:
 * - x-api-key: Token de autenticação do app iOS (APP_API_KEY)
 * - x-user-id: ID do usuário do GastandoYa
 * 
 * Respostas:
 * - 200: Lista de ExpenseDTO[] em JSON
 * - 401: x-api-key inválido ou ausente
 * - 404: Usuário não possui conexão Notion configurada
 * - 500: Erro interno (ex: falha na API do Notion)
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Validar x-api-key
    const apiKey = request.headers.get('x-api-key')
    
    // Debug logs
    console.log('🔎 [expenses] x-api-key header:', JSON.stringify(apiKey))
    console.log('🔎 [expenses] APP_API_KEY (config.app.apiKey):', JSON.stringify(config.app.apiKey))
    console.log('🔎 [expenses] Match:', apiKey === config.app.apiKey)
    
    if (!apiKey || apiKey !== config.app.apiKey) {
      console.error('❌ [expenses] Unauthorized: API key mismatch')
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or missing x-api-key' },
        { status: 401 }
      )
    }
    
    console.log('✅ [expenses] API key validated successfully')

    // 2. Extrair userId
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Missing x-user-id header' },
        { status: 400 }
      )
    }

    // 3. Buscar despesas do Notion
    const expenses = await notionExpensesService.fetchExpensesForUser(userId)

    // 4. Retornar sucesso
    return NextResponse.json(expenses, { status: 200 })
  } catch (error: any) {
    console.error('Error in GET /api/notion/expenses:', error.message)

    // Tratar erros conhecidos
    if (error.message.includes('does not have a Notion connection')) {
      return NextResponse.json(
        { 
          error: 'Not Found', 
          message: 'User does not have a Notion connection. Please connect Notion first.' 
        },
        { status: 404 }
      )
    }

    if (error.message.includes('has not configured an expenses database')) {
      return NextResponse.json(
        { 
          error: 'Not Found', 
          message: 'User has not configured an expenses database' 
        },
        { status: 404 }
      )
    }

    // Erro genérico (falha na integração com Notion, etc.)
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        message: 'Failed to fetch expenses' 
      },
      { status: 500 }
    )
  }
}


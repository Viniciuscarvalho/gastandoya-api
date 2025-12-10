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
    console.log('🚀 [expenses] Starting request...')
    
    // 1. Validar x-api-key
    const apiKey = request.headers.get('x-api-key')
    
    if (!apiKey || apiKey !== config.app.apiKey) {
      console.error('❌ Unauthorized: Invalid or missing x-api-key')
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or missing x-api-key' },
        { status: 401 }
      )
    }
    console.log('✅ [expenses] API key validated')

    // 2. Extrair userId
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      console.error('❌ [expenses] Missing x-user-id header')
      return NextResponse.json(
        { error: 'Bad Request', message: 'Missing x-user-id header' },
        { status: 400 }
      )
    }
    console.log('✅ [expenses] userId:', userId)

    // 3. Buscar despesas do Notion
    console.log('📊 [expenses] Calling notionExpensesService.fetchExpensesForUser...')
    const expenses = await notionExpensesService.fetchExpensesForUser(userId)
    console.log('✅ [expenses] Expenses fetched successfully, count:', expenses.length)

    // 4. Retornar sucesso
    return NextResponse.json(expenses, { status: 200 })
  } catch (error: any) {
    console.error('❌ [expenses] Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    })

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

    if (error.message.includes('NOTION_DATABASE_NOT_FOUND')) {
      return NextResponse.json(
        {
          error: 'Notion database not found',
          message:
            'Notion could not find the configured database. Check that the database ID is correct and that it is shared with the GastandoYa integration.',
        },
        { status: 404 },
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


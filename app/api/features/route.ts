import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'
import { getFeatureFlags } from '@/lib/features'

// Força renderização dinâmica (necessário para headers)
export const dynamic = 'force-dynamic'

/**
 * GET /api/features
 *
 * Retorna o estado das feature flags globais para o app iOS.
 *
 * Headers obrigatórios:
 * - x-api-key: Token de autenticação do app iOS (APP_API_KEY)
 *
 * Respostas:
 * - 200: Objeto de feature flags em JSON
 * - 401: x-api-key inválido ou ausente
 * - 500: Erro interno ao carregar as feature flags
 */
export async function GET(request: NextRequest) {
  try {
    console.log('🚀 [features] Starting request...')

    // 1. Validar x-api-key
    const apiKey = request.headers.get('x-api-key')

    if (!apiKey || apiKey !== config.app.apiKey) {
      console.error('❌ [features] Unauthorized: Invalid or missing x-api-key')
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid or missing x-api-key' },
        { status: 401 },
      )
    }
    console.log('✅ [features] API key validated')

    // 2. Obter feature flags
    const featureFlags = getFeatureFlags()
    console.log('✅ [features] Feature flags loaded')

    // 3. Retornar sucesso
    return NextResponse.json(featureFlags, { status: 200 })
  } catch (error: any) {
    console.error('❌ [features] Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    })

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Failed to load feature flags',
      },
      { status: 500 },
    )
  }
}







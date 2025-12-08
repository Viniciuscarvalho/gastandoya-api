import { NextRequest, NextResponse } from 'next/server'
import { config, generateOAuthState } from '@/lib/config'

/**
 * GET /api/notion/oauth/authorize
 * 
 * Inicia o fluxo OAuth com o Notion redirecionando o usuário para a página de autorização.
 * 
 * Query params esperados:
 * - userId: ID do usuário do GastandoYa que está conectando o Notion
 * 
 * Fluxo:
 * 1. Recebe userId do app iOS
 * 2. Gera state para proteção CSRF
 * 3. Redireciona para https://api.notion.com/v1/oauth/authorize
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId parameter' },
        { status: 400 }
      )
    }

    // Gerar state para CSRF protection
    const state = generateOAuthState(userId)

    // Construir URL de autorização do Notion
    const authUrl = new URL(config.notion.authorizationUrl)
    authUrl.searchParams.append('client_id', config.notion.clientId)
    authUrl.searchParams.append('redirect_uri', config.notion.redirectUri)
    authUrl.searchParams.append('response_type', 'code')
    authUrl.searchParams.append('owner', 'user')
    authUrl.searchParams.append('state', state)

    // Redirecionar para o Notion
    return NextResponse.redirect(authUrl.toString())
  } catch (error) {
    console.error('Error in OAuth authorize:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


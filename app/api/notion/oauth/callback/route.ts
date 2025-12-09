import { NextRequest, NextResponse } from 'next/server'
import { config, validateOAuthState } from '@/lib/config'
import { getUserNotionConnectionStore } from '@/lib/userNotionConnectionStore'

// Força renderização dinâmica (necessário para searchParams)
export const dynamic = 'force-dynamic'

/**
 * Estrutura da resposta do Notion OAuth token exchange
 */
interface NotionOAuthTokenResponse {
  access_token: string
  workspace_id: string
  workspace_name?: string
  workspace_icon?: string
  bot_id: string
  owner?: {
    type: string
    user?: {
      object: string
      id: string
    }
  }
}

/**
 * GET /api/notion/oauth/callback
 * 
 * Callback do fluxo OAuth do Notion.
 * Recebe o código de autorização, valida o state, troca por access_token
 * e persiste a conexão do usuário.
 * 
 * Query params esperados (vêm do Notion):
 * - code: Código de autorização temporário
 * - state: State gerado em /authorize para validação CSRF
 * - error: (opcional) Se o usuário negou a autorização
 */
export async function GET(request: NextRequest) {
  try {
    console.log('📝 OAuth Callback called')
    console.log('URL:', request.url)
    
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    console.log('Received params:', { code: code ? 'present' : 'missing', state: state ? 'present' : 'missing', error })

    // Verificar se o usuário negou autorização
    if (error) {
      console.error('❌ OAuth authorization denied:', error)
      return NextResponse.redirect(
        `${config.app.baseUrl}/notion/error?reason=authorization_denied`
      )
    }

    // Validar parâmetros
    if (!code || !state) {
      console.warn('⚠️ Missing code or state parameter')
      return NextResponse.json(
        { error: 'Missing code or state parameter' },
        { status: 400 }
      )
    }

    // Validar state e extrair userId
    console.log('🔐 Validating state...')
    const userId = validateOAuthState(state)
    if (!userId) {
      console.error('❌ Invalid or expired state')
      return NextResponse.json(
        { error: 'Invalid or expired state' },
        { status: 400 }
      )
    }

    console.log('✅ State validated, userId:', userId)

    // Trocar código por access_token
    console.log('🔄 Exchanging code for token...')
    const tokenResponse = await exchangeCodeForToken(code)
    console.log('✅ Token received from Notion')

    // Persistir conexão
    console.log('💾 Saving connection to store...')
    const store = getUserNotionConnectionStore()
    await store.saveOrUpdate({
      userId,
      accessToken: tokenResponse.access_token,
      workspaceId: tokenResponse.workspace_id,
      expensesDatabaseId: undefined, // Será configurado posteriormente
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log(`✅ Notion connection created for user ${userId}`)

    // Redirecionar para página de sucesso
    const successUrl = `${config.app.baseUrl}/notion/success?userId=${encodeURIComponent(userId)}`
    console.log('🔀 Redirecting to:', successUrl)
    
    return NextResponse.redirect(successUrl)
  } catch (error) {
    console.error('❌ Error in OAuth callback:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Stack:', error instanceof Error ? error.stack : '')
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}

/**
 * Troca o código de autorização por um access_token do Notion.
 * Faz uma requisição POST para o endpoint de token do Notion.
 */
async function exchangeCodeForToken(code: string): Promise<NotionOAuthTokenResponse> {
  const { clientId, clientSecret, redirectUri, tokenUrl } = config.notion

  // O Notion requer Basic Auth: base64(client_id:client_secret)
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to exchange code for token: ${response.status} ${errorText}`)
  }

  const data = await response.json() as NotionOAuthTokenResponse
  return data
}


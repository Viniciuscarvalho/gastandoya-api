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
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')

    // Verificar se o usuário negou autorização
    if (error) {
      console.error('OAuth authorization denied:', error)
      return NextResponse.redirect(
        `${config.app.baseUrl}/notion/error?reason=authorization_denied`
      )
    }

    // Validar parâmetros
    if (!code || !state) {
      return NextResponse.json(
        { error: 'Missing code or state parameter' },
        { status: 400 }
      )
    }

    // Validar state e extrair userId
    const userId = validateOAuthState(state)
    if (!userId) {
      return NextResponse.json(
        { error: 'Invalid or expired state' },
        { status: 400 }
      )
    }

    // Trocar código por access_token
    const tokenResponse = await exchangeCodeForToken(code)

    // Persistir conexão
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
    // Em produção, isso seria uma deep link pro app iOS
    return NextResponse.redirect(
      `${config.app.baseUrl}/notion/success?userId=${userId}`
    )
  } catch (error) {
    console.error('Error in OAuth callback:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json(
      { error: 'Internal server error' },
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


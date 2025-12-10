/**
 * Configuração centralizada das variáveis de ambiente.
 * Valida e expõe as env vars necessárias para a integração com o Notion.
 */

function getEnvVar(name: string, required: boolean = true): string {
  const value = process.env[name]
  if (required && !value) {
    throw new Error(`Environment variable ${name} is required but not set`)
  }
  return value || ''
}

// Log env vars para debug (será removido depois)
console.log('🔧 Config initialization:')
console.log('  - APP_API_KEY exists:', !!process.env.APP_API_KEY)
console.log('  - APP_API_KEY length:', process.env.APP_API_KEY?.length || 0)
console.log('  - APP_API_KEY value (first 5 chars):', process.env.APP_API_KEY?.substring(0, 5) || 'undefined')
console.log('  - REDIS_URL exists:', !!process.env.REDIS_URL)
console.log('  - NOTION_CLIENT_ID exists:', !!process.env.NOTION_CLIENT_ID)

export const config = {
  notion: {
    clientId: getEnvVar('NOTION_CLIENT_ID'),
    clientSecret: getEnvVar('NOTION_CLIENT_SECRET'),
    redirectUri: getEnvVar('NOTION_REDIRECT_URI'),
    apiVersion: getEnvVar('NOTION_API_VERSION', false) || '2022-06-28',
    authorizationUrl: 'https://api.notion.com/v1/oauth/authorize',
    tokenUrl: 'https://api.notion.com/v1/oauth/token',
  },
  app: {
    apiKey: getEnvVar('APP_API_KEY'),
    baseUrl: getEnvVar('NEXT_PUBLIC_BASE_URL', false) || 'http://localhost:3000',
  },
} as const

/**
 * Gera um state aleatório para proteção CSRF no fluxo OAuth.
 * Em produção, considere usar tokens JWT ou armazenar em sessão/cache.
 */
export function generateOAuthState(userId: string): string {
  const randomPart = Math.random().toString(36).substring(2, 15)
  const timestamp = Date.now().toString(36)
  // Formato simples: userId:timestamp:random
  // Em produção, considere assinar ou criptografar esse state
  return `${userId}:${timestamp}:${randomPart}`
}

/**
 * Valida e extrai o userId de um state OAuth.
 * @returns userId se válido, null caso contrário
 */
export function validateOAuthState(state: string): string | null {
  try {
    const parts = state.split(':')
    if (parts.length !== 3) return null
    
    const userId = parts[0]
    const timestamp = parseInt(parts[1], 36)
    
    // Validar que não é muito antigo (ex: 10 minutos)
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000
    if (timestamp < tenMinutesAgo) return null
    
    return userId
  } catch {
    return null
  }
}










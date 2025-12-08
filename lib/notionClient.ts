import { Client } from '@notionhq/client'
import { config } from './config'

/**
 * Cria uma instância do client Notion com um access_token específico.
 * 
 * @param accessToken - Token OAuth do usuário para autenticação
 * @returns Cliente Notion autenticado
 */
export function createNotionClient(accessToken: string): Client {
  return new Client({
    auth: accessToken,
    notionVersion: config.notion.apiVersion,
    logLevel: process.env.NODE_ENV === 'development' ? 'warn' : 'error',
  })
}

/**
 * Tipo auxiliar para as propriedades de uma página do Notion.
 * Simplifica o trabalho com tipos complexos do SDK.
 */
export type NotionPageProperties = Record<string, any>


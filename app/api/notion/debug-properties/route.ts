import { NextRequest, NextResponse } from 'next/server'
import { config } from '@/lib/config'
import { getUserNotionConnectionStore } from '@/lib/userNotionConnectionStore'
import { createNotionClient } from '@/lib/notionClient'

export const dynamic = 'force-dynamic'

/**
 * GET /api/notion/debug-properties
 * 
 * Mostra a estrutura real das propriedades do database de expenses
 * para ajustar o parser corretamente.
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Validar x-api-key
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey || apiKey !== config.app.apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Extrair userId
    const userId = request.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Missing x-user-id header' }, { status: 400 })
    }

    // 3. Buscar conexão
    const store = getUserNotionConnectionStore()
    const connection = await store.getByUserId(userId)

    if (!connection || !connection.expensesDatabaseId) {
      return NextResponse.json(
        { error: 'No database configured' },
        { status: 404 }
      )
    }

    const notion = createNotionClient(connection.accessToken)

    // 4. Buscar informações do database
    console.log('📊 [debug-properties] Retrieving database schema...')
    const database = await notion.databases.retrieve({
      database_id: connection.expensesDatabaseId,
    })

    // 5. Buscar algumas páginas de exemplo
    console.log('📄 [debug-properties] Querying sample pages...')
    const queryResponse = await notion.databases.query({
      database_id: connection.expensesDatabaseId,
      page_size: 3, // Apenas 3 páginas de exemplo
    })

    const result: any = {
      databaseId: connection.expensesDatabaseId,
      databaseTitle: (database as any).title?.[0]?.plain_text || 'Untitled',
      propertySchema: {},
      samplePages: [],
    }

    // 6. Extrair schema das propriedades
    const properties = (database as any).properties || {}
    for (const [key, prop] of Object.entries(properties)) {
      result.propertySchema[key] = {
        type: (prop as any).type,
        id: (prop as any).id,
      }
    }

    // 7. Extrair dados das páginas de exemplo
    for (const page of queryResponse.results) {
      const pageData: any = {
        id: page.id,
        properties: {},
      }

      const pageProperties = (page as any).properties || {}
      for (const [key, prop] of Object.entries(pageProperties)) {
        const propData: any = {
          type: (prop as any).type,
        }

        // Extrair valor de acordo com o tipo
        switch ((prop as any).type) {
          case 'title':
            propData.value = (prop as any).title?.map((t: any) => t.plain_text).join('') || null
            break
          case 'rich_text':
            propData.value = (prop as any).rich_text?.map((t: any) => t.plain_text).join('') || null
            break
          case 'number':
            propData.value = (prop as any).number
            break
          case 'select':
            propData.value = (prop as any).select?.name || null
            break
          case 'multi_select':
            propData.value = (prop as any).multi_select?.map((s: any) => s.name) || []
            break
          case 'date':
            propData.value = (prop as any).date?.start || null
            break
          case 'checkbox':
            propData.value = (prop as any).checkbox
            break
          case 'url':
            propData.value = (prop as any).url
            break
          case 'email':
            propData.value = (prop as any).email
            break
          case 'phone_number':
            propData.value = (prop as any).phone_number
            break
          case 'formula':
            propData.value = (prop as any).formula
            break
          case 'relation':
            propData.value = (prop as any).relation?.map((r: any) => r.id) || []
            break
          case 'rollup':
            propData.value = (prop as any).rollup
            break
          case 'people':
            propData.value = (prop as any).people?.map((p: any) => p.name) || []
            break
          case 'files':
            propData.value = (prop as any).files?.map((f: any) => f.name) || []
            break
          case 'created_time':
            propData.value = (prop as any).created_time
            break
          case 'created_by':
            propData.value = (prop as any).created_by?.name || null
            break
          case 'last_edited_time':
            propData.value = (prop as any).last_edited_time
            break
          case 'last_edited_by':
            propData.value = (prop as any).last_edited_by?.name || null
            break
          default:
            propData.value = 'Unknown type'
        }

        pageData.properties[key] = propData
      }

      result.samplePages.push(pageData)
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.error('❌ [debug-properties] Error:', error)
    return NextResponse.json(
      { error: 'Internal error', message: error.message },
      { status: 500 }
    )
  }
}


/**
 * Testes unitários para NotionDatabaseDiscoveryService
 * 
 * Mockamos o Notion client para evitar chamadas reais à API.
 */

import { getUserNotionConnectionStore } from '@/lib/userNotionConnectionStore'
import type { UserNotionConnection } from '@/lib/types'
import { NotionDatabaseDiscoveryService } from '@/lib/notionDatabaseDiscoveryService'
import { Client } from '@notionhq/client'

// Mock do módulo notionClient
jest.mock('@/lib/notionClient', () => ({
  createNotionClient: jest.fn(),
}))

// Mock do Notion SDK
jest.mock('@notionhq/client', () => ({
  Client: jest.fn(),
  isFullBlock: jest.fn((block: any) => {
    // Mock simples: retorna true se o bloco tem object === 'block'
    return block?.object === 'block'
  }),
}))

const mockNotionClient = Client as jest.MockedClass<typeof Client>

describe('NotionDatabaseDiscoveryService', () => {
  let store: ReturnType<typeof getUserNotionConnectionStore>
  let discovery: NotionDatabaseDiscoveryService
  let mockBlocksChildrenList: jest.Mock
  let mockDatabasesRetrieve: jest.Mock
  let mockSearch: jest.Mock

  const testUserId = 'test-user-discovery'
  const testConnection: UserNotionConnection = {
    userId: testUserId,
    accessToken: 'secret_token_discovery',
    workspaceId: 'workspace-test',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()
    
    store = getUserNotionConnectionStore()
    await store.saveOrUpdate(testConnection)

    discovery = new NotionDatabaseDiscoveryService()

    // Setup mocks para o Notion client
    mockBlocksChildrenList = jest.fn()
    mockDatabasesRetrieve = jest.fn()
    mockSearch = jest.fn()

    const mockNotionInstance = {
      blocks: {
        children: {
          list: mockBlocksChildrenList,
        },
      },
      databases: {
        retrieve: mockDatabasesRetrieve,
      },
      search: mockSearch,
    }

    const { createNotionClient } = require('@/lib/notionClient')
    createNotionClient.mockReturnValue(mockNotionInstance)
  })

  afterEach(async () => {
    await store.delete(testUserId)
  })

  describe('findDatabasesInPageForUser', () => {
    it('deve retornar lista vazia quando nenhum child_database for encontrado', async () => {
      mockBlocksChildrenList.mockResolvedValue({
        results: [
          { 
            object: 'block',
            type: 'paragraph', 
            id: 'block-1',
            created_time: '2024-01-01T00:00:00.000Z',
            last_edited_time: '2024-01-01T00:00:00.000Z',
            paragraph: { rich_text: [] }
          },
          { 
            object: 'block',
            type: 'heading_1', 
            id: 'block-2',
            created_time: '2024-01-01T00:00:00.000Z',
            last_edited_time: '2024-01-01T00:00:00.000Z',
            heading_1: { rich_text: [] }
          },
        ],
        has_more: false,
        next_cursor: null,
      })

      const result = await discovery.findDatabasesInPageForUser(testUserId, 'page-123')

      expect(result).toEqual([])
      expect(mockBlocksChildrenList).toHaveBeenCalledTimes(1)
      expect(mockBlocksChildrenList).toHaveBeenCalledWith({
        block_id: 'page123', // normalizado (sem hifens)
        page_size: 100,
        start_cursor: undefined,
      })
    })

    it('deve encontrar um child_database e retornar com título', async () => {
      const databaseId = 'db-abc123'
      
      mockBlocksChildrenList.mockResolvedValue({
        results: [
          { 
            object: 'block',
            type: 'paragraph', 
            id: 'block-1',
            created_time: '2024-01-01T00:00:00.000Z',
            last_edited_time: '2024-01-01T00:00:00.000Z',
            paragraph: { rich_text: [] }
          },
          { 
            object: 'block',
            type: 'child_database', 
            id: databaseId,
            created_time: '2024-01-01T00:00:00.000Z',
            last_edited_time: '2024-01-01T00:00:00.000Z',
            child_database: { title: 'Despesas 2024' }
          },
        ],
        has_more: false,
        next_cursor: null,
      })

      mockDatabasesRetrieve.mockResolvedValue({
        id: databaseId,
        title: [{ plain_text: 'Despesas 2024' }],
        url: 'https://notion.so/db-abc123',
      })

      const result = await discovery.findDatabasesInPageForUser(testUserId, 'page-123')

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({
        id: 'dbabc123', // normalizado (sem hifens)
        title: 'Despesas 2024',
        source: 'page_blocks',
        pageId: 'page123', // normalizado (sem hifens)
      })
      expect(mockDatabasesRetrieve).toHaveBeenCalledWith({
        database_id: 'dbabc123', // normalizado
      })
    })

    it('deve encontrar múltiplos child_databases', async () => {
      const db1 = 'db-111'
      const db2 = 'db-222'

      mockBlocksChildrenList.mockResolvedValue({
        results: [
          { 
            object: 'block',
            type: 'child_database', 
            id: db1,
            created_time: '2024-01-01T00:00:00.000Z',
            last_edited_time: '2024-01-01T00:00:00.000Z',
            child_database: { title: 'Database 1' }
          },
          { 
            object: 'block',
            type: 'paragraph', 
            id: 'block-x',
            created_time: '2024-01-01T00:00:00.000Z',
            last_edited_time: '2024-01-01T00:00:00.000Z',
            paragraph: { rich_text: [] }
          },
          { 
            object: 'block',
            type: 'child_database', 
            id: db2,
            created_time: '2024-01-01T00:00:00.000Z',
            last_edited_time: '2024-01-01T00:00:00.000Z',
            child_database: { title: 'Database 2' }
          },
        ],
        has_more: false,
        next_cursor: null,
      })

      mockDatabasesRetrieve
        .mockResolvedValueOnce({
          id: db1,
          title: [{ plain_text: 'Database 1' }],
        })
        .mockResolvedValueOnce({
          id: db2,
          title: [{ plain_text: 'Database 2' }],
        })

      const result = await discovery.findDatabasesInPageForUser(testUserId, 'page-multi')

      expect(result).toHaveLength(2)
      expect(result[0].title).toBe('Database 1')
      expect(result[1].title).toBe('Database 2')
    })

    it('deve seguir paginação (next_cursor) até concluir', async () => {
      mockBlocksChildrenList
        .mockResolvedValueOnce({
          results: [
            { 
              object: 'block',
              type: 'paragraph', 
              id: 'block-1',
              created_time: '2024-01-01T00:00:00.000Z',
              last_edited_time: '2024-01-01T00:00:00.000Z',
              paragraph: { rich_text: [] }
            },
            { 
              object: 'block',
              type: 'child_database', 
              id: 'db-page1',
              created_time: '2024-01-01T00:00:00.000Z',
              last_edited_time: '2024-01-01T00:00:00.000Z',
              child_database: { title: 'DB 1' }
            },
          ],
          has_more: true,
          next_cursor: 'cursor-abc',
        })
        .mockResolvedValueOnce({
          results: [
            { 
              object: 'block',
              type: 'child_database', 
              id: 'db-page2',
              created_time: '2024-01-01T00:00:00.000Z',
              last_edited_time: '2024-01-01T00:00:00.000Z',
              child_database: { title: 'DB 2' }
            },
          ],
          has_more: false,
          next_cursor: null,
        })

      mockDatabasesRetrieve
        .mockResolvedValueOnce({
          id: 'db-page1',
          title: [{ plain_text: 'DB Página 1' }],
        })
        .mockResolvedValueOnce({
          id: 'db-page2',
          title: [{ plain_text: 'DB Página 2' }],
        })

      const result = await discovery.findDatabasesInPageForUser(testUserId, 'page-paginated')

      expect(result).toHaveLength(2)
      expect(mockBlocksChildrenList).toHaveBeenCalledTimes(2)
      expect(mockBlocksChildrenList).toHaveBeenNthCalledWith(1, {
        block_id: 'pagepaginated', // normalizado
        page_size: 100,
        start_cursor: undefined,
      })
      expect(mockBlocksChildrenList).toHaveBeenNthCalledWith(2, {
        block_id: 'pagepaginated', // normalizado
        page_size: 100,
        start_cursor: 'cursor-abc',
      })
    })

    it('deve suportar link_to_page quando apontar para database', async () => {
      mockBlocksChildrenList.mockResolvedValue({
        results: [
          {
            object: 'block',
            type: 'link_to_page',
            id: 'link-1',
            created_time: '2024-01-01T00:00:00.000Z',
            last_edited_time: '2024-01-01T00:00:00.000Z',
            link_to_page: {
              type: 'database_id',
              database_id: 'db-linked',
            },
          },
        ],
        has_more: false,
        next_cursor: null,
      })

      mockDatabasesRetrieve.mockResolvedValue({
        id: 'db-linked',
        title: [{ plain_text: 'Database Linkado' }],
      })

      const result = await discovery.findDatabasesInPageForUser(testUserId, 'page-link')

      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('dblinked') // normalizado
      expect(result[0].title).toBe('Database Linkado')
    })

    it('deve lidar com erro quando database não for acessível', async () => {
      mockBlocksChildrenList.mockResolvedValue({
        results: [
          { 
            object: 'block',
            type: 'child_database', 
            id: 'db-forbidden',
            created_time: '2024-01-01T00:00:00.000Z',
            last_edited_time: '2024-01-01T00:00:00.000Z',
            child_database: { title: 'Forbidden DB' }
          },
        ],
        has_more: false,
        next_cursor: null,
      })

      mockDatabasesRetrieve.mockRejectedValue({
        code: 'object_not_found',
        message: 'Database not found',
      })

      const result = await discovery.findDatabasesInPageForUser(testUserId, 'page-error')

      // Deve retornar o database com título de fallback ao invés de falhar
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('dbforbidden')
      expect(result[0].title).toBe('Database (não foi possível ler título)')
      expect(result[0].source).toBe('page_blocks')
    })

    it('deve lançar erro quando usuário não possui conexão Notion', async () => {
      await expect(
        discovery.findDatabasesInPageForUser('user-inexistente', 'page-123')
      ).rejects.toThrow(/does not have a Notion connection/)
    })
  })

  describe('searchDatabasesForUser', () => {
    it('deve buscar databases por nome usando Search API', async () => {
      mockSearch.mockResolvedValue({
        results: [
          {
            object: 'database',
            id: 'db-search-1',
            title: [{ plain_text: 'GASTOS' }],
            url: 'https://notion.so/db-search-1',
          },
          {
            object: 'database',
            id: 'db-search-2',
            title: [{ plain_text: 'Gastos Pessoais' }],
            url: 'https://notion.so/db-search-2',
          },
        ],
        has_more: false,
      })

      const result = await discovery.searchDatabasesForUser(testUserId, 'GASTOS')

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        id: 'dbsearch1', // normalizado
        title: 'GASTOS',
        source: 'search',
      })
      expect(result[1]).toEqual({
        id: 'dbsearch2', // normalizado
        title: 'Gastos Pessoais',
        source: 'search',
      })
      expect(mockSearch).toHaveBeenCalledWith({
        query: 'GASTOS',
        filter: {
          property: 'object',
          value: 'database',
        },
        page_size: 50,
      })
    })

    it('deve retornar lista vazia quando nenhum database for encontrado', async () => {
      mockSearch.mockResolvedValue({
        results: [],
        has_more: false,
      })

      const result = await discovery.searchDatabasesForUser(testUserId, 'query-inexistente')

      expect(result).toEqual([])
    })

    it('deve lidar com título vazio em databases', async () => {
      mockSearch.mockResolvedValue({
        results: [
          {
            object: 'database',
            id: 'db-no-title',
            title: [],
            url: 'https://notion.so/db-no-title',
          },
        ],
        has_more: false,
      })

      const result = await discovery.searchDatabasesForUser(testUserId, 'test')

      expect(result[0].title).toBe('Database (sem título)')
    })

    it('deve lançar erro quando usuário não possui conexão Notion', async () => {
      await expect(
        discovery.searchDatabasesForUser('user-inexistente', 'query')
      ).rejects.toThrow(/does not have a Notion connection/)
    })
  })
})


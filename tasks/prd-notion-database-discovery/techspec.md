# Template de Especificação Técnica

## Resumo Executivo

Adicionar uma camada de **descoberta de database do Notion** para o GastandoYa, permitindo encontrar automaticamente `database_id` quando um database está **dentro de uma página** (inline) e também oferecer busca por nome via **Search API**. A solução introduz um serviço dedicado (ex.: `NotionDatabaseDiscoveryService`) e novos/ajustados endpoints para listar e configurar databases de despesas, seguindo o token OAuth do usuário (multi-tenant).

## Arquitetura do Sistema

### Visão Geral dos Componentes

- **NotionDatabaseDiscoveryService (novo)**
  - Responsável por:
    - Descobrir databases dentro de uma página via `blocks.children.list`
    - (Opcional) Resolver `link_to_page` para databases
    - Buscar databases por nome via `search`
  - Retorna candidatos normalizados (`id`, `title`, `source`).

- **API Routes (Next.js App Router)**
  - Novo endpoint para listar databases:
    - `GET /api/notion/databases/list` (proposto)
  - Atualizar endpoint existente de configuração do database:
    - `POST /api/notion/config/database` para aceitar `pageId` (descoberta automática) e/ou `databaseId` (manual).

- **UserNotionConnectionStore (existente)**
  - Persistirá `expensesDatabaseId` validado/descoberto.

## Design de Implementação

### Interfaces Principais

```go
// Pseudo-interface (TypeScript) para guiar implementação
type NotionDatabaseDiscoveryService interface {
  FindDatabasesInPage(userId, pageId) -> []DatabaseCandidate
  SearchDatabases(userId, query) -> []DatabaseCandidate
  ResolveExpensesDatabaseId(input) -> databaseId
}
```

### Modelos de Dados

- `DatabaseCandidate`
  - `id: string` (database_id normalizado)
  - `title: string` (título do database)
  - `source: 'page_blocks' | 'search'`
  - `pageId?: string` (se aplicável)

- `ListDatabasesResponse`
  - `databases: DatabaseCandidate[]`
  - `nextCursor?: string` (se expor paginação ao cliente)

### Endpoints de API

1) `GET /api/notion/databases/list`
- **Query params** (proposto):
  - `pageId?: string` (quando presente, roda discovery via Blocks API)
  - `q?: string` (quando presente, roda Search API)
- **Resposta**:
  - `200 { databases: DatabaseCandidate[] }`
  - `400` se faltar parâmetros e o endpoint exigir pelo menos um
  - `401` se falhar autenticação (`x-api-key` / `x-user-id`) ou não houver conexão Notion

2) `POST /api/notion/config/database` (existente)
- **Body** (novo contrato proposto):
  - `databaseId?: string`
  - `pageId?: string`
  - `databaseName?: string` (opcional, para search fallback)
- **Regra**:
  - Se `databaseId` presente → validar e salvar
  - Senão se `pageId` presente → descobrir databases na página
    - Se 1 encontrado → salvar
    - Se 0 → erro “not found”
    - Se >1 → erro “multiple found” + retornar lista para escolha
  - (Opcional) Senão se `databaseName` presente → search

### Algoritmo: descobrir database dentro de página (Blocks API)

Entrada: `pageId`

1. Chamar `GET /v1/blocks/{pageId}/children`
2. Iterar resultados:
   - Se `type === 'child_database'` → coletar `block.id` como `database_id`
   - Se `type === 'link_to_page'`:
     - Se apontar para `database` → coletar o id do target (quando disponível)
     - Caso contrário, ignorar (ou opcionalmente recursivo)
3. Se `has_more === true` e `next_cursor` existe → continuar até terminar
4. Para cada `database_id` candidato:
   - Buscar título do database (ex.: `notion.databases.retrieve`) para exibir ao usuário
5. Retornar lista final

Observação: a chamada é paginada. É obrigatório seguir `next_cursor`.

### Algoritmo: Search API por nome

Entrada: `query` (ex.: “GASTOS”)

1. `POST /v1/search` com:
   - `query`
   - `filter: { value: 'database', property: 'object' }`
2. Mapear resultados para `DatabaseCandidate`
3. (Opcional) Normalizar e deduplicar

## Pontos de Integração

- **Notion API**
  - `GET /v1/blocks/{block_id}/children`
  - `POST /v1/search`
  - `GET /v1/databases/{database_id}` (para título/validação)
  - `POST /v1/databases/{database_id}/query` (já existe no fluxo)

## Abordagem de Testes

### Testes Unitários

- `FindDatabasesInPage`:
  - paginação (next_cursor)
  - encontra `child_database`
  - nenhum encontrado
  - múltiplos encontrados
- `SearchDatabases`:
  - filtra somente databases
  - retorna títulos corretamente
- Endpoint `POST /api/notion/config/database`:
  - aceita `pageId` e salva quando 1 db encontrado
  - retorna erro e lista quando múltiplos

Mocks:
- Mock do Notion client (responses para blocks/search/retrieve)

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. Criar `NotionDatabaseDiscoveryService` (blocks + paginação + retrieve título)
2. Implementar Search API e normalização
3. Criar `GET /api/notion/databases/list`
4. Atualizar `POST /api/notion/config/database` com novo contrato e fallback
5. Testes + docs

### Dependências Técnicas

- Acesso aos endpoints do Notion via `@notionhq/client`
- Conexão Notion existente salva no `UserNotionConnectionStore`

## Considerações Técnicas

### Decisões Principais

- Preferir **Blocks API** para inline database dentro de página (fonte de verdade).
- Usar **Search** como alternativa quando houver nome conhecido do database.
- Em caso de múltiplos resultados, retornar lista para escolha do cliente.

### Riscos Conhecidos

- `link_to_page` pode apontar para páginas e não para databases.
  - Mitigação: suportar `child_database` primeiro; adicionar suporte incremental.
- Páginas grandes com muitos blocos:
  - Mitigação: paginação e limites; evitar recursão profunda no primeiro release.

### Requisitos Especiais

- Logs não devem incluir tokens.
- Respostas de erro devem ser acionáveis para UX no app iOS.

### Conformidade com Padrões

- Seguir templates do repositório em `tasks/` e padrões de rotas em `app/api/notion/*`.

### Arquivos relevantes

- `lib/notionClient.ts`
- `lib/notionExpensesService.ts`
- `lib/types.ts`
- `app/api/notion/config/database/route.ts`
- (a criar) `lib/notionDatabaseDiscoveryService.ts`
- (a criar) `app/api/notion/databases/list/route.ts`
- `tasks/prd-notion-database-discovery/prd.md`
- `tasks/prd-notion-database-discovery/techspec.md`





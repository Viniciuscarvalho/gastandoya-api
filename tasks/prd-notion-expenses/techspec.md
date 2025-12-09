# Especificação Técnica – Integração Notion Expenses (GastandoYa)

## Resumo Executivo

Esta Tech Spec descreve a arquitetura técnica da integração entre o app iOS GastandoYa e o Notion para leitura de despesas por usuário.  
A solução consiste em um backend Next.js (App Router) hospedado na Vercel, que expõe rotas para:
- Conectar a conta do Notion via OAuth.
- Configurar/armazenar o `database_id` de despesas por usuário.
- Ler o database de despesas com o SDK oficial `@notionhq/client` e converter os resultados para o contrato `ExpenseDTO`.

Cada usuário terá um vínculo próprio com o Notion (multi-tenant), armazenando `access_token` e `database_id` em um storage seguro. O app iOS chama `GET /api/notion/expenses` com um `x-api-key` de aplicação, e o backend resolve o usuário, faz a query ao Notion e retorna uma lista de despesas normalizada.

## Arquitetura do Sistema

### Visão Geral dos Componentes

- `Next.js API (App Router)`  
  - Responsável pelas rotas HTTP:
    - `GET /api/notion/expenses` – retorna a lista de despesas em formato `ExpenseDTO[]`.
    - `GET /api/notion/oauth/authorize` – inicia o fluxo OAuth com Notion (redirecionamento).
    - `GET /api/notion/oauth/callback` – finaliza o fluxo OAuth, troca o `code` por `access_token` e persiste.
- `NotionService` (módulo de integração):
  - Encapsula o client `@notionhq/client`.
  - Implementa leitura de database via `databases.query` com paginação.
  - Fornece função de alto nível `fetchExpensesForUser(userId)` que retorna `ExpenseDTO[]`.
- `UserNotionConnectionStore` (abstração de storage):
  - Interface para armazenar e ler `access_token`, `workspace_id` e `expensesDatabaseId` por usuário.
  - Implementação inicial pode ser em memória ou stub; a intenção é plugar em um banco real (ex.: Postgres/Prisma).
- `Camada de DTO/Transformação`:
  - Funções puras que convertem os objetos de página do Notion no contrato `ExpenseDTO`.

Fluxo de dados (alto nível):
1. App iOS → `GET /api/notion/expenses` (com `x-api-key` e identificação de usuário).
2. Route handler → valida `x-api-key`, resolve o usuário e busca seu vínculo Notion.
3. `NotionService` → consulta `POST /v1/databases/{database_id}/query` via SDK.
4. Transformação → `NotionPage` → `ExpenseDTO`.
5. Resposta JSON → app iOS persiste em SwiftData.

## Design de Implementação

### Interfaces Principais

#### Serviço de conexão Notion por usuário

```ts
// Representa o vínculo de um usuário do GastandoYa com o Notion
export interface UserNotionConnection {
  userId: string
  accessToken: string
  workspaceId: string
  expensesDatabaseId: string
  createdAt: Date
  updatedAt: Date
}

export interface UserNotionConnectionStore {
  getByUserId(userId: string): Promise<UserNotionConnection | null>
  saveOrUpdate(connection: UserNotionConnection): Promise<void>
}
```

#### Serviço de despesas do Notion

```ts
export type ExpenseDTO = {
  id: string
  description: string
  date: string
  amount: number // centavos
  currency: string // "BRL"
  category?: string
  createdAt: string
  updatedAt?: string
}

export interface NotionExpensesService {
  fetchExpensesForUser(userId: string): Promise<ExpenseDTO[]>
}
```

#### Contrato mínimo para identificação de usuário na API

Na ausência de um sistema de autenticação completo, a V1 pode identificar o usuário via header ou query param:

```ts
// Exemplo simples (pode evoluir para JWT):
const userId = req.headers.get("x-user-id") ?? req.nextUrl.searchParams.get("userId")
```

### Modelos de Dados

#### Tabela/coleção `UserNotionConnection`

Campos sugeridos:
- `userId` (string, PK lógico)
- `accessToken` (string, sensível – idealmente criptografado em repouso)
- `workspaceId` (string)
- `expensesDatabaseId` (string)
- `createdAt` (datetime)
- `updatedAt` (datetime)

Implementação concreta (ex.: Postgres + Prisma) fica a cargo da infra existente; a Tech Spec apenas define a forma do objeto.

#### Mapeamento de propriedades do Notion

Database de despesas no Notion deve conter ao menos:
- `Description` – campo `title` ou `rich_text` → `ExpenseDTO.description`
- `Date` – campo `date` → `ExpenseDTO.date`
- `Amount` – campo `number` → `ExpenseDTO.amount` (multiplicando por 100 se no Notion estiver em reais)
- `Category` – campo `select` ou `multi_select` → `ExpenseDTO.category` (nome da opção)

`currency` será sempre `"BRL"` na V1, independente de propriedade no Notion.

### Endpoints de API

- `GET /api/notion/expenses`
  - **Headers obrigatórios**:
    - `x-api-key: <APP_API_KEY>`
    - `x-user-id: <ID_USUARIO>` (ou similar; pode evoluir para JWT/Session)
  - **Query params opcionais**:
    - `fromDate` / `toDate` (ISO string) – para limitar período.
    - `limit` – máximo de registros (ex.: até 500).
  - **Resposta (200)**:
    - Body: `ExpenseDTO[]`.
  - **Erros**:
    - `401` – `x-api-key` ausente/inválido.
    - `404` – usuário sem conexão Notion configurada.
    - `502` – erro ao falar com Notion (problema transitório).

- `GET /api/notion/oauth/authorize`
  - Gera a URL de autorização do Notion e redireciona o usuário para:
    - `https://api.notion.com/v1/oauth/authorize?client_id=...&redirect_uri=...&response_type=code&owner=user&state=<state>`
  - Inclui `state` para proteção CSRF e associação com o usuário do GastandoYa.

- `GET /api/notion/oauth/callback`
  - Recebe `code` e `state`.
  - Valida `state`.
  - Chama `POST https://api.notion.com/v1/oauth/token` com:
    - `grant_type=authorization_code`
    - `code`, `redirect_uri`, `client_id`, `client_secret`.
  - Persiste `access_token`, `workspace_id` e dados necessários em `UserNotionConnectionStore`.

## Pontos de Integração

- **Notion API – OAuth**
  - Endpoint: `POST https://api.notion.com/v1/oauth/token`
  - Autenticação: `Basic` com `client_id` e `client_secret` ou corpo conforme docs oficiais [`https://developers.notion.com/reference/intro`].

- **Notion API – Databases**
  - Endpoint: `POST https://api.notion.com/v1/databases/{database_id}/query`
  - Autenticação: Bearer `<access_token>` retornado no OAuth.
  - Versão da API: header `Notion-Version: ${process.env.NOTION_API_VERSION}` (ex.: `2022-06-28`).

## Abordagem de Testes

### Testes Unitários

- Funções de transformação `notionPageToExpenseDTO(page)`.
- Serviço `NotionExpensesService` usando mocks do client `@notionhq/client` para simular respostas paginadas.
- Validação de headers (`x-api-key`, `x-user-id`) nos route handlers.

### Testes de Integração

- Chamada de `GET /api/notion/expenses` com store e client do Notion mockados (ou test double) para verificar:
  - Erros 401, 404, 502.
  - Resposta 200 com payload em conformidade com `ExpenseDTO`.

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **Definição de modelos e contratos**  
   - Tipos `ExpenseDTO`, `UserNotionConnection` e interface `UserNotionConnectionStore`.  
   - Facilita mocks e testes.
2. **Implementação das rotas OAuth (`/authorize` e `/callback`)**  
   - Permite conectar o Notion e validar fluxo end-to-end com um usuário.
3. **Implementação do `NotionExpensesService`**  
   - Encapsula a query de database e paginação.
4. **Implementação de `GET /api/notion/expenses`**  
   - Integra validação de segurança + serviço de despesas.
5. **Testes unitários e de integração**  
   - Garantir estabilidade do contrato antes do deploy.
6. **Ajustes finais e deploy na Vercel**.

### Dependências Técnicas

- Disponibilidade de credenciais OAuth do Notion (`NOTION_CLIENT_ID`, `NOTION_CLIENT_SECRET`, redirect URI configurada).
- Ambiente de armazenamento para `UserNotionConnection` (banco ou KV).
- Configuração de variáveis de ambiente na Vercel.

## Considerações Técnicas

### Decisões Principais

- **Uso de `@notionhq/client`** para comunicação com Notion, reduzindo boilerplate de HTTP e mantendo alinhamento com exemplos oficiais.
- **Modelo multi-tenant**: cada usuário tem seu próprio `access_token` e `database_id`, armazenados de forma isolada.
- **API protegida por `x-api-key`** como camada mínima de segurança entre app iOS e backend.
- **Normalização em `ExpenseDTO`** para desacoplar o front-end de detalhes de schema do Notion.

### Riscos Conhecidos

- Configuração incorreta do database do Notion pelo usuário (propriedades ausentes ou com tipos diferentes).
- Expiração ou revogação de tokens do Notion causando erros 401/403 na integração.
- Crescimento de volume de dados gerando chamadas paginadas mais pesadas (impacto de latência).

### Requisitos Especiais

- Performance aceitável para até ~1.000 linhas de despesas por usuário (p95 < 800 ms).
- Cuidados mínimos de segurança:
  - Nunca logar `access_token`.
  - Usar HTTPS extremo a extremo.

### Conformidade com Padrões

- Segue os templates de PRD e Tech Spec fornecidos no repositório.
- Segue a documentação oficial da Notion API e convenções de JSON e paginação descritas em [`https://developers.notion.com/reference/intro`].

### Arquivos relevantes

- `tasks/prd-notion-expenses/prd.md` – PRD desta funcionalidade.
- Arquivos a serem criados na implementação:
  - `app/api/notion/expenses/route.ts`
  - `app/api/notion/oauth/authorize/route.ts`
  - `app/api/notion/oauth/callback/route.ts`
  - `lib/notionClient.ts`
  - `lib/notionExpensesService.ts`
  - `lib/userNotionConnectionStore.ts`






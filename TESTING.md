# Manual de Teste da API GastandoYa - Notion Integration

Este guia mostra como testar manualmente a integração com o Notion.

## Pré-requisitos

1. Servidor rodando: `npm run dev`
2. Variáveis de ambiente configuradas (`.env.local`)
3. Integração OAuth criada no Notion

## Fluxo Completo de Teste

### 1. Conectar Notion (OAuth)

**Abrir no navegador:**

```
http://localhost:3000/api/notion/oauth/authorize?userId=test-user-123
```

- Você será redirecionado para o Notion
- Faça login e autorize o GastandoYa
- Após autorizar, será redirecionado de volta para a página de sucesso

### 2. Verificar Conexão (Debug)

Para verificar se a conexão foi salva, você pode adicionar uma rota de debug temporária ou checar os logs do servidor.

### 3. Criar Database de Despesas no Notion

1. Abra seu workspace no Notion
2. Crie um novo Database com as seguintes propriedades:
   - **Description** (Title) - Título da despesa
   - **Date** (Date) - Data da despesa
   - **Amount** (Number) - Valor em reais (ex: 45.90)
   - **Category** (Select, opcional) - Categoria da despesa

3. Adicione algumas linhas de exemplo:
   ```
   | Description        | Date       | Amount | Category  |
   |--------------------|------------|--------|-----------|
   | Almoço             | 2025-01-15 | 45.90  | Comida    |
   | Uber               | 2025-01-16 | 23.50  | Transporte|
   | Supermercado       | 2025-01-17 | 156.78 | Comida    |
   ```

4. Copie o ID do database (da URL):
   ```
   https://www.notion.so/workspace/abc123def456?v=...
                                   ^^^^^^^^^^^^
                                   Este é o database_id
   ```

5. **Importante**: Compartilhe o database com sua integração:
   - Clique nos `...` (três pontos) no canto superior direito do database
   - Clique em "Add connections"
   - Selecione sua integração "GastandoYa"

### 4. Descobrir Databases Automaticamente (Novo!)

#### 4a. Listar databases dentro de uma página

Se você autorizou uma **página** que contém um database inline:

**Request:**

```bash
curl -X GET "http://localhost:3000/api/notion/databases/list?pageId=abc123def456" \
  -H "x-api-key: your_secure_random_string_for_app_ios" \
  -H "x-user-id: test-user-123"
```

**Resposta esperada (200):**

```json
{
  "databases": [
    {
      "id": "db-uuid-123",
      "title": "Despesas 2024",
      "source": "page_blocks",
      "pageId": "abc123def456"
    }
  ]
}
```

#### 4b. Buscar databases por nome

Buscar databases acessíveis pela integração usando o nome:

**Request:**

```bash
curl -X GET "http://localhost:3000/api/notion/databases/list?q=GASTOS" \
  -H "x-api-key: your_secure_random_string_for_app_ios" \
  -H "x-user-id: test-user-123"
```

**Resposta esperada (200):**

```json
{
  "databases": [
    {
      "id": "db-uuid-456",
      "title": "GASTOS",
      "source": "search"
    },
    {
      "id": "db-uuid-789",
      "title": "Gastos Pessoais",
      "source": "search"
    }
  ]
}
```

### 5. Configurar Database de Despesas

#### 5a. Configuração manual (método tradicional)

**Request:**

```bash
curl -X POST http://localhost:3000/api/notion/config/database \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_secure_random_string_for_app_ios" \
  -H "x-user-id: test-user-123" \
  -d '{
    "databaseId": "abc123def456"
  }'
```

**Resposta esperada (200):**

```json
{
  "success": true,
  "message": "Expenses database configured successfully"
}
```

#### 5b. Configuração automática via pageId (recomendado!)

Quando você tem o ID de uma página que contém um database:

**Request:**

```bash
curl -X POST http://localhost:3000/api/notion/config/database \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_secure_random_string_for_app_ios" \
  -H "x-user-id: test-user-123" \
  -d '{
    "pageId": "page-uuid-123"
  }'
```

**Casos de resposta:**

1. **1 database encontrado (200)** - Configurado automaticamente:
```json
{
  "success": true,
  "message": "Expenses database configured successfully"
}
```

2. **0 databases encontrados (400)**:
```json
{
  "error": "No database found",
  "message": "No databases found in the specified page. Make sure the page contains an inline database and is shared with the GastandoYa integration."
}
```

3. **Múltiplos databases encontrados (409)** - Usuário deve escolher:
```json
{
  "error": "Multiple databases found",
  "message": "Found 2 databases in the page. Please select one.",
  "databases": [
    {
      "id": "db-1",
      "title": "Despesas 2024",
      "source": "page_blocks",
      "pageId": "page-uuid-123"
    },
    {
      "id": "db-2",
      "title": "Despesas Pessoais",
      "source": "page_blocks",
      "pageId": "page-uuid-123"
    }
  ]
}
```

### 6. Buscar Despesas

**Request:**

```bash
curl -X GET http://localhost:3000/api/notion/expenses \
  -H "x-api-key: your_secure_random_string_for_app_ios" \
  -H "x-user-id: test-user-123"
```

**Resposta esperada (200):**

```json
[
  {
    "id": "page-id-1",
    "description": "Almoço",
    "date": "2025-01-15",
    "amount": 4590,
    "currency": "BRL",
    "category": "Comida",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  },
  {
    "id": "page-id-2",
    "description": "Uber",
    "date": "2025-01-16",
    "amount": 2350,
    "currency": "BRL",
    "category": "Transporte",
    "createdAt": "2025-01-16T08:15:00.000Z",
    "updatedAt": "2025-01-16T08:15:00.000Z"
  },
  {
    "id": "page-id-3",
    "description": "Supermercado",
    "date": "2025-01-17",
    "amount": 15678,
    "currency": "BRL",
    "category": "Comida",
    "createdAt": "2025-01-17T14:45:00.000Z",
    "updatedAt": "2025-01-17T14:45:00.000Z"
  }
]
```

> **Nota**: O campo `amount` está em **centavos**. 
> Ex: R$ 45,90 = 4590 centavos

## Testar endpoint de Feature Flags (`GET /api/features`)

### 1. Sucesso (200)

```bash
curl -X GET http://localhost:3000/api/features \
  -H "x-api-key: your_secure_random_string_for_app_ios"
```

**Resposta esperada (200):**

```json
{
  "features": {
    "unlimited_categories": { "enabled": true },
    "unlimited_goals": { "enabled": true },
    "unlimited_wallets": { "enabled": true },
    "unlimited_csv_imports": { "enabled": true },
    "cloud_sync": { "enabled": true },
    "cloud_backup": { "enabled": true },
    "notion_import": { "enabled": true },
    "advanced_reports": { "enabled": true },
    "pdf_export": { "enabled": true },
    "excel_export": { "enabled": true },
    "smart_rules": { "enabled": true },
    "ai_insights": { "enabled": true },
    "premium_widgets": { "enabled": true }
  }
}
```

### 2. Erro 401 – x-api-key inválido

```bash
curl -X GET http://localhost:3000/api/features \
  -H "x-api-key: wrong-key"
```

**Resposta esperada (401):**

```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing x-api-key"
}
```

### 3. Consumo no app iOS (exemplo em Swift)

```swift
struct FeatureConfig: Decodable {
    let enabled: Bool
}

struct FeatureFlagsResponse: Decodable {
    let features: [String: FeatureConfig]
}

func fetchFeatureFlags() async throws -> FeatureFlagsResponse {
    var request = URLRequest(url: URL(string: "https://api.gastandoya.com/api/features")!)
    request.httpMethod = "GET"
    request.addValue("your_secure_random_string_for_app_ios", forHTTPHeaderField: "x-api-key")

    let (data, response) = try await URLSession.shared.data(for: request)
    guard let http = response as? HTTPURLResponse, http.statusCode == 200 else {
        throw URLError(.badServerResponse)
    }

    return try JSONDecoder().decode(FeatureFlagsResponse.self, from: data)
}
```

O app pode então verificar, por exemplo:

```swift
let flags = try await fetchFeatureFlags()
let notionImportEnabled = flags.features["notion_import"]?.enabled ?? false
```

## Testes de Erro

### 401 - x-api-key inválido

```bash
curl -X GET http://localhost:3000/api/notion/expenses \
  -H "x-api-key: wrong-key" \
  -H "x-user-id: test-user-123"
```

**Resposta esperada (401):**

```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing x-api-key"
}
```

### 404 - Usuário sem conexão Notion

```bash
curl -X GET http://localhost:3000/api/notion/expenses \
  -H "x-api-key: your_secure_random_string_for_app_ios" \
  -H "x-user-id: usuario-nao-existente"
```

**Resposta esperada (404):**

```json
{
  "error": "Not Found",
  "message": "User does not have a Notion connection. Please connect Notion first."
}
```

### 404 - Database não configurado

```bash
# Conecte um novo usuário mas NÃO configure o database
curl -X GET http://localhost:3000/api/notion/expenses \
  -H "x-api-key: your_secure_random_string_for_app_ios" \
  -H "x-user-id: novo-usuario"
```

**Resposta esperada (404):**

```json
{
  "error": "Not Found",
  "message": "User has not configured an expenses database"
}
```

## Dicas de Troubleshooting

### Nenhum database encontrado na página

Se `GET /api/notion/databases/list?pageId=...` retornar lista vazia:

1. **Verifique se você compartilhou a página com a integração**:
   - Abra a página no Notion
   - Clique em `...` (três pontos) no canto superior direito
   - Clique em "Add connections"
   - Selecione sua integração "GastandoYa"

2. **Certifique-se de que o database está inline na página**:
   - O database precisa estar **dentro** da página (não linkado externamente)
   - Você deve ver o database diretamente quando abrir a página

3. **Verifique o tipo de database**:
   - Suportamos `child_database` e `link_to_page` (quando apontar para database)
   - Databases em subpáginas aninhadas podem não ser detectados

### Database ID não é reconhecido

- Certifique-se de copiar apenas a parte alfanumérica do ID (sem hífens extras)
- Remova qualquer `?v=...` da URL
- Experimente usar o método de descoberta automática (`pageId`) ao invés de configurar manualmente

### "object not found" error do Notion

- Verifique se você compartilhou o database/página com a integração
- Vá no database → `...` → "Add connections" → Selecione sua integração
- Se estiver usando `pageId`, compartilhe a **página**, não o database individual

### Propriedades não são encontradas

- Verifique se os nomes das propriedades batem:
  - `Description` (ou `Name`, `Title`, `Título`)
  - `Date` (ou `Data`)
  - `Amount` (ou `Valor`, `Value`)
  - `Category` (ou `Categoria`) - opcional

- A função de transformação tenta vários nomes, mas prefere os em inglês

### Valores de Amount incorretos

- No Notion, insira valores em **reais** (ex: 45.90)
- A API converte automaticamente para **centavos** (ex: 4590)

## Próximos Passos

Depois de validar o fluxo manualmente:

1. Implementar testes automatizados (Tarefa 4.0)
2. Configurar deploy na Vercel (Tarefa 5.0)
3. Integrar com o app iOS usando esses endpoints













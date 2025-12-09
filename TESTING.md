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

### 4. Configurar Database de Despesas

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

### 5. Buscar Despesas

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

### Database ID não é reconhecido

- Certifique-se de copiar apenas a parte alfanumérica do ID (sem hífens extras)
- Remova qualquer `?v=...` da URL

### "object not found" error do Notion

- Verifique se você compartilhou o database com a integração
- Vá no database → `...` → "Add connections" → Selecione sua integração

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







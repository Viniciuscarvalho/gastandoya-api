# 🔧 Troubleshooting Guide - GastandoYa API

## Script de Diagnóstico Rápido

Para validar conexões e databases de um usuário específico:

```bash
# Local (desenvolvimento)
./scripts/test-user-connection.sh <userId> <databaseId>

# Produção (Vercel)
NEXT_PUBLIC_BASE_URL=https://gastandoya-api.vercel.app \
  ./scripts/test-user-connection.sh <userId> <databaseId>
```

**Exemplo:**
```bash
./scripts/test-user-connection.sh 121C7EEC-EF08-4A86-B88F-506E77F85208 091438f7-7173-47cd-a240-9e7bea28fff2
```

---

## Problemas Comuns

### ❌ Erro: "Invalid Notion database"

**Sintoma:**
```json
{
  "error": "Invalid Notion database",
  "message": "Could not find database with this ID..."
}
```

**Causas possíveis:**

#### 1. Database ID incorreto

O ID que você está usando não corresponde ao database real. 

**Como obter o ID correto:**
- No Notion, abra o database
- Copie o link da página
- O ID é a parte final da URL (32 caracteres após o último hífen)

**Exemplo:**
```
https://www.notion.so/GASTOS-005ae70f122a4be1ba849693ccc45228
                               └─────────────┬─────────────┘
                                      Database ID
```

**Solução:**
```bash
# Use esse ID (com ou sem hífens):
005ae70f122a4be1ba849693ccc45228
# ou
005ae70f-122a-4be1-ba84-9693ccc45228
```

#### 2. Database não compartilhado com a integração

O database existe, mas não foi compartilhado com a integração GastandoYa.

**Solução:**
1. No Notion, abra o database
2. Clique em **"Share"** (canto superior direito)
3. Clique em **"Invite"**
4. Busque por **"GastandoYa"** (ou o nome da sua integração)
5. Selecione a integração e dê permissão de **leitura**
6. Clique em **"Invite"**

**Teste depois:**
```bash
curl "https://gastandoya-api.vercel.app/api/notion/debug?testDatabaseId=SEU_DATABASE_ID" \
  -H "x-api-key: SUA_API_KEY" \
  -H "x-user-id: SEU_USER_ID"
```

Se `.databaseTest.success` for `true`, funcionou!

#### 3. Usuário não fez OAuth

O `userId` que você está usando no app não passou pelo fluxo OAuth.

**Sintomas:**
- `GET /api/notion/debug` retorna **404**
- Mensagem: "No Notion connection found for this user"

**Solução:**
1. No app iOS, redirecionar o usuário para:
   ```
   https://gastandoya-api.vercel.app/api/notion/oauth/authorize?userId=<userId>
   ```
2. Usuário autoriza no Notion
3. Deep link volta pro app com sucesso
4. Agora pode configurar database

**Teste se o OAuth foi feito:**
```bash
curl "https://gastandoya-api.vercel.app/api/notion/debug" \
  -H "x-api-key: SUA_API_KEY" \
  -H "x-user-id: SEU_USER_ID"
```

Se retornar **200**, o usuário tem conexão.

---

### ❌ Erro: 404 (HTML ao invés de JSON)

**Sintoma:**
```
NotionService: listDatabases response status: 404
NotionService: listDatabases response body: <!DOCTYPE html>...
```

**Causa:**
A rota da API não existe no domínio que você está chamando.

**Checklist:**

#### 1. URL base está correta?
```swift
// ✅ Correto (produção)
let baseURL = "https://gastandoya-api.vercel.app"

// ❌ Errado (landing page do frontend)
let baseURL = "https://frontend-domain.vercel.app"
```

#### 2. Path da rota está correto?
```swift
// ✅ Correto
let url = "\(baseURL)/api/notion/databases/list?pageId=..."

// ❌ Errado (faltou /api)
let url = "\(baseURL)/notion/databases/list?pageId=..."
```

#### 3. Deploy foi feito?
```bash
# Verificar se a rota existe
curl -i "https://gastandoya-api.vercel.app/api/notion/databases/list?q=test"
```

Se retornar **401** (Unauthorized), a rota existe.  
Se retornar **404 HTML**, a rota não foi deployada.

**Solução:**
```bash
# Re-deploy no Vercel
git push origin main
```

---

### ❌ Erro: 401 (Unauthorized)

**Sintoma:**
```json
{ "error": "Unauthorized" }
```

**Causa:**
`x-api-key` ausente ou inválido.

**Solução:**
1. Verificar que `APP_API_KEY` está configurada no Vercel:
   - Vercel Dashboard → Seu projeto → Settings → Environment Variables
   - Adicionar `APP_API_KEY` com o mesmo valor usado no app

2. No app iOS, garantir que o header está sendo enviado:
```swift
request.setValue("sua-api-key-aqui", forHTTPHeaderField: "x-api-key")
request.setValue(userId, forHTTPHeaderField: "x-user-id")
```

---

### ❌ Expenses vazias ou incorretas

**Sintoma:**
- `GET /api/notion/expenses` retorna `[]` (array vazio)
- OU valores estão errados (ex: amount negativo, descrição vazia)

**Causas possíveis:**

#### 1. Database configurado errado
```bash
# Ver qual database está configurado
curl "https://gastandoya-api.vercel.app/api/notion/debug" \
  -H "x-api-key: SUA_API_KEY" \
  -H "x-user-id: SEU_USER_ID" \
  | jq '.configuredDatabaseId'
```

Se for `"Not configured"`, rode:
```bash
curl -X POST "https://gastandoya-api.vercel.app/api/notion/config/database" \
  -H "Content-Type: application/json" \
  -H "x-api-key: SUA_API_KEY" \
  -H "x-user-id: SEU_USER_ID" \
  -d '{"databaseId":"SEU_DATABASE_ID"}'
```

#### 2. Estrutura do database incompatível

O database precisa ter as seguintes propriedades (nomes em português ou inglês):

| Nome esperado | Tipo Notion | Obrigatório |
|--------------|-------------|-------------|
| **Descrição** / Description | title ou rich_text | ✅ Sim |
| **Data** / Date | date | ✅ Sim |
| **Valor** / Amount | number | ✅ Sim |
| **Categoria** / Category | select, rich_text ou relation | ❌ Não |

**Verificar estrutura:**
```bash
curl "https://gastandoya-api.vercel.app/api/notion/debug-properties" \
  -H "x-api-key: SUA_API_KEY" \
  -H "x-user-id: SEU_USER_ID" \
  | jq '.propertySchema'
```

#### 3. Database vazio no Notion
```bash
curl "https://gastandoya-api.vercel.app/api/notion/debug-properties" \
  -H "x-api-key: SUA_API_KEY" \
  -H "x-user-id: SEU_USER_ID" \
  | jq '.samplePages | length'
```

Se retornar `0`, adicione algumas despesas no Notion primeiro.

---

## Validação Completa (Passo a Passo)

### Para usuário **novo** no iOS:

```bash
# Defina as variáveis
USER_ID="121C7EEC-EF08-4A86-B88F-506E77F85208"
DATABASE_ID="005ae70f122a4be1ba849693ccc45228"
API_KEY="iCKpv87vB83FURJiFCsy"
BASE_URL="https://gastandoya-api.vercel.app"

# 1. Verificar se tem conexão (deve dar 404 se for primeira vez)
curl "${BASE_URL}/api/notion/debug" \
  -H "x-api-key: ${API_KEY}" \
  -H "x-user-id: ${USER_ID}"

# Se 404 → fazer OAuth:
# Abrir no navegador/app: ${BASE_URL}/api/notion/oauth/authorize?userId=${USER_ID}

# 2. Verificar se database é acessível
curl "${BASE_URL}/api/notion/debug?testDatabaseId=${DATABASE_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "x-user-id: ${USER_ID}" \
  | jq '.databaseTest.success'

# Se false → compartilhar database no Notion com a integração

# 3. Configurar database
curl -X POST "${BASE_URL}/api/notion/config/database" \
  -H "Content-Type: application/json" \
  -H "x-api-key: ${API_KEY}" \
  -H "x-user-id: ${USER_ID}" \
  -d "{\"databaseId\":\"${DATABASE_ID}\"}"

# 4. Buscar expenses
curl "${BASE_URL}/api/notion/expenses" \
  -H "x-api-key: ${API_KEY}" \
  -H "x-user-id: ${USER_ID}" \
  | jq 'length'
```

---

## Logs no Vercel

Para ver logs em tempo real:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Ver logs
vercel logs gastandoya-api --follow
```

Ou no dashboard:
- https://vercel.com/seu-usuario/gastandoya-api/logs

---

## Support

Se o problema persistir:
1. Rode o script de diagnóstico: `./scripts/test-user-connection.sh`
2. Copie o output completo
3. Abra uma issue com o log

**⚠️ NUNCA compartilhe:**
- `APP_API_KEY`
- `NOTION_CLIENT_SECRET`
- `access_token` de usuários


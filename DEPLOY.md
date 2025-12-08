# Guia de Deploy na Vercel - GastandoYa API

Este guia detalha como fazer deploy da API GastandoYa (integração Notion) na Vercel.

## Pré-requisitos

- ✅ Código testado localmente
- ✅ Integração OAuth configurada no Notion
- ✅ Conta na Vercel

## Etapas de Deploy

### 1. Preparar Repositório

Certifique-se de que o código está commitado e pusheado para o repositório:

```bash
git add .
git commit -m "feat: Integração completa com Notion (OAuth + Expenses API)"
git push origin main
```

### 2. Criar Projeto na Vercel

#### Via CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd /Users/vinicius.marques/Documents/Projects/pessoal/gastandoya-api
vercel

# Para deploy em produção
vercel --prod
```

#### Via Dashboard Web

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Conecte seu repositório Git
3. Selecione o repositório `gastandoya-api`
4. Configure conforme abaixo:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: `.next` (padrão)
   - **Install Command**: `npm install` (padrão)

### 3. Configurar Variáveis de Ambiente

No dashboard da Vercel, vá em **Settings → Environment Variables** e adicione:

#### Ambiente: Production

```env
NOTION_CLIENT_ID=seu_client_id_aqui
NOTION_CLIENT_SECRET=seu_client_secret_aqui
NOTION_REDIRECT_URI=https://api.gastandoya.com/api/notion/oauth/callback
NOTION_API_VERSION=2022-06-28
APP_API_KEY=sua_chave_secreta_aleatoria_aqui
NEXT_PUBLIC_BASE_URL=https://api.gastandoya.com
```

> **⚠️ Importante**: 
> - Substitua `api.gastandoya.com` pelo domínio real da Vercel (ex: `gastandoya-api.vercel.app`)
> - Gere uma `APP_API_KEY` segura: `openssl rand -base64 32`
> - **Não configure KV_* manualmente** - elas são adicionadas automaticamente ao conectar o Vercel KV

### 3.1 Configurar Vercel KV (Storage Persistente) ✅ OBRIGATÓRIO

Para produção, você **DEVE** configurar Vercel KV para armazenamento persistente das conexões Notion:

#### Passo a Passo:

1. No dashboard da Vercel, vá em **Storage** (menu lateral)
2. Clique em **Create Database**
3. Selecione **KV (Redis)**
4. Configure:
   - **Name**: `gastandoya-notion-connections`
   - **Region**: `gru1` (São Paulo) ou região mais próxima
5. Clique em **Create**
6. Após criar, clique em **Connect to Project**
7. Selecione `gastandoya-api`
8. Marque **Production** (e opcionalmente Preview/Development)
9. Clique em **Connect**

**Pronto!** A Vercel adiciona automaticamente as variáveis:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`
- `KV_URL`

> 💡 **Nota**: Sem Vercel KV, o sistema usa storage in-memory (dados perdidos a cada deploy). Consulte `MIGRATE_TO_KV.md` para detalhes.

#### Ambiente: Preview (Opcional)

Configure as mesmas variáveis mas com valores de staging/teste, se necessário.

### 4. Atualizar Redirect URI no Notion

1. Acesse [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Selecione sua integração "GastandoYa"
3. Em **Redirect URIs**, adicione:
   ```
   https://api.gastandoya.com/api/notion/oauth/callback
   ```
   (substitua pelo domínio real da Vercel)

4. Salve as alterações

### 5. Validar Deploy

Após o deploy, valide que os endpoints estão funcionando:

#### Verificar Health

```bash
curl https://api.gastandoya.com
```

#### Verificar Storage (Logs)

Acesse **Deployments → [Último Deploy] → Functions** e procure por:

```
✅ Vercel KV detected: Using persistent Redis storage
```

Se aparecer:
```
⚠️ Vercel KV not configured: Using in-memory storage
```

Então o KV não está conectado. Volte ao **Passo 3.1** e conecte o KV ao projeto.

#### Testar OAuth (Manual)

Abra no navegador:

```
https://api.gastandoya.com/api/notion/oauth/authorize?userId=test-user-prod
```

Autorize no Notion e verifique se você é redirecionado para a página de sucesso.

#### Testar Rota de Despesas

```bash
# 1. Conectar Notion (manual via navegador)
# 2. Configurar database
curl -X POST https://api.gastandoya.com/api/notion/config/database \
  -H "Content-Type: application/json" \
  -H "x-api-key: SUA_APP_API_KEY_AQUI" \
  -H "x-user-id: test-user-prod" \
  -d '{"databaseId": "seu_database_id"}'

# 3. Buscar despesas
curl -X GET https://api.gastandoya.com/api/notion/expenses \
  -H "x-api-key: SUA_APP_API_KEY_AQUI" \
  -H "x-user-id: test-user-prod"
```

### 6. Configurar Domínio Customizado (Opcional)

Se você possui um domínio próprio:

1. No dashboard da Vercel, vá em **Settings → Domains**
2. Adicione seu domínio (ex: `api.gastandoya.com`)
3. Configure os registros DNS conforme instruções da Vercel
4. Aguarde propagação DNS (~24h)
5. Atualize as variáveis de ambiente e Redirect URI do Notion

## Troubleshooting

### Erro: "Missing environment variables"

- Verifique que todas as env vars foram configuradas no dashboard da Vercel
- Faça um novo deploy após adicionar/atualizar env vars

### Erro: "redirect_uri_mismatch" no OAuth

- Verifique que o `NOTION_REDIRECT_URI` bate exatamente com o configurado no Notion
- Certifique-se de ter adicionado a URI no painel do Notion

### Database não é encontrado pelo Notion

- Verifique se você compartilhou o database com a integração no Notion
- Database → `...` → "Add connections" → Selecione "GastandoYa"

### Logs de Erro

Para ver logs em produção:

```bash
vercel logs gastandoya-api --prod
```

Ou acesse **Deployments → (último deploy) → Functions** no dashboard.

## Monitoramento

### Vercel Analytics

A Vercel fornece analytics básicos automaticamente. Para métricas mais avançadas, considere:

- **Vercel Web Analytics** (adicionar snippet ao Next.js)
- **External APM**: Sentry, Datadog, New Relic

### Alertas

Configure notificações no dashboard da Vercel:
- **Settings → Notifications**
- Ative alertas para:
  - Deploy failed
  - High error rate

## Rollback

Se algo der errado após um deploy:

1. Vá em **Deployments** no dashboard
2. Encontre o deploy anterior (estável)
3. Clique em `...` → **Promote to Production**

Ou via CLI:

```bash
vercel rollback
```

## CI/CD Automático

A Vercel faz deploy automático quando você faz push para `main`. Para customizar:

### Branches de Preview

Por padrão, qualquer branch gera um preview deploy. Para desabilitar:

- **Settings → Git → Deploy Hooks** → Configure conforme necessário

### Testes no CI

Adicione ao `package.json`:

```json
{
  "scripts": {
    "vercel-build": "npm run test && next build"
  }
}
```

Isso roda os testes antes do build. Se os testes falharem, o deploy é cancelado.

## Segurança em Produção

- ✅ Nunca commite `.env.local` no Git
- ✅ Tokens OAuth **nunca** são expostos ao cliente
- ✅ Use `APP_API_KEY` forte (32+ caracteres, gerada randomicamente)
- ✅ Monitore logs para erros suspeitos
- ⚠️ **TODO**: Migrar `UserNotionConnectionStore` de in-memory para storage persistente (Vercel KV, Postgres, etc.)

## Próximos Passos

Após deploy bem-sucedido:

1. Integrar com o app iOS apontando para a URL de produção
2. Configurar monitoramento e alertas
3. Migrar storage de conexões para produção (Vercel KV ou DB)
4. Implementar rate limiting se necessário
5. Adicionar logging estruturado (ex: Pino, Winston)

## Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Notion API Reference](https://developers.notion.com/reference/intro)


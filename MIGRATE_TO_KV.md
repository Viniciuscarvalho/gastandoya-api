# 🚀 Guia de Migração para Vercel KV (Redis)

Este guia explica como migrar o armazenamento de conexões Notion de **in-memory** para **Vercel KV (Redis)** persistente.

## 📋 O Problema

Atualmente, o `UserNotionConnectionStore` usa armazenamento em memória:

**❌ Problemas:**
- Dados perdidos a cada restart/deploy
- Não funciona com múltiplas instâncias (serverless)
- Usuários precisam reconectar o Notion após cada deploy

**✅ Solução: Vercel KV**
- Dados persistentes entre deploys
- Funciona perfeitamente com serverless
- Redis gerenciado pela Vercel (zero configuração de infra)
- Escalável e rápido

## 🎯 Arquivos Criados

A migração já está implementada! Foram criados:

1. **`lib/userNotionConnectionStore.kv.ts`** - Implementação com Vercel KV
2. **`lib/userNotionConnectionStore.memory.ts`** - Implementação in-memory (extraída)
3. **`lib/userNotionConnectionStore.ts`** (atualizado) - Factory inteligente que escolhe qual usar

## 🔧 Como Funciona

O código **detecta automaticamente** qual storage usar:

```typescript
// Prioridade de seleção:
1. Se FORCE_IN_MEMORY_STORE=true → in-memory
2. Se variáveis Vercel KV disponíveis → Vercel KV ✅
3. Fallback → in-memory com warning
```

**Nenhuma mudança de código necessária!** O sistema escolhe automaticamente.

## 📦 Passo 1: Instalar Dependência

A dependência já foi adicionada ao `package.json`:

```bash
npm install
# ou
yarn install
```

Pacote: `@vercel/kv@^1.0.1`

## ☁️ Passo 2: Configurar Vercel KV

### 2.1 Criar KV Database no Dashboard

1. Acesse seu projeto na Vercel: [vercel.com/dashboard](https://vercel.com/dashboard)
2. Vá em **Storage** (menu lateral)
3. Clique em **Create Database**
4. Selecione **KV (Redis)**
5. Configure:
   - **Name**: `gastandoya-notion-connections` (ou nome de sua preferência)
   - **Region**: Escolha a mais próxima (ex: `gru1` para São Paulo)
6. Clique em **Create**

### 2.2 Conectar ao Projeto

1. Após criar, clique em **Connect to Project**
2. Selecione seu projeto `gastandoya-api`
3. Selecione o ambiente:
   - ✅ **Production**
   - ✅ **Preview** (opcional)
   - ✅ **Development** (opcional, para testes locais)
4. Clique em **Connect**

**Pronto!** A Vercel automaticamente configura as variáveis de ambiente:

```env
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
KV_REST_API_READ_ONLY_TOKEN=...
KV_URL=redis://...
```

### 2.3 Variáveis de Ambiente (Automático)

A Vercel adiciona automaticamente as variáveis necessárias. Você pode verificar em:

**Dashboard → Settings → Environment Variables**

## 🧪 Passo 3: Testar Localmente (Opcional)

Para testar Vercel KV em desenvolvimento local:

### 3.1 Baixar Env Vars

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm i -g vercel

# Fazer login
vercel login

# Baixar variáveis de ambiente
vercel env pull .env.local
```

Isso cria `.env.local` com as variáveis KV.

### 3.2 Rodar Localmente

```bash
npm run dev
```

Você verá no console:
```
✅ Vercel KV detected: Using persistent Redis storage
```

### 3.3 Forçar In-Memory (se necessário)

Para testes sem Vercel KV:

```bash
# .env.local
FORCE_IN_MEMORY_STORE=true
```

## 🚀 Passo 4: Deploy

```bash
# Commit das mudanças
git add .
git commit -m "feat: Migrar storage para Vercel KV (Redis persistente)"
git push origin main

# A Vercel fará deploy automaticamente
```

Após o deploy, verifique os logs:

**Vercel Dashboard → Deployments → [Último Deploy] → Functions**

Você deve ver:
```
✅ Vercel KV detected: Using persistent Redis storage
```

## ✅ Passo 5: Validar Migração

### 5.1 Testar OAuth

1. Conecte uma conta Notion: `https://api.gastandoya.com/api/notion/oauth/authorize?userId=test-user`
2. Autorize no Notion
3. Veja a mensagem de sucesso

### 5.2 Verificar Persistência

1. Faça um novo deploy (qualquer mudança)
2. Tente buscar despesas com o mesmo usuário
3. Se funcionar **sem reconectar**, a migração foi bem-sucedida! ✅

```bash
curl -X GET https://api.gastandoya.com/api/notion/expenses \
  -H "x-api-key: SUA_CHAVE" \
  -H "x-user-id: test-user"
```

Se retornar despesas (ou erro 404 específico de database), está OK!

## 📊 Monitoramento

### Ver Dados no Dashboard Vercel

**Dashboard → Storage → gastandoya-notion-connections**

- Veja total de keys (conexões)
- Veja uso de memória
- Configure alertas

### Verificar Conexões Programaticamente

Você pode criar uma rota admin:

```typescript
// app/api/admin/connections/route.ts
import { getUserNotionConnectionStore } from '@/lib/userNotionConnectionStore'

export async function GET(request: Request) {
  // TODO: Adicionar autenticação admin!
  const store = getUserNotionConnectionStore()
  
  // Se estiver usando KV, terá o método getStats
  if ('getStats' in store) {
    const stats = await store.getStats()
    return Response.json(stats)
  }
  
  return Response.json({ error: 'Method not available' })
}
```

## 🔒 Segurança

### Tokens Criptografados

Os tokens OAuth já são strings opacas do Notion, mas você pode adicionar criptografia extra:

```typescript
// Exemplo: criptografar antes de salvar no KV
import crypto from 'crypto'

function encrypt(text: string): string {
  const key = process.env.ENCRYPTION_KEY // 32 bytes
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}
```

### Expiração Automática

O código já configura expiração de 90 dias:

```typescript
await kv.set(key, dataToStore, {
  ex: 60 * 60 * 24 * 90, // 90 dias
})
```

Usuários inativos por 90 dias precisarão reconectar automaticamente.

## 💰 Custos

### Free Tier (Vercel KV)

- **3 GB** de armazenamento
- **256 MB** de memória
- **30 milhões** de comandos/mês

**Estimativa para GastandoYa:**
- Cada conexão: ~500 bytes (userId, token, metadata)
- 3 GB = ~6 milhões de conexões
- Comandos: 2-3 por request (get + optional set)

**Conclusão:** Free tier é mais que suficiente para milhares de usuários! 🎉

## 🐛 Troubleshooting

### "Failed to initialize Vercel KV store"

**Causa:** Variáveis de ambiente não configuradas

**Solução:**
1. Verifique que o KV database está conectado ao projeto
2. Faça um novo deploy (forçar recarga de env vars)
3. Localmente, rode `vercel env pull .env.local`

### "Connection timeout" no KV

**Causa:** Região muito distante ou rede lenta

**Solução:**
1. Escolha região mais próxima ao seus usuários
2. Considere timeout maior nas chamadas KV (já configurado)

### Dados não persistem

**Causa:** Ainda usando in-memory

**Solução:**
1. Verifique logs: deve mostrar "✅ Vercel KV detected"
2. Se mostrar "⚠️ Using in-memory", KV não está configurado
3. Siga Passo 2 novamente

### Erro "KV not found" em produção

**Causa:** KV não conectado ao ambiente Production

**Solução:**
1. Dashboard → Storage → Seu KV
2. Settings → Connected Projects
3. Garanta que Production está marcado

## 🔄 Rollback (se necessário)

Para voltar temporariamente ao in-memory:

```env
# Adicione em Environment Variables
FORCE_IN_MEMORY_STORE=true
```

Deploy novamente. **Atenção:** Dados serão perdidos!

## 📚 Recursos

- [Vercel KV Documentation](https://vercel.com/docs/storage/vercel-kv)
- [Vercel KV Quickstart](https://vercel.com/docs/storage/vercel-kv/quickstart)
- [Vercel KV SDK Reference](https://vercel.com/docs/storage/vercel-kv/kv-reference)
- [Pricing](https://vercel.com/docs/storage/vercel-kv/usage-and-pricing)

## ✅ Checklist de Migração

- [ ] Instalar dependência `@vercel/kv` (já feito)
- [ ] Criar KV database no dashboard Vercel
- [ ] Conectar KV ao projeto (Production)
- [ ] (Opcional) Conectar ao ambiente Development
- [ ] Commit e push do código atualizado
- [ ] Verificar logs do deploy: "✅ Vercel KV detected"
- [ ] Testar OAuth e persistência
- [ ] Validar que dados sobrevivem a novos deploys
- [ ] Configurar monitoramento/alertas (opcional)

---

**🎉 Parabéns!** Sua aplicação agora usa storage persistente e está pronta para produção!

**Benefícios alcançados:**
- ✅ Dados persistem entre deploys
- ✅ Funciona com múltiplas instâncias serverless
- ✅ Escalável automaticamente
- ✅ Zero manutenção de infra
- ✅ Free tier generoso

Dúvidas? Consulte a [documentação oficial da Vercel KV](https://vercel.com/docs/storage/vercel-kv).


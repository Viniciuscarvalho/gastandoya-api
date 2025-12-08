# 🔐 Storage de Conexões Notion - Quick Reference

## Status Atual

✅ **Implementação dupla pronta:**
- In-Memory (desenvolvimento/fallback)
- Vercel KV Redis (produção)

✅ **Seleção automática:**
- Detecta ambiente e escolhe o storage apropriado
- Zero mudanças no código da aplicação

## Para Desenvolvimento Local

### Com Vercel KV (recomendado)

```bash
# 1. Baixar env vars da Vercel
vercel env pull .env.local

# 2. Rodar
npm run dev

# Verá: ✅ Vercel KV detected: Using persistent Redis storage
```

### Sem Vercel KV (fallback)

```bash
# Simplesmente rode sem env vars do KV
npm run dev

# Verá: ⚠️ Vercel KV not configured: Using in-memory storage
```

### Forçar In-Memory (testes)

```env
# .env.local
FORCE_IN_MEMORY_STORE=true
```

## Para Produção

### Setup (Uma Vez)

1. **Dashboard Vercel** → **Storage** → **Create Database** → **KV**
2. **Connect to Project** → Selecione `gastandoya-api`
3. Marque **Production**
4. **Connect**

**Pronto!** Próximo deploy já usa KV automaticamente.

### Verificar Status

```bash
# Vercel logs
vercel logs --prod

# Procure por:
# ✅ Vercel KV detected: Using persistent Redis storage
```

## Arquivos Principais

```
lib/
├── userNotionConnectionStore.ts          # Factory (escolhe qual usar)
├── userNotionConnectionStore.kv.ts       # Implementação Vercel KV
└── userNotionConnectionStore.memory.ts   # Implementação in-memory
```

## Comandos Úteis

```bash
# Instalar dependências (inclui @vercel/kv)
npm install

# Baixar env vars da Vercel (inclui KV)
vercel env pull .env.local

# Deploy (usa KV se configurado)
git push origin main

# Forçar in-memory (útil para debug)
FORCE_IN_MEMORY_STORE=true npm run dev
```

## Checklist Rápido

**Desenvolvimento:**
- [ ] `npm install` rodado
- [ ] `vercel env pull .env.local` (opcional, para usar KV localmente)
- [ ] `npm run dev` → verificar mensagem de storage no console

**Produção:**
- [ ] Vercel KV criado no dashboard
- [ ] KV conectado ao projeto (ambiente Production)
- [ ] Deploy feito
- [ ] Logs verificados: "✅ Vercel KV detected"
- [ ] OAuth testado (dados devem persistir entre deploys)

## Troubleshooting Express

### ❌ Dados perdidos após deploy

**Diagnóstico:**
```bash
vercel logs --prod | grep "storage"
```

Se aparecer "⚠️ Using in-memory":
- KV não está conectado ao projeto
- Vá em Dashboard → Storage → Seu KV → Connect to Project

### ❌ "Failed to initialize Vercel KV"

**Solução:**
```bash
# Verificar env vars
vercel env ls

# Devem existir:
# KV_REST_API_URL
# KV_REST_API_TOKEN

# Se não, reconecte o KV ao projeto
```

### ❌ Lentidão em requests

**Causa provável:** Região do KV distante

**Solução:**
- Dashboard → Storage → Seu KV → Settings
- Veja região configurada
- Idealmente: `gru1` (São Paulo) para Brasil

## Custos Vercel KV

**Free Tier:**
- 3 GB storage
- 256 MB memory
- 30M commands/mês

**Estimativa GastandoYa:**
- ~500 bytes por conexão
- 3 GB = ~6 milhões de conexões possíveis
- 2-3 comandos por request

**Conclusão:** Free tier suficiente para **milhares** de usuários! 🎉

## Links Rápidos

- 📖 [Guia completo de migração](./MIGRATE_TO_KV.md)
- 🔗 [Vercel KV Docs](https://vercel.com/docs/storage/vercel-kv)
- 🔗 [Vercel Dashboard](https://vercel.com/dashboard)

---

**💡 Dica:** O sistema funciona sem Vercel KV (fallback para in-memory), mas para produção, **sempre configure o KV** para persistência de dados!


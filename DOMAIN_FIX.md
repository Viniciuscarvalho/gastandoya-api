# 🔧 Correção: Inconsistência de Domínios no OAuth

## ❌ Problema Identificado

**Erro:** "Server can't be found" após autorização no Notion

**Causa:** Inconsistência entre domínios:
- App iOS chama: `gastandoya-api.vercel.app` ✅
- Notion redireciona para: `api.gastandoya.com` ❌ (não configurado)

**Logs do iOS:**
```
URL inicial: https://gastandoya-api.vercel.app/api/notion/oauth/authorize?userId=...
Notion redirect_uri: https://api.gastandoya.com/api/notion/oauth/callback
Resultado: Server can't be found ❌
```

## ✅ Solução (Escolha uma)

### Opção 1: Usar Domínio Vercel (Recomendado - Mais Rápido)

Atualizar as variáveis de ambiente no **Dashboard da Vercel** para usar `gastandoya-api.vercel.app`:

#### Passo 1: Atualizar no Vercel Dashboard

```
1. Acessar: https://vercel.com/seu-projeto/settings/environment-variables

2. Editar variáveis:

   NOTION_REDIRECT_URI
   https://gastandoya-api.vercel.app/api/notion/oauth/callback
   
   NEXT_PUBLIC_BASE_URL
   https://gastandoya-api.vercel.app

3. Salvar mudanças

4. Fazer redeploy:
   - Ir em Deployments
   - Clicar nos 3 pontos do último deploy
   - "Redeploy"
```

#### Passo 2: Atualizar no Notion Integration

```
1. Acessar: https://www.notion.so/my-integrations

2. Selecionar integração "GastandoYa"

3. Em "Redirect URIs", adicionar:
   https://gastandoya-api.vercel.app/api/notion/oauth/callback

4. Remover o antigo:
   https://api.gastandoya.com/api/notion/oauth/callback

5. Salvar
```

#### Passo 3: Testar

```swift
// No iOS, chamar:
let url = "https://gastandoya-api.vercel.app/api/notion/oauth/authorize?userId=\(userId)"

// Notion vai redirecionar para:
// https://gastandoya-api.vercel.app/api/notion/oauth/callback?code=...

// Página intermediária carrega:
// https://gastandoya-api.vercel.app/notion/redirect?success=true&userId=...

// Deep link abre:
// gastandoya://notion/callback?success=true&userId=... ✅
```

---

### Opção 2: Configurar Domínio Customizado (Mais Complexo)

Se você quiser usar `api.gastandoya.com` (sem o `.br`):

#### Passo 1: Configurar Domínio no Vercel

```
1. Acessar: https://vercel.com/seu-projeto/settings/domains

2. Clicar "Add Domain"

3. Digitar: api.gastandoya.com

4. Vercel vai pedir para adicionar DNS records:
   - Type: CNAME
   - Name: api
   - Value: cname.vercel-dns.com

5. Adicionar records no seu provedor DNS (GoDaddy/Cloudflare)

6. Aguardar propagação (~5-10 min)
```

#### Passo 2: Atualizar Variáveis de Ambiente

```
NOTION_REDIRECT_URI=https://api.gastandoya.com/api/notion/oauth/callback
NEXT_PUBLIC_BASE_URL=https://api.gastandoya.com
```

#### Passo 3: Atualizar Notion Integration

```
Redirect URI: https://api.gastandoya.com/api/notion/oauth/callback
```

---

## 📝 Qual Opção Escolher?

### Use Opção 1 (Vercel Domain) se:
- ✅ Quer resolver rapidamente (5 minutos)
- ✅ Não se importa com URL sendo `.vercel.app`
- ✅ Não tem domínio customizado configurado ainda

### Use Opção 2 (Custom Domain) se:
- ✅ Quer URL profissional (`api.gastandoya.com`)
- ✅ Já tem o domínio `gastandoya.com`
- ✅ Pode aguardar configuração DNS (10-30 min)

---

## 🚀 Guia Rápido - Opção 1 (5 minutos)

### 1. Vercel Dashboard

```bash
# Abrir no navegador:
https://vercel.com/

# Ir em Settings → Environment Variables
# Editar:

NOTION_REDIRECT_URI → https://gastandoya-api.vercel.app/api/notion/oauth/callback
NEXT_PUBLIC_BASE_URL → https://gastandoya-api.vercel.app
```

### 2. Notion Dashboard

```bash
# Abrir no navegador:
https://www.notion.so/my-integrations

# Selecionar sua integração
# Em "Redirect URIs", adicionar:
https://gastandoya-api.vercel.app/api/notion/oauth/callback
```

### 3. Redeploy

```bash
# No Vercel Dashboard:
Deployments → último deploy → ... → Redeploy
```

### 4. Testar no iOS

```swift
// Usar a URL correta:
let baseURL = "https://gastandoya-api.vercel.app"
let url = "\(baseURL)/api/notion/oauth/authorize?userId=\(userId)"

// Abrir Safari
let safariVC = SFSafariViewController(url: URL(string: url)!)
present(safariVC, animated: true)
```

### 5. Verificar Logs

```bash
# Terminal:
vercel logs --follow

# Procurar por:
✅ Notion connection created for user ...
🔀 Redirecting to intermediate page: https://gastandoya-api.vercel.app/notion/redirect?...
```

---

## 🧪 Como Testar Que Está Funcionando

### Teste 1: Verificar Redirect URI

```bash
# Abrir Safari (desktop ou iOS):
https://gastandoya-api.vercel.app/api/notion/oauth/authorize?userId=test-123

# Deve redirecionar para Notion
# URL do Notion deve ter:
redirect_uri=https%3A%2F%2Fgastandoya-api.vercel.app%2Fapi%2Fnotion%2Foauth%2Fcallback

# Se tiver api.gastandoya.com → ainda está com config antiga ❌
# Se tiver gastandoya-api.vercel.app → correto! ✅
```

### Teste 2: OAuth Completo

```
1. App iOS → Conectar Notion
2. Safari abre → Autorizar
3. Notion redireciona → gastandoya-api.vercel.app/api/notion/oauth/callback
4. Página intermediária carrega
5. Deep link abre
6. App volta! ✅
```

---

## 📋 Checklist

### Opção 1 (Vercel Domain):
- [ ] Atualizar `NOTION_REDIRECT_URI` no Vercel → `gastandoya-api.vercel.app/api/notion/oauth/callback`
- [ ] Atualizar `NEXT_PUBLIC_BASE_URL` no Vercel → `gastandoya-api.vercel.app`
- [ ] Adicionar Redirect URI no Notion → `gastandoya-api.vercel.app/api/notion/oauth/callback`
- [ ] Redeploy na Vercel
- [ ] Testar no iOS
- [ ] Verificar logs

### Opção 2 (Custom Domain):
- [ ] Adicionar domínio `api.gastandoya.com` no Vercel
- [ ] Configurar DNS CNAME no GoDaddy/Cloudflare
- [ ] Aguardar propagação DNS
- [ ] Atualizar variáveis de ambiente
- [ ] Atualizar Redirect URI no Notion
- [ ] Redeploy na Vercel
- [ ] Testar no iOS
- [ ] Verificar logs

---

## 💡 Dica

Para verificar qual domínio está configurado **agora mesmo**:

```bash
# Ver logs no Vercel:
vercel logs --follow

# Fazer uma chamada e ver o redirect_uri que aparece:
curl -i "https://gastandoya-api.vercel.app/api/notion/oauth/authorize?userId=test"

# Vai mostrar o Location header com a URL do Notion
# Verificar se redirect_uri tem o domínio correto
```

---

**Recomendação:** Use **Opção 1** agora para testar rapidamente. Depois, se quiser, migre para domínio customizado na Opção 2. 🚀







# Guia de Deploy - Landing Page GastandoYa (Cloudflare Pages)

Este guia detalha como fazer deploy da landing page GastandoYa no Cloudflare Pages e configurar o domínio `www.gastandoya.com.br`.

## Pré-requisitos

- ✅ Conta no Cloudflare com DNS do domínio `gastandoya.com.br` configurado
- ✅ Código do frontend testado localmente (`npm run build` funciona)
- ✅ Imagens das telas em `frontend/public/screens/`

## Estrutura de Arquivos

```
frontend/
├── public/
│   ├── screens/          # ⚠️ Adicione as screenshots aqui
│   │   ├── screen-1.png  # Estatísticas
│   │   ├── screen-2.png  # Resumo Financeiro
│   │   ├── screen-3.png  # Metas
│   │   ├── screen-4.png  # Backup e Sync
│   │   ├── screen-5.png  # Lançamentos
│   │   ├── screen-6.png  # Notion
│   │   ├── screen-7.png  # Importar Dados
│   │   └── screen-8.png  # Recursos Premium
│   ├── favicon.ico       # ⚠️ Adicione o favicon
│   ├── og-image.png      # ⚠️ Adicione imagem OG (1200x630)
│   └── apple-touch-icon.png
├── src/
│   └── ...               # Código fonte
├── out/                  # ← Output do build estático
└── package.json
```

## Etapas de Deploy

### 1. Preparar Assets

Antes do deploy, adicione os arquivos necessários em `frontend/public/`:

```bash
# Navegar para o frontend
cd frontend

# Verificar se as pastas existem
ls -la public/screens/

# Adicionar suas imagens (copie manualmente ou via script)
# screen-1.png até screen-8.png
```

### 2. Testar Build Local

```bash
cd frontend

# Instalar dependências
npm install

# Executar build
npm run build

# Verificar output
ls -la out/

# (Opcional) Testar localmente
npx serve out
```

### 3. Criar Projeto no Cloudflare Pages

#### Via Dashboard (Recomendado)

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. Vá em **Workers & Pages** → **Pages**
3. Clique em **Create a project** → **Connect to Git**
4. Conecte seu repositório GitHub/GitLab
5. Selecione o repositório `gastandoya-api`
6. Configure o build:

   | Campo | Valor |
   |-------|-------|
   | **Project name** | `gastandoya-www` |
   | **Production branch** | `main` |
   | **Framework preset** | Next.js (Static HTML Export) |
   | **Root directory** | `frontend` |
   | **Build command** | `npm run build` |
   | **Build output directory** | `out` |

7. Clique em **Save and Deploy**

#### Via Wrangler CLI (Alternativo)

```bash
# Instalar Wrangler
npm install -g wrangler

# Login no Cloudflare
wrangler login

# Navegar para o frontend e fazer build
cd frontend
npm run build

# Deploy direto
wrangler pages deploy out --project-name=gastandoya-www
```

### 4. Configurar Domínio Customizado

#### 4.1 Adicionar domínio `www.gastandoya.com.br`

1. No dashboard do Cloudflare Pages, vá em **Custom domains**
2. Clique em **Set up a custom domain**
3. Digite: `www.gastandoya.com.br`
4. Clique em **Continue**
5. O Cloudflare vai configurar automaticamente o DNS (CNAME)

#### 4.2 Configurar DNS (se necessário)

Se o domínio já está no Cloudflare DNS, a configuração é automática. Caso contrário:

```
Tipo: CNAME
Nome: www
Conteúdo: gastandoya-www.pages.dev
Proxy: ✓ Proxied (laranja)
TTL: Auto
```

#### 4.3 Redirecionar Apex (gastandoya.com.br → www)

1. Vá em **Rules** → **Redirect Rules**
2. Clique em **Create rule**
3. Configure:

   - **Rule name**: `Redirect apex to www`
   - **When incoming requests match...**: 
     - Field: `Hostname`
     - Operator: `equals`
     - Value: `gastandoya.com.br`
   - **Then...**: 
     - Type: `Dynamic`
     - Expression: `concat("https://www.gastandoya.com.br", http.request.uri.path)`
     - Status code: `301`

4. **Deploy**

**Alternativa via Page Rules (método antigo):**

1. Vá em **Rules** → **Page Rules**
2. Clique em **Create Page Rule**
3. Configure:
   - **URL**: `gastandoya.com.br/*`
   - **Setting**: Forwarding URL (301 - Permanent Redirect)
   - **Destination**: `https://www.gastandoya.com.br/$1`

### 5. Validar Deploy

#### 5.1 Verificar URLs

```bash
# Landing principal
curl -I https://www.gastandoya.com.br

# Deve retornar HTTP/2 200

# Redirect do apex
curl -I https://gastandoya.com.br

# Deve retornar HTTP/2 301 com Location: https://www.gastandoya.com.br/
```

#### 5.2 Verificar SSL

O Cloudflare configura HTTPS automaticamente. Verifique:

1. Acesse `https://www.gastandoya.com.br`
2. Clique no cadeado → certificado válido
3. O certificado deve ser emitido pela Cloudflare

#### 5.3 Verificar Assets

```bash
# Verificar se as imagens estão acessíveis
curl -I https://www.gastandoya.com.br/screens/screen-1.png

# Deve retornar HTTP/2 200
```

### 6. Configurações Adicionais (Opcional)

#### 6.1 Habilitar Web Analytics

1. No dashboard do Cloudflare, vá em **Analytics & Logs** → **Web Analytics**
2. Clique em **Add a site**
3. Adicione `www.gastandoya.com.br`
4. O snippet JS é injetado automaticamente via proxy

#### 6.2 Configurar Cache

O Cloudflare Pages já configura cache otimizado. Para customizar:

1. Vá em **Caching** → **Configuration**
2. **Browser Cache TTL**: Respect Existing Headers
3. Considere criar Cache Rules para assets estáticos

#### 6.3 Configurar Headers de Segurança

1. Vá em **Rules** → **Transform Rules** → **Modify Response Header**
2. Adicione headers recomendados:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

## Troubleshooting

### Build falha no Cloudflare

**Problema**: Erro durante o build

**Soluções**:
1. Verifique se `Root directory` está como `frontend`
2. Verifique se `Build output directory` está como `out`
3. Teste localmente: `cd frontend && npm run build`

### Imagens não aparecem

**Problema**: 404 nas imagens

**Soluções**:
1. Verifique se os arquivos estão em `frontend/public/screens/`
2. Rebuild e redeploy
3. Limpe cache do Cloudflare: **Caching** → **Purge Everything**

### DNS não propaga

**Problema**: Site não carrega após configurar DNS

**Soluções**:
1. Aguarde até 24h para propagação completa
2. Verifique se o proxy está ativado (ícone laranja)
3. Use [dnschecker.org](https://dnschecker.org) para verificar propagação

### SSL não funciona

**Problema**: Erro de certificado

**Soluções**:
1. Vá em **SSL/TLS** → **Overview**
2. Defina modo como **Full (strict)**
3. Aguarde até 24h para emissão do certificado

### Redirect loop

**Problema**: Página fica em loop infinito

**Soluções**:
1. Verifique se o modo SSL está como **Full** ou **Full (strict)**
2. Não use **Flexible** (causa loop)
3. Verifique se não há regras de redirect conflitantes

## CI/CD Automático

O Cloudflare Pages faz deploy automático quando você faz push para `main`. Para customizar:

### Branches de Preview

Por padrão, qualquer branch gera um preview deploy em:
```
https://<commit-hash>.<project-name>.pages.dev
```

### Configurar Environments

1. No dashboard do projeto, vá em **Settings** → **Builds & deployments**
2. Configure variáveis de ambiente por branch se necessário

## Comparação: Backend vs Frontend

| Aspecto | Backend (API) | Frontend (Landing) |
|---------|---------------|-------------------|
| **Hospedagem** | Vercel | Cloudflare Pages |
| **Domínio** | `api.gastandoya.com.br` | `www.gastandoya.com.br` |
| **Tipo** | Next.js SSR/API | Next.js Static Export |
| **Deploy** | Push para `main` | Push para `main` |
| **Root** | `/` (raiz) | `/frontend` |

## Próximos Passos

Após deploy bem-sucedido:

1. ✅ Verificar todas as seções da landing
2. ✅ Testar em mobile (responsividade)
3. ✅ Verificar links (mailto, âncoras)
4. ✅ Rodar Lighthouse e corrigir issues
5. ⏳ Adicionar link da App Store quando disponível
6. ⏳ Configurar tracking/analytics se necessário

## Recursos

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js Static Export](https://nextjs.org/docs/app/guides/static-exports)
- [Cloudflare DNS](https://developers.cloudflare.com/dns/)


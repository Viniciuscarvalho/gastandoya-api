# GastandoYa API - Backend Next.js

API backend para o app iOS GastandoYa, com integração ao Notion para leitura de despesas.

## 🚀 Funcionalidades

- ✅ **OAuth com Notion**: Fluxo multi-tenant permitindo que cada usuário conecte sua própria conta Notion
- ✅ **Leitura de Despesas**: Consulta databases do Notion e retorna dados normalizados em `ExpenseDTO`
- 🔒 **Segurança**: Validação via `x-api-key`, tokens armazenados com segurança, nunca expostos ao cliente

## 📋 Pré-requisitos

- Node.js 18+ e npm (ou yarn/pnpm)
- Conta no Notion e uma integração OAuth configurada

## ⚙️ Configuração

### 1. Criar Integração OAuth no Notion

1. Acesse [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Clique em **"+ New integration"**
3. Configure:
   - **Type**: Public
   - **Integration name**: GastandoYa
   - **Associated workspace**: Seu workspace
   - **Capabilities**: 
     - ✓ Read content
     - ✓ No user information (não precisa de dados do usuário)
4. Adicione as URLs obrigatórias:
   - **Privacy Policy URL**: `https://raw.githubusercontent.com/[seu-usuario]/gastandoya-api/main/PRIVACY.md`
   - **Terms of Use URL**: `https://raw.githubusercontent.com/[seu-usuario]/gastandoya-api/main/TERMS.md`
5. Clique em **"Submit"**
6. Na página da integração:
   - Copie o **OAuth client ID** → `NOTION_CLIENT_ID`
   - Copie o **OAuth client secret** → `NOTION_CLIENT_SECRET`
7. Em **"Redirect URIs"**, adicione:
   - Desenvolvimento: `http://localhost:3000/api/notion/oauth/callback`
   - Produção: `https://api.gastandoya.com/api/notion/oauth/callback`

> 💡 **Importante**: Substitua `[seu-usuario]` nas URLs acima pelo seu usuário real do GitHub após fazer commit dos arquivos `PRIVACY.md` e `TERMS.md`.

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e preencha as variáveis:

```bash
cp env.example .env.local
```

Edite `.env.local`:

```env
# Notion OAuth Configuration
NOTION_CLIENT_ID=seu_client_id_aqui
NOTION_CLIENT_SECRET=seu_client_secret_aqui
NOTION_REDIRECT_URI=http://localhost:3000/api/notion/oauth/callback
NOTION_API_VERSION=2022-06-28

# App API Security (gere uma string aleatória segura)
APP_API_KEY=sua_chave_secreta_aleatoria_aqui

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> 💡 **Dica**: Para gerar uma `APP_API_KEY` segura, use:
> ```bash
> openssl rand -base64 32
> ```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Rodar em Desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

## 🔐 Fluxo OAuth

### Como funciona a conexão Notion

1. **App iOS** chama: `GET http://localhost:3000/api/notion/oauth/authorize?userId=user123`
2. **Backend** redireciona o usuário para página de autorização do Notion
3. **Usuário** concede permissão ao GastandoYa
4. **Notion** redireciona de volta para: `/api/notion/oauth/callback?code=...&state=...`
5. **Backend** troca o `code` por `access_token` e salva no `UserNotionConnectionStore`
6. **Usuário** vê página de sucesso e pode voltar ao app

### Testando o OAuth Manualmente

Abra no navegador:

```
http://localhost:3000/api/notion/oauth/authorize?userId=test-user-1
```

Após autorizar no Notion, você verá a página de sucesso.

## 📁 Estrutura do Projeto

```
gastandoya-api/
├── app/
│   ├── api/
│   │   └── notion/
│   │       ├── expenses/
│   │       │   └── route.ts          # GET /api/notion/expenses (TODO: Tarefa 3.0)
│   │       └── oauth/
│   │           ├── authorize/
│   │           │   └── route.ts      # ✅ Inicia OAuth
│   │           └── callback/
│   │               └── route.ts      # ✅ Finaliza OAuth
│   └── notion/
│       ├── success/
│       │   └── page.tsx             # ✅ Página de sucesso OAuth
│       └── error/
│           └── page.tsx             # ✅ Página de erro OAuth
├── lib/
│   ├── types.ts                     # ✅ Interfaces TypeScript
│   ├── config.ts                    # ✅ Configuração e validação de env vars
│   ├── userNotionConnectionStore.ts # ✅ Storage de conexões (in-memory)
│   ├── notionClient.ts              # TODO: Tarefa 2.0
│   └── notionExpensesService.ts     # TODO: Tarefa 2.0
├── tasks/
│   └── prd-notion-expenses/         # Documentação completa
│       ├── prd.md                   # Product Requirements Document
│       ├── techspec.md              # Technical Specification
│       └── tasks.md                 # Lista de tarefas
├── package.json
├── tsconfig.json
├── next.config.js
└── env.example
```

## 📚 Documentação Completa

Consulte a pasta `tasks/prd-notion-expenses/` para:

- **PRD** (`prd.md`): Requisitos de produto e objetivos de negócio
- **Tech Spec** (`techspec.md`): Arquitetura técnica detalhada
- **Tasks** (`tasks.md`): Lista de tarefas de implementação

## 🔄 Status da Implementação

- [x] **Tarefa 1.0**: OAuth com Notion e armazenamento de conexões
- [x] **Tarefa 2.0**: Serviço de leitura de despesas no Notion
- [x] **Tarefa 3.0**: Rota `GET /api/notion/expenses`
- [x] **Tarefa 4.0**: Testes unitários e configuração de testes
- [x] **Tarefa 5.0**: Documentação de deploy na Vercel

## 🚢 Deploy

### Vercel (Recomendado)

1. Conecte o repositório ao Vercel
2. Configure as variáveis de ambiente no dashboard da Vercel
3. Atualize `NOTION_REDIRECT_URI` com a URL de produção
4. Deploy!

```bash
npm run build
```

## 🔒 Segurança

- ✅ Tokens OAuth **nunca** são expostos para o cliente
- ✅ Validação CSRF via `state` no fluxo OAuth
- ✅ API protegida por `x-api-key`
- ✅ **Storage Persistente**: Vercel KV (Redis) em produção
  - Detecção automática: usa KV se disponível, fallback para in-memory
  - Migração sem código: apenas configurar KV no dashboard da Vercel
  - Consulte `MIGRATE_TO_KV.md` para instruções completas

## 📖 Recursos

- [Notion API Reference](https://developers.notion.com/reference/intro)
- [Notion OAuth Guide](https://developers.notion.com/docs/authorization)
- [Next.js Documentation](https://nextjs.org/docs)
- [@notionhq/client SDK](https://github.com/makenotion/notion-sdk-js)

## 📝 Licença

Privado - GastandoYa

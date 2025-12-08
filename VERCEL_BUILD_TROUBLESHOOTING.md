# 🔧 Troubleshooting - Vercel Build

Guia de resolução de problemas comuns no build da Vercel.

## ✅ Problema Resolvido: Root Layout

### Erro Original

```
⨯ notion/error/page.tsx doesn't have a root layout. 
To fix this error, make sure every page has a root layout.

Next.js build worker exited with code: 1
Error: Command "npm run build" exited with 1
```

### Causa

Next.js App Router requer um **root layout** (`app/layout.tsx`) obrigatório. Sem ele, o build falha.

### Solução ✅

Criados os arquivos obrigatórios:
- `app/layout.tsx` - Root layout
- `app/page.tsx` - Home page

## Checklist de Build

### Arquivos Obrigatórios do Next.js

- [x] `app/layout.tsx` - Root layout (obrigatório)
- [x] `app/page.tsx` - Home page (recomendado)
- [x] `next.config.js` - Configuração Next.js
- [x] `tsconfig.json` - Configuração TypeScript
- [x] `package.json` - Dependências

### Estrutura Mínima App Router

```
app/
├── layout.tsx          ← Obrigatório!
├── page.tsx            ← Recomendado
├── api/
│   └── notion/
│       └── expenses/
│           └── route.ts
└── notion/
    ├── success/
    │   └── page.tsx
    └── error/
        └── page.tsx
```

## Configuração Correta da Vercel

### Root Directory

```
Root Directory: ./
```

**NÃO USE:**
- ❌ `./app`
- ❌ `./src`
- ❌ Qualquer subpasta

**Use sempre a raiz do repositório (`./` ou deixe vazio).**

### Framework Preset

```
Framework: Next.js
```

Vercel detecta automaticamente se houver `next.config.js` na raiz.

### Build Settings

```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

Geralmente são detectados automaticamente. Só configure manualmente se necessário.

## Erros Comuns e Soluções

### 1. "Module not found: Can't resolve '@/lib/...'"

**Causa:** Alias `@/` não configurado no `tsconfig.json`

**Solução:**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

✅ Já configurado no projeto.

### 2. "Type error: Cannot find module 'next'"

**Causa:** Dependências não instaladas

**Solução:**

```bash
npm install
```

Ou force reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### 3. "Error: ENOENT: no such file or directory"

**Causa:** Arquivo referenciado não existe

**Solução:** Verifique se todos os arquivos importados existem:

```bash
# Verificar estrutura
ls -la app/
ls -la app/api/notion/
ls -la lib/
```

### 4. "Module parse failed: Unexpected token"

**Causa:** Arquivo JavaScript/TypeScript com sintaxe inválida

**Solução:** Verifique o arquivo mencionado no erro. Possíveis problemas:
- Falta de importação
- Syntax error
- Uso de features não suportadas

### 5. Build funciona local, mas falha na Vercel

**Causa:** Diferença de ambiente (Node version, env vars, etc.)

**Solução:**

1. **Verificar Node version:**
   ```json
   // package.json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

2. **Build local com comando exato da Vercel:**
   ```bash
   npm run build
   ```

3. **Verificar env vars:**
   - Desenvolvimento: `.env.local`
   - Vercel: Dashboard → Settings → Environment Variables

### 6. "Failed to compile" com erro em tipos TypeScript

**Causa:** Erro de tipagem que foi ignorado no dev mode

**Solução:**

```bash
# Rodar type check local
npm run build

# Ou apenas type check
npx tsc --noEmit
```

Corrija todos os erros de tipo antes do deploy.

### 7. "Cannot read properties of undefined"

**Causa:** Tentativa de acessar propriedade de objeto undefined/null

**Solução:** Use optional chaining:

```typescript
// ❌ Ruim
const value = obj.property

// ✅ Bom
const value = obj?.property
```

### 8. Env vars não funcionam em produção

**Causa:** Env vars não configuradas no dashboard ou prefixo incorreto

**Solução:**

1. **Para variáveis públicas (client-side):**
   - Prefixo obrigatório: `NEXT_PUBLIC_`
   - Exemplo: `NEXT_PUBLIC_BASE_URL`

2. **Para variáveis privadas (server-side):**
   - Sem prefixo especial
   - Exemplo: `NOTION_CLIENT_SECRET`

3. **Configurar no dashboard:**
   - Vercel → Settings → Environment Variables
   - Adicionar para o ambiente correto (Production/Preview/Development)

## Validação Local Antes do Deploy

### Checklist

```bash
# 1. Instalar dependências
npm install

# 2. Build local
npm run build

# 3. Type check
npx tsc --noEmit

# 4. Lint (se configurado)
npm run lint

# 5. Test (se configurado)
npm test

# 6. Rodar produção local
npm run start
```

Se todos passarem ✅, o deploy na Vercel deve funcionar!

## Logs da Vercel

### Acessar Logs

**Via Dashboard:**
```
Vercel → Deployments → [Seu Deploy] → Building
```

**Via CLI:**
```bash
vercel logs [deployment-url]

# Ou logs em tempo real
vercel logs --follow
```

### O Que Procurar

- ✅ `Creating an optimized production build`
- ✅ `Compiled successfully`
- ✅ `Build Completed`

- ❌ `Failed to compile`
- ❌ `Module not found`
- ❌ `Type error`

## Comandos Úteis

```bash
# Verificar estrutura de arquivos
tree -L 3 -I 'node_modules'

# Verificar imports problemáticos
grep -r "from '@/" app/ lib/

# Listar arquivos TypeScript
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules

# Verificar configuração Next.js
cat next.config.js

# Verificar tsconfig
cat tsconfig.json

# Build limpo
rm -rf .next node_modules
npm install
npm run build
```

## Suporte

Se o problema persistir:

1. **Verifique a documentação:**
   - [Next.js App Router Docs](https://nextjs.org/docs/app)
   - [Vercel Build Configuration](https://vercel.com/docs/concepts/deployments/build-step)

2. **Logs detalhados:**
   ```bash
   vercel logs --follow
   ```

3. **Issue no GitHub:**
   - Inclua: logs completos, `package.json`, estrutura de pastas

4. **Vercel Support:**
   - Dashboard → Help → Contact Support

---

**Status Atual:** ✅ **Resolvido!**  
Arquivos obrigatórios (`app/layout.tsx` e `app/page.tsx`) criados.  
Build deve funcionar normalmente agora.


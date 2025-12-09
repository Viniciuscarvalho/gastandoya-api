# 🚀 Quick Start - Configurar URLs Públicas

Guia rápido para adicionar as URLs de Política de Privacidade e Termos de Uso ao painel do Notion.

## Passo 1: Commit e Push para o GitHub

```bash
# No diretório do projeto
cd /Users/vinicius.marques/Documents/Projects/pessoal/gastandoya-api

# Adicionar os arquivos novos
git add PRIVACY.md TERMS.md PUBLIC_URLS.md

# Fazer commit
git commit -m "docs: Adicionar Privacy Policy e Terms of Use para integração Notion"

# Push para o GitHub
git push origin main
```

## Passo 2: Obter URLs RAW

Após fazer push, suas URLs públicas serão:

```
Privacy Policy:
https://raw.githubusercontent.com/[SEU-USUARIO]/gastandoya-api/main/PRIVACY.md

Terms of Use:
https://raw.githubusercontent.com/[SEU-USUARIO]/gastandoya-api/main/TERMS.md
```

### Como encontrar seu usuário GitHub:

1. Vá para github.com
2. Clique no seu avatar (canto superior direito)
3. Seu nome de usuário aparece no topo do menu

Ou verifique a URL remota do seu repositório:

```bash
git remote -v
```

Você verá algo como:
```
origin  https://github.com/viniciusmarques/gastandoya-api.git (fetch)
```

Neste caso, o usuário é `viniciusmarques`.

## Passo 3: Configurar no Painel do Notion

### 3.1 Acessar My Integrations

Abra: [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)

### 3.2 Editar ou Criar Integração

**Se já existe:**
- Clique em "GastandoYa"
- Clique em "Edit"

**Se não existe:**
- Clique em "+ New integration"
- Preencha os campos básicos

### 3.3 Adicionar URLs Obrigatórias

Cole as URLs (substituindo `[SEU-USUARIO]`):

**Privacy Policy URL:**
```
https://raw.githubusercontent.com/[SEU-USUARIO]/gastandoya-api/main/PRIVACY.md
```

**Terms of Use URL:**
```
https://raw.githubusercontent.com/[SEU-USUARIO]/gastandoya-api/main/TERMS.md
```

### 3.4 Configuração Completa

Sua integração deve estar assim:

```
✓ Integration name: GastandoYa
✓ Type: Public
✓ Associated workspace: [Seu workspace]
✓ Capabilities: Read content
✓ Privacy Policy URL: [URL do PRIVACY.md]
✓ Terms of Use URL: [URL do TERMS.md]
✓ Redirect URIs: [Suas URLs de callback]
```

### 3.5 Salvar

Clique em **"Submit"** ou **"Save changes"**

## Passo 4: Testar URLs

Antes de salvar no Notion, teste as URLs no navegador:

1. Abra cada URL em uma nova aba
2. Você deve ver o conteúdo do arquivo Markdown
3. Se der erro 404, verifique:
   - O repositório é público?
   - Você fez push dos arquivos?
   - O nome do usuário está correto?

## Exemplo Completo

Se seu usuário GitHub for `viniciusmarques`, use:

**Privacy Policy URL:**
```
https://raw.githubusercontent.com/viniciusmarques/gastandoya-api/main/PRIVACY.md
```

**Terms of Use URL:**
```
https://raw.githubusercontent.com/viniciusmarques/gastandoya-api/main/TERMS.md
```

## Pronto! 🎉

Sua integração Notion agora está completa com:
- ✅ Política de Privacidade pública
- ✅ Termos de Uso públicos
- ✅ URLs acessíveis para review do Notion

## Troubleshooting Rápido

### "404 Not Found" nas URLs

```bash
# Verificar se o repositório é público
# GitHub → Seu Repositório → Settings → Danger Zone → Change visibility

# Verificar se os arquivos existem
git log --oneline PRIVACY.md TERMS.md

# Se não existirem, fazer commit novamente
git add PRIVACY.md TERMS.md
git commit -m "docs: Add privacy and terms"
git push origin main
```

### Notion não aceita as URLs

- Use `https://raw.githubusercontent.com/`, não `https://github.com/`
- Certifique-se de não ter espaços na URL
- O caminho deve ser exatamente: `main/PRIVACY.md` (não `master` ou outro branch)

### Precisa atualizar o conteúdo?

Basta editar os arquivos e fazer push:

```bash
# Editar PRIVACY.md ou TERMS.md
vim PRIVACY.md  # ou seu editor preferido

# Commit e push
git add PRIVACY.md
git commit -m "docs: Atualizar política de privacidade"
git push origin main

# O Notion lerá automaticamente a versão atualizada
```

## Próximos Passos

1. ✅ URLs configuradas no Notion
2. ⏭️ Continuar com o fluxo de OAuth
3. ⏭️ Testar integração completa
4. ⏭️ Deploy na Vercel

Consulte `README.md` para o próximo passo!



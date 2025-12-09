# URLs Públicas para Integração Notion

Este documento explica como usar as URLs públicas de Política de Privacidade e Termos de Uso no painel de desenvolvedor do Notion.

## Arquivos Disponíveis

- **PRIVACY.md**: Política de Privacidade completa do GastandoYa
- **TERMS.md**: Termos de Uso completos do GastandoYa

## Como Obter as URLs RAW do GitHub

### Passo 1: Fazer Commit dos Arquivos

```bash
git add PRIVACY.md TERMS.md
git commit -m "docs: Adicionar Privacy Policy e Terms of Use"
git push origin main
```

### Passo 2: Obter URLs RAW

Após fazer push para o GitHub, as URLs públicas serão:

```
Privacy Policy:
https://raw.githubusercontent.com/[SEU-USUARIO]/gastandoya-api/main/PRIVACY.md

Terms of Use:
https://raw.githubusercontent.com/[SEU-USUARIO]/gastandoya-api/main/TERMS.md
```

**Substitua `[SEU-USUARIO]`** pelo seu nome de usuário do GitHub.

### Exemplo

Se seu usuário GitHub for `viniciusmarques`, as URLs serão:

```
https://raw.githubusercontent.com/viniciusmarques/gastandoya-api/main/PRIVACY.md
https://raw.githubusercontent.com/viniciusmarques/gastandoya-api/main/TERMS.md
```

## Configurar no Painel do Notion

### 1. Acessar My Integrations

Vá para [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)

### 2. Editar sua Integração

Se já criou a integração:
- Clique na integração "GastandoYa"
- Clique em "Edit"

Se ainda não criou:
- Clique em "+ New integration"
- Preencha os campos básicos

### 3. Adicionar URLs Obrigatórias

No formulário de integração, você verá campos obrigatórios para integrações públicas:

**Privacy Policy URL:**
```
https://raw.githubusercontent.com/[SEU-USUARIO]/gastandoya-api/main/PRIVACY.md
```

**Terms of Use URL:**
```
https://raw.githubusercontent.com/[SEU-USUARIO]/gastandoya-api/main/TERMS.md
```

### 4. Salvar

Clique em "Submit" ou "Save changes".

## Verificar URLs

Para verificar se as URLs estão acessíveis:

1. Abra cada URL em um navegador
2. Você deve ver o conteúdo do arquivo Markdown
3. O Notion renderizará esses arquivos quando o usuário autorizar sua integração

## Alternativa: Hospedagem Própria

Se preferir não usar GitHub, você pode hospedar esses arquivos em:

### Opção 1: Vercel (Simples)

Crie rotas Next.js que servem o conteúdo:

```typescript
// app/privacy/route.ts
export async function GET() {
  return new Response(privacyContent, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  })
}
```

URLs seriam:
```
https://api.gastandoya.com/privacy
https://api.gastandoya.com/terms
```

### Opção 2: GitHub Pages

1. Ative GitHub Pages no repositório
2. URLs seriam:
```
https://[seu-usuario].github.io/gastandoya-api/PRIVACY.html
https://[seu-usuario].github.io/gastandoya-api/TERMS.html
```

### Opção 3: Domínio Próprio

Se você possui um domínio, pode criar:
```
https://gastandoya.com/privacy
https://gastandoya.com/terms
```

## Notas Importantes

### Conteúdo Público

- Esses arquivos são públicos e acessíveis a qualquer pessoa
- Não inclua informações sensíveis ou confidenciais
- O conteúdo deve ser legalmente adequado e preciso

### Atualizações

Se você atualizar os arquivos:
- O Notion lerá automaticamente a versão mais recente
- Não precisa reconfigurar a integração
- Mantenha o histórico de versões (data de atualização) nos documentos

### Conformidade

- Os documentos fornecidos foram criados com base em práticas comuns
- **Recomendação**: Consulte um advogado para revisar antes de usar em produção
- Adapte os documentos conforme necessário para sua jurisdição e caso de uso

## Exemplo Completo

Após seguir todos os passos, seu painel do Notion terá:

```
Integration Name: GastandoYa
Type: Public
Associated workspace: [Seu workspace]

Capabilities:
✓ Read content

Privacy Policy URL: https://raw.githubusercontent.com/viniciusmarques/gastandoya-api/main/PRIVACY.md
Terms of Use URL: https://raw.githubusercontent.com/viniciusmarques/gastandoya-api/main/TERMS.md

Redirect URIs:
- http://localhost:3000/api/notion/oauth/callback
- https://api.gastandoya.com/api/notion/oauth/callback

OAuth client ID: [seu-client-id]
OAuth client secret: [seu-client-secret]
```

## Troubleshooting

### URL não é acessível

- Verifique se o repositório é público
- Confirme que fez push dos arquivos para `main`
- Teste a URL no navegador

### Notion não aceita URL

- Certifique-se de usar URLs HTTPS
- Use a URL RAW (raw.githubusercontent.com), não a URL da página do GitHub
- Verifique se não há espaços ou caracteres especiais na URL

### Conteúdo não aparece

- O Notion pode cachear o conteúdo
- Aguarde alguns minutos e tente novamente
- Verifique se o arquivo está em formato de texto legível (Markdown)

## Recursos

- [Notion OAuth Documentation](https://developers.notion.com/docs/authorization)
- [Notion Public Integrations](https://developers.notion.com/reference/public-integrations-overview)
- [GitHub Raw URLs](https://docs.github.com/en/repositories/working-with-files/using-files/viewing-a-file)




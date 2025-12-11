# Especificação Técnica – Endpoint de Feature Flags (GastandoYa)

## Resumo Executivo

Esta Tech Spec descreve a implementação de um endpoint de **feature flags** para o backend do GastandoYa.  
A solução consiste em:

- Um arquivo JSON versionado (`config/features.json`) contendo o estado das features.
- Um pequeno utilitário em `lib/features.ts` para carregar e tipar essas flags.
- Um endpoint `GET /api/features` (Next.js App Router) que:
  - Valida `x-api-key` contra `APP_API_KEY`.
  - Lê o JSON de configuração.
  - Retorna o payload em formato estável para o app iOS.

Não haverá persistência em banco ou painel de administração nesta V1; a alteração de flags é feita via edição do JSON e novo deploy.

## Arquitetura do Sistema

### Visão Geral dos Componentes

- `config/features.json`  
  - Fonte de verdade para o estado das features.
  - Estrutura:
    ```json
    {
      "features": {
        "unlimited_categories": { "enabled": true },
        "cloud_sync":          { "enabled": true },
        "notion_import":       { "enabled": false },
        "ai_insights":         { "enabled": true }
      }
    }
    ```

- `lib/features.ts`  
  - Responsável por:
    - Definir tipos TypeScript para o objeto de features.
    - Fornecer funções utilitárias de leitura, ex.: `getFeatureFlags()` e `isFeatureEnabled(key)`.
    - Abstrair a forma de carregamento (import estático do JSON ou `fs.readFileSync` em ambiente Node).

- `app/api/features/route.ts`  
  - Endpoint HTTP do App Router:
    - Método: `GET`.
    - Caminho: `/api/features`.
    - Segurança: validação de `x-api-key`.
    - Resposta: JSON contendo o objeto de features lido via `lib/features.ts`.

- `lib/config.ts`  
  - Já existente; continuará responsável por expor `config.app.apiKey` que será reutilizado pelo novo endpoint.

Fluxo de dados (alto nível):

1. App iOS → `GET /api/features` com `x-api-key`.
2. Handler valida `x-api-key` usando `config.app.apiKey`.
3. Handler chama `getFeatureFlags()` para obter o objeto de features.
4. Handler retorna resposta JSON com `{ features: { ... } }`.

## Design de Implementação

### Interfaces Principais

```ts
// lib/features.ts

// Chaves conhecidas de features nesta V1
export type FeatureKey =
  | 'unlimited_categories'
  | 'unlimited_goals'
  | 'unlimited_wallets'
  | 'unlimited_csv_imports'
  | 'cloud_sync'
  | 'cloud_backup'
  | 'notion_import'
  | 'advanced_reports'
  | 'pdf_export'
  | 'excel_export'
  | 'smart_rules'
  | 'ai_insights'
  | 'premium_widgets'

export type FeatureConfig = {
  enabled: boolean
  // campo reservado para futura expansão (ex.: plano, descrição, etc.)
  // plan?: 'free' | 'premium'
  // description?: string
}

export type FeatureFlags = {
  features: Record<FeatureKey | string, FeatureConfig>
}

export function getFeatureFlags(): FeatureFlags
export function isFeatureEnabled(key: FeatureKey): boolean
```

No endpoint:

```ts
// app/api/features/route.ts
export async function GET(request: NextRequest): Promise<NextResponse>
```

### Modelos de Dados

- **Objeto de configuração (JSON)**:
  - Tipo: `FeatureFlags` (conforme acima).
  - Composto por:
    - Campo raiz `features`.
    - Cada feature: `{ enabled: boolean }`.

- **Resposta da API**:
  - Corpo (200):
    - O próprio `FeatureFlags` carregado de `config/features.json`.
  - Em caso de erro:
    - `401 Unauthorized`:
      - `{ "error": "Unauthorized", "message": "Invalid or missing x-api-key" }`

### Endpoints de API

- `GET /api/features`
  - **Headers obrigatórios**:
    - `x-api-key: <APP_API_KEY>`
  - **Resposta (200)**:
    - Body:
      ```json
      {
        "features": {
          "unlimited_categories": { "enabled": true },
          "cloud_sync":          { "enabled": true },
          "notion_import":       { "enabled": false },
          "ai_insights":         { "enabled": true }
        }
      }
      ```
  - **Erros**:
    - `401` – `x-api-key` ausente/inválido.
    - `500` – falha ao carregar ou parsear `config/features.json`.

## Pontos de Integração

- Não há integrações externas novas nesta V1.
- O endpoint reutiliza:
  - `lib/config.ts` para acesso a `APP_API_KEY`.
  - O mesmo padrão de validação já usado em `/api/notion/expenses`.

## Abordagem de Testes

### Testes Unitários

- `lib/features.ts`:
  - Garantir que `getFeatureFlags()` retorna um objeto com a estrutura esperada.
  - Garantir que `isFeatureEnabled(key)` respeita o valor de `enabled` no JSON.
  - Opcional: testar comportamento quando o JSON está inconsistente (ex.: ausência de uma chave).

### Testes de Integração / Rota

- `GET /api/features`:
  - Cenário sucesso:
    - `x-api-key` válido → status 200, corpo com campo `features` e chaves esperadas.
  - Cenário `x-api-key` inválido:
    - Header ausente ou diferente de `APP_API_KEY` → status 401, corpo com erro.
  - Cenário erro interno:
    - Simular falha de carregamento do JSON (ex.: mock de `getFeatureFlags` lançando erro) → status 500.

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **Definir e validar `config/features.json`**  
   - Já definido no PRD; garantir estrutura correta e chaves de features desejadas.

2. **Implementar `lib/features.ts`**  
   - Tipos `FeatureKey`, `FeatureConfig`, `FeatureFlags`.
   - Implementação de `getFeatureFlags()` usando import estático do JSON.
   - Implementação de `isFeatureEnabled(key)`.

3. **Implementar `GET /api/features`**  
   - Route handler com:
     - Validação de `x-api-key` usando `config.app.apiKey`.
     - Chamada a `getFeatureFlags()`.
     - Tratamento de erros (401, 500).

4. **Testes**  
   - Testes unitários de `lib/features.ts`.
   - Testes de rota (ou testes manuais documentados em `TESTING.md`).

5. **Documentação**  
   - Atualizar `README.md` ou `TESTING.md` com instruções de uso do endpoint de feature flags.

### Dependências Técnicas

- `APP_API_KEY` já configurado em ambiente (usado pelos outros endpoints).
- Ambiente Node/Next.js com suporte a import de JSON (ou alternativa com `fs` se necessário).

## Considerações Técnicas

### Decisões Principais

- **JSON versionado em repositório** em vez de banco de dados:
  - Simples de operar no estágio atual do projeto.
  - Integra-se bem com fluxo de Pull Requests e revisão de código.
- **Formato estruturado com nó raiz `features`**:
  - Facilita adicionar novos atributos por feature no futuro (ex.: `plan`, `description`).
  - Continua simples de consumir no app iOS.
- **Reutilizar `x-api-key` como mecanismo de segurança**:
  - Mantém consistência com endpoints existentes.
  - Evita introduzir novo mecanismo de autenticação nesta V1.

### Riscos Conhecidos

- Necessidade futura de toggles em tempo real (sem deploy) pode exigir migração para store dinâmico (ex.: banco ou KV).
- Features globais (não por usuário) podem não cobrir cenários de planos diferentes (free vs premium) sem evolução do modelo.

### Requisitos Especiais

- O endpoint deve ser leve e com baixa latência (carregamento de um JSON pequeno).
- O contrato de resposta deve ser estável para evitar quebras na app iOS.

### Conformidade com Padrões

- Segue o padrão de organização de PRD/Tech Spec já utilizado em:
  - `tasks/prd-notion-expenses/prd.md`
  - `tasks/prd-notion-expenses/techspec.md`
- Reutiliza convenções de autenticação e organização de rotas de:
  - `app/api/notion/expenses/route.ts`

### Arquivos relevantes

- `config/features.json` – arquivo de configuração de features.
- `lib/features.ts` – utilitário de acesso a feature flags.
- `app/api/features/route.ts` – endpoint HTTP público para o app iOS.
- `lib/config.ts` – acesso a `APP_API_KEY`.



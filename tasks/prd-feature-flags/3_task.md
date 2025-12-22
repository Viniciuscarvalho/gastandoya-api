# [3.0] Implementar utilitário de leitura de features (`lib/features.ts`) (M)

## Objetivo
- Implementar um módulo de utilitários (`lib/features.ts`) responsável por carregar e expor o estado das feature flags definidas em `config/features.json`.

## Subtarefas
- [ ] 3.1 Definir tipos `FeatureKey`, `FeatureConfig` e `FeatureFlags`.
- [ ] 3.2 Implementar função `getFeatureFlags()` para retornar o objeto de flags.
- [ ] 3.3 Implementar função `isFeatureEnabled(key: FeatureKey)` para facilitar o uso em outras partes do código.

## Critérios de Sucesso
- `lib/features.ts` compila sem erros de TypeScript.
- `getFeatureFlags()` retorna a estrutura esperada conforme Tech Spec.
- `isFeatureEnabled()` retorna corretamente o valor de `enabled` para cada feature.

## Dependências
- 1.0 Definir e validar configuração JSON de feature flags.
- 2.0 Especificar PRD e Tech Spec para feature flags.

## Observações
- O carregamento pode ser feito via import estático do JSON (`import featuresConfig from 'config/features.json'`) ou via `fs.readFileSync` (desde que compatível com o ambiente de execução).

## markdown

## status: pending # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>engine/infra/configuration</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>http_server</dependencies>
</task_context>

# Tarefa 3.0: Implementar utilitário de leitura de features (`lib/features.ts`)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Criar um módulo centralizado para leitura das feature flags, abstraindo a origem dos dados (`config/features.json`) e expondo uma API simples para o restante do backend.

<requirements>
- Tipos claros e reutilizáveis.
- Funções síncronas e de baixo custo.
</requirements>

## Subtarefas

- [ ] 3.1 Definir tipos de features.
- [ ] 3.2 Implementar `getFeatureFlags()`.
- [ ] 3.3 Implementar `isFeatureEnabled(key)`.

## Detalhes de Implementação

Ver `tasks/prd-feature-flags/techspec.md` para a definição dos tipos e contrato das funções.

## Critérios de Sucesso

- Módulo utilizado com sucesso pelo endpoint `GET /api/features`.

## Arquivos relevantes
- `lib/features.ts`
- `config/features.json`
- `tasks/prd-feature-flags/techspec.md`







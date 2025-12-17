# [1.0] Definir e validar configuração JSON de feature flags (S)

## Objetivo
- Definir a estrutura e o conteúdo inicial do arquivo `config/features.json`, garantindo que todas as features relevantes estejam presentes no formato acordado (`{ "features": { ... } }`).

## Subtarefas
- [ ] 1.1 Criar o arquivo `config/features.json` com nó raiz `features`.
- [ ] 1.2 Incluir todas as chaves de features definidas no PRD com `{ "enabled": boolean }`.
- [ ] 1.3 Validar manualmente o JSON (formato válido e sem chaves duplicadas).

## Critérios de Sucesso
- `config/features.json` existe, é um JSON válido e contém todas as features esperadas.
- A estrutura segue o padrão documentado no PRD e na Tech Spec.

## Dependências
- Nenhuma dependência técnica além da estrutura básica do projeto.

## Observações
- Esta tarefa já foi parcialmente realizada ao definir o arquivo inicial, mas permanece como referência explícita no plano de implementação.

## markdown

## status: completed # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>engine/infra/configuration</domain>
<type>implementation</type>
<scope>configuration</scope>
<complexity>low</complexity>
<dependencies>http_server</dependencies>
</task_context>

# Tarefa 1.0: Definir e validar configuração JSON de feature flags

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Definir o arquivo `config/features.json` como fonte de verdade para as feature flags globais do backend do GastandoYa.

<requirements>
- Usar nó raiz `features`.
- Incluir todas as features listadas no PRD.
- Cada feature deve ter ao menos o campo `enabled: boolean`.
</requirements>

## Subtarefas

- [ ] 1.1 Criar o arquivo `config/features.json` com o formato base.
- [ ] 1.2 Preencher as chaves de features conforme o PRD.

## Detalhes de Implementação

Ver `tasks/prd-feature-flags/techspec.md` para detalhes sobre o formato do JSON e tipos associados.

## Critérios de Sucesso

- JSON válido e versionado no repositório.
- Compatível com o tipo `FeatureFlags` definido em `lib/features.ts`.

## Arquivos relevantes
- `config/features.json`
- `tasks/prd-feature-flags/prd.md`
- `tasks/prd-feature-flags/techspec.md`




# [3.0] Criar endpoint para listar databases disponíveis (M)

## Objetivo
- Criar um endpoint para retornar databases disponíveis para o usuário, combinando descoberta por `pageId` (Blocks API) e busca por nome (Search API).

## Subtarefas
- [ ] 3.1 Criar rota `GET /api/notion/databases/list`
- [ ] 3.2 Validar headers de segurança (`x-api-key`, `x-user-id`)
- [ ] 3.3 Aceitar `pageId` e/ou `q` (query) e retornar `DatabaseCandidate[]`
- [ ] 3.4 Padronizar erros e respostas (0 encontrados, múltiplos, sem permissão)

## Critérios de Sucesso
- Endpoint retorna lista de databases com `id` e `title`.
- Endpoint funciona com `pageId` (descoberta) e com `q` (search).

## Dependências
- Serviço de discovery implementado (tarefas 1.0 e 2.0).

## Observações
- Esse endpoint é consumido pelo app iOS para permitir escolha do database.

## status: pending

<task_context>
<domain>engine/infra/http_server</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>http_server|external_apis</dependencies>
</task_context>

# Tarefa 3.0: Criar endpoint para listar databases disponíveis

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Expor um endpoint de listagem de databases que o usuário pode selecionar para configurar o `expensesDatabaseId`.

<requirements>
- Criar `GET /api/notion/databases/list`.
- Suportar `pageId` (Blocks API) e `q` (Search API).
- Retornar `DatabaseCandidate[]` com `id` e `title`.
- Manter validação de `x-api-key` e `x-user-id`.
</requirements>

## Subtarefas

- [ ] 3.1 Implementar rota e validações
- [ ] 3.2 Integrar com `NotionDatabaseDiscoveryService`
- [ ] 3.3 Adicionar tratamento de erros consistente

## Detalhes de Implementação

- Referenciar `tasks/prd-notion-database-discovery/techspec.md` (seção “Endpoints de API”).

## Critérios de Sucesso

- Endpoint retorna resultados previsíveis e acionáveis para o app iOS.

## Arquivos relevantes
- `tasks/prd-notion-database-discovery/techspec.md`
- (a criar) `app/api/notion/databases/list/route.ts`
- (a criar/atualizar) `lib/notionDatabaseDiscoveryService.ts`





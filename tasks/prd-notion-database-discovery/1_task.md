# [1.0] Adicionar descoberta automática de databases via Blocks API (M)

## Objetivo
- Implementar descoberta automática de `database_id` quando o database está dentro de uma página do Notion, usando `GET /v1/blocks/{page_id}/children` com paginação.

## Subtarefas
- [ ] 1.1 Criar `NotionDatabaseDiscoveryService.findDatabasesInPage(pageId)`
- [ ] 1.2 Implementar paginação (`next_cursor`) até varrer todos os blocos
- [ ] 1.3 Identificar blocos `child_database` e coletar `database_id`
- [ ] 1.4 Buscar título/metadata do database para exibir ao usuário (retrieve)
- [ ] 1.5 Normalizar IDs (reutilizar `normalizeNotionId`)
- [ ] 1.6 Tratar erros de permissão/objeto não encontrado com mensagens acionáveis

## Critérios de Sucesso
- Dado um `pageId` válido com database inline, o serviço retorna ao menos 1 `database_id`.
- A descoberta funciona mesmo com muitos blocos (paginação completa).
- Erros são diferenciados: sem acesso vs não encontrado.

## Dependências
- PRD e Tech Spec revisados.
- Cliente do Notion existente via `createNotionClient`.

## Observações
- Começar suportando `child_database` (caso mais comum).
- Suporte a `link_to_page` pode ser incremental.

## status: pending

<task_context>
<domain>engine/infra/integrations</domain>
<type>integration</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>external_apis|http_server</dependencies>
</task_context>

# Tarefa 1.0: Adicionar descoberta automática de databases via Blocks API

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar descoberta de databases dentro de uma página do Notion via Blocks API, retornando candidatos com `id` e `title` para o cliente selecionar (quando necessário).

<requirements>
- Listar blocos de `pageId` via `blocks.children.list`.
- Suportar paginação (seguir `next_cursor`).
- Detectar `child_database` e coletar `database_id`.
- Buscar título do database (`databases.retrieve`) para UX.
- Não expor tokens ou dados sensíveis em logs.
</requirements>

## Subtarefas

- [ ] 1.1 Criar `lib/notionDatabaseDiscoveryService.ts` (ou similar) e interface pública
- [ ] 1.2 Implementar varredura paginada de blocks
- [ ] 1.3 Implementar `databases.retrieve` para título/validação
- [ ] 1.4 Adicionar normalização e tratamento de erros

## Detalhes de Implementação

- Referenciar `tasks/prd-notion-database-discovery/techspec.md` (seções “Algoritmo: descobrir database dentro de página” e “Pontos de Integração”).

## Critérios de Sucesso

- Para uma página com database inline, retorna lista com `database_id` e `title`.
- Para página sem database, retorna erro/resultado vazio conforme contrato.
- Paginação funciona e não falha em páginas grandes.

## Arquivos relevantes
- `tasks/prd-notion-database-discovery/prd.md`
- `tasks/prd-notion-database-discovery/techspec.md`
- (a criar) `lib/notionDatabaseDiscoveryService.ts`
- `lib/notionClient.ts`
- `lib/notionId.ts`





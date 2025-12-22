# [2.0] Adicionar busca de databases via Search API (S)

## Objetivo
- Implementar descoberta de databases via `POST /v1/search` filtrando por `object=database`, para localizar databases pelo nome quando o usuário souber o nome (ex.: “GASTOS”).

## Subtarefas
- [ ] 2.1 Criar método `searchDatabases(query)` no serviço de discovery
- [ ] 2.2 Aplicar filtro `object: database` na Search API
- [ ] 2.3 Mapear resultados para `DatabaseCandidate` (`id`, `title`, `source`)
- [ ] 2.4 Normalizar IDs e deduplicar resultados

## Critérios de Sucesso
- Buscar por nome retorna lista de databases acessíveis ao token do usuário.
- Resultado inclui `id` e `title`.

## Dependências
- Cliente do Notion existente.

## Observações
- Útil como alternativa rápida quando o database não está inline, ou para evitar depender da estrutura da página.

## status: pending

<task_context>
<domain>engine/infra/integrations</domain>
<type>integration</type>
<scope>core_feature</scope>
<complexity>low</complexity>
<dependencies>external_apis|http_server</dependencies>
</task_context>

# Tarefa 2.0: Adicionar busca de databases via Search API

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Adicionar suporte a busca por databases via Search API para permitir localizar databases pelo nome e obter o `database_id` correto.

<requirements>
- Usar `POST /v1/search` com filtro `object=database`.
- Retornar `DatabaseCandidate[]` com `id` e `title`.
- Reutilizar normalização de IDs.
</requirements>

## Subtarefas

- [ ] 2.1 Implementar `searchDatabases(query)` no serviço
- [ ] 2.2 Mapear response e retornar candidatos

## Detalhes de Implementação

- Referenciar `tasks/prd-notion-database-discovery/techspec.md` (seção “Algoritmo: Search API por nome”).

## Critérios de Sucesso

- Busca por “GASTOS” retorna databases acessíveis ao usuário (quando existirem).

## Arquivos relevantes
- `tasks/prd-notion-database-discovery/techspec.md`
- (a criar/atualizar) `lib/notionDatabaseDiscoveryService.ts`





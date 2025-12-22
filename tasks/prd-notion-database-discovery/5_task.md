# [5.0] Testes e documentação (M)

## Objetivo
- Garantir qualidade e regressão mínima: testes para discovery (blocks/search) e documentação do novo fluxo/endpoints.

## Subtarefas
- [ ] 5.1 Adicionar testes unitários para `findDatabasesInPage` (paginação, 0/1/N resultados)
- [ ] 5.2 Adicionar testes unitários para `searchDatabases`
- [ ] 5.3 Adicionar testes para os novos endpoints/fluxos (list e config)
- [ ] 5.4 Atualizar documentação do projeto (README/TESTING/DEPLOY se aplicável)
- [ ] 5.5 Documentar exemplos de uso (curl) para pageId e search

## Critérios de Sucesso
- Testes cobrem casos principais e rodar no CI/local.
- Documentação permite um dev júnior configurar e testar o fluxo.

## Dependências
- Implementação das tarefas 1.0–4.0.

## Observações
- Mockar Notion API para evitar flakiness.

## status: completed

<task_context>
<domain>engine/infra/testing</domain>
<type>testing</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>external_apis|http_server</dependencies>
</task_context>

# Tarefa 5.0: Testes e documentação

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Adicionar testes unitários/integração básica e documentação para o novo fluxo de descoberta/configuração de database do Notion.

<requirements>
- Testar paginação de blocks e detecção de `child_database`.
- Testar Search API filtrando `database`.
- Testar novos contratos de endpoints.
- Documentar exemplos de uso e troubleshooting.
</requirements>

## Subtarefas

- [ ] 5.1 Implementar testes para o serviço de discovery
- [ ] 5.2 Implementar testes para endpoints
- [ ] 5.3 Atualizar documentação do repositório

## Detalhes de Implementação

- Referenciar `tasks/prd-notion-database-discovery/techspec.md` (seção “Abordagem de Testes”).

## Critérios de Sucesso

- Suite de testes cobre casos críticos.
- Docs atualizados com exemplos de `pageId` e `q`.

## Arquivos relevantes
- `__tests__/`
- `TESTING.md`
- `README.md`
- `tasks/prd-notion-database-discovery/*`



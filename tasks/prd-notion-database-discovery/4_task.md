# [4.0] Melhorar fluxo de configuração do database (pageId → databaseId) (M)

## Objetivo
- Ajustar o endpoint existente de configuração do database para aceitar `pageId` e descobrir o `databaseId` automaticamente, com fallback para configuração manual.

## Subtarefas
- [ ] 4.1 Atualizar contrato do `POST /api/notion/config/database` para aceitar `pageId` e/ou `databaseId`
- [ ] 4.2 Se `databaseId` presente: validar e persistir
- [ ] 4.3 Se `pageId` presente: descobrir databases na página
- [ ] 4.4 Se 1 database encontrado: persistir automaticamente
- [ ] 4.5 Se múltiplos encontrados: retornar erro + lista para escolha
- [ ] 4.6 Se nenhum encontrado: retornar erro acionável

## Critérios de Sucesso
- Usuário consegue configurar o database enviando apenas `pageId` quando houver 1 database inline.
- Em caso de múltiplos, o backend retorna candidatos para o app escolher.
- Em caso de falha, mensagem orienta como corrigir (compartilhar página/database).

## Dependências
- Serviço de discovery (tarefas 1.0/2.0).
- Endpoint de listagem (tarefa 3.0) opcional, mas recomendado.

## Observações
- Deve manter a validação existente de segurança e não quebrar clientes atuais (backward compatible quando possível).

## status: pending

<task_context>
<domain>engine/infra/http_server</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>http_server|external_apis</dependencies>
</task_context>

# Tarefa 4.0: Melhorar fluxo de configuração do database (pageId → databaseId)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Melhorar a configuração do database de despesas para suportar descoberta automática a partir de `pageId`, reduzindo fricção e erros de configuração manual.

<requirements>
- Atualizar `POST /api/notion/config/database` para aceitar `pageId`.
- Descobrir `database_id` via Blocks API quando `databaseId` não for informado.
- Retornar erro + lista quando houver múltiplos candidatos.
- Persistir `expensesDatabaseId` no `UserNotionConnectionStore`.
</requirements>

## Subtarefas

- [ ] 4.1 Atualizar rota e validações
- [ ] 4.2 Implementar lógica de decisão (databaseId vs pageId)
- [ ] 4.3 Persistir e retornar resposta consistente

## Detalhes de Implementação

- Referenciar `tasks/prd-notion-database-discovery/techspec.md` (seção “POST /api/notion/config/database”).

## Critérios de Sucesso

- Configuração via `pageId` funciona e evita erros “sem acesso” quando database está inline.

## Arquivos relevantes
- `app/api/notion/config/database/route.ts`
- `lib/userNotionConnectionStore.ts`
- (a criar/atualizar) `lib/notionDatabaseDiscoveryService.ts`





# [1.0] Configurar OAuth com Notion e vínculo por usuário (L)

## Objetivo
- Implementar o fluxo OAuth com o Notion para que cada usuário do GastandoYa possa conectar sua conta Notion e ter um vínculo persistente (`UserNotionConnection`) no backend.

## Subtarefas
- [ ] 1.1 Implementar rota `/api/notion/oauth/authorize` para redirecionar o usuário ao Notion
- [ ] 1.2 Implementar rota `/api/notion/oauth/callback` para trocar `code` por `access_token`
- [ ] 1.3 Persistir `UserNotionConnection` (userId, accessToken, workspaceId, expensesDatabaseId opcional)
- [ ] 1.4 Tratar erros de OAuth e garantir que tokens não sejam logados

## Critérios de Sucesso
- Usuário consegue iniciar o fluxo de autorização e ser redirecionado para o Notion.
- Após o callback, o backend obtém `access_token` válido e o associa ao usuário.
- Os dados essenciais do vínculo (`userId`, `accessToken`, `workspaceId`) são persistidos com segurança.
- Erros de OAuth retornam respostas claras para o cliente, sem vazamento de credenciais.

## Dependências
- PRD e Tech Spec da funcionalidade Notion Expenses revisados.
- Credenciais OAuth do Notion configuradas em variáveis de ambiente (`NOTION_CLIENT_ID`, `NOTION_CLIENT_SECRET`, redirect URI).

## Observações
- Ver `tasks/prd-notion-expenses/prd.md` para objetivos de negócio e escopo.
- Ver `tasks/prd-notion-expenses/techspec.md` para detalhes de arquitetura e fluxo OAuth.

## markdown

## status: pending # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>engine/infra/integrations</domain>
<type>integration</type>
<scope>core_feature</scope>
<complexity>high</complexity>
<dependencies>external_apis|database|http_server</dependencies>
</task_context>

# Tarefa 1.0: Configurar OAuth com Notion e vínculo por usuário

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Configurar o fluxo de autenticação OAuth com o Notion para permitir que usuários do GastandoYa conectem suas contas Notion, armazenando com segurança o token e metadados necessários para futuras consultas de despesas.

<requirements>
- Utilizar o endpoint oficial de OAuth do Notion conforme documentação [`https://developers.notion.com/reference/intro`].
- Armazenar `access_token` e `workspace_id` em um modelo `UserNotionConnection`.
- Garantir que nenhum token seja exposto em logs ou retornos de API.
- Suportar associação clara entre usuário do app (`userId`) e vínculo Notion.
</requirements>

## Subtarefas

- [ ] 1.1 Criar rota `/api/notion/oauth/authorize` seguindo o fluxo descrito na Tech Spec
- [ ] 1.2 Criar rota `/api/notion/oauth/callback` para processar `code` e `state`
- [ ] 1.3 Implementar `UserNotionConnectionStore` (mesmo que inicialmente em memória/stub)
- [ ] 1.4 Adicionar tratamento de erros e logging sem dados sensíveis

## Detalhes de Implementação

- Seguir as definições de fluxo e interfaces descritas em `tasks/prd-notion-expenses/techspec.md` (seções de OAuth e `UserNotionConnectionStore`).
- Utilizar variáveis de ambiente para `NOTION_CLIENT_ID`, `NOTION_CLIENT_SECRET` e redirect URI.

## Critérios de Sucesso

- Usuário consegue completar o fluxo OAuth com o Notion sem erros.
- Registro `UserNotionConnection` é criado/atualizado corretamente para o `userId` correspondente.
- Não há exposição de tokens em logs nem em respostas HTTP.

## Arquivos relevantes
- `tasks/prd-notion-expenses/prd.md`
- `tasks/prd-notion-expenses/techspec.md`
- (a serem criados) `app/api/notion/oauth/authorize/route.ts`
- (a serem criados) `app/api/notion/oauth/callback/route.ts`
- (a serem criados) `lib/userNotionConnectionStore.ts`












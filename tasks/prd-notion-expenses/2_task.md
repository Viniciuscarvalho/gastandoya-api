# [2.0] Implementar serviço NotionExpensesService e client do Notion (M)

## Objetivo
- Encapsular o acesso ao Notion em um serviço (`NotionExpensesService`) usando o client oficial `@notionhq/client`, responsável por consultar o database de despesas e retornar dados brutos prontos para transformação em `ExpenseDTO`.

## Subtarefas
- [ ] 2.1 Criar client reutilizável para o Notion (`lib/notionClient.ts`)
- [ ] 2.2 Implementar `NotionExpensesService` com `databases.query` e paginação
- [ ] 2.3 Definir função de transformação de página Notion → modelo interno
- [ ] 2.4 Tratar erros e limites de requisição da API Notion

## Critérios de Sucesso
- Serviço consegue consultar o database de despesas de um usuário usando `access_token` e `database_id`.
- Páginas retornadas são percorridas corretamente com suporte a paginação (`has_more` / `next_cursor`).
- Erros da Notion API são tratados e encapsulados em erros de domínio próprios.

## Dependências
- Tarefa 1.0 (vínculo `UserNotionConnection` por usuário) implementada.
- Credenciais de ambiente para a Notion API (`NOTION_API_VERSION`) configuradas.

## Observações
- Ver PRD e Tech Spec para requisitos de campos e mapeamento de propriedades do Notion.

## markdown

## status: pending # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>engine/infra/integrations</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>external_apis|http_server</dependencies>
</task_context>

# Tarefa 2.0: Implementar serviço NotionExpensesService e client do Notion

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Criar um serviço centralizado para integração com a Notion API que, dado um `UserNotionConnection`, consulta o database de despesas associado e retorna dados consistentes para uso pelo backend do GastandoYa.

<requirements>
- Utilizar o SDK `@notionhq/client` conforme exemplos oficiais [`/makenotion/notion-sdk-js`] e docs [`https://developers.notion.com/reference/intro`].
- Implementar função `fetchExpensesForUser(userId: string): Promise<ExpenseDTO[]>` conforme definido na Tech Spec.
- Tratar paginação (`has_more`, `next_cursor`) de forma transparente para o chamador.
- Encapsular detalhes de autenticação (tokens, headers, versão da API) no client interno.
</requirements>

## Subtarefas

- [ ] 2.1 Criar módulo `lib/notionClient.ts` que instancia `Client` com `auth` dinâmico por usuário
- [ ] 2.2 Implementar `lib/notionExpensesService.ts` com interface `NotionExpensesService`
- [ ] 2.3 Implementar função de transformação `notionPageToExpenseDTO` conforme mapeamento definido
- [ ] 2.4 Adicionar tratamento de erros e logs mínimos (sem dados sensíveis)

## Detalhes de Implementação

- Seguir interfaces e modelos definidos em `tasks/prd-notion-expenses/techspec.md` (seções `NotionService`, `NotionExpensesService` e mapeamento de propriedades).
- Integrar com `UserNotionConnectionStore` para obter `accessToken` e `expensesDatabaseId` por usuário.

## Critérios de Sucesso

- Dado um `userId` com vínculo Notion válido, `NotionExpensesService.fetchExpensesForUser` retorna uma lista de `ExpenseDTO[]`.
- Erros da Notion API são encapsulados e não expõem detalhes internos ao chamador.

## Arquivos relevantes
- `tasks/prd-notion-expenses/prd.md`
- `tasks/prd-notion-expenses/techspec.md`
- (a serem criados) `lib/notionClient.ts`
- (a serem criados) `lib/notionExpensesService.ts`










# [3.0] Implementar rota GET /api/notion/expenses com segurança (M)

## Objetivo
- Expor a rota `GET /api/notion/expenses` no Next.js, validando `x-api-key` e identificando o usuário, chamando o `NotionExpensesService` e retornando uma lista de `ExpenseDTO[]` para o app iOS.

## Subtarefas
- [ ] 3.1 Criar route handler `app/api/notion/expenses/route.ts`
- [ ] 3.2 Implementar validação de header `x-api-key` (`APP_API_KEY`)
- [ ] 3.3 Resolver identificação de usuário (`x-user-id` ou mecanismo definido)
- [ ] 3.4 Integrar com `NotionExpensesService` e formatar resposta JSON

## Critérios de Sucesso
- A rota responde 200 com `ExpenseDTO[]` quando o usuário possui vínculo Notion válido.
- A rota responde 401 se o `x-api-key` for inválido ou ausente.
- A rota responde 404 se o usuário não tiver conexão Notion configurada.

## Dependências
- Tarefa 1.0 (vínculo Notion por usuário) e 2.0 (serviço NotionExpensesService) concluídas.

## Observações
- A rota será consumida pelo app iOS e deve manter contrato estável.

## markdown

## status: pending # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>engine/infra/http</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>http_server|external_apis</dependencies>
</task_context>

# Tarefa 3.0: Implementar rota GET /api/notion/expenses com segurança

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Criar o endpoint principal para o app iOS consumir as despesas do Notion, garantindo autenticação mínima via `x-api-key` e integração correta com o serviço de despesas.

<requirements>
- Implementar route handler em Next.js App Router (`app/api/notion/expenses/route.ts`).
- Validar `x-api-key` contra `process.env.APP_API_KEY`.
- Identificar o usuário do GastandoYa de forma consistente (header ou outro mecanismo definido).
- Retornar `ExpenseDTO[]` em caso de sucesso, com códigos de erro adequados em falhas.
</requirements>

## Subtarefas

- [ ] 3.1 Criar handler `GET` que leia headers (`x-api-key`, `x-user-id`)
- [ ] 3.2 Implementar validação de segurança e respostas 401/403
- [ ] 3.3 Chamar `NotionExpensesService.fetchExpensesForUser(userId)` e retornar JSON
- [ ] 3.4 Tratar erros de integração com Notion (ex.: 404 para usuário sem vínculo, 502 para falha externa)

## Detalhes de Implementação

- Seguir assinatura e comportamento esperados definidos em `tasks/prd-notion-expenses/techspec.md` (seção de endpoints).
- Utilizar objetos `Response`/`NextResponse` nativos do Next.js para formar as respostas.

## Critérios de Sucesso

- App iOS consegue consumir `GET /api/notion/expenses` e receber uma lista de despesas válidas.
- Casos de erro conhecidos retornam status code e mensagens previsíveis, sem vazar detalhes de integrações.

## Arquivos relevantes
- `tasks/prd-notion-expenses/prd.md`
- `tasks/prd-notion-expenses/techspec.md`
- (a serem criados) `app/api/notion/expenses/route.ts`
- `lib/notionExpensesService.ts`


















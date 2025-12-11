# [4.0] Implementar testes (unitários e integração básica) (M)

## Objetivo
- Garantir que a lógica de transformação e a rota `GET /api/notion/expenses` funcionem conforme o esperado por meio de testes unitários e alguns testes de integração com mocks.

## Subtarefas
- [ ] 4.1 Escrever testes unitários para `notionPageToExpenseDTO`
- [ ] 4.2 Escrever testes unitários para `NotionExpensesService`
- [ ] 4.3 Escrever testes de integração para a rota `GET /api/notion/expenses`
- [ ] 4.4 Configurar ambiente de testes (framework, scripts) se necessário

## Critérios de Sucesso
- Cobertura adequada da lógica de transformação e da rota principal.
- Casos de erro (401, 404, 502) validados em testes.

## Dependências
- Tarefas 1.0, 2.0 e 3.0 concluídas (fluxo funcional pronto).

## Observações
- A escolha de framework de testes (ex.: Jest, Vitest) deve seguir padrões do projeto.

## markdown

## status: pending # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>engine/infra/testing</domain>
<type>testing</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>http_server|external_apis</dependencies>
</task_context>

# Tarefa 4.0: Implementar testes (unitários e integração básica)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Adicionar testes automatizados para garantir estabilidade da integração com Notion e da API exposta ao app iOS, cobrindo tanto a lógica de domínio quanto o endpoint principal.

<requirements>
- Testar mapeamento de propriedades Notion → `ExpenseDTO`.
- Testar comportamento do `NotionExpensesService` com paginação e erros simulados.
- Testar a rota `GET /api/notion/expenses` para cenários de sucesso e falha.
</requirements>

## Subtarefas

- [ ] 4.1 Configurar ambiente de testes (caso ainda não exista)
- [ ] 4.2 Criar testes unitários para funções de transformação
- [ ] 4.3 Criar testes unitários/integração para `NotionExpensesService`
- [ ] 4.4 Criar testes de integração para a rota `GET /api/notion/expenses`

## Detalhes de Implementação

- Utilizar mocks para o client `@notionhq/client` e para `UserNotionConnectionStore`, evitando chamadas reais ao Notion.
- Seguir as recomendações da Tech Spec na seção de abordagem de testes.

## Critérios de Sucesso

- Testes passam consistentemente em ambiente local/CI.
- Regressões básicas na integração com Notion são detectadas pelos testes.

## Arquivos relevantes
- `tasks/prd-notion-expenses/prd.md`
- `tasks/prd-notion-expenses/techspec.md`
- Arquivos de teste relacionados aos módulos: transformação, serviço e rota.














# [5.0] Testar e documentar consumo do endpoint de feature flags (S)

## Objetivo
- Garantir que o endpoint `GET /api/features` funcione corretamente em diferentes cenários e documentar como o app iOS deve consumi-lo.

## Subtarefas
- [ ] 5.1 Criar testes unitários para `lib/features.ts` (quando aplicável).
- [ ] 5.2 Testar manualmente `GET /api/features` com `curl` ou ferramenta similar.
- [ ] 5.3 Atualizar `TESTING.md` ou `README.md` com instruções de uso do endpoint.

## Critérios de Sucesso
- Testes (automatizados ou manuais) cobrindo sucesso e falhas de autenticação.
- Documentação clara para o time iOS sobre como consumir o endpoint.

## Dependências
- 4.0 Implementar endpoint GET /api/features com validação de x-api-key.

## Observações
- Pode reutilizar o padrão de documentação já usado para endpoints de Notion.

## markdown

## status: pending # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>engine/infra/testing</domain>
<type>testing</type>
<scope>core_feature</scope>
<complexity>low</complexity>
<dependencies>http_server</dependencies>
</task_context>

# Tarefa 5.0: Testar e documentar consumo do endpoint de feature flags

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Validar o comportamento do endpoint de feature flags e registrar como ele deve ser utilizado pelo app iOS.

<requirements>
- Cobrir cenários de sucesso e erro.
- Atualizar documentação de testes/uso.
</requirements>

## Subtarefas

- [ ] 5.1 Escrever testes e/ou cenários de teste manual.
- [ ] 5.2 Atualizar documentação.

## Detalhes de Implementação

Ver `tasks/prd-feature-flags/techspec.md` e `TESTING.md` para padrão de documentação de endpoints.

## Critérios de Sucesso

- Time iOS consegue consumir o endpoint apenas lendo a documentação.

## Arquivos relevantes
- `TESTING.md`
- `README.md`
- `app/api/features/route.ts`
- `lib/features.ts`



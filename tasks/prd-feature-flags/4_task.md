# [4.0] Implementar endpoint GET /api/features com validação de x-api-key (M)

## Objetivo
- Implementar o endpoint `GET /api/features` usando o App Router do Next.js, reutilizando a validação de `x-api-key` e retornando o objeto de feature flags lido de `lib/features.ts`.

## Subtarefas
- [ ] 4.1 Criar o arquivo `app/api/features/route.ts`.
- [ ] 4.2 Implementar validação de `x-api-key` usando `config.app.apiKey`.
- [ ] 4.3 Integrar com `getFeatureFlags()` para retornar o JSON ao cliente.

## Critérios de Sucesso
- Endpoint responde `200` com o JSON esperado quando `x-api-key` é válido.
- Endpoint responde `401` quando `x-api-key` é inválido ou ausente.

## Dependências
- 3.0 Implementar utilitário de leitura de features (`lib/features.ts`).

## Observações
- Seguir o padrão de implementação de `app/api/notion/expenses/route.ts` para logs e tratamento de erros.

## markdown

## status: pending # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>engine/infra/http_api</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>http_server</dependencies>
</task_context>

# Tarefa 4.0: Implementar endpoint GET /api/features

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Criar o endpoint HTTP que será consumido pelo app iOS para obter o estado das feature flags globais.

<requirements>
- Mesma validação de segurança dos endpoints existentes.
- Resposta no formato definido na Tech Spec.
</requirements>

## Subtarefas

- [ ] 4.1 Criar handler GET em `app/api/features/route.ts`.
- [ ] 4.2 Validar `x-api-key`.
- [ ] 4.3 Retornar `FeatureFlags` em caso de sucesso.

## Detalhes de Implementação

Ver `tasks/prd-feature-flags/techspec.md` para detalhes sobre o contrato do endpoint.

## Critérios de Sucesso

- Endpoint acessível em produção e funcional conforme especificação.

## Arquivos relevantes
- `app/api/features/route.ts`
- `lib/features.ts`
- `lib/config.ts`
- `tasks/prd-feature-flags/techspec.md`







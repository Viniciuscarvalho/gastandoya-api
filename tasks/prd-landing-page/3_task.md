# [3.0] Implementar seções adicionais (Integrações, Premium, FAQ) (M)

## Objetivo
- Criar seções complementares da landing: Integrações (Notion, iCloud), Recursos Premium e FAQ.

## Subtarefas
- [ ] 3.1 Criar componente `IntegrationsSection` (Notion + iCloud sync)
- [ ] 3.2 Criar componente `PremiumSection` (lista de recursos premium)
- [ ] 3.3 Criar componente `FAQSection` com accordion
- [ ] 3.4 Criar arquivo de dados `faq.ts` com perguntas frequentes
- [ ] 3.5 Integrar seções na página principal (após Features)
- [ ] 3.6 Garantir consistência visual com seções anteriores

## Critérios de Sucesso
- Seção de integrações destaca Notion e iCloud.
- Seção Premium lista recursos com ícones/badges.
- FAQ funciona com accordion (abre/fecha).
- Visual consistente com o resto da landing.

## Dependências
- Tarefa 2.0 concluída (layout base e features).

## Observações
- FAQ pode ter 5-8 perguntas iniciais (ex.: "O que é o GastandoYa?", "Como funciona a integração com Notion?", etc.).

## status: pending

<task_context>
<domain>frontend</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>medium</complexity>
<dependencies>task_2.0</dependencies>
</task_context>

# Tarefa 3.0: Seções adicionais

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar seções complementares da landing para cobrir integrações, recursos premium e FAQ.

<requirements>
- Seção de integrações (Notion, iCloud).
- Seção de recursos premium com lista visual.
- FAQ com accordion funcional.
</requirements>

## Detalhes de Implementação

Seguir padrão visual definido na tarefa 2.0 e dados do PRD.

## Critérios de Sucesso

- Seções integradas e funcionais.
- Accordion do FAQ abre/fecha corretamente.
- Visual consistente.

## Arquivos relevantes
- `frontend/src/components/IntegrationsSection.tsx`
- `frontend/src/components/PremiumSection.tsx`
- `frontend/src/components/FAQSection.tsx`
- `frontend/src/content/faq.ts`


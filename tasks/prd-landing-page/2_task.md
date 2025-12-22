# [2.0] Implementar layout base e seções principais (Hero, Features Scrollytelling) (L)

## Objetivo
- Criar o layout visual "disruptivo" da landing com Hero section e seção de funcionalidades baseada nas telas do app (scrollytelling).

## Subtarefas
- [ ] 2.1 Definir paleta de cores, tipografia e variáveis CSS (tema dark, verde/teal accent)
- [ ] 2.2 Criar componente `Hero` com headline, subheadline e CTA
- [ ] 2.3 Criar componente `PhoneMock` para exibir screenshots do app
- [ ] 2.4 Criar componente `FeatureSection` com scroll-based highlight
- [ ] 2.5 Criar arquivo de dados `features.ts` com todas as funcionalidades (baseado nas telas)
- [ ] 2.6 Integrar Hero + Features na página principal
- [ ] 2.7 Adicionar animações CSS leves (fade, slide)
- [ ] 2.8 Garantir responsividade (mobile-first)

## Critérios de Sucesso
- Hero exibe mensagem clara e CTA funcional.
- Seção de features mostra todas as 8 telas com descrições.
- Layout é responsivo (funciona em mobile e desktop).
- Animações não impactam performance significativamente.

## Dependências
- Tarefa 1.0 concluída (scaffold do frontend).
- Imagens das telas em `public/screens/` (ou placeholders).

## Observações
- Ver PRD para lista de funcionalidades e telas.
- Usar nomes de arquivo esperados: `screen-1.png` a `screen-8.png` (ou similar).

## status: pending

<task_context>
<domain>frontend</domain>
<type>implementation</type>
<scope>core_feature</scope>
<complexity>high</complexity>
<dependencies>task_1.0</dependencies>
</task_context>

# Tarefa 2.0: Layout base e seções principais

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar o layout visual principal da landing com Hero e seção de funcionalidades usando as telas do app como prova visual, seguindo o conceito "disruptivo" descrito no PRD.

<requirements>
- Hero com headline impactante, subheadline e CTA.
- Seção de features com scroll-based highlighting (scrollytelling).
- Componente PhoneMock para exibir screenshots.
- Responsividade mobile-first.
- Animações CSS leves.
</requirements>

## Detalhes de Implementação

Seguir `tasks/prd-landing-page/techspec.md` e `prd.md` para lista de funcionalidades e decisões de UI.

## Critérios de Sucesso

- Todas as 8 telas representadas.
- Layout funciona em mobile e desktop.
- Performance ok (sem JS pesado).

## Arquivos relevantes
- `tasks/prd-landing-page/prd.md`
- `tasks/prd-landing-page/techspec.md`
- `frontend/src/app/page.tsx`
- `frontend/src/components/Hero.tsx`
- `frontend/src/components/PhoneMock.tsx`
- `frontend/src/components/FeatureSection.tsx`
- `frontend/src/content/features.ts`





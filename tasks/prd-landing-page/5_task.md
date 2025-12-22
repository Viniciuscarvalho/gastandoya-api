# [5.0] SEO, performance e acessibilidade (M)

## Objetivo
- Adicionar metadados SEO, OpenGraph, sitemap/robots, otimização de imagens e garantir acessibilidade.

## Subtarefas
- [ ] 5.1 Configurar metadata no `layout.tsx` (title, description, viewport)
- [ ] 5.2 Adicionar OpenGraph tags (og:title, og:description, og:image)
- [ ] 5.3 Adicionar favicon e apple-touch-icon
- [ ] 5.4 Criar `public/sitemap.xml` e `public/robots.txt`
- [ ] 5.5 Otimizar imagens (formato WebP, lazy loading)
- [ ] 5.6 Garantir headings semânticos (h1, h2, h3)
- [ ] 5.7 Garantir alt text em todas as imagens
- [ ] 5.8 Garantir contraste adequado e navegação por teclado
- [ ] 5.9 Rodar Lighthouse e corrigir issues (meta: ≥90 mobile)

## Critérios de Sucesso
- Página tem title, description e OG tags.
- sitemap.xml e robots.txt existem.
- Lighthouse score ≥90 (Performance, Accessibility, SEO).
- Imagens otimizadas e com alt text.

## Dependências
- Tarefa 4.0 concluída (landing completa).

## Observações
- og:image pode ser uma imagem de preview da landing ou mockup do app.

## status: pending

<task_context>
<domain>frontend</domain>
<type>implementation</type>
<scope>performance</scope>
<complexity>medium</complexity>
<dependencies>task_4.0</dependencies>
</task_context>

# Tarefa 5.0: SEO, performance e acessibilidade

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Adicionar SEO, OG tags, sitemap/robots, otimização de imagens e garantir acessibilidade e performance.

<requirements>
- Metadados SEO completos.
- OpenGraph para compartilhamento.
- sitemap.xml e robots.txt.
- Lighthouse ≥90.
- Acessibilidade (alt, headings, contraste, teclado).
</requirements>

## Detalhes de Implementação

Seguir boas práticas de SEO e acessibilidade. Usar metadata API do Next.js.

## Critérios de Sucesso

- Lighthouse ≥90 em mobile.
- Página indexável e compartilhável.

## Arquivos relevantes
- `frontend/src/app/layout.tsx`
- `frontend/public/sitemap.xml`
- `frontend/public/robots.txt`
- `frontend/public/favicon.ico`





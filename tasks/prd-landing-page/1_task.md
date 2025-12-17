# [1.0] Scaffold do projeto frontend (Next.js + Tailwind + export estático) (M)

## Objetivo
- Criar a estrutura inicial do projeto `frontend/` com Next.js (App Router), TailwindCSS e configuração para export estático (`output: 'export'`).

## Subtarefas
- [ ] 1.1 Inicializar projeto Next.js em `frontend/` com TypeScript
- [ ] 1.2 Configurar TailwindCSS e PostCSS
- [ ] 1.3 Configurar `next.config.js` com `output: 'export'` para build estático
- [ ] 1.4 Criar estrutura de pastas (`src/app`, `src/components`, `src/content`, `public/screens`)
- [ ] 1.5 Criar layout base (`layout.tsx`) com fonte e tema dark
- [ ] 1.6 Criar página inicial (`page.tsx`) com placeholder
- [ ] 1.7 Adicionar scripts de dev/build no `package.json`
- [ ] 1.8 Criar `frontend/README.md` com instruções de execução

## Critérios de Sucesso
- `npm run dev` roda sem erros e exibe página placeholder.
- `npm run build` gera pasta `out/` com HTML estático.
- TailwindCSS funciona (classes utilitárias aplicadas).
- Estrutura de pastas preparada para receber componentes e assets.

## Dependências
- PRD e Tech Spec revisados.

## Observações
- Ver `tasks/prd-landing-page/techspec.md` para decisões de arquitetura.
- A fonte e tema podem ser ajustados na tarefa 2.0, mas o scaffold deve ter um fallback funcional.

## status: pending

<task_context>
<domain>frontend</domain>
<type>implementation</type>
<scope>configuration</scope>
<complexity>medium</complexity>
<dependencies>none</dependencies>
</task_context>

# Tarefa 1.0: Scaffold do projeto frontend

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Criar a base do projeto `frontend/` usando Next.js 14+ (App Router), TailwindCSS e configuração para export estático compatível com Cloudflare Pages.

<requirements>
- Usar Next.js com App Router e TypeScript.
- Configurar TailwindCSS com tema dark (cores: preto, verde/teal, branco).
- Configurar `output: 'export'` no `next.config.js`.
- Criar pasta `public/screens/` para receber screenshots do app.
- Criar `frontend/README.md` com instruções de dev/build.
</requirements>

## Detalhes de Implementação

Seguir as definições em `tasks/prd-landing-page/techspec.md` (seções de Arquitetura e Design de Implementação).

## Critérios de Sucesso

- Build estático funciona (`npm run build` gera `out/`).
- Dev server funciona (`npm run dev`).
- TailwindCSS aplicado corretamente.

## Arquivos relevantes
- `tasks/prd-landing-page/prd.md`
- `tasks/prd-landing-page/techspec.md`
- (a criar) `frontend/package.json`
- (a criar) `frontend/next.config.js`
- (a criar) `frontend/tailwind.config.ts`
- (a criar) `frontend/src/app/layout.tsx`
- (a criar) `frontend/src/app/page.tsx`


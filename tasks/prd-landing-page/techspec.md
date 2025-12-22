# Template de Especificação Técnica

## Resumo Executivo

Implementar uma **landing page estática** em um novo projeto `frontend/` usando **Next.js (App Router) + TailwindCSS**, com export estático para deploy no **Cloudflare Pages** e domínio `www.gastandoya.com.br`. A página terá seções ricas em UI (narrativa em scroll, destaques, “phone mock”) e uma área de contato via **`mailto:contato@gastandoya.com.br`**. O frontend será **isolado do backend** existente (API), sem chamadas obrigatórias para renderização.

## Arquitetura do Sistema

### Visão Geral dos Componentes

- **Frontend (Next.js estático)** (`frontend/`)
  - Renderiza a landing com seções e componentes UI.
  - Usa assets em `frontend/public/screens/` para representar as funcionalidades do app.
  - Exporta HTML/CSS/JS estático (`next.config` com `output: 'export'`).

- **Cloudflare Pages**
  - Faz build do `frontend/` e publica o artefato estático.
  - Faz o bind do domínio `www.gastandoya.com.br` via DNS (CNAME) e HTTPS automático.

- **Backend (API existente)**
  - Não é dependência para a landing (mantém deploy e DNS atuais).

## Design de Implementação

### Interfaces Principais

Não há APIs internas para a landing (site estático). O único “contrato” é:
- Convenção de nomes/paths dos assets de tela em `public/screens/` (para não quebrar as seções).
- Componentes React internos para organizar a UI.

### Modelos de Dados

Estruturas simples em TypeScript para conteúdo estático:
- `Feature` (id, título, subtítulo, descrição, tags, imagem, contexto)
- `FAQItem` (pergunta, resposta)

Esses dados ficam em arquivo local (ex.: `frontend/src/content/features.ts`) e são usados para gerar UI.

### Endpoints de API

Nenhum endpoint é necessário para o site.

### Renderização de Imagens (decisão importante)

Para manter o build resiliente mesmo quando os PNGs ainda não estiverem no repositório, a landing deve:
- Preferir **`<img src="...">`** para screenshots (ao invés de `next/image`) no primeiro cut.
  - Motivo: `next/image` pode falhar/otimizar de forma diferente em export estático; `<img>` garante simplicidade e evita falhas por ausência de arquivo durante build local.
- Quando as imagens estiverem no `public/`, elas serão servidas diretamente pelo Pages.

## Pontos de Integração

- **Contato**: `mailto:contato@gastandoya.com.br`
  - Botão/CTA abre o cliente de e-mail do usuário.
  - Opcional: botão de “copiar e-mail” via Clipboard API com fallback.

- **Domínio**: Cloudflare DNS
  - `www` apontando para Pages.
  - Redirecionamento do apex `gastandoya.com.br` → `www.gastandoya.com.br` via Redirect Rules.

## Abordagem de Testes

### Testes Unitários

Fase 1 (mínimo viável):
- Garantir build estático e navegação (sem rotas quebradas).
- Verificação manual + lint/TypeScript.

Fase 2 (se necessário):
- Testes de componentes (ex.: React Testing Library) para seções principais.
- Teste de regressão visual (opcional) via screenshots.

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **Documentação (PRD/TechSpec/Tasks)** para fechar escopo e critérios.
2. **Scaffold do `frontend/`** com Tailwind e export estático.
3. **Landing UI**: layout + seções + dados de features + componentes reutilizáveis.
4. **SEO/A11y/Performance**: metadados, OG, sitemap/robots, otimizações.
5. **Deploy Cloudflare Pages + DNS**: guias e validação do domínio.

### Dependências Técnicas

- Cloudflare Pages habilitado na conta e acesso ao DNS do domínio.
- Imagens finais (screenshots) disponibilizadas para colocar em `frontend/public/screens/`.

## Considerações Técnicas

### Decisões Principais

- **Next.js com export estático** para compatibilidade com Cloudflare Pages e simplicidade.
- **TailwindCSS** para consistência visual e velocidade de iteração.
- **Sem dependência do backend** para renderizar a landing (maior confiabilidade e custo zero de runtime).
- **Contato via mailto** para manter 100% estático (sem riscos de abuso/spam por endpoint).

### Riscos Conhecidos

- **Assets ausentes**: se screenshots não estiverem em `public/`, haverá imagens quebradas no runtime.
  - Mitigação: placeholders/texto, documentação e checklist de arquivos necessários.
- **Excesso de animações**: pode piorar performance em mobile.
  - Mitigação: animações CSS leves e reduzir JS.

### Requisitos Especiais

- Performance: meta Lighthouse ≥ 90 mobile, LCP baixo.
- Acessibilidade: headings semânticos, alt text, contraste e foco.

### Conformidade com Padrões

- Seguir padrões do repositório para documentação em `tasks/` e templates em `templates/`.

### Arquivos relevantes

- `tasks/prd-landing-page/prd.md`
- `tasks/prd-landing-page/techspec.md`
- (a criar) `frontend/` (Next.js + Tailwind)
- `DEPLOY_FRONTEND.md` (guia Cloudflare Pages + DNS)






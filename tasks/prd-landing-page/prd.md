# Template de Documento de Requisitos de Produto (PRD)

## Visão Geral

O **GastandoYa** é um app iOS de finanças pessoais focado em simplicidade e visual moderno para o usuário **registrar, analisar e planejar** suas despesas.

Esta funcionalidade cria uma **landing page estática** para apresentar o produto e suas principais funcionalidades (com base nas telas já existentes), com um layout **disruptivo e inovador**, além de uma área clara de **contato** via e-mail de suporte `contato@gastandoya.com.br`.

O objetivo é ter um site público acessível em `www.gastandoya.com.br`, separado do backend (API) já existente, com deploy via **Cloudflare Pages**.

## Objetivos

- Como é o sucesso
  - A landing está no ar em `www.gastandoya.com.br` com HTTPS e carregamento rápido.
  - O usuário entende o que o app faz em ≤ 10 segundos (mensagem + prova visual).
  - Todas as funcionalidades vistas nas telas estão representadas (com seções/iterações).
  - Contato rápido (clique em “Falar com suporte” abre e-mail).

- Métricas principais para acompanhar
  - Visitas totais e origem (Cloudflare Web Analytics, se habilitado).
  - CTR do CTA principal (ex.: “Baixar o app” quando houver link) e CTR do CTA de contato.
  - Tempo de carregamento (LCP) e pontuação Lighthouse (meta: ≥ 90 mobile).

- Objetivos de negócio a alcançar
  - Aumentar credibilidade da marca (presença oficial no domínio).
  - Melhorar conversão de interesse → instalação (quando App Store link estiver disponível).
  - Reduzir atrito de suporte (contato claramente exposto).

## Histórias de Usuário

- Como **visitante** (potencial usuário), eu quero **entender rapidamente** o que o GastandoYa faz para decidir se vale instalar.
- Como **usuário atual**, eu quero ver **quais recursos existem** (ex.: estatísticas, metas, integrações, exportação) para explorar melhor o app.
- Como **usuário com problema**, eu quero um jeito simples de **entrar em contato** com o suporte para tirar dúvidas.

Casos extremos:
- Visitante em rede lenta: a página ainda precisa ser legível e rápida, com imagens otimizadas e layout resiliente.
- Imagens ausentes/atualizadas: a landing precisa degradar bem (texto e placeholders) e não quebrar.

## Funcionalidades Principais

1. **Landing page estática (single page)**
   - O que faz: apresenta o produto em um fluxo de leitura único, com narrativa visual.
   - Por que é importante: cria presença oficial e aumenta confiança.
   - Como funciona: seções em scroll (hero → features → integrações → premium → FAQ → contato).
   - Requisitos funcionais:
     1.1. Exibir mensagem principal e CTA (ex.: baixar/entrar em contato).
     1.2. Mostrar seções com todas as funcionalidades representadas nas telas.
     1.3. Ser responsiva (mobile-first) e acessível.

2. **Seção de funcionalidades baseada nas imagens (iterações)**
   - O que faz: usa as telas do app para demonstrar recursos (sem depender do backend).
   - Requisitos funcionais:
     2.1. Exibir “Planeje seu futuro” e “Resumo Financeiro completo”.
     2.2. Exibir “Crie e alcance suas metas financeiras”.
     2.3. Exibir “Sincronização segura” (backup/sync).
     2.4. Exibir “Análise de gastos” (lançamentos e visão do mês).
     2.5. Exibir “Integração com Notion para importação de databases”.
     2.6. Exibir “Acesse funcionalidades avançadas e exportação de dados”.
     2.7. Exibir “Recursos Premium” (regras inteligentes, export, import, integrações).

3. **Área de contato (suporte)**
   - O que faz: permite o visitante iniciar contato via e-mail.
   - Requisitos funcionais:
     3.1. CTA com `mailto:contato@gastandoya.com.br`.
     3.2. Alternativa para copiar o e-mail (melhor UX no mobile).

4. **SEO e compartilhamento**
   - Requisitos funcionais:
     4.1. Metadados (title/description), OpenGraph e favicon.
     4.2. `sitemap.xml` e `robots.txt`.

## Experiência do Usuário

- Personas e necessidades
  - **Curioso/visitante**: quer clareza rápida, prova visual e confiança.
  - **Usuário atual**: quer ver roadmap mental do produto e recursos premium.

- Fluxos e interações
  - Scroll com narrativa “disruptiva”: texto grande, destaques em verde/teal e seções com “phone mock”.
  - “Feature scrollytelling”: conforme o usuário rola, muda o highlight do recurso e a tela correspondente.
  - CTAs sempre disponíveis: topo (hero) e fundo (contato).

- Considerações de UI/UX
  - Visual dark, high contrast, microinterações leves, foco em tipografia grande.
  - Componentes com glass/blur e sombras suaves (sem exagero para performance).

- Requisitos de acessibilidade
  - Navegação por teclado, contraste adequado, alt text para imagens, e headings semânticos.

## Restrições Técnicas de Alto Nível

- Hospedagem: **Cloudflare Pages**, output estático.
- Framework: **Next.js + TailwindCSS** no `frontend/`.
- Sem dependência do backend (não chamar API para render da landing).
- Contato via **mailto** (sem endpoint de envio).
- Performance: evitar JS pesado; animações preferencialmente via CSS.

Detalhes de implementação serão abordados na Especificação Técnica.

## Não-Objetivos (Fora de Escopo)

- Implementar autenticação, cadastro, ou área logada no site.
- Criar formulário com envio server-side.
- Criar blog/CMS nesta fase.
- Implementar pixel/trackers avançados (pode ser fase futura).
- Alterar o backend atual (API) além do necessário para documentação.

## Questões em Aberto

- Qual é o link oficial do app (App Store) para o CTA “Baixar”? (Se não houver, usar CTA para “Entrar em contato”.)
- Existe um preço/assinatura premium a ser exibido (ou apenas listar recursos premium)?
- Você quer suportar também `gastandoya.com.br` (apex) redirecionando para `www`? (Recomendado.)






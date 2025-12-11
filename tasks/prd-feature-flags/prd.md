# PRD – Endpoint de Feature Flags para GastandoYa

## Visão Geral

Este PRD define a primeira versão de um mecanismo simples de **feature flags** para o backend do GastandoYa.  
O objetivo é permitir que o time controle, de forma centralizada e versionada em código, quais funcionalidades do app iOS estão habilitadas ou desabilitadas.

O backend exporá um endpoint HTTP (ex.: `GET /api/features`) que retorna um JSON com o estado das features para o app iOS, respeitando o modelo:

- Estrutura base de referência:
  - Versão simples:
    - `{ "unlimited_categories": true, "cloud_sync": true, ... }`
  - Versão estruturada (preferida, para evoluir metadata no futuro):
    - `{ "features": { "unlimited_categories": { "enabled": true }, ... } }`

Esta V1 adotará o formato estruturado com nó raiz `features`, permitindo adicionar metadata futura (ex.: plano, rollout, descrição) sem quebrar o contrato.

## Objetivos

- **Fornecer um endpoint HTTP estável** (`GET /api/features`) que retorne o estado das features disponíveis para o app iOS.
- **Centralizar a configuração de features** em um arquivo JSON versionado no repositório (`config/features.json`).
- **Reutilizar o mecanismo de segurança existente** baseado em `x-api-key` para proteger o endpoint contra acesso não autorizado.
- **Facilitar o consumo no app iOS**, com um contrato simples e previsível.

### Métricas de sucesso

- > 99% das chamadas válidas a `GET /api/features` retornam sucesso (2xx).
- Nenhuma regressão em outros endpoints protegidos por `x-api-key`.
- Time consegue habilitar/desabilitar features alterando apenas `config/features.json` e fazendo um deploy.

## Histórias de Usuário

- Como **time de produto/engenharia**, quero **ligar ou desligar features do app iOS a partir de um JSON no backend**, para **controlar lançamentos sem precisar publicar uma nova versão do app**.
- Como **usuário do GastandoYa**, quero que **novas funcionalidades sejam ativadas ou desativadas de forma confiável**, para que **a experiência no app seja consistente com o que foi liberado pelo time**.
- Como **desenvolvedor iOS**, quero **consultar um endpoint único de feature flags**, para **esconder/mostrar partes da UI e fluxos com base nas flags recebidas**.

## Funcionalidades Principais

1. **Configuração de feature flags em arquivo JSON**
   - O projeto terá um arquivo `config/features.json` contendo a configuração de todas as features controláveis.
   - Formato base:
     - Nó raiz: `features`.
     - Cada feature: chave string com objeto `{ "enabled": boolean }`.
   - Exemplos de chaves:
     - `unlimited_categories`
     - `unlimited_goals`
     - `unlimited_wallets`
     - `unlimited_csv_imports`
     - `cloud_sync`
     - `cloud_backup`
     - `notion_import`
     - `advanced_reports`
     - `pdf_export`
     - `excel_export`
     - `smart_rules`
     - `ai_insights`
     - `premium_widgets`

2. **Endpoint de leitura de feature flags**
   - Rota proposta: `GET /api/features`.
   - Comportamento:
     - Valida `x-api-key` contra `APP_API_KEY` (mesmo padrão dos endpoints de Notion).
     - Retorna o conteúdo de `config/features.json` em um formato estável.
   - Contrato de resposta (exemplo):
     - `200 OK`:
       ```json
       {
         "features": {
           "unlimited_categories": { "enabled": true },
           "cloud_sync":          { "enabled": true },
           "notion_import":       { "enabled": false },
           "ai_insights":         { "enabled": true }
         }
       }
       ```

3. **Segurança de acesso ao endpoint**
   - Toda chamada do app iOS para `GET /api/features` deve incluir o header `x-api-key: <TOKEN_APP>`.
   - O backend valida o token contra `process.env.APP_API_KEY` e responde com `401` em caso de divergência.

4. **Experiência para configuração operacional**
   - Desligar/ligar uma feature deve ser feito apenas editando `config/features.json`:
     - `true` → feature habilitada.
     - `false` → feature desabilitada.
   - Mudanças são efetivadas após novo deploy na Vercel (seguindo fluxo normal de CI/CD).

## Experiência do Usuário

- Do ponto de vista do usuário final, as features podem aparecer ou desaparecer sem que ele precise atualizar o app, desde que o app seja construído para ler as flags a cada inicialização/sessão.
- O app iOS deve:
  - Chamar `GET /api/features` usando o mesmo mecanismo de autenticação (`x-api-key`).
  - Interpretar o JSON para:
    - Habilitar ou desabilitar seções de UI (ex.: tela de Notion import).
    - Habilitar ou não ações (ex.: exportar PDF/Excel).
  - Opcionalmente, cachear as flags localmente por uma sessão para reduzir chamadas.

## Restrições Técnicas de Alto Nível

- O endpoint de feature flags deve seguir o mesmo padrão de segurança que os demais endpoints da API (uso de `x-api-key`).
- As flags serão lidas a partir de um arquivo JSON versionado em repositório (`config/features.json`), não de um banco de dados.
- A solução deve ser compatível com a hospedagem atual em Vercel (Next.js App Router).
- O contrato de resposta deve ser estável e compatível com Swift/SwiftData no lado iOS.

## Não-Objetivos (Fora de Escopo)

- Sistema complexo de rollout gradual, A/B testing ou segmentação por usuário.
- Console administrativo web para alterar flags em tempo real (sem deploy).
- Persistência de flags por usuário (esta V1 é global para todos os usuários do app).
- Regras dinâmicas baseadas em planos de assinatura (ex.: free vs premium) – isso pode ser adicionado em versões futuras.

## Questões em Aberto

- Frequência de atualização das flags pelo app iOS (a cada abertura, a cada `N` minutos, apenas no login, etc.).
- Tratamento de falhas: comportamento esperado se o endpoint de feature flags falhar (fallback para defaults embutidos no app?).
- Necessidade futura de metadata por feature (ex.: descrição, plano, data de ativação) – o formato atual permite adicionar campos dentro do objeto de cada feature.



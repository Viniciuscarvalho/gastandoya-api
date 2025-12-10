# [5.0] Deploy na Vercel e configuração de ambiente (S)

## Objetivo
- Disponibilizar a API de integração com Notion em ambiente de produção (Vercel), com todas as variáveis de ambiente configuradas e o fluxo ponta a ponta validado com o app iOS.

## Subtarefas
- [ ] 5.1 Configurar projeto Next.js na Vercel (se ainda não estiver configurado)
- [ ] 5.2 Definir e configurar variáveis de ambiente (`NOTION_CLIENT_ID`, `NOTION_CLIENT_SECRET`, `NOTION_API_VERSION`, `APP_API_KEY`, etc.)
- [ ] 5.3 Validar o fluxo completo de conexão Notion + `GET /api/notion/expenses` em produção/staging

## Critérios de Sucesso
- API disponível publicamente em domínio configurado (ex.: `https://api.gastandoya.com`).
- App iOS consegue consumir `GET /api/notion/expenses` em ambiente de produção.
- Fluxo de OAuth com Notion funciona com a URL de redirect configurada na Vercel.

## Dependências
- Tarefas 1.0–4.0 concluídas e validadas em ambiente local.

## Observações
- Certificar-se de que tokens e segredos não sejam expostos em logs de produção.

## markdown

## status: pending # Opções: pending, in-progress, completed, excluded

<task_context>
<domain>engine/infra/deployment</domain>
<type>integration</type>
<scope>configuration</scope>
<complexity>low</complexity>
<dependencies>http_server|external_apis|temporal</dependencies>
</task_context>

# Tarefa 5.0: Deploy na Vercel e configuração de ambiente

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Colocar em produção a API de integração com Notion, garantindo que o ambiente de execução (Vercel) esteja corretamente configurado e seguro para receber tráfego do app iOS.

<requirements>
- Projeto publicado na Vercel com rotas funcionando.
- Variáveis de ambiente de Notion e da aplicação configuradas corretamente.
- Validação manual do fluxo OAuth e da rota de despesas.
</requirements>

## Subtarefas

- [ ] 5.1 Criar/ajustar projeto na Vercel para este repositório
- [ ] 5.2 Configurar todas as variáveis de ambiente necessárias
- [ ] 5.3 Validar o fluxo ponta a ponta com um usuário de teste

## Detalhes de Implementação

- Seguir a Tech Spec nas seções de dependências técnicas e deploy.
- Validar URLs de redirect obrigatórias no painel de desenvolvedor do Notion.

## Critérios de Sucesso

- Endpoint público responde de forma consistente para chamadas do app iOS.
- Nenhum segredo é exposto no código ou em logs de produção.

## Arquivos relevantes
- `tasks/prd-notion-expenses/prd.md`
- `tasks/prd-notion-expenses/techspec.md`
- Configurações de deploy da Vercel (dashboard).












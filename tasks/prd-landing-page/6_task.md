# [6.0] Documentar e preparar deploy no Cloudflare Pages + DNS (M)

## Objetivo
- Criar documentação de deploy no Cloudflare Pages e configurar DNS para `www.gastandoya.com.br`.

## Subtarefas
- [ ] 6.1 Criar `DEPLOY_FRONTEND.md` com guia passo a passo
- [ ] 6.2 Documentar configuração do projeto no Cloudflare Pages (root, build, output)
- [ ] 6.3 Documentar configuração DNS (CNAME www → pages.dev)
- [ ] 6.4 Documentar redirect do apex (gastandoya.com.br → www)
- [ ] 6.5 Documentar validação de HTTPS e troubleshooting
- [ ] 6.6 Testar build local (`npm run build`) e validar pasta `out/`
- [ ] 6.7 Atualizar README do frontend com link para guia de deploy

## Critérios de Sucesso
- `DEPLOY_FRONTEND.md` existe e é claro.
- Build local funciona e gera `out/`.
- Documentação cobre todos os passos para deploy no Pages e DNS.

## Dependências
- Tarefa 5.0 concluída (landing otimizada).

## Observações
- O deploy efetivo será feito pelo usuário seguindo a documentação.
- Incluir troubleshooting para erros comuns (DNS propagation, build failures).

## status: pending

<task_context>
<domain>infra</domain>
<type>documentation</type>
<scope>configuration</scope>
<complexity>medium</complexity>
<dependencies>task_5.0</dependencies>
</task_context>

# Tarefa 6.0: Deploy no Cloudflare Pages + DNS

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Documentar o processo de deploy da landing no Cloudflare Pages e configuração do DNS para www.gastandoya.com.br.

<requirements>
- Guia de deploy no Cloudflare Pages.
- Configuração DNS (CNAME, redirect apex).
- Validação de HTTPS.
- Troubleshooting.
</requirements>

## Detalhes de Implementação

Criar arquivo `DEPLOY_FRONTEND.md` na raiz do repositório com instruções completas.

## Critérios de Sucesso

- Documentação clara e acionável.
- Build local funciona.

## Arquivos relevantes
- `DEPLOY_FRONTEND.md`
- `frontend/README.md`





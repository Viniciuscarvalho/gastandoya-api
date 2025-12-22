# Template de Documento de Requisitos de Produto (PRD)

## Visão Geral

Hoje o GastandoYa permite que o usuário conecte sua conta do Notion (OAuth) e configure um `expensesDatabaseId` para buscar despesas. Porém, quando o database de despesas está **dentro de uma página** (inline database), o usuário “autoriza a página” e mesmo assim o sistema não consegue **descobrir** e/ou **validar** o `database_id` corretamente.

Esta funcionalidade adiciona **descoberta automática de databases** a partir de uma página do Notion (via Blocks API) e também uma alternativa via **Search API** (busca por nome), para reduzir fricção e eliminar configurações manuais propensas a erro.

## Objetivos

[Liste objetivos específicos e mensuráveis para esta funcionalidade:

- Como é o sucesso
- Métricas principais para acompanhar
- Objetivos de negócio a alcançar]

**Como é o sucesso**
- Usuário consegue selecionar/definir uma página no Notion e o backend encontra automaticamente o `database_id` correto.
- O fluxo de configuração do database deixa de falhar por “falta de acesso” quando o database está inline na página autorizada.
- O backend passa a oferecer uma lista de databases detectados (para o usuário escolher quando houver mais de um).

**Métricas principais**
- Taxa de sucesso na configuração do database (antes/depois).
- Quantidade de erros `object_not_found`/`validation_error` ao consultar `databases.query`.
- Tempo médio para o usuário concluir a configuração (do OAuth até primeira sincronização).

**Objetivos de negócio**
- Reduzir suporte e frustração no onboarding Notion.
- Aumentar retenção (usuário consegue sincronizar no primeiro uso).

## Histórias de Usuário

- Como **usuário do app**, eu quero **autorizar uma página do Notion** e o GastandoYa deve **encontrar automaticamente** o database de despesas dentro dela, para eu não precisar descobrir IDs manualmente.
- Como **usuário do app**, eu quero **buscar pelo nome** do meu database (“GASTOS”) e selecionar o certo, para configurar rapidamente.
- Como **usuário do app**, eu quero ver um erro claro quando **nenhum database** for encontrado na página, para eu corrigir (ex.: compartilhar a página certa com a integração).

Casos extremos:
- Página contém múltiplos databases inline (usuário deve escolher).
- Database está em subpáginas/blocos paginados (precisa seguir `next_cursor`).
- Database não é inline e sim linkado (`link_to_page`) apontando para um database.

## Funcionalidades Principais

1. **Descoberta via Blocks API (página → databases)**
   - O que faz: lista os blocos de uma página autorizada e encontra databases.
   - Por que é importante: é o “jeito correto” quando o database está dentro da página.
   - Como funciona em alto nível:
     - Recebe `page_id`
     - Chama `GET /v1/blocks/{page_id}/children` com paginação
     - Identifica blocos `child_database` (e casos suportados como `link_to_page`)
     - Retorna `database_id`(s)
   - Requisitos funcionais:
     1.1. Suportar paginação (`next_cursor`) até concluir varredura.
     1.2. Retornar uma lista (0..N) de databases encontrados.
     1.3. Diferenciar “não encontrado” vs “sem permissão”.

2. **Busca via Search API (nome → databases)**
   - O que faz: encontra databases acessíveis pelo token do usuário usando query textual.
   - Requisitos funcionais:
     2.1. Buscar por nome (query string) com filtro `object=database`.
     2.2. Retornar lista de candidatos com `id` e `title`.

3. **Endpoint para listar databases disponíveis**
   - Requisitos funcionais:
     3.1. Expor endpoint que retorne databases detectados por página e/ou por busca.
     3.2. Permitir ao cliente escolher e salvar o `expensesDatabaseId`.

4. **Configuração simplificada**
   - Requisitos funcionais:
     4.1. Atualizar o fluxo de configuração para aceitar `pageId` e descobrir o database automaticamente.
     4.2. Fallback para configuração manual de `databaseId`.

## Experiência do Usuário

- O usuário não precisa lidar com IDs do Notion.
- Quando houver múltiplos databases, o app exibe lista com títulos e o usuário escolhe.
- Mensagens de erro são acionáveis:
  - “Compartilhe a página/database com a integração”
  - “Nenhum database encontrado dentro da página”
  - “Mais de um database encontrado — selecione um”

## Restrições Técnicas de Alto Nível

- Deve reutilizar o OAuth existente e o `access_token` do usuário.
- Deve ser compatível com a Notion API version já configurada no projeto.
- Não deve expor tokens nem dados sensíveis em logs/respostas.
- Deve lidar com paginação do Notion (blocks e search).

Detalhes de implementação serão abordados na Especificação Técnica.

## Não-Objetivos (Fora de Escopo)

- Criar UI web para seleção de database (isso fica no app iOS).
- Suportar todas as variações possíveis de database embed (cobrir os casos mais comuns).
- Criar cache global persistente de discovery (pode ser futuro).

## Questões em Aberto

- O app iOS enviará `pageId` ou o usuário escolherá de uma lista retornada pelo backend?
- Em caso de múltiplos databases, qual heurística/ordem deve ser sugerida (ex.: primeiro encontrado)?
- Precisamos suportar `link_to_page` para database já no primeiro release, ou apenas `child_database`?





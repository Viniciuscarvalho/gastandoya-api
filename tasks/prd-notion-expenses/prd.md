# PRD – Integração Notion Expenses para GastandoYa

## Visão Geral

Este PRD define a primeira versão da integração entre o app iOS GastandoYa e o Notion para leitura de despesas a partir de um database de cada usuário.  
O objetivo é permitir que o usuário conecte seu próprio workspace do Notion, escolha um database de despesas e visualize esses dados no app, de forma simples, segura e padronizada.

O backend será um serviço Next.js exposto via `GET /api/notion/expenses`, que consulta o Notion usando as credenciais OAuth de cada usuário, converte os registros em um formato limpo (`ExpenseDTO`) e devolve o resultado para o app iOS, que persiste tudo em SwiftData.

## Objetivos

- Fornecer uma rota HTTP estável `GET /api/notion/expenses` que retorne uma lista de despesas em formato padronizado.
- Permitir que cada usuário conecte o próprio Notion via OAuth, sem compartilhar tokens entre usuários.
- Garantir que o app iOS consiga consumir os dados com baixo acoplamento ao modelo do Notion (camada de DTO).
- Proteger o backend com uma chave de acesso de aplicação (`x-api-key`) para evitar uso não autorizado do endpoint público.
- Maximizar a segurança de credenciais do Notion (armazenamento seguro, nenhum token exposto ao app iOS).

### Métricas de sucesso

- ≥ 95% das chamadas válidas a `GET /api/notion/expenses` retornam sucesso (2xx) sem erro de integração.
- Latência da API (p95) abaixo de 800 ms para bases de até 1.000 registros.
- Nenhum vazamento de token ou credencial do Notion para o cliente (monitorado via revisão de código e logs).

## Histórias de Usuário

- Como **usuário do GastandoYa**, quero **conectar meu Notion à conta do app** para que **minhas despesas cadastradas no Notion apareçam no GastandoYa**.
- Como **usuário do GastandoYa**, quero **ver uma lista de despesas consolidada** (data, descrição, valor, categoria) vindo do meu database no Notion para que **eu não precise duplicar informações manualmente**.
- Como **usuário preocupado com segurança**, quero **ter certeza de que meu token do Notion não fica exposto nem no app nem para outros usuários** para que **eu possa confiar na integração**.
- Como **time de produto/engenharia**, quero **ter um contrato estável de API (`ExpenseDTO`) entre backend e app iOS** para que **possamos evoluir o modelo de dados do Notion sem quebrar o app**.

## Funcionalidades Principais

1. **Conexão de conta Notion via OAuth**
   - O usuário inicia um fluxo de autorização (em tela web ou SFSafariViewController) para conceder acesso ao GastandoYa.
   - Após o callback, o backend recebe `access_token`, `workspace_id` e dados da integração e os associa ao usuário autenticado do GastandoYa.
   - O token é armazenado de forma segura no backend (ex: banco de dados com criptografia em repouso).

2. **Configuração do database de despesas**
   - Cada usuário poderá definir qual database do Notion será usado como “fonte de despesas”.
   - Esse database deve conter, no mínimo, propriedades mapeáveis para:
     - `description`
     - `date`
     - `amount`
     - `category` (opcional)
   - O `database_id` selecionado é armazenado junto ao vínculo Notion do usuário.

3. **Leitura de despesas no Notion**
   - A rota `GET /api/notion/expenses` identifica o usuário do app, recupera o `access_token` e `database_id` associados e chama o endpoint `POST /v1/databases/{database_id}/query` do Notion.
   - Os resultados são paginados conforme a convenção de paginação do Notion (`has_more`, `next_cursor`), garantindo leitura de todas as páginas relevantes.
   - A API oferece filtros básicos opcionais (por data ou limite de registros) se forem necessários na V1.

4. **Conversão para `ExpenseDTO`**
   - Cada registro do Notion é convertido para o contrato:
     - `id: string`
     - `description: string`
     - `date: string` (ISO 8601, ex: `2025-01-31`)
     - `amount: number` (valor em **centavos**)
     - `currency: string` (fixo `"BRL"` na V1)
     - `category?: string`
     - `createdAt: string` (ISO)
     - `updatedAt?: string` (ISO)
   - Campos inexistentes ou inválidos no Notion são tratados com defaults seguros ou o item é ignorado conforme regra definida.

5. **Segurança de acesso ao endpoint**
   - Toda chamada do app iOS para `GET /api/notion/expenses` deve incluir o header `x-api-key: <TOKEN_APP>`.
   - O backend valida o token contra `process.env.APP_API_KEY` e responde com `401` em caso de divergência.
   - Erros de integração com o Notion são tratados e retornados como códigos 4xx/5xx apropriados sem vazar detalhes sensíveis.

## Experiência do Usuário

- A conexão com o Notion deve ser apresentada no app iOS como um passo simples: “Conectar Notion”, abrindo a tela de autorização.
- Após a conexão, o usuário deve receber feedback claro se:
  - O vínculo com o Notion foi criado com sucesso.
  - O database de despesas foi configurado corretamente (ou se precisa ser ajustado).
- Na tela de despesas, o usuário verá uma lista padronizada independente de como o Notion armazena internamente os tipos (rich text, select, etc.).
- Caso ocorra erro na sincronização (ex.: database removido, token revogado), o app deve exibir uma mensagem amigável sugerindo reconectar o Notion.

## Restrições Técnicas de Alto Nível

- A API do Notion será acessada via HTTPS obrigatório no endpoint base `https://api.notion.com`, conforme documentação oficial [`https://developers.notion.com/reference/intro`].
- O backend usará o SDK oficial JavaScript `@notionhq/client` para facilitar o acesso a `databases.query` e demais operações.
- Tokens OAuth do Notion não podem ser enviados para o app iOS; somente dados derivados (despesas) são retornados.
- A integração deve respeitar limites de uso do Notion (rate limits) e, se necessário, aplicar backoff simples.
- A hospedagem alvo é Vercel, usando Next.js com App Router e route handlers.

## Não-Objetivos (Fora de Escopo)

- Edição, criação ou exclusão de páginas de despesas no Notion pelo GastandoYa (V1 é somente leitura).
- Importação direta de arquivos CSV para o Notion pela API do GastandoYa.
- Sincronização em tempo real ou webhooks complexos; a V1 foca em leitura sob demanda via chamada do app.
- Dashboards analíticos avançados no backend; a responsabilidade principal é fornecer dados crus e padronizados ao app.

## Questões em Aberto

- Definição exata de como o usuário escolherá o database de despesas no app (via interface no iOS ou configuração web).
- Estratégia de paginação exposta para o app: retorno de todas as despesas de uma vez ou modelo paginado (ex: `page`/`pageSize` no contrato da API).
- Eventual suporte a múltiplas moedas por usuário (por enquanto, `currency` será fixo em `"BRL"`).
- Decisão de armazenamento para tokens (ex.: Postgres via Prisma, KV, outro banco) e requisitos específicos de criptografia além do padrão da infra.











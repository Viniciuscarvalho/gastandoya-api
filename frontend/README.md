# GastandoYa - Landing Page

Landing page estática do aplicativo iOS GastandoYa.

## Tecnologias

- **Next.js 14** (App Router)
- **TailwindCSS 4**
- **TypeScript**
- **Export Estático** (para Cloudflare Pages)

## Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
cd frontend
npm install
```

### Executar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Build para produção

```bash
npm run build
```

O build gera a pasta `out/` com os arquivos estáticos.

### Testar build localmente

```bash
npx serve out
```

## Estrutura de Pastas

```
frontend/
├── public/
│   ├── screens/          # Screenshots do app (adicionar manualmente)
│   ├── favicon.ico       # Ícone do site
│   └── og-image.png      # Imagem para compartilhamento
├── src/
│   ├── app/
│   │   ├── globals.css   # Estilos globais + Tailwind
│   │   ├── layout.tsx    # Layout base + SEO
│   │   └── page.tsx      # Página principal
│   ├── components/       # Componentes React
│   └── content/          # Dados estáticos (features, FAQ)
├── next.config.js        # Configuração Next.js (export estático)
├── postcss.config.mjs    # PostCSS + Tailwind
├── tailwind.config.ts    # Configuração Tailwind
└── tsconfig.json         # TypeScript
```

## Imagens do App

Coloque as screenshots do app em `public/screens/` com os seguintes nomes:

- `screen-1.png` - Planeje seu futuro (Estatísticas)
- `screen-2.png` - Resumo Financeiro completo
- `screen-3.png` - Crie e alcance suas metas financeiras
- `screen-4.png` - Sincronização segura (Backup e Sync)
- `screen-5.png` - Análise de gastos (Lançamentos)
- `screen-6.png` - Integração com Notion
- `screen-7.png` - Importar Dados (CSV/PDF)
- `screen-8.png` - Recursos Premium (Configurações)

## Deploy

Consulte o arquivo `DEPLOY_FRONTEND.md` na raiz do repositório para instruções de deploy no Cloudflare Pages.

## Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build estático em `out/` |
| `npm run start` | Inicia servidor de produção (não usado com export) |
| `npm run lint` | Executa linter |

## Links

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação TailwindCSS](https://tailwindcss.com/docs)
- [Cloudflare Pages](https://pages.cloudflare.com/)


export interface Feature {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  tags: string[]
  highlight?: string
}

export const features: Feature[] = [
  {
    id: 'estatisticas',
    title: 'Planeje seu futuro',
    subtitle: 'Estatísticas',
    description: 'Visualize seu saldo do mês, entradas e saídas em um painel limpo e intuitivo. Acompanhe gastos por categoria e tendências ao longo do tempo.',
    image: '/screens/screen-1.png',
    tags: ['Categorias', 'Tendências', 'Parcelas'],
    highlight: 'futuro',
  },
  {
    id: 'resumo',
    title: 'Resumo Financeiro',
    subtitle: 'completo',
    description: 'Tenha uma visão completa do seu saldo, fluxo de caixa e insights do mês. Alterne entre visualizações por semana, mês, ano ou tudo.',
    image: '/screens/screen-2.png',
    tags: ['Fluxo de Caixa', 'Insights', 'Multi-moeda'],
    highlight: 'completo',
  },
  {
    id: 'metas',
    title: 'Crie e alcance suas',
    subtitle: 'metas financeiras ✨',
    description: 'Defina metas com nome, valor alvo e data. Acompanhe seu progresso e alcance seus objetivos financeiros de forma visual e motivadora.',
    image: '/screens/screen-3.png',
    tags: ['Valor Alvo', 'Data Limite', 'Progresso'],
    highlight: 'metas financeiras',
  },
  {
    id: 'sync',
    title: 'Sincronização',
    subtitle: 'segura',
    description: 'Mantenha seus dados sincronizados entre todos os seus dispositivos Apple com iCloud. Backups automáticos garantem que você nunca perca informações.',
    image: '/screens/screen-4.png',
    tags: ['iCloud', 'Backup Automático', 'Multi-dispositivo'],
    highlight: 'segura',
  },
  {
    id: 'lancamentos',
    title: 'Análise de',
    subtitle: 'gastos',
    description: 'Registre lançamentos rapidamente e visualize o saldo do mês com indicador de positivo/negativo. Filtre por entradas e saídas.',
    image: '/screens/screen-5.png',
    tags: ['Lançamentos', 'Filtros', 'Saldo Mensal'],
    highlight: 'gastos',
  },
  {
    id: 'notion',
    title: 'Integração com',
    subtitle: 'Notion',
    description: 'Conecte sua conta do Notion para importar transações de databases automaticamente. Sincronize seus dados onde você já organiza sua vida.',
    image: '/screens/screen-6.png',
    tags: ['Notion', 'Importação', 'Automático'],
    highlight: 'Notion',
  },
  {
    id: 'importar',
    title: 'Acesse funcionalidades',
    subtitle: 'avançadas',
    description: 'Importe transações de arquivos CSV ou PDF. Suporte a múltiplos formatos de data e campos como nome, data, valor e categoria.',
    image: '/screens/screen-7.png',
    tags: ['CSV', 'PDF', 'Importação'],
    highlight: 'avançadas',
  },
  {
    id: 'premium',
    title: 'Recursos',
    subtitle: 'Premium',
    description: 'Desbloqueie taxas de conversão, importação/exportação, relatórios em PDF, regras inteligentes, backup e sincronização, e integração com Notion.',
    image: '/screens/screen-8.png',
    tags: ['Premium', 'Exportação', 'Regras Inteligentes'],
    highlight: 'Premium',
  },
]





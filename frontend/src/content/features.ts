import type { Locale } from '@/i18n'

export interface Feature {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  tags: string[]
}

const featuresPtBR: Feature[] = [
  { id: 'estatisticas', title: 'Planeje seu futuro', subtitle: 'Estatisticas', description: 'Visualize seu saldo do mes, entradas e saidas em um painel limpo e intuitivo. Acompanhe gastos por categoria e tendencias ao longo do tempo.', image: '/screens/screen-1.png', tags: ['Categorias', 'Tendencias', 'Parcelas'] },
  { id: 'resumo', title: 'Resumo Financeiro', subtitle: 'completo', description: 'Tenha uma visao completa do seu saldo, fluxo de caixa e insights do mes. Alterne entre visualizacoes por semana, mes, ano ou tudo.', image: '/screens/screen-2.png', tags: ['Fluxo de Caixa', 'Insights', 'Multi-moeda'] },
  { id: 'metas', title: 'Crie e alcance suas', subtitle: 'metas financeiras', description: 'Defina metas com nome, valor alvo e data. Acompanhe seu progresso e alcance seus objetivos financeiros de forma visual e motivadora.', image: '/screens/screen-3.png', tags: ['Valor Alvo', 'Data Limite', 'Progresso'] },
  { id: 'sync', title: 'Sincronizacao', subtitle: 'segura', description: 'Mantenha seus dados sincronizados entre todos os seus dispositivos Apple com iCloud. Backups automaticos garantem que voce nunca perca informacoes.', image: '/screens/screen-4.png', tags: ['iCloud', 'Backup Automatico', 'Multi-dispositivo'] },
  { id: 'lancamentos', title: 'Analise de', subtitle: 'gastos', description: 'Registre lancamentos rapidamente e visualize o saldo do mes com indicador de positivo/negativo. Filtre por entradas e saidas.', image: '/screens/screen-5.png', tags: ['Lancamentos', 'Filtros', 'Saldo Mensal'] },
  { id: 'notion', title: 'Integracao com', subtitle: 'Notion', description: 'Conecte sua conta do Notion para importar transacoes de databases automaticamente. Sincronize seus dados onde voce ja organiza sua vida.', image: '/screens/screen-6.png', tags: ['Notion', 'Importacao', 'Automatico'] },
  { id: 'importar', title: 'Acesse funcionalidades', subtitle: 'avancadas', description: 'Importe transacoes de arquivos CSV ou PDF. Suporte a multiplos formatos de data e campos como nome, data, valor e categoria.', image: '/screens/screen-7.png', tags: ['CSV', 'PDF', 'Importacao'] },
  { id: 'premium', title: 'Recursos', subtitle: 'Premium', description: 'Desbloqueie taxas de conversao, importacao/exportacao, relatorios em PDF, regras inteligentes, backup e sincronizacao, e integracao com Notion.', image: '/screens/screen-8.png', tags: ['Premium', 'Exportacao', 'Regras Inteligentes'] },
]

const featuresEnUS: Feature[] = [
  { id: 'statistics', title: 'Plan your future', subtitle: 'Statistics', description: 'View your monthly balance, income and expenses in a clean, intuitive dashboard. Track spending by category and trends over time.', image: '/screens/screen-1.png', tags: ['Categories', 'Trends', 'Installments'] },
  { id: 'summary', title: 'Financial Summary', subtitle: 'complete', description: 'Get a full view of your balance, cash flow and monthly insights. Switch between weekly, monthly, yearly or all-time views.', image: '/screens/screen-2.png', tags: ['Cash Flow', 'Insights', 'Multi-currency'] },
  { id: 'goals', title: 'Create and reach your', subtitle: 'financial goals', description: 'Set goals with name, target amount and date. Track your progress and reach your financial objectives in a visual, motivating way.', image: '/screens/screen-3.png', tags: ['Target Amount', 'Deadline', 'Progress'] },
  { id: 'sync', title: 'Secure', subtitle: 'sync', description: 'Keep your data synced across all Apple devices with iCloud. Automatic backups ensure you never lose information.', image: '/screens/screen-4.png', tags: ['iCloud', 'Auto Backup', 'Multi-device'] },
  { id: 'transactions', title: 'Expense', subtitle: 'analysis', description: 'Record transactions quickly and view monthly balance with positive/negative indicators. Filter by income and expenses.', image: '/screens/screen-5.png', tags: ['Transactions', 'Filters', 'Monthly Balance'] },
  { id: 'notion', title: 'Integration with', subtitle: 'Notion', description: 'Connect your Notion account to automatically import transactions from databases. Sync your data where you already organize your life.', image: '/screens/screen-6.png', tags: ['Notion', 'Import', 'Automatic'] },
  { id: 'import', title: 'Access advanced', subtitle: 'features', description: 'Import transactions from CSV or PDF files. Support for multiple date formats and fields like name, date, amount and category.', image: '/screens/screen-7.png', tags: ['CSV', 'PDF', 'Import'] },
  { id: 'premium', title: 'Premium', subtitle: 'Features', description: 'Unlock exchange rates, import/export, PDF reports, smart rules, backup & sync, and Notion integration.', image: '/screens/screen-8.png', tags: ['Premium', 'Export', 'Smart Rules'] },
]

export function getFeatures(locale: Locale): Feature[] {
  return locale === 'en-US' ? featuresEnUS : featuresPtBR
}

export const features = featuresPtBR

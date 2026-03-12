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
  { id: 'estatisticas', title: 'Veja para onde vai', subtitle: 'cada centavo', description: 'Chega de surpresas no fim do mês. Visualize seu saldo, entradas e saídas em um painel intuitivo. Descubra quais categorias consomem mais e identifique padrões de gasto.', image: '/screens/screen-1.png', tags: ['Categorias', 'Tendências', 'Parcelas'] },
  { id: 'resumo', title: 'Tenha clareza total', subtitle: 'do seu dinheiro', description: 'Saldo, fluxo de caixa e insights do mês em uma tela só. Alterne entre semana, mês, ano ou tudo — e tome decisões financeiras com confiança.', image: '/screens/screen-2.png', tags: ['Fluxo de Caixa', 'Insights', 'Multi-moeda'] },
  { id: 'metas', title: 'Defina metas e veja seu', subtitle: 'progresso dia a dia', description: 'Da viagem dos sonhos ao fundo de emergência — defina metas com valor alvo e data limite. Acompanhe visualmente e se motive a cada passo.', image: '/screens/screen-3.png', tags: ['Valor Alvo', 'Data Limite', 'Progresso'] },
  { id: 'sync', title: 'Seus dados sempre', subtitle: 'com você', description: 'Registrou no iPhone, apareceu no iPad. A sincronização via iCloud mantém tudo atualizado entre seus dispositivos Apple — com criptografia de ponta a ponta.', image: '/screens/screen-4.png', tags: ['iCloud', 'Backup Automático', 'Multi-dispositivo'] },
  { id: 'lancamentos', title: 'Registre gastos em', subtitle: 'segundos', description: 'Nada de formulários complicados. Registre lançamentos rapidamente, veja seu saldo atualizado em tempo real e filtre por entradas ou saídas.', image: '/screens/screen-5.png', tags: ['Lançamentos', 'Filtros', 'Saldo Mensal'] },
  { id: 'notion', title: 'Já usa Notion?', subtitle: 'Perfeito.', description: 'Conecte sua conta e importe transações direto de databases do Notion. Mantenha seus dados financeiros onde você já organiza todo o resto da sua vida.', image: '/screens/screen-6.png', tags: ['Notion', 'Importação', 'Automático'] },
  { id: 'importar', title: 'Traga seus dados de', subtitle: 'qualquer lugar', description: 'Importe extratos bancários em CSV ou PDF sem dor de cabeça. O app reconhece diferentes formatos e mapeia colunas automaticamente.', image: '/screens/screen-7.png', tags: ['CSV', 'PDF', 'Importação'] },
  { id: 'premium', title: 'Leve suas finanças para o', subtitle: 'próximo nível', description: 'Taxas de conversão em tempo real, relatórios em PDF, regras inteligentes e integração com Notion. Tudo desbloqueado no Premium.', image: '/screens/screen-8.png', tags: ['Premium', 'Exportação', 'Regras Inteligentes'] },
]

const featuresEnUS: Feature[] = [
  { id: 'statistics', title: 'See where every', subtitle: 'penny goes', description: 'No more end-of-month surprises. View your balance, income and expenses in an intuitive dashboard. Discover which categories drain you most and spot spending patterns.', image: '/screens/screen-1.png', tags: ['Categories', 'Trends', 'Installments'] },
  { id: 'summary', title: 'Total clarity on', subtitle: 'your money', description: 'Balance, cash flow and monthly insights on a single screen. Switch between weekly, monthly, yearly or all-time views — and make financial decisions with confidence.', image: '/screens/screen-2.png', tags: ['Cash Flow', 'Insights', 'Multi-currency'] },
  { id: 'goals', title: 'Set goals and track', subtitle: 'progress daily', description: 'From your dream trip to an emergency fund — set goals with target amount and deadline. Track visually and stay motivated every step of the way.', image: '/screens/screen-3.png', tags: ['Target Amount', 'Deadline', 'Progress'] },
  { id: 'sync', title: 'Your data always', subtitle: 'with you', description: 'Logged on iPhone, appears on iPad. iCloud sync keeps everything updated across your Apple devices — with end-to-end encryption.', image: '/screens/screen-4.png', tags: ['iCloud', 'Auto Backup', 'Multi-device'] },
  { id: 'transactions', title: 'Log expenses in', subtitle: 'seconds', description: 'No complicated forms. Record transactions quickly, see your balance update in real time and filter by income or expenses.', image: '/screens/screen-5.png', tags: ['Transactions', 'Filters', 'Monthly Balance'] },
  { id: 'notion', title: 'Already use Notion?', subtitle: 'Perfect.', description: 'Connect your account and import transactions straight from Notion databases. Keep your financial data where you already organize everything else.', image: '/screens/screen-6.png', tags: ['Notion', 'Import', 'Automatic'] },
  { id: 'import', title: 'Bring your data from', subtitle: 'anywhere', description: 'Import bank statements in CSV or PDF without the headache. The app recognizes different formats and maps columns automatically.', image: '/screens/screen-7.png', tags: ['CSV', 'PDF', 'Import'] },
  { id: 'premium', title: 'Take your finances to the', subtitle: 'next level', description: 'Real-time exchange rates, PDF reports, smart rules and Notion integration. All unlocked with Premium.', image: '/screens/screen-8.png', tags: ['Premium', 'Export', 'Smart Rules'] },
]

export function getFeatures(locale: Locale): Feature[] {
  return locale === 'en-US' ? featuresEnUS : featuresPtBR
}

export const features = featuresPtBR

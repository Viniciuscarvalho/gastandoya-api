import type { Locale } from '@/i18n'

export interface FAQItem {
  question: string
  answer: string
}

const faqItemsPtBR: FAQItem[] = [
  {
    question: 'Preciso pagar pra usar?',
    answer: 'Não! O GastandoYa é gratuito para funcionalidades básicas como registrar gastos, ver estatísticas e criar metas. Recursos avançados como importação de CSV/PDF, integração com Notion, relatórios em PDF e sincronização via iCloud estão disponíveis na versão Premium.',
  },
  {
    question: 'É seguro? Onde ficam meus dados?',
    answer: 'Seus dados são armazenados localmente no seu dispositivo e, opcionalmente, sincronizados via iCloud de forma criptografada. Não temos servidores — suas informações financeiras nunca passam por nós. É o modelo mais seguro possível.',
  },
  {
    question: 'E se eu já uso o Notion pra finanças?',
    answer: 'Perfeito! O GastandoYa é o único app financeiro com integração nativa com Notion. Você pode importar transações direto de databases existentes, mantendo tudo sincronizado onde você já organiza sua vida.',
  },
  {
    question: 'O que é o GastandoYa?',
    answer: 'GastandoYa é um aplicativo iOS para controle de finanças pessoais. Ele permite registrar despesas, analisar gastos por categoria, criar metas financeiras e manter seus dados sincronizados entre dispositivos — tudo com design nativo e privacidade total.',
  },
  {
    question: 'Preciso conectar minha conta bancária?',
    answer: 'Não! O GastandoYa não pede acesso ao seu banco. Você registra os gastos manualmente ou importa extratos via CSV/PDF. É mais seguro e te dá mais consciência sobre cada gasto.',
  },
  {
    question: 'Posso usar em mais de um dispositivo?',
    answer: 'Sim, com a sincronização via iCloud (recurso Premium), seus dados ficam disponíveis em todos os seus dispositivos Apple logados na mesma conta.',
  },
  {
    question: 'Quais formatos de arquivo posso importar?',
    answer: 'O GastandoYa suporta importação de arquivos CSV e PDF. O arquivo deve conter colunas para nome/descrição, data, valor e categoria. Diversos formatos de data são aceitos e o mapeamento é automático.',
  },
  {
    question: 'O app funciona offline?',
    answer: 'Sim! Como seus dados ficam no dispositivo, o app funciona 100% offline. A conexão com internet só é necessária para sincronizar via iCloud ou importar do Notion.',
  },
  {
    question: 'Como entro em contato com o suporte?',
    answer: 'Você pode nos enviar um e-mail para contato@gastandoya.com.br. Responderemos o mais rápido possível!',
  },
]

const faqItemsEnUS: FAQItem[] = [
  {
    question: 'Do I need to pay to use it?',
    answer: 'No! GastandoYa is free for basic features like logging expenses, viewing statistics and creating goals. Advanced features like CSV/PDF import, Notion integration, PDF reports and iCloud sync are available in the Premium version.',
  },
  {
    question: 'Is it secure? Where is my data stored?',
    answer: 'Your data is stored locally on your device and optionally synced via iCloud with encryption. We have no servers — your financial information never passes through us. It\'s the most secure model possible.',
  },
  {
    question: 'What if I already use Notion for finances?',
    answer: 'Perfect! GastandoYa is the only finance app with native Notion integration. You can import transactions directly from existing databases, keeping everything synced where you already organize your life.',
  },
  {
    question: 'What is GastandoYa?',
    answer: 'GastandoYa is an iOS app for personal finance management. It lets you track expenses, analyze spending by category, create financial goals and keep your data synced across devices — all with native design and total privacy.',
  },
  {
    question: 'Do I need to connect my bank account?',
    answer: 'No! GastandoYa doesn\'t ask for bank access. You log expenses manually or import statements via CSV/PDF. It\'s more secure and gives you more awareness of every expense.',
  },
  {
    question: 'Can I use it on multiple devices?',
    answer: 'Yes, with iCloud sync (Premium feature), your data is available across all your Apple devices signed in to the same account.',
  },
  {
    question: 'What file formats can I import?',
    answer: 'GastandoYa supports importing CSV and PDF files. The file should contain columns for name/description, date, amount and category. Various date formats are accepted and mapping is automatic.',
  },
  {
    question: 'Does the app work offline?',
    answer: 'Yes! Since your data is stored on-device, the app works 100% offline. Internet connection is only needed to sync via iCloud or import from Notion.',
  },
  {
    question: 'How do I contact support?',
    answer: 'You can send us an email at contato@gastandoya.com.br. We\'ll respond as quickly as possible!',
  },
]

export function getFaqItems(locale: Locale): FAQItem[] {
  return locale === 'en-US' ? faqItemsEnUS : faqItemsPtBR
}

export const faqItems = faqItemsPtBR

import type { Locale } from '@/i18n'

export interface FAQItem {
  question: string
  answer: string
}

const faqItemsPtBR: FAQItem[] = [
  {
    question: 'O que é o GastandoYa?',
    answer: 'GastandoYa é um aplicativo iOS para controle de finanças pessoais. Ele permite registrar despesas, analisar gastos por categoria, criar metas financeiras e manter seus dados sincronizados entre dispositivos.',
  },
  {
    question: 'O app é gratuito?',
    answer: 'O app oferece funcionalidades básicas gratuitamente. Recursos avançados como importação/exportação de dados, integração com Notion, relatórios em PDF e sincronização via iCloud estão disponíveis na versão Premium.',
  },
  {
    question: 'Como funciona a integração com Notion?',
    answer: 'Você pode conectar sua conta do Notion ao GastandoYa para importar transações de databases existentes. Basta autorizar o acesso e selecionar o database que contém seus dados financeiros.',
  },
  {
    question: 'Meus dados estão seguros?',
    answer: 'Sim! Seus dados são armazenados localmente no seu dispositivo e, opcionalmente, sincronizados via iCloud de forma criptografada. Não acessamos nem armazenamos suas informações financeiras em nossos servidores.',
  },
  {
    question: 'Posso usar em mais de um dispositivo?',
    answer: 'Sim, com a sincronização via iCloud (recurso Premium), seus dados ficam disponíveis em todos os seus dispositivos Apple logados na mesma conta.',
  },
  {
    question: 'Quais formatos de arquivo posso importar?',
    answer: 'O GastandoYa suporta importação de arquivos CSV e PDF. O arquivo deve conter colunas para nome/descrição, data, valor e categoria. Diversos formatos de data são aceitos.',
  },
  {
    question: 'Como entro em contato com o suporte?',
    answer: 'Você pode nos enviar um e-mail para contato@gastandoya.com.br. Responderemos o mais rápido possível!',
  },
]

const faqItemsEnUS: FAQItem[] = [
  {
    question: 'What is GastandoYa?',
    answer: 'GastandoYa is an iOS app for personal finance management. It lets you track expenses, analyze spending by category, create financial goals and keep your data synced across devices.',
  },
  {
    question: 'Is the app free?',
    answer: 'The app offers basic features for free. Advanced features like data import/export, Notion integration, PDF reports and iCloud sync are available in the Premium version.',
  },
  {
    question: 'How does the Notion integration work?',
    answer: 'You can connect your Notion account to GastandoYa to import transactions from existing databases. Simply authorize access and select the database containing your financial data.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! Your data is stored locally on your device and optionally synced via iCloud with encryption. We never access or store your financial information on our servers.',
  },
  {
    question: 'Can I use it on multiple devices?',
    answer: 'Yes, with iCloud sync (Premium feature), your data is available across all your Apple devices signed in to the same account.',
  },
  {
    question: 'What file formats can I import?',
    answer: 'GastandoYa supports importing CSV and PDF files. The file should contain columns for name/description, date, amount and category. Various date formats are accepted.',
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

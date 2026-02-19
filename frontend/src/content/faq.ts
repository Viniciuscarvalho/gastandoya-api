import type { Locale } from '@/i18n'

export interface FAQItem {
  question: string
  answer: string
}

const faqItemsPtBR: FAQItem[] = [
  {
    question: 'O que e o GastandoYa?',
    answer: 'GastandoYa e um aplicativo iOS para controle de financas pessoais. Ele permite registrar despesas, analisar gastos por categoria, criar metas financeiras e manter seus dados sincronizados entre dispositivos.',
  },
  {
    question: 'O app e gratuito?',
    answer: 'O app oferece funcionalidades basicas gratuitamente. Recursos avancados como importacao/exportacao de dados, integracao com Notion, relatorios em PDF e sincronizacao via iCloud estao disponiveis na versao Premium.',
  },
  {
    question: 'Como funciona a integracao com Notion?',
    answer: 'Voce pode conectar sua conta do Notion ao GastandoYa para importar transacoes de databases existentes. Basta autorizar o acesso e selecionar o database que contem seus dados financeiros.',
  },
  {
    question: 'Meus dados estao seguros?',
    answer: 'Sim! Seus dados sao armazenados localmente no seu dispositivo e, opcionalmente, sincronizados via iCloud de forma criptografada. Nao acessamos nem armazenamos suas informacoes financeiras em nossos servidores.',
  },
  {
    question: 'Posso usar em mais de um dispositivo?',
    answer: 'Sim, com a sincronizacao via iCloud (recurso Premium), seus dados ficam disponiveis em todos os seus dispositivos Apple logados na mesma conta.',
  },
  {
    question: 'Quais formatos de arquivo posso importar?',
    answer: 'O GastandoYa suporta importacao de arquivos CSV e PDF. O arquivo deve conter colunas para nome/descricao, data, valor e categoria. Diversos formatos de data sao aceitos.',
  },
  {
    question: 'Como entro em contato com o suporte?',
    answer: 'Voce pode nos enviar um e-mail para contato@gastandoya.com.br. Responderemos o mais rapido possivel!',
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

export interface FAQItem {
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
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


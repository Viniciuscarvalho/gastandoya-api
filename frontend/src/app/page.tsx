import {
  Header,
  Hero,
  FeatureSection,
  IntegrationsSection,
  PremiumSection,
  FAQSection,
  ContactSection,
  Footer,
  JsonLd,
} from '@/components'
import { faqItems } from '@/content/faq'
import { APP_STORE_URL, SITE_URL, CONTACT_EMAIL } from '@/content/constants'

export default function Home() {
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GastandoYa',
    description: 'App iOS de controle de gastos e financas pessoais. Planeje gastos mensais, crie metas financeiras, sincronize via iCloud e integre com Notion.',
    operatingSystem: 'iOS',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    featureList: [
      'Controle de gastos por categoria',
      'Metas financeiras com progresso visual',
      'Sincronizacao via iCloud',
      'Integracao com Notion',
      'Importacao de CSV e PDF',
      'Relatorios em PDF',
      'Multi-moeda com taxas atualizadas',
      'Regras inteligentes de alertas',
    ],
    screenshot: [
      `${SITE_URL}/screens/screen-1.png`,
      `${SITE_URL}/screens/screen-2.png`,
      `${SITE_URL}/screens/screen-3.png`,
    ],
    downloadUrl: APP_STORE_URL,
    installUrl: APP_STORE_URL,
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GastandoYa',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
      contactType: 'customer support',
      availableLanguage: 'Portuguese',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      <JsonLd data={softwareApplicationSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />
      <Header />
      <main>
        <Hero />
        <FeatureSection />
        <IntegrationsSection />
        <PremiumSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

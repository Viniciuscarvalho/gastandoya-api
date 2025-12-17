import {
  Header,
  Hero,
  FeatureSection,
  IntegrationsSection,
  PremiumSection,
  FAQSection,
  ContactSection,
  Footer,
} from '@/components'

export default function Home() {
  return (
    <>
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

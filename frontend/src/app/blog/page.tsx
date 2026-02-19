import type { Metadata } from 'next'
import { Header, Footer } from '@/components'
import { BlogListingContent } from '@/components/BlogListingContent'
import { SITE_URL } from '@/content/constants'

export const metadata: Metadata = {
  title: 'Blog - Dicas de Controle Financeiro e Financas Pessoais',
  description: 'Artigos sobre controle de gastos, financas pessoais, integracao com Notion, privacidade e dicas para organizar suas financas no iPhone.',
  alternates: {
    canonical: `${SITE_URL}/blog/`,
  },
  openGraph: {
    title: 'Blog GastandoYa - Dicas de Controle Financeiro',
    description: 'Artigos sobre controle de gastos, financas pessoais e dicas para organizar suas financas no iPhone.',
    url: `${SITE_URL}/blog/`,
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Blog GastandoYa',
      },
    ],
  },
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen pt-32 pb-20 px-6">
        {/* Background */}
        <div className="absolute inset-0 bg-radial-top" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <BlogListingContent />
      </main>
      <Footer />
    </>
  )
}

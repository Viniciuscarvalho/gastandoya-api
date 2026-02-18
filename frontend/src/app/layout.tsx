import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050505',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.gastandoya.com.br'),
  title: {
    default: 'GastandoYa - App de Controle de Gastos para iPhone',
    template: '%s | GastandoYa',
  },
  description: 'App iOS de controle de gastos e financas pessoais. Planeje gastos mensais, crie metas financeiras, sincronize via iCloud, integre com Notion e importe CSV/PDF. 100% privacidade — seus dados nunca saem do dispositivo.',
  keywords: [
    'controle de gastos',
    'financas pessoais',
    'app financas iPhone',
    'controle financeiro iOS',
    'gastos mensais',
    'metas financeiras',
    'app despesas',
    'orcamento pessoal',
    'iCloud financas',
    'Notion financas',
    'importar CSV gastos',
    'app financas privacidade',
  ],
  authors: [{ name: 'GastandoYa' }],
  creator: 'GastandoYa',
  publisher: 'GastandoYa',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://www.gastandoya.com.br',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.gastandoya.com.br',
    siteName: 'GastandoYa',
    title: 'GastandoYa - App de Controle de Gastos para iPhone',
    description: 'App iOS de controle de gastos e financas pessoais. Sincronize via iCloud, integre com Notion e mantenha total privacidade.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GastandoYa - App de Controle de Gastos e Financas Pessoais para iPhone',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GastandoYa - App de Controle de Gastos para iPhone',
    description: 'Controle gastos, crie metas financeiras e sincronize via iCloud. 100% privacidade.',
    images: ['/og-image.png'],
  },
  other: {
    'apple-itunes-app': 'app-id=6756076765',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-noise">
        {children}
      </body>
    </html>
  )
}

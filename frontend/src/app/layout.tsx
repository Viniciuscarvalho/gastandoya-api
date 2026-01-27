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
  title: 'GastandoYa - Controle suas finanças de forma inteligente',
  description: 'Aplicativo iOS para controle de despesas pessoais. Planeje seu futuro, analise gastos, crie metas financeiras e sincronize com segurança.',
  keywords: ['finanças pessoais', 'controle de gastos', 'app iOS', 'despesas', 'orçamento', 'metas financeiras'],
  authors: [{ name: 'GastandoYa' }],
  creator: 'GastandoYa',
  publisher: 'GastandoYa',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.gastandoya.com.br',
    siteName: 'GastandoYa',
    title: 'GastandoYa - Controle suas finanças de forma inteligente',
    description: 'Aplicativo iOS para controle de despesas pessoais. Planeje seu futuro, analise gastos e alcance suas metas financeiras.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GastandoYa - App de Finanças Pessoais',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GastandoYa - Controle suas finanças de forma inteligente',
    description: 'Aplicativo iOS para controle de despesas pessoais.',
    images: ['/og-image.png'],
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

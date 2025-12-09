import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GastandoYa API',
  description: 'Backend API para integração do GastandoYa com Notion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}






'use client'

import Image from 'next/image'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { href: '#funcionalidades', label: 'Funcionalidades' },
    { href: '#premium', label: 'Premium' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contato', label: 'Contato' },
  ]

  const legalLinks = [
    { href: 'https://api.gastandoya.com.br/privacy', label: 'Política de Privacidade' },
    { href: 'https://api.gastandoya.com.br/terms', label: 'Termos de Uso' },
  ]

  return (
    <footer className="relative border-t border-neutral-900">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all">
                <Image
                  src="/og-image.png"
                  alt="GastandoYa"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight font-heading block">
                  Gastando<span className="gradient-text">Ya</span>
                </span>
                <span className="text-xs text-neutral-500 font-medium tracking-wider uppercase">
                  Finanças Pessoais
                </span>
              </div>
            </a>
            <p className="text-neutral-500 max-w-sm leading-relaxed mb-6">
              Controle suas finanças de forma inteligente. Planeje, analise e alcance seus objetivos financeiros.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-neutral-400 mb-4">
              Navegação
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-neutral-500 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-neutral-400 mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-600">
            © {currentYear} GastandoYa. Todos os direitos reservados.
          </p>

          {/* Made with love */}
          <p className="text-sm text-neutral-600 flex items-center gap-1.5">
            Feito com
            <span className="text-red-500 animate-pulse">❤</span>
            no Brasil
          </p>
        </div>
      </div>
    </footer>
  )
}

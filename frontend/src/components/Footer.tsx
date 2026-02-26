'use client'

import Image from 'next/image'
import { APP_STORE_URL } from '@/content/constants'
import { useTranslation } from '@/i18n'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useTranslation()

  const navLinks = [
    { href: '#funcionalidades', label: t.header.features },
    { href: '#premium', label: t.header.premium },
    { href: '#faq', label: t.header.faq },
    { href: '/blog/', label: t.header.blog },
    { href: '#contato', label: t.footer.contact },
  ]

  const legalLinks = [
    { href: 'https://api.gastandoya.com.br/privacy', label: t.footer.privacyPolicy },
    { href: 'https://api.gastandoya.com.br/terms', label: t.footer.terms },
  ]

  return (
    <footer className="relative border-t border-neutral-900">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all">
                <Image
                  src="/og-image.png"
                  alt={t.footer.logoAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight font-heading block">
                  Gastando<span className="gradient-text">Ya</span>
                </span>
                <span className="text-xs text-neutral-500 font-medium tracking-wider uppercase">
                  {t.footer.subtitle}
                </span>
              </div>
            </a>
            <p className="text-neutral-500 max-w-sm leading-relaxed mb-6">
              {t.footer.description}
            </p>

            {/* App Store Badge */}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
            >
              <svg className="w-6 h-6 text-neutral-300 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
              </svg>
              <div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-wider leading-none">{t.footer.availableOn}</div>
                <div className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">App Store</div>
              </div>
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-neutral-400 mb-4">
              {t.footer.navigation}
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
              {t.footer.legal}
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
          <p className="text-sm text-neutral-600" suppressHydrationWarning>
            &copy; {currentYear} GastandoYa. {t.footer.allRights}
          </p>

          {/* Made with love */}
          <p className="text-sm text-neutral-600 flex items-center gap-1.5">
            {t.footer.madeWith}
            <span className="text-red-500 animate-pulse">&hearts;</span>
            {t.footer.inBrazil}
          </p>
        </div>
      </div>
    </footer>
  )
}

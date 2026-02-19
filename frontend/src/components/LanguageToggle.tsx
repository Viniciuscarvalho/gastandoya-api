'use client'

import { useTranslation } from '@/i18n'

export function LanguageToggle() {
  const { locale, setLocale } = useTranslation()

  const toggle = () => {
    setLocale(locale === 'pt-BR' ? 'en-US' : 'pt-BR')
  }

  return (
    <button
      onClick={toggle}
      className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-xs font-medium text-neutral-300 hover:text-white"
      aria-label={locale === 'pt-BR' ? 'Switch to English' : 'Mudar para Portugues'}
      title={locale === 'pt-BR' ? 'Switch to English' : 'Mudar para Portugues'}
    >
      <span className="text-sm leading-none">{locale === 'pt-BR' ? '🇧🇷' : '🇺🇸'}</span>
      <span className="hidden sm:inline">{locale === 'pt-BR' ? 'PT' : 'EN'}</span>
    </button>
  )
}

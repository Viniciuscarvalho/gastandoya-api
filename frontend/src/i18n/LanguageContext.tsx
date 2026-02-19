'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations, type Locale, type Translations } from './translations'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'pt-BR',
  setLocale: () => {},
  t: translations['pt-BR'] as unknown as Translations,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt-BR')

  useEffect(() => {
    const saved = localStorage.getItem('gastandoya-locale') as Locale | null
    if (saved && (saved === 'pt-BR' || saved === 'en-US')) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('gastandoya-locale', newLocale)
    document.documentElement.lang = newLocale === 'pt-BR' ? 'pt-BR' : 'en'
  }, [])

  const t = translations[locale] as unknown as Translations

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LanguageContext)
}

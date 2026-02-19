'use client'

import Image from 'next/image'
import { PhoneMock } from './PhoneMock'
import { APP_STORE_URL } from '@/content/constants'
import { useTranslation } from '@/i18n'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-radial-top" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/8 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/6 rounded-full blur-[100px] animate-float delay-300" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <div className="animate-fade-in">
              <span className="tag inline-flex items-center gap-2 mb-8">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                {t.hero.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-hero mb-6 animate-fade-in delay-100">
              {t.hero.titleStart}
              <span className="gradient-text">{t.hero.titleHighlight}</span>
              {t.hero.titleEnd}
            </h1>

            {/* Description */}
            <p className="text-large text-neutral-400 max-w-xl mx-auto lg:mx-0 mb-10 animate-fade-in delay-200 leading-relaxed">
              {t.hero.description}
              <span className="text-neutral-200">{t.hero.descriptionHighlight}</span>
              {t.hero.descriptionEnd}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in delay-300">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-primary px-8 py-4 rounded-full text-lg animate-glow inline-flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#funcionalidades"
                className="w-full sm:w-auto btn-secondary px-8 py-4 rounded-full text-lg"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-neutral-800/50 animate-fade-in delay-400">
              <div className="flex flex-wrap justify-center lg:justify-start gap-8">
                <div>
                  <div className="text-2xl font-bold gradient-text">100%</div>
                  <div className="text-sm text-neutral-500">{t.hero.statPrivacy}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">iCloud</div>
                  <div className="text-sm text-neutral-500">{t.hero.statSync}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold gradient-text">iOS</div>
                  <div className="text-sm text-neutral-500">{t.hero.statNative}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in-scale delay-200">
            <div className="relative">
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-cyan-500/5 blur-[80px] scale-110" />

              {/* Phone */}
              <div className="relative animate-float">
                <PhoneMock
                  imageSrc="/screens/screen-1.png"
                  alt={t.hero.phoneAlt}
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -left-8 top-1/4 glass-card px-4 py-3 rounded-2xl animate-fade-in delay-500 hidden md:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.hero.floatingIncome}</div>
                  <div className="text-xs text-neutral-500">{t.hero.floatingIncomeLabel}</div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/3 glass-card px-4 py-3 rounded-2xl animate-fade-in delay-600 hidden md:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.hero.floatingGoal}</div>
                  <div className="text-xs text-neutral-500">{t.hero.floatingGoalLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="w-6 h-10 rounded-full border-2 border-neutral-700 flex items-start justify-center p-2">
          <div className="w-1 h-2.5 bg-neutral-500 rounded-full" />
        </div>
      </div>
    </section>
  )
}

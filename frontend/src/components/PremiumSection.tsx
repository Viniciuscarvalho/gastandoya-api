'use client'

import { APP_STORE_URL } from '@/content/constants'
import { useTranslation } from '@/i18n'

export function PremiumSection() {
  const { t } = useTranslation()

  const premiumIcons = [
    (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  ]

  const premiumFeatures = t.premium.features.map((feature, index) => ({
    icon: premiumIcons[index],
    name: feature.name,
    description: feature.description,
  }))

  return (
    <section id="premium" className="section-padding px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-amber-500/5 via-emerald-500/5 to-teal-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="tag-gold mb-6 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            {t.premium.tag}
          </span>
          <h2 className="font-heading text-section mb-6">
            {t.premium.titleStart}
            <span className="gradient-text-gold">{t.premium.titleHighlight}</span>
          </h2>
          <p className="text-large text-neutral-400 max-w-2xl mx-auto">
            {t.premium.description}
          </p>
        </div>

        {/* Premium Card */}
        <div className="relative">
          {/* Gradient border glow */}
          <div className="absolute -inset-[1px] bg-gradient-to-br from-amber-500/30 via-emerald-500/20 to-teal-500/30 rounded-[2rem] blur-sm" />

          <div className="relative glass-card rounded-[2rem] p-8 md:p-12 overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 animate-shimmer opacity-30" />

            {/* Features Grid */}
            <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {premiumFeatures.map((feature, index) => (
                <div
                  key={feature.name}
                  className="group flex items-start gap-4 p-5 rounded-2xl hover:bg-white/5 transition-all duration-300 cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-white group-hover:text-amber-100 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="relative mt-10 pt-8 border-t border-neutral-800/50 text-center">
              <p className="text-neutral-500 mb-6">
                {t.premium.availableOn}
              </p>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 background-size-200 text-black font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-[0_8px_32px_rgba(245,158,11,0.3)]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                {t.premium.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

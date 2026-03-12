'use client'

import { useTranslation } from '@/i18n'

export function ComparisonSection() {
  const { t } = useTranslation()

  const features = [
    { label: t.comparison.features.notionIntegration, us: true, them: false },
    { label: t.comparison.features.localPrivacy, us: true, them: false },
    { label: t.comparison.features.nativeIos, us: true, them: false },
    { label: t.comparison.features.noAccount, us: true, them: false },
    { label: t.comparison.features.icloudSync, us: true, them: 'partial' as const },
    { label: t.comparison.features.csvImport, us: true, them: 'partial' as const },
    { label: t.comparison.features.smartRules, us: true, them: 'partial' as const },
    { label: t.comparison.features.noAds, us: true, them: false },
  ]

  return (
    <section className="section-padding px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="tag mb-6 inline-block">{t.comparison.tag}</span>
          <h2 className="font-heading text-section mb-6">
            {t.comparison.titleStart}
            <span className="gradient-text">{t.comparison.titleHighlight}</span>
          </h2>
          <p className="text-large text-neutral-400">
            {t.comparison.description}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="glass-card rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] p-4 sm:p-6 border-b border-neutral-800/50">
            <div />
            <div className="text-center">
              <span className="text-sm font-bold gradient-text">{t.comparison.gastandoya}</span>
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-neutral-500">{t.comparison.others}</span>
            </div>
          </div>

          {/* Rows */}
          {features.map((feature, index) => (
            <div
              key={feature.label}
              className={`grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_120px_120px] p-4 sm:px-6 sm:py-4 items-center transition-colors hover:bg-white/[0.02] ${
                index < features.length - 1 ? 'border-b border-neutral-800/30' : ''
              }`}
            >
              <span className="text-sm sm:text-base text-neutral-300">{feature.label}</span>
              <div className="flex justify-center">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              </div>
              <div className="flex justify-center">
                {feature.them === true ? (
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                ) : feature.them === 'partial' ? (
                  <span className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                  </span>
                ) : (
                  <span className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

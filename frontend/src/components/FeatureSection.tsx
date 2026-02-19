'use client'

import { getFeatures } from '@/content/features'
import { PhoneMock } from './PhoneMock'
import { useTranslation } from '@/i18n'

export function FeatureSection() {
  const { t, locale } = useTranslation()
  const featureList = getFeatures(locale)

  return (
    <section id="funcionalidades" className="section-padding px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="tag mb-6 inline-block">{t.features.tag}</span>
          <h2 className="font-heading text-section mb-6">
            {t.features.titleStart}
            <span className="gradient-text">{t.features.titleHighlight}</span>
          </h2>
          <p className="text-large text-neutral-400">
            {t.features.description}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-32 lg:space-y-40">
          {featureList.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12 lg:gap-20`}
            >
              {/* Phone Mock */}
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  {/* Feature number */}
                  <div
                    className={`absolute -top-8 ${
                      index % 2 === 0 ? 'lg:-left-12' : 'lg:-right-12'
                    } hidden lg:flex items-center justify-center w-16 h-16 rounded-2xl glass-card`}
                  >
                    <span className="font-display text-2xl gradient-text">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <PhoneMock
                    imageSrc={feature.image}
                    alt={`${feature.title} ${feature.subtitle}`}
                    size="large"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div
                  className={`max-w-lg ${
                    index % 2 === 0 ? 'lg:ml-0' : 'lg:mr-0 lg:ml-auto'
                  }`}
                >
                  {/* Mobile feature number */}
                  <div className="lg:hidden mb-4">
                    <span className="tag-gold text-xs">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] mb-4 leading-tight">
                    {feature.title}{' '}
                    <span className="gradient-text">{feature.subtitle}</span>
                  </h3>

                  <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {feature.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-sm font-medium transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

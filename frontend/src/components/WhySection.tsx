'use client'

import { useTranslation } from '@/i18n'

export function WhySection() {
  const { t } = useTranslation()

  const pillars = [
    {
      ...t.whySection.notion,
      gradient: 'from-neutral-500/20 to-neutral-600/20',
      iconColor: 'text-neutral-300',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 2.02c-.42-.327-.98-.514-1.633-.448l-12.8.887c-.515.047-.607.28-.326.56l1.358 1.189zm.793 1.959v13.908c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.166V5.354c0-.607-.233-.934-.747-.887l-15.177.887c-.56.047-.746.327-.746.813zm14.337.746c.093.42 0 .84-.42.887l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.747 0-.934-.234-1.495-.933l-4.577-7.186v6.953l1.448.327s0 .84-1.168.84l-3.227.186c-.093-.186 0-.653.327-.746l.84-.232V8.373L8.54 8.14c-.093-.42.14-1.027.793-1.073l3.46-.233 4.76 7.28V7.94l-1.215-.14c-.093-.513.28-.886.747-.933l3.504-.233z" />
        </svg>
      ),
    },
    {
      ...t.whySection.privacy,
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      ...t.whySection.smartRules,
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-400',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      ),
    },
  ]

  return (
    <section id="por-que" className="section-padding px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="tag mb-6 inline-block">{t.whySection.tag}</span>
          <h2 className="font-heading text-section mb-6">
            {t.whySection.titleStart}
            <span className="gradient-text">{t.whySection.titleHighlight}</span>
          </h2>
          <p className="text-large text-neutral-400">
            {t.whySection.description}
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="group relative">
              <div className="glass-card rounded-3xl p-8 h-full transition-all duration-500 hover:translate-y-[-4px]">
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Badge */}
                  <span className="tag-gold text-xs mb-6 inline-block">{pillar.badge}</span>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6 ${pillar.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                    {pillar.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 font-heading">{pillar.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

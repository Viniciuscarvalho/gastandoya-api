'use client'

import { useTranslation } from '@/i18n'

export function IntegrationsSection() {
  const { t } = useTranslation()

  const integrations = [
    {
      name: 'iCloud',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"/>
        </svg>
      ),
      description: t.integrations.icloudDesc,
      features: t.integrations.icloudFeatures,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
    },
    {
      name: 'Notion',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 2.02c-.42-.327-.98-.514-1.633-.448l-12.8.887c-.515.047-.607.28-.326.56l1.358 1.189zm.793 1.959v13.908c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.166V5.354c0-.607-.233-.934-.747-.887l-15.177.887c-.56.047-.746.327-.746.813zm14.337.746c.093.42 0 .84-.42.887l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.747 0-.934-.234-1.495-.933l-4.577-7.186v6.953l1.448.327s0 .84-1.168.84l-3.227.186c-.093-.186 0-.653.327-.746l.84-.232V8.373L8.54 8.14c-.093-.42.14-1.027.793-1.073l3.46-.233 4.76 7.28V7.94l-1.215-.14c-.093-.513.28-.886.747-.933l3.504-.233zM2.874 1.093l13.308-.933c1.634-.14 2.054-.047 3.08.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.632-1.68 1.726l-15.458.933c-.98.047-1.448-.093-1.962-.746l-3.133-4.06c-.56-.747-.793-1.306-.793-1.959V2.64c0-.793.373-1.453 1.455-1.547z"/>
        </svg>
      ),
      description: t.integrations.notionDesc,
      features: t.integrations.notionFeatures,
      gradient: 'from-neutral-500/20 to-neutral-600/20',
      iconColor: 'text-neutral-300',
    },
    {
      name: 'CSV / PDF',
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      description: t.integrations.csvDesc,
      features: t.integrations.csvFeatures,
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
    },
  ]

  return (
    <section className="section-padding px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="tag mb-6 inline-block">{t.integrations.tag}</span>
          <h2 className="font-heading text-section mb-6">
            {t.integrations.titleStart}
            <span className="gradient-text">{t.integrations.titleHighlight}</span>
          </h2>
          <p className="text-large text-neutral-400">
            {t.integrations.description}
          </p>
        </div>

        {/* Integration Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {integrations.map((integration, index) => (
            <div
              key={integration.name}
              className="group relative"
            >
              {/* Card */}
              <div className="glass-card rounded-3xl p-8 h-full transition-all duration-500 hover:translate-y-[-4px] border-gradient">
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${integration.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${integration.gradient} flex items-center justify-center mb-6 ${integration.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                    {integration.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3 font-heading">{integration.name}</h3>
                  <p className="text-neutral-400 mb-6 leading-relaxed">{integration.description}</p>

                  {/* Features list */}
                  <ul className="space-y-3">
                    {integration.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-neutral-300">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

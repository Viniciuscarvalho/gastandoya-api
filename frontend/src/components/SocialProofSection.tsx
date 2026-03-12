'use client'

import { useTranslation } from '@/i18n'

export function SocialProofSection() {
  const { t } = useTranslation()

  const reviews = [
    { text: t.socialProof.review1, author: t.socialProof.review1Author, stars: 5 },
    { text: t.socialProof.review2, author: t.socialProof.review2Author, stars: 5 },
    { text: t.socialProof.review3, author: t.socialProof.review3Author, stars: 5 },
  ]

  const stats = [
    {
      label: t.socialProof.statLocalData,
      desc: t.socialProof.statLocalDataDesc,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      label: t.socialProof.statNative,
      desc: t.socialProof.statNativeDesc,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
        </svg>
      ),
    },
    {
      label: t.socialProof.statNotion,
      desc: t.socialProof.statNotionDesc,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 2.02c-.42-.327-.98-.514-1.633-.448l-12.8.887c-.515.047-.607.28-.326.56l1.358 1.189zm.793 1.959v13.908c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.933-.56.933-1.166V5.354c0-.607-.233-.934-.747-.887l-15.177.887c-.56.047-.746.327-.746.813zm14.337.746c.093.42 0 .84-.42.887l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.747 0-.934-.234-1.495-.933l-4.577-7.186v6.953l1.448.327s0 .84-1.168.84l-3.227.186c-.093-.186 0-.653.327-.746l.84-.232V8.373L8.54 8.14c-.093-.42.14-1.027.793-1.073l3.46-.233 4.76 7.28V7.94l-1.215-.14c-.093-.513.28-.886.747-.933l3.504-.233z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/5 to-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-6 flex items-center gap-4 transition-all duration-300 hover:bg-white/[0.03]"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="font-semibold text-white">{stat.label}</div>
                <div className="text-sm text-neutral-500">{stat.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-8 transition-all duration-300 hover:bg-white/[0.03]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-neutral-300 leading-relaxed mb-4 italic">
                {review.text}
              </p>
              <p className="text-sm text-neutral-500">{review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

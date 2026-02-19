'use client'

import { useState } from 'react'
import { useTranslation } from '@/i18n'

const EMAIL = 'contato@gastandoya.com.br'

export function ContactSection() {
  const [copied, setCopied] = useState(false)
  const { t } = useTranslation()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = EMAIL
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="contato" className="section-padding px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-radial-center" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="tag mb-6 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {t.contact.tag}
          </span>
          <h2 className="font-heading text-section mb-6">
            {t.contact.titleStart}
            <span className="gradient-text">{t.contact.titleHighlight}</span>?
          </h2>
          <p className="text-large text-neutral-400 max-w-xl mx-auto">
            {t.contact.description}
          </p>
        </div>

        {/* Contact Card */}
        <div className="relative">
          {/* Gradient border */}
          <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 rounded-[2rem] blur-sm" />

          <div className="relative glass-card rounded-[2rem] p-8 md:p-12">
            {/* Email Icon */}
            <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href={`mailto:${EMAIL}`}
                className="w-full sm:w-auto btn-primary px-8 py-4 rounded-full text-lg flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t.contact.sendEmail}
              </a>
              <button
                onClick={handleCopy}
                className={`w-full sm:w-auto btn-secondary px-8 py-4 rounded-full text-lg flex items-center justify-center gap-3 ${
                  copied ? 'ring-2 ring-emerald-500/50 bg-emerald-500/10' : ''
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-400">{t.contact.copied}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {t.contact.copyEmail}
                  </>
                )}
              </button>
            </div>

            {/* Email display */}
            <div className="text-center">
              <code className="px-4 py-2 rounded-lg bg-neutral-900/50 border border-neutral-800 text-neutral-400 text-sm">
                {EMAIL}
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

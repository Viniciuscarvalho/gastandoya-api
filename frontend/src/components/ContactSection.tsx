'use client'

import { useState } from 'react'

const EMAIL = 'contato@gastandoya.com.br'

export function ContactSection() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: select text
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
    <section id="contato" className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
          💬 Fale Conosco
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Tem alguma dúvida ou{' '}
          <span className="gradient-text">sugestão</span>?
        </h2>
        <p className="text-xl text-neutral-400 mb-10 max-w-xl mx-auto">
          Estamos sempre prontos para ajudar. Entre em contato e responderemos o mais rápido possível.
        </p>

        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>📧</span>
              Enviar E-mail
            </a>
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto glass hover:bg-white/10 font-semibold px-8 py-4 rounded-full text-lg transition-all flex items-center justify-center gap-2"
            >
              <span>{copied ? '✓' : '📋'}</span>
              {copied ? 'Copiado!' : 'Copiar E-mail'}
            </button>
          </div>
          <p className="mt-6 text-neutral-500 text-sm">
            {EMAIL}
          </p>
        </div>
      </div>
    </section>
  )
}


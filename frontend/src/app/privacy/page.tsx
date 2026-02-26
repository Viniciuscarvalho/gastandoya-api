'use client'

import { useEffect } from 'react'

export default function PrivacyPage() {
  useEffect(() => {
    window.location.href = 'https://api.gastandoya.com.br/privacy'
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-neutral-500">Redirecionando...</p>
    </div>
  )
}

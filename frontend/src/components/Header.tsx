'use client'

import { useState, useEffect } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center font-bold text-lg text-black group-hover:scale-110 transition-transform">
            G
          </div>
          <span className="text-xl font-bold">
            Gastando<span className="gradient-text">Ya</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#funcionalidades" className="text-neutral-400 hover:text-white transition-colors">
            Funcionalidades
          </a>
          <a href="#premium" className="text-neutral-400 hover:text-white transition-colors">
            Premium
          </a>
          <a href="#faq" className="text-neutral-400 hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        <a
          href="#contato"
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105"
        >
          Contato
        </a>
      </div>
    </header>
  )
}





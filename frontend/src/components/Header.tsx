'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#funcionalidades', label: 'Funcionalidades' },
    { href: '#premium', label: 'Premium' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass py-3'
          : 'py-5 bg-gradient-to-b from-black/50 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all duration-300 group-hover:scale-105">
            <Image
              src="/og-image.png"
              alt="GastandoYa"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight font-heading">
              Gastando<span className="gradient-text">Ya</span>
            </span>
            <span className="text-[10px] text-neutral-500 font-medium tracking-wider uppercase hidden sm:block">
              Finanças Pessoais
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-neutral-400 hover:text-white transition-colors duration-300 text-sm font-medium link-hover"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <a
            href="#contato"
            className="hidden sm:inline-flex btn-primary px-6 py-2.5 rounded-full text-sm"
          >
            Contato
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl glass"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass-card transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-2 btn-primary px-6 py-3 rounded-xl text-center"
          >
            Contato
          </a>
        </nav>
      </div>
    </header>
  )
}

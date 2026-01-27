'use client'

import Image from 'next/image'

interface PhoneMockProps {
  imageSrc: string
  alt: string
  className?: string
  size?: 'default' | 'large'
}

export function PhoneMock({ imageSrc, alt, className = '', size = 'default' }: PhoneMockProps) {
  const sizeClasses = size === 'large'
    ? 'w-[300px] md:w-[360px]'
    : 'w-[260px] md:w-[300px]'

  return (
    <div className={`relative ${className}`}>
      {/* Phone frame */}
      <div className={`relative ${sizeClasses} mx-auto`}>
        {/* Ambient glow */}
        <div className="absolute -inset-4 bg-gradient-to-b from-emerald-500/20 via-teal-500/10 to-transparent rounded-[4rem] blur-2xl opacity-60" />

        {/* Phone body */}
        <div className="relative glass-card rounded-[2.75rem] p-2 phone-glow">
          {/* Inner bezel */}
          <div className="relative bg-black rounded-[2.25rem] overflow-hidden border border-neutral-800/50">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
              <div className="w-[90px] h-[28px] bg-black rounded-full flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 ring-1 ring-neutral-800" />
              </div>
            </div>

            {/* Screen content */}
            <div className="relative">
              <Image
                src={imageSrc}
                alt={alt}
                width={390}
                height={844}
                className="w-full h-auto"
                priority
              />

              {/* Screen shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />
            </div>
          </div>

          {/* Side highlights */}
          <div className="absolute -right-[1px] top-1/4 w-[2px] h-16 bg-gradient-to-b from-transparent via-neutral-700 to-transparent rounded-l" />
          <div className="absolute -left-[1px] top-28 w-[2px] h-8 bg-gradient-to-b from-transparent via-neutral-700 to-transparent rounded-r" />
          <div className="absolute -left-[1px] top-40 w-[2px] h-14 bg-gradient-to-b from-transparent via-neutral-700 to-transparent rounded-r" />
        </div>

        {/* Reflection */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-gradient-to-t from-emerald-500/10 to-transparent blur-2xl" />
      </div>
    </div>
  )
}

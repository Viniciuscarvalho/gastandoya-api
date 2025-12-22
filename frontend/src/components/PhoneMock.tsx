interface PhoneMockProps {
  imageSrc: string
  alt: string
  className?: string
}

export function PhoneMock({ imageSrc, alt, className = '' }: PhoneMockProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Phone frame */}
      <div className="relative w-[280px] md:w-[320px] mx-auto">
        {/* Outer frame with glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/30 to-teal-500/30 rounded-[3rem] blur-xl opacity-50" />
        
        {/* Phone body */}
        <div className="relative bg-neutral-900 rounded-[3rem] p-2 border border-neutral-800 phone-glow">
          {/* Screen area */}
          <div className="relative bg-black rounded-[2.5rem] overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-10" />
            
            {/* Screen content */}
            <img
              src={imageSrc}
              alt={alt}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        {/* Side button */}
        <div className="absolute right-[-2px] top-28 w-1 h-12 bg-neutral-800 rounded-l-sm" />
        <div className="absolute left-[-2px] top-24 w-1 h-8 bg-neutral-800 rounded-r-sm" />
        <div className="absolute left-[-2px] top-36 w-1 h-16 bg-neutral-800 rounded-r-sm" />
      </div>
    </div>
  )
}





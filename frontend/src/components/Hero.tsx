export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            📱 App iOS de Finanças Pessoais
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6 animate-fade-in delay-100">
          Controle suas finanças{' '}
          <span className="gradient-text">de forma inteligente</span>
        </h1>

        <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto mb-10 animate-fade-in delay-200">
          Planeje seu futuro, analise gastos, crie metas e sincronize com segurança. 
          Tudo em um app simples e elegante.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-300">
          <a
            href="#funcionalidades"
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 animate-glow"
          >
            Conheça o App
          </a>
          <a
            href="#contato"
            className="w-full sm:w-auto glass hover:bg-white/10 font-semibold px-8 py-4 rounded-full text-lg transition-all"
          >
            Falar com Suporte
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-neutral-600 flex items-start justify-center p-2">
          <div className="w-1.5 h-2.5 bg-neutral-400 rounded-full" />
        </div>
      </div>
    </section>
  )
}





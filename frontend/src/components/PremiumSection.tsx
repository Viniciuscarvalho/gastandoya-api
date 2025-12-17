export function PremiumSection() {
  const premiumFeatures = [
    { icon: '💱', name: 'Taxas de Conversão', description: 'Suporte multi-moeda com taxas atualizadas' },
    { icon: '📥', name: 'Importar CSV/PDF', description: 'Importe transações de arquivos' },
    { icon: '📊', name: 'Relatórios em PDF', description: 'Exporte resumos mensais completos' },
    { icon: '✨', name: 'Regras Inteligentes', description: 'Alertas automáticos sobre gastos' },
    { icon: '☁️', name: 'Backup e Sync', description: 'Sincronização via iCloud' },
    { icon: '📝', name: 'Integração Notion', description: 'Importe de databases do Notion' },
  ]

  return (
    <section id="premium" className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
            👑 Recursos Premium
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Desbloqueie todo o{' '}
            <span className="gradient-text">potencial</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Funcionalidades avançadas para quem leva suas finanças a sério
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumFeatures.map((feature) => (
              <div
                key={feature.name}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.name}</h3>
                  <p className="text-neutral-400 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-neutral-800 text-center">
            <p className="text-neutral-400 mb-4">
              Disponível em breve na App Store
            </p>
            <a
              href="#contato"
              className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105"
            >
              Saiba mais sobre o Premium
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


export function IntegrationsSection() {
  const integrations = [
    {
      name: 'iCloud',
      icon: '☁️',
      description: 'Sincronize seus dados entre todos os dispositivos Apple de forma segura e automática.',
      features: ['Backup automático', 'Multi-dispositivo', 'Criptografado'],
    },
    {
      name: 'Notion',
      icon: '📝',
      description: 'Importe transações de databases do Notion e mantenha tudo centralizado.',
      features: ['Importação automática', 'Databases', 'OAuth seguro'],
    },
    {
      name: 'CSV / PDF',
      icon: '📄',
      description: 'Importe seus extratos bancários e planilhas diretamente para o app.',
      features: ['Múltiplos formatos', 'Importação em lote', 'Mapeamento automático'],
    },
  ]

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Integrações que{' '}
            <span className="gradient-text">simplificam sua vida</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Conecte suas ferramentas favoritas e centralize suas finanças
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="glass rounded-3xl p-8 hover:bg-white/5 transition-all group"
            >
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">
                {integration.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{integration.name}</h3>
              <p className="text-neutral-400 mb-6">{integration.description}</p>
              <ul className="space-y-2">
                {integration.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-neutral-300">
                    <span className="text-emerald-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


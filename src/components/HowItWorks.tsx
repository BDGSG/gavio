export function HowItWorks() {
  const steps = [
    { step: '01', title: 'Depliez', description: 'Ouvrez le MagCharge en un geste. Les 3 zones de charge se deploient automatiquement.' },
    { step: '02', title: 'Posez', description: 'Placez vos appareils. Les aimants N52 alignent parfaitement chaque appareil.' },
    { step: '03', title: 'Chargez', description: 'La charge rapide 15W demarre instantanement. Le LED vous indique la progression.' },
  ]

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--color-accent)' }}>Comment ca marche</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">
            Simple comme 1, 2, 3
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="relative p-8 rounded-2xl transition-all duration-300 group hover:-translate-y-1"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              {/* Step number */}
              <span className="font-display text-7xl font-bold absolute top-4 right-6 select-none"
                style={{ color: 'var(--color-accent)', opacity: 0.08 }}>
                {s.step}
              </span>
              {/* Accent dot */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 transition-shadow duration-300"
                style={{ background: 'var(--color-accent)', boxShadow: '0 0 20px var(--color-accent-glow)' }}>
                <span className="font-mono text-sm font-bold text-white">{s.step}</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

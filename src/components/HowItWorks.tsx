export function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Depliez',
      description: 'Ouvrez le MagCharge en un geste. Les 3 zones de charge se deploient automatiquement.',
    },
    {
      step: '2',
      title: 'Posez',
      description: 'Placez votre iPhone, Apple Watch et AirPods. Les aimants N52 alignent parfaitement chaque appareil.',
    },
    {
      step: '3',
      title: 'Chargez',
      description: 'La charge rapide 15W demarre instantanement. Le LED vous indique quand c\'est termine.',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Simple comme 1, 2, 3
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-600 text-white flex items-center justify-center text-2xl font-bold">
                {s.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

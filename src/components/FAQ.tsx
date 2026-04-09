'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { question: 'Est-ce compatible avec mon iPhone ?', answer: 'Le MagCharge est compatible avec tous les iPhone a partir du 12 (12, 13, 14, 15, 16 — toutes versions Pro, Max, Plus, Mini). Il fonctionne egalement avec les coques MagSafe.' },
  { question: 'Quelle est la vitesse de charge ?', answer: 'Le MagCharge delivre 15W pour l\'iPhone (Qi2), 5W pour les AirPods et 2.5W pour l\'Apple Watch. Votre iPhone se recharge environ 50% plus vite qu\'avec un chargeur sans fil classique.' },
  { question: 'Le cable USB-C est-il inclus ?', answer: 'Un cable USB-C de 1m est inclus dans le coffret. Pour une charge optimale a 15W, utilisez un adaptateur secteur 20W ou plus (non inclus).' },
  { question: 'Puis-je charger un seul appareil ?', answer: 'Absolument. Chaque zone de charge fonctionne independamment. Vous pouvez charger 1, 2 ou 3 appareils simultanement.' },
  { question: 'Quels sont les delais de livraison ?', answer: 'Livraison gratuite en France metropolitaine. Comptez 5 a 10 jours ouvrables. Vous recevrez un email avec le numero de suivi des l\'expedition.' },
  { question: 'Quelle est la politique de retour ?', answer: 'Vous disposez de 14 jours apres reception pour retourner le produit. Le retour est gratuit et le remboursement complet.' },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--color-accent)' }}>FAQ</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">
            Questions frequentes
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl overflow-hidden transition-all duration-300"
              style={{ background: openIndex === i ? 'var(--color-surface)' : 'transparent', border: '1px solid var(--color-border)' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200"
              >
                <span className="font-medium text-sm pr-4">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                  style={{ color: 'var(--color-text-muted)' }} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-48 pb-5' : 'max-h-0'}`}>
                <div className="px-5 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
    </section>
  )
}

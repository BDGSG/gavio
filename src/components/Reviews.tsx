import { Star, Quote } from 'lucide-react'

const reviews = [
  { name: 'Marie L.', rating: 5, text: 'Fini le bazar de cables sur ma table de nuit ! Le MagCharge charge mes 3 appareils Apple en meme temps. L\'aimant est super puissant.', date: 'il y a 3 jours' },
  { name: 'Thomas D.', rating: 5, text: 'J\'ai teste pas mal de chargeurs 3-en-1. Celui-ci est de loin le meilleur rapport qualite/prix. Le design pliable est genial pour voyager.', date: 'il y a 1 semaine' },
  { name: 'Sophie M.', rating: 5, text: 'Offert a mon mari pour son anniversaire, il adore. La charge est rapide et le LED discret la nuit.', date: 'il y a 2 semaines' },
  { name: 'Julien R.', rating: 4, text: 'Tres bon produit, compact et elegant sur le bureau. La charge 15W est vraiment rapide. Recommande.', date: 'il y a 3 semaines' },
  { name: 'Camille B.', rating: 5, text: 'Je l\'emmene partout en deplacement. Il se plie a plat, se glisse dans ma trousse et remplace 3 chargeurs.', date: 'il y a 1 mois' },
  { name: 'Antoine P.', rating: 5, text: 'Design tres propre, finition impeccable. Les aimants sont puissants et l\'alignement est parfait a chaque fois.', date: 'il y a 1 mois' },
]

export function Reviews() {
  return (
    <section id="reviews" className="py-24" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--color-accent)' }}>Temoignages</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">
            Ils ont adopte le MagCharge
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>4.8/5 — 127 avis verifies</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <div key={i} className="group p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <Quote className="w-5 h-5 mb-4 transition-colors duration-300" style={{ color: 'var(--color-border)' }} />
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-muted)' }}>{review.text}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{review.name}</span>
                <span className="text-xs font-mono" style={{ color: 'var(--color-text-muted)' }}>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

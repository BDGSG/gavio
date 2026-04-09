import { Star } from 'lucide-react'

const reviews = [
  {
    name: 'Marie L.',
    rating: 5,
    text: 'Fini le bazar de cables sur ma table de nuit ! Le MagCharge charge mes 3 appareils Apple en meme temps. L\'aimant est super puissant, l\'iPhone se clippe parfaitement.',
    date: 'il y a 3 jours',
    verified: true,
  },
  {
    name: 'Thomas D.',
    rating: 5,
    text: 'J\'ai teste pas mal de chargeurs 3-en-1 sur Amazon. Celui-ci est de loin le meilleur rapport qualite/prix. Le design pliable est genial pour voyager.',
    date: 'il y a 1 semaine',
    verified: true,
  },
  {
    name: 'Sophie M.',
    rating: 5,
    text: 'Offert a mon mari pour son anniversaire, il adore. La charge est rapide et le LED discret la nuit. Le support Apple Watch est tres stable.',
    date: 'il y a 2 semaines',
    verified: true,
  },
  {
    name: 'Julien R.',
    rating: 4,
    text: 'Tres bon produit, compact et elegant sur le bureau. Seul bemol : le cable USB-C n\'est pas inclus. Mais la charge 15W est vraiment rapide.',
    date: 'il y a 3 semaines',
    verified: true,
  },
  {
    name: 'Camille B.',
    rating: 5,
    text: 'Je l\'emmene partout en deplacement. Il se plie a plat, se glisse dans ma trousse et remplace 3 chargeurs. Indispensable !',
    date: 'il y a 1 mois',
    verified: true,
  },
  {
    name: 'Antoine P.',
    rating: 5,
    text: 'Design tres propre, finition impeccable. Les aimants sont puissants et l\'alignement avec l\'iPhone est parfait a chaque fois. Je recommande.',
    date: 'il y a 1 mois',
    verified: true,
  },
]

export function Reviews() {
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <section id="reviews" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Ils ont adopte le MagCharge</h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-gray-600">{avgRating}/5 sur {reviews.length} avis verifies</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="card p-6">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                {[...Array(5 - review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gray-200" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">{review.text}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{review.name}</span>
                  {review.verified && (
                    <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 rounded-full font-medium">Achat verifie</span>
                  )}
                </div>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

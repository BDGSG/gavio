export const metadata = { title: 'CGV — Gavio' }

export default function CGVPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Conditions Generales de Vente</h1>
      <div className="prose prose-gray max-w-none space-y-6">

        <h2 className="text-xl font-semibold">1. Objet</h2>
        <p>Les presentes conditions generales de vente (CGV) regissent les ventes de produits effectuees sur le site gavio.fr (ci-apres &quot;le Site&quot;) exploite par Gavio.</p>

        <h2 className="text-xl font-semibold">2. Prix</h2>
        <p>Les prix sont indiques en euros TTC. Gavio se reserve le droit de modifier ses prix a tout moment, mais les produits seront factures au prix en vigueur lors de la validation de la commande.</p>

        <h2 className="text-xl font-semibold">3. Commande</h2>
        <p>La validation de la commande implique l'acceptation des presentes CGV. Un email de confirmation est envoye apres chaque commande.</p>

        <h2 className="text-xl font-semibold">4. Paiement</h2>
        <p>Le paiement s'effectue par carte bancaire (via Stripe) ou PayPal. Le debit est effectue au moment de la validation de la commande. Les transactions sont securisees par chiffrement SSL.</p>

        <h2 className="text-xl font-semibold">5. Livraison</h2>
        <p>Les produits sont livres a l'adresse indiquee lors de la commande. Les delais de livraison sont de 5 a 15 jours ouvrables selon la destination. Les frais de livraison sont offerts.</p>

        <h2 className="text-xl font-semibold">6. Droit de retractation</h2>
        <p>Conformement a l'article L221-18 du Code de la consommation, vous disposez d'un delai de 14 jours a compter de la reception du produit pour exercer votre droit de retractation sans motif. Pour ce faire, contactez-nous a contact@gavio.fr.</p>

        <h2 className="text-xl font-semibold">7. Garantie</h2>
        <p>Tous les produits beneficient de la garantie legale de conformite (articles L217-4 et suivants du Code de la consommation) et de la garantie des vices caches (articles 1641 et suivants du Code civil).</p>

        <h2 className="text-xl font-semibold">8. Responsabilite</h2>
        <p>Gavio ne saurait etre tenu responsable des dommages resultant d'une mauvaise utilisation du produit achete.</p>

        <h2 className="text-xl font-semibold">9. Litiges</h2>
        <p>En cas de litige, une solution amiable sera recherchee avant toute action judiciaire. Le client peut recourir a un mediateur de la consommation. Les presentes CGV sont soumises au droit francais.</p>

        <p className="text-sm text-gray-400 mt-8">Derniere mise a jour : avril 2026</p>
      </div>
    </div>
  )
}

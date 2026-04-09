export const metadata = { title: 'Mentions Legales — Gavio' }

export default function MentionsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Mentions Legales</h1>
      <div className="prose prose-gray max-w-none space-y-6">

        <h2 className="text-xl font-semibold">Editeur du site</h2>
        <p>
          Le site gavio.fr est edite par Gavio.<br />
          Email : contact@gavio.fr
        </p>

        <h2 className="text-xl font-semibold">Hebergement</h2>
        <p>
          Le site est heberge par Hostinger International Ltd.<br />
          61 Lordou Vironos, 6023, Larnaca, Chypre
        </p>

        <h2 className="text-xl font-semibold">Propriete intellectuelle</h2>
        <p>L'ensemble des contenus presents sur le site (textes, images, logos, visuels) sont proteges par le droit de la propriete intellectuelle. Toute reproduction est interdite sans autorisation prealable.</p>

        <h2 className="text-xl font-semibold">Donnees personnelles</h2>
        <p>Conformement au RGPD, vous disposez d'un droit d'acces, de rectification et de suppression de vos donnees personnelles. Contactez-nous a contact@gavio.fr pour exercer vos droits.</p>

        <h2 className="text-xl font-semibold">Cookies</h2>
        <p>Le site utilise des cookies necessaires au bon fonctionnement du service (session, paiement). Aucun cookie publicitaire n'est utilise sans votre consentement.</p>

        <p className="text-sm text-gray-400 mt-8">Derniere mise a jour : avril 2026</p>
      </div>
    </div>
  )
}

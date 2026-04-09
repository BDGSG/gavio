export const metadata = { title: 'Politique de Confidentialite — Gavio' }

export default function PolitiquePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Politique de Confidentialite</h1>
      <div className="prose prose-gray max-w-none space-y-6">

        <h2 className="text-xl font-semibold">1. Donnees collectees</h2>
        <p>Nous collectons les donnees suivantes lors de votre commande :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Nom, prenom</li>
          <li>Adresse email</li>
          <li>Adresse de livraison</li>
          <li>Numero de telephone</li>
        </ul>
        <p>Les donnees de paiement sont traitees directement par Stripe et PayPal. Nous n'avons jamais acces a vos informations bancaires.</p>

        <h2 className="text-xl font-semibold">2. Finalites du traitement</h2>
        <p>Vos donnees sont utilisees pour :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Traiter et expedier votre commande</li>
          <li>Vous envoyer des emails de confirmation et de suivi</li>
          <li>Repondre a vos demandes de support</li>
        </ul>

        <h2 className="text-xl font-semibold">3. Duree de conservation</h2>
        <p>Vos donnees sont conservees pendant la duree necessaire a la gestion de votre commande et aux obligations legales (5 ans pour les factures).</p>

        <h2 className="text-xl font-semibold">4. Partage des donnees</h2>
        <p>Vos donnees sont partagees uniquement avec nos prestataires de services :</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Stripe / PayPal (paiement)</li>
          <li>Notre fournisseur logistique (expedition)</li>
          <li>Resend (emails transactionnels)</li>
        </ul>

        <h2 className="text-xl font-semibold">5. Vos droits</h2>
        <p>Conformement au RGPD, vous disposez des droits suivants : acces, rectification, suppression, portabilite, opposition. Pour exercer vos droits : contact@gavio.fr</p>

        <h2 className="text-xl font-semibold">6. Cookies</h2>
        <p>Nous utilisons uniquement des cookies essentiels au fonctionnement du site (session, panier). Aucun tracking publicitaire sans consentement.</p>

        <p className="text-sm text-gray-400 mt-8">Derniere mise a jour : avril 2026</p>
      </div>
    </div>
  )
}

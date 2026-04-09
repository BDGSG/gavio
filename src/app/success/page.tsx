import Link from 'next/link'
import { CheckCircle, Mail, Package, ArrowLeft } from 'lucide-react'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="card p-8 sm:p-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Merci pour votre commande !
          </h1>
          <p className="text-gray-600 mb-8">
            Votre paiement a bien ete recu. Vous allez recevoir un email de confirmation.
          </p>

          <div className="space-y-4 text-left mb-8">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
              <Mail className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Email de confirmation</p>
                <p className="text-sm text-gray-500">Un recapitulatif de votre commande vous a ete envoye par email.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
              <Package className="w-5 h-5 text-brand-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Suivi de livraison</p>
                <p className="text-sm text-gray-500">Vous recevrez un email avec votre numero de suivi des l'expedition.</p>
              </div>
            </div>
          </div>

          <Link href="/" className="btn-secondary gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour a l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}

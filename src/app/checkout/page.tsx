import { CheckoutForm } from '../../components/CheckoutForm'
import { Shield, Truck, RotateCcw } from 'lucide-react'
import { supabaseAdmin } from '../../lib/supabase'
import { formatPrice } from '../../lib/utils'
import type { Product } from '../../types'

async function getProduct(): Promise<Product | null> {
  try {
    const { data } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('active', true)
      .limit(1)
      .single()
    return data
  } catch {
    return null
  }
}

export default async function CheckoutPage() {
  const product = await getProduct()

  // Fallback si pas de produit en BDD
  const productId = product?.id || 'demo'
  const productName = product?.name || 'Produit Gavio'
  const productPrice = product?.price || 4990

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Formulaire */}
          <div className="lg:col-span-3">
            <div className="card p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Finaliser ma commande</h1>
              <CheckoutForm productId={productId} price={productPrice} />
            </div>
          </div>

          {/* Recap commande */}
          <div className="lg:col-span-2">
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recapitulatif</h2>

              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-xs font-bold text-gray-400">
                  GAVIO
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{productName}</p>
                  <p className="text-sm text-gray-500">Quantite : 1</p>
                </div>
                <p className="font-semibold">{formatPrice(productPrice)}</p>
              </div>

              <div className="py-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sous-total</span>
                  <span>{formatPrice(productPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Livraison</span>
                  <span className="text-green-600 font-medium">Gratuite</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold text-brand-700">{formatPrice(productPrice)}</span>
              </div>

              {/* Trust */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
                  Paiement 100% securise (SSL)
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  Livraison gratuite sous 5-10 jours
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <RotateCcw className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  Retour gratuit sous 14 jours
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

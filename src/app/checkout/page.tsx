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
  const productId = product?.id || 'demo'
  const productName = product?.name || 'Gavio MagCharge 3-en-1'
  const productPrice = product?.price || 3990

  return (
    <div className="min-h-screen pt-20 pb-12" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Formulaire */}
          <div className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <h1 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
                Finaliser ma commande
              </h1>
              <CheckoutForm productId={productId} price={productPrice} />
            </div>
          </div>

          {/* Recap */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-2xl sticky top-24" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <h2 className="font-display text-lg font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                Recapitulatif
              </h2>

              <div className="flex items-center gap-4 pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                  <span className="font-display text-xs font-bold" style={{ color: 'var(--color-accent)' }}>GAVIO</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{productName}</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Quantite : 1</p>
                </div>
                <p className="font-display font-semibold" style={{ color: 'var(--color-accent)' }}>{formatPrice(productPrice)}</p>
              </div>

              <div className="py-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-text-muted)' }}>Sous-total</span>
                  <span style={{ color: 'var(--color-text)' }}>{formatPrice(productPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-text-muted)' }}>Livraison</span>
                  <span className="font-medium" style={{ color: 'var(--color-success, #34d399)' }}>Gratuite</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between" style={{ borderTop: '1px solid var(--color-border)' }}>
                <span className="font-display text-lg font-bold" style={{ color: 'var(--color-text)' }}>Total</span>
                <span className="font-display text-lg font-bold" style={{ color: 'var(--color-accent)' }}>{formatPrice(productPrice)}</span>
              </div>

              {/* Trust badges */}
              <div className="mt-6 space-y-3">
                {[
                  { icon: Shield, text: 'Paiement 100% securise (SSL)', color: '#34d399' },
                  { icon: Truck, text: 'Livraison gratuite sous 5-10 jours', color: 'var(--color-accent)' },
                  { icon: RotateCcw, text: 'Retour gratuit sous 14 jours', color: 'var(--color-accent)' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

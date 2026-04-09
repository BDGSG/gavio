'use client'

import { useState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'
import type { ShippingAddress } from '@/types'

interface CheckoutFormProps {
  productId: string
  price: number
}

export function CheckoutForm({ productId, price }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')
  const [email, setEmail] = useState('')
  const [shipping, setShipping] = useState<ShippingAddress>({
    first_name: '',
    last_name: '',
    address: '',
    address2: '',
    city: '',
    postal_code: '',
    country: 'FR',
    phone: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          shipping,
          payment_method: paymentMethod,
          product_id: productId,
          quantity: 1,
        }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else if (data.error) {
        alert(data.error)
      }
    } catch {
      alert('Une erreur est survenue. Veuillez reessayer.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="votre@email.fr"
          className={inputClass}
        />
      </div>

      {/* Adresse de livraison */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Adresse de livraison</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prenom</label>
            <input
              type="text"
              required
              value={shipping.first_name}
              onChange={e => setShipping(s => ({ ...s, first_name: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              required
              value={shipping.last_name}
              onChange={e => setShipping(s => ({ ...s, last_name: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
          <input
            type="text"
            required
            value={shipping.address}
            onChange={e => setShipping(s => ({ ...s, address: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Complement (optionnel)</label>
          <input
            type="text"
            value={shipping.address2}
            onChange={e => setShipping(s => ({ ...s, address2: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
            <input
              type="text"
              required
              value={shipping.postal_code}
              onChange={e => setShipping(s => ({ ...s, postal_code: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
            <input
              type="text"
              required
              value={shipping.city}
              onChange={e => setShipping(s => ({ ...s, city: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
            <select
              value={shipping.country}
              onChange={e => setShipping(s => ({ ...s, country: e.target.value }))}
              className={inputClass}
            >
              <option value="FR">France</option>
              <option value="BE">Belgique</option>
              <option value="CH">Suisse</option>
              <option value="LU">Luxembourg</option>
              <option value="DE">Allemagne</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telephone</label>
            <input
              type="tel"
              required
              value={shipping.phone}
              onChange={e => setShipping(s => ({ ...s, phone: e.target.value }))}
              placeholder="+33 6 12 34 56 78"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Methode de paiement */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Moyen de paiement</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('stripe')}
            className={`p-4 rounded-xl border-2 transition text-center ${
              paymentMethod === 'stripe'
                ? 'border-brand-600 bg-brand-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CreditCard className="w-6 h-6 mx-auto mb-1 text-gray-700" />
            <span className="text-sm font-medium">Carte bancaire</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('paypal')}
            className={`p-4 rounded-xl border-2 transition text-center ${
              paymentMethod === 'paypal'
                ? 'border-brand-600 bg-brand-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="text-xl font-bold text-[#003087]">Pay</span>
            <span className="text-xl font-bold text-[#009cde]">Pal</span>
            <br />
            <span className="text-sm font-medium text-gray-700">PayPal</span>
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          `Payer ${(price / 100).toFixed(2)} EUR`
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Paiement 100% securise. Vos donnees sont protegees par chiffrement SSL.
      </p>
    </form>
  )
}

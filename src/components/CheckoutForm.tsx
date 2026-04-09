'use client'

import { useState } from 'react'
import { CreditCard, Loader2 } from 'lucide-react'
import type { ShippingAddress } from '../types'

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
        body: JSON.stringify({ email, shipping, payment_method: paymentMethod, product_id: productId, quantity: 1 }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else if (data.error) alert(data.error)
    } catch {
      alert('Une erreur est survenue. Veuillez reessayer.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 12,
    border: '1px solid var(--color-border)',
    background: 'var(--color-bg)',
    color: 'var(--color-text)',
    outline: 'none',
    fontSize: 14,
    fontFamily: "'Satoshi', sans-serif",
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--color-text-muted)',
    marginBottom: 6,
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
          placeholder="votre@email.fr" style={inputStyle}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'} />
      </div>

      {/* Adresse */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold" style={{ color: 'var(--color-text)' }}>Adresse de livraison</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Prenom</label>
            <input type="text" required value={shipping.first_name}
              onChange={e => setShipping(s => ({ ...s, first_name: e.target.value }))}
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </div>
          <div>
            <label style={labelStyle}>Nom</label>
            <input type="text" required value={shipping.last_name}
              onChange={e => setShipping(s => ({ ...s, last_name: e.target.value }))}
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Adresse</label>
          <input type="text" required value={shipping.address}
            onChange={e => setShipping(s => ({ ...s, address: e.target.value }))}
            style={inputStyle}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'} />
        </div>
        <div>
          <label style={labelStyle}>Complement (optionnel)</label>
          <input type="text" value={shipping.address2}
            onChange={e => setShipping(s => ({ ...s, address2: e.target.value }))}
            style={inputStyle}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Code postal</label>
            <input type="text" required value={shipping.postal_code}
              onChange={e => setShipping(s => ({ ...s, postal_code: e.target.value }))}
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </div>
          <div>
            <label style={labelStyle}>Ville</label>
            <input type="text" required value={shipping.city}
              onChange={e => setShipping(s => ({ ...s, city: e.target.value }))}
              style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Pays</label>
            <select value={shipping.country}
              onChange={e => setShipping(s => ({ ...s, country: e.target.value }))}
              style={inputStyle}>
              <option value="FR">France</option>
              <option value="BE">Belgique</option>
              <option value="CH">Suisse</option>
              <option value="LU">Luxembourg</option>
              <option value="DE">Allemagne</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Telephone</label>
            <input type="tel" required value={shipping.phone}
              onChange={e => setShipping(s => ({ ...s, phone: e.target.value }))}
              placeholder="+33 6 12 34 56 78" style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--color-border)'} />
          </div>
        </div>
      </div>

      {/* Paiement */}
      <div className="space-y-3">
        <h3 className="font-display font-semibold" style={{ color: 'var(--color-text)' }}>Moyen de paiement</h3>
        <div className="grid grid-cols-2 gap-4">
          <button type="button" onClick={() => setPaymentMethod('stripe')}
            className="p-4 rounded-xl transition-all duration-200 text-center"
            style={{
              border: paymentMethod === 'stripe' ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
              background: paymentMethod === 'stripe' ? 'rgba(79,110,255,0.08)' : 'var(--color-bg)',
              boxShadow: paymentMethod === 'stripe' ? '0 0 20px var(--color-accent-glow)' : 'none',
            }}>
            <CreditCard className="w-6 h-6 mx-auto mb-1" style={{ color: 'var(--color-text)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Carte bancaire</span>
          </button>
          <button type="button" onClick={() => setPaymentMethod('paypal')}
            className="p-4 rounded-xl transition-all duration-200 text-center"
            style={{
              border: paymentMethod === 'paypal' ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
              background: paymentMethod === 'paypal' ? 'rgba(79,110,255,0.08)' : 'var(--color-bg)',
              boxShadow: paymentMethod === 'paypal' ? '0 0 20px var(--color-accent-glow)' : 'none',
            }}>
            <span className="text-xl font-bold" style={{ color: '#003087' }}>Pay</span>
            <span className="text-xl font-bold" style={{ color: '#009cde' }}>Pal</span>
            <br />
            <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>PayPal</span>
          </button>
        </div>
      </div>

      {/* Submit */}
      <button type="submit" disabled={loading} className="btn-primary w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Payer ${(price / 100).toFixed(2)} EUR`}
      </button>

      <p className="text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
        Paiement 100% securise. Vos donnees sont protegees par chiffrement SSL.
      </p>
    </form>
  )
}

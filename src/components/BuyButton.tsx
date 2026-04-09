'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { formatPrice } from '../lib/utils'

interface BuyButtonProps {
  price: number
  stock: number
  variant?: 'default' | 'large' | 'ghost'
}

export function BuyButton({ price, stock, variant = 'default' }: BuyButtonProps) {
  if (stock <= 0) {
    return (
      <button disabled className="w-full py-4 rounded-xl font-semibold cursor-not-allowed"
        style={{ background: 'var(--color-surface)', color: 'var(--color-text-muted)' }}>
        Rupture de stock
      </button>
    )
  }

  const isLarge = variant === 'large'
  const isGhost = variant === 'ghost'

  return (
    <div className="space-y-3">
      <Link href="/checkout"
        className={`${isGhost ? 'btn-secondary' : 'btn-primary'} w-full ${isLarge ? 'text-lg py-5' : ''}`}>
        <ShoppingBag className={isLarge ? 'w-5 h-5' : 'w-4 h-4'} />
        Commander — {formatPrice(price)}
      </Link>
      {stock <= 15 && (
        <p className="text-center text-sm font-mono animate-pulse" style={{ color: 'var(--color-gold)' }}>
          ⚡ Plus que {stock} en stock
        </p>
      )}
    </div>
  )
}

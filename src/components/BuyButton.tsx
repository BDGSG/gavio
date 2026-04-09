'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { formatPrice } from '../lib/utils'

interface BuyButtonProps {
  price: number
  stock: number
}

export function BuyButton({ price, stock }: BuyButtonProps) {
  if (stock <= 0) {
    return (
      <button disabled className="w-full py-4 bg-gray-200 text-gray-500 font-semibold rounded-xl cursor-not-allowed">
        Rupture de stock
      </button>
    )
  }

  return (
    <div className="space-y-3">
      <Link href="/checkout" className="btn-primary w-full text-lg gap-3">
        <ShoppingBag className="w-5 h-5" />
        Commander — {formatPrice(price)}
      </Link>
      {stock <= 10 && (
        <p className="text-center text-sm text-orange-600 font-medium">
          Plus que {stock} en stock !
        </p>
      )}
    </div>
  )
}

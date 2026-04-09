'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Shield, Truck, RotateCcw } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductHeroProps {
  product: Product
}

export function ProductHero({ product }: ProductHeroProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <section id="product" className="py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
              {product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <span className="text-6xl">GAVIO</span>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === i ? 'border-brand-600' : 'border-transparent'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm text-gray-500">4.8/5 (127 avis)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Prix */}
            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-4xl font-bold text-brand-700">
                {formatPrice(product.price)}
              </span>
              {product.compare_price > 0 && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.compare_price)}
                </span>
              )}
              {product.compare_price > 0 && (
                <span className="px-3 py-1 bg-red-50 text-red-600 text-sm font-semibold rounded-full">
                  -{Math.round((1 - product.price / product.compare_price) * 100)}%
                </span>
              )}
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <ul className="mt-6 space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50">
                <Truck className="w-6 h-6 text-brand-600 mb-1" />
                <span className="text-xs font-medium text-gray-700">Livraison gratuite</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50">
                <Shield className="w-6 h-6 text-brand-600 mb-1" />
                <span className="text-xs font-medium text-gray-700">Paiement securise</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50">
                <RotateCcw className="w-6 h-6 text-brand-600 mb-1" />
                <span className="text-xs font-medium text-gray-700">Retour 14 jours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

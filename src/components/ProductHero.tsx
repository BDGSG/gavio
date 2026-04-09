'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Shield, Truck, RotateCcw } from 'lucide-react'
import { formatPrice } from '../lib/utils'
import type { Product } from '../types'

export function ProductHero({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <section id="product" className="pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden animate-fade-up" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              {product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-all duration-500"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-6xl font-bold" style={{ color: 'var(--color-border)' }}>GAVIO</span>
                </div>
              )}
              {/* Glow effect behind image */}
              <div className="absolute inset-0 opacity-30" style={{
                background: 'radial-gradient(circle at 50% 50%, var(--color-accent-glow), transparent 70%)',
              }} />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 animate-fade-up delay-200">
                {product.images.slice(0, 6).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300"
                    style={{
                      border: selectedImage === i ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                      background: 'var(--color-surface)',
                      boxShadow: selectedImage === i ? '0 0 15px var(--color-accent-glow)' : 'none',
                    }}
                  >
                    <Image src={img} alt="" fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-gold)' }}>
                BESTSELLER 2026
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-5 animate-fade-up delay-100">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>4.8/5 — 127 avis</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mt-4 leading-[1.1] animate-fade-up delay-200">
              {product.name}
            </h1>

            {/* Description */}
            <p className="mt-5 text-lg leading-relaxed animate-fade-up delay-300" style={{ color: 'var(--color-text-muted)' }}>
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-8 flex items-baseline gap-4 animate-fade-up delay-400">
              <span className="font-display text-5xl font-bold" style={{ color: 'var(--color-accent)' }}>
                {formatPrice(product.price)}
              </span>
              {product.compare_price > 0 && (
                <>
                  <span className="text-xl line-through" style={{ color: 'var(--color-text-muted)' }}>
                    {formatPrice(product.compare_price)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-bold"
                    style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>
                    -{Math.round((1 - product.price / product.compare_price) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Features */}
            {product.features.length > 0 && (
              <ul className="mt-8 space-y-3 animate-fade-up delay-500">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--color-accent)' }} />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {/* Trust badges */}
            <div className="mt-10 grid grid-cols-3 gap-3 animate-fade-up delay-600">
              {[
                { icon: Truck, label: 'Livraison offerte' },
                { icon: Shield, label: 'Paiement securise' },
                { icon: RotateCcw, label: 'Retour 14 jours' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center p-3 rounded-xl"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <Icon className="w-5 h-5 mb-1.5" style={{ color: 'var(--color-accent)' }} />
                  <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

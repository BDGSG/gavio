'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style={{ background: 'rgba(6,6,10,0.8)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display text-xl font-bold tracking-tight" style={{ color: 'var(--color-accent)' }}>
            GAVIO
          </Link>
          <nav className="hidden sm:flex items-center gap-8">
            <a href="#product" className="text-sm font-medium transition-colors duration-200" style={{ color: 'var(--color-text-muted)' }}
               onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
               onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
              MagCharge
            </a>
            <a href="#features" className="text-sm font-medium transition-colors duration-200" style={{ color: 'var(--color-text-muted)' }}
               onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
               onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
              Avantages
            </a>
            <a href="#reviews" className="text-sm font-medium transition-colors duration-200" style={{ color: 'var(--color-text-muted)' }}
               onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
               onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}>
              Avis
            </a>
          </nav>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300"
            style={{ background: 'var(--color-accent)', color: 'white', boxShadow: '0 0 20px var(--color-accent-glow)' }}
          >
            <ShoppingBag className="w-4 h-4" />
            Commander
          </Link>
        </div>
      </div>
    </header>
  )
}

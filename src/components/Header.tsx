'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold tracking-tight text-brand-700">
            GAVIO
          </Link>
          <nav className="hidden sm:flex items-center gap-8">
            <a href="#product" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
              MagCharge 3-en-1
            </a>
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
              Avantages
            </a>
            <a href="#reviews" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
              Avis clients
            </a>
          </nav>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            Commander
          </Link>
        </div>
      </div>
    </header>
  )
}

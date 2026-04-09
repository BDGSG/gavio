'use client'

import { useState, useEffect } from 'react'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('gavio_cookies_accepted')) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('gavio_cookies_accepted', 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 lg:p-0">
      <div className="max-w-4xl mx-auto lg:mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl backdrop-blur-xl"
          style={{ background: 'rgba(13,13,20,0.95)', border: '1px solid var(--color-border)' }}>
          <p className="text-sm flex-1" style={{ color: 'var(--color-text-muted)' }}>
            Ce site utilise des cookies essentiels au fonctionnement du service (session, paiement). Aucun cookie publicitaire sans votre consentement.
            {' '}<a href="/politique" className="underline" style={{ color: 'var(--color-accent)' }}>En savoir plus</a>
          </p>
          <button onClick={accept}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200"
            style={{ background: 'var(--color-accent)', color: 'white' }}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}

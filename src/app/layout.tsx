import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CookieBanner } from '../components/CookieBanner'

const GA_ID = 'G-X5Q4DR22EL'

export const metadata: Metadata = {
  title: 'Gavio MagCharge 3-en-1 — Chargeur Sans Fil Magnetique Pliable',
  description: 'Chargeur sans fil magnetique 3-en-1 pliable : rechargez iPhone, Apple Watch et AirPods simultanement. Charge rapide 15W, design ultra-compact, livraison gratuite France.',
  keywords: 'chargeur sans fil, 3 en 1, magnetique, MagSafe, pliable, iPhone, Apple Watch, AirPods, charge rapide, Qi2',
  openGraph: {
    title: 'Gavio MagCharge 3-en-1 — Chargeur Sans Fil Magnetique',
    description: 'Rechargez iPhone + Apple Watch + AirPods en meme temps. Design pliable ultra-compact. Livraison gratuite.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Gavio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gavio MagCharge 3-en-1',
    description: 'Le chargeur sans fil magnetique pliable qui remplace 3 cables.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { CookieBanner } from '../components/CookieBanner'

const GA_ID = 'G-X5Q4DR22EL'
const TIKTOK_PIXEL_ID = 'D7C2A43C77UFT36K5COG'

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
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${TIKTOK_PIXEL_ID}');ttq.page()}(window,document,'ttq');`}
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

import Link from 'next/link'
import Script from 'next/script'
import { CheckCircle, Mail, Package, ArrowLeft } from 'lucide-react'

export default function SuccessPage() {
  return (
    <>
      <Script id="ga-purchase" strategy="afterInteractive">
        {`if(typeof gtag==='function'){gtag('event','purchase',{currency:'EUR',value:39.90,items:[{item_name:'Gavio MagCharge 3-en-1',price:39.90,quantity:1}]});}`}
      </Script>
      <Script id="tiktok-purchase" strategy="afterInteractive">
        {`if(typeof ttq!=='undefined'){ttq.track('CompletePayment',{content_type:'product',content_id:'magcharge-3-en-1',currency:'EUR',value:39.90});}`}
      </Script>
    <div className="min-h-screen flex items-center justify-center py-12 pt-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-lg mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 rounded-2xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
            <CheckCircle className="w-10 h-10" style={{ color: '#34d399' }} />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
            Merci pour votre commande !
          </h1>
          <p className="mb-8" style={{ color: 'var(--color-text-muted)' }}>
            Votre paiement a bien ete recu. Vous allez recevoir un email de confirmation.
          </p>
          <div className="space-y-4 text-left mb-8">
            {[
              { icon: Mail, title: 'Email de confirmation', desc: 'Un recapitulatif vous a ete envoye par email.' },
              { icon: Package, title: 'Suivi de livraison', desc: 'Vous recevrez un email avec votre numero de suivi des l\'expedition.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{title}</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/" className="btn-secondary gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour a l'accueil
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

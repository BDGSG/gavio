import { ProductHero } from '../components/ProductHero'
import { BuyButton } from '../components/BuyButton'
import { Reviews } from '../components/Reviews'
import { HowItWorks } from '../components/HowItWorks'
import { FAQ } from '../components/FAQ'
import { ProductSchema } from '../components/ProductSchema'
import { Zap, Battery, Smartphone, Briefcase, Shield, Sparkles } from 'lucide-react'
import { supabaseAdmin } from '../lib/supabase'
import type { Product } from '../types'

const PRODUCT_TAGLINE = 'Chargez tout. Un seul geste.'

// Produit par defaut (fallback avant insertion en BDD)
const defaultProduct: Product = {
  id: 'demo',
  name: 'Gavio MagCharge 3-en-1',
  slug: 'magcharge-3-en-1',
  cj_product_id: '',
  cj_variant_id: '',
  price: 3990,
  compare_price: 5990,
  currency: 'EUR',
  description: 'Le chargeur sans fil magnetique pliable qui recharge votre iPhone, Apple Watch et AirPods simultanement. Design ultra-compact, aimants puissants, charge rapide 15W. Fini les cables emmeles — un seul geste, trois appareils charges.',
  features: [
    'Charge rapide 15W MagSafe — 2x plus rapide qu\'un chargeur standard',
    'Compatible iPhone 12/13/14/15/16, AirPods Pro, Apple Watch',
    'Design pliable ultra-compact — se glisse dans une poche',
    'Aimants N52 puissants — fixation parfaite a chaque fois',
    'Certifie Qi2 — securite et compatibilite garanties',
    'Indicateur LED intelligent — charge en cours / terminee',
  ],
  images: [],
  stock: 47,
  active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

async function getProduct(): Promise<Product> {
  try {
    const { data } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('active', true)
      .limit(1)
      .single()
    return data || defaultProduct
  } catch {
    return defaultProduct
  }
}

export default async function HomePage() {
  const product = await getProduct()

  return (
    <>
      {/* SEO Schema */}
      <ProductSchema product={product} />

      {/* Video Hero */}
      <section className="relative bg-gray-950 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[50vh] lg:h-[60vh] object-cover opacity-80"
          poster={product.images[0] || undefined}
        >
          <source src="https://nk4oso8o0k48wcc0w4o40kog.coolify.inkora.art/download/hero" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16 text-white">
          <h2 className="text-2xl lg:text-4xl font-bold mb-2">{PRODUCT_TAGLINE}</h2>
          <p className="text-lg text-gray-300">Decouvrez le MagCharge en action</p>
        </div>
      </section>

      {/* Hero */}
      <ProductHero product={product} />

      {/* CTA sticky mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 p-4 shadow-2xl">
        <BuyButton price={product.price} stock={product.stock} />
      </div>

      {/* Desktop CTA */}
      <section className="hidden lg:block py-8">
        <div className="max-w-md mx-auto px-4">
          <BuyButton price={product.price} stock={product.stock} />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Un chargeur, trois appareils, zero cable
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-brand-50 to-white">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-brand-100 flex items-center justify-center">
                <Zap className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Charge rapide 15W</h3>
              <p className="text-gray-600">Technologie Qi2 certifiee. Rechargez votre iPhone 50% plus vite qu'avec un chargeur classique.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-brand-50 to-white">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-brand-100 flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ultra-compact & pliable</h3>
              <p className="text-gray-600">Se plie a plat en 2 secondes. Parfait pour le bureau, la table de nuit ou le voyage.</p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-brand-50 to-white">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-brand-100 flex items-center justify-center">
                <Smartphone className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3 appareils en 1</h3>
              <p className="text-gray-600">iPhone + Apple Watch + AirPods charges en meme temps. Un seul cable USB-C suffit.</p>
            </div>
          </div>

          {/* Avantages supplementaires */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <Battery className="w-5 h-5 text-brand-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Protection surcharge intelligente</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <Shield className="w-5 h-5 text-brand-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Certifie CE, FCC, RoHS</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
              <Sparkles className="w-5 h-5 text-brand-600 flex-shrink-0" />
              <span className="text-sm text-gray-700">Finition soft-touch premium</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* Reviews */}
      <Reviews />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-600 to-brand-800 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simplifiez votre bureau. Chargez tout en un geste.
          </h2>
          <p className="text-lg text-brand-100 mb-8">
            Rejoignez des centaines de clients satisfaits. Livraison offerte en France et retour gratuit sous 14 jours.
          </p>
          <BuyButton price={product.price} stock={product.stock} />
        </div>
      </section>

      {/* Padding bottom pour le CTA mobile sticky */}
      <div className="lg:hidden h-24" />
    </>
  )
}

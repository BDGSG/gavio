import { ProductHero } from '../components/ProductHero'
import { BuyButton } from '../components/BuyButton'
import { Reviews } from '../components/Reviews'
import { HowItWorks } from '../components/HowItWorks'
import { FAQ } from '../components/FAQ'
import { ProductSchema } from '../components/ProductSchema'
import { Zap, Smartphone, Briefcase, Battery, Shield, Sparkles } from 'lucide-react'
import { supabaseAdmin } from '../lib/supabase'
import type { Product } from '../types'

const PRODUCT_TAGLINE = 'Chargez tout. Un seul geste.'

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
    <div className="grain">
      <ProductSchema product={product} />

      {/* ======= CINEMATIC VIDEO HERO ======= */}
      <section className="relative h-[90vh] overflow-hidden flex items-center justify-center">
        {/* Video background */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={product.images[0] || undefined}
        >
          <source src="https://nk4oso8o0k48wcc0w4o40kog.coolify.inkora.art/download/hero" type="video/mp4" />
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(6,6,10,0.3) 0%, rgba(6,6,10,0.6) 50%, rgba(6,6,10,0.95) 100%)',
        }} />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="animate-fade-up">
            <span className="inline-block font-mono text-xs tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-8"
              style={{ background: 'rgba(79,110,255,0.1)', border: '1px solid rgba(79,110,255,0.3)', color: 'var(--color-accent)' }}>
              Nouveau — MagCharge 3-en-1
            </span>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] animate-fade-up delay-200">
            {PRODUCT_TAGLINE.split('.')[0]}.
            <br />
            <span style={{ color: 'var(--color-accent)' }}>{PRODUCT_TAGLINE.split('.')[1]?.trim() || ''}</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto animate-fade-up delay-400" style={{ color: 'var(--color-text-muted)' }}>
            Rechargez iPhone, Apple Watch et AirPods simultanement.<br className="hidden sm:block" />
            Un design pliable qui tient dans votre poche.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up delay-500">
            <BuyButton price={product.price} stock={product.stock} variant="large" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full flex items-start justify-center pt-2" style={{ border: '2px solid var(--color-border)' }}>
            <div className="w-1 h-2 rounded-full" style={{ background: 'var(--color-accent)' }} />
          </div>
        </div>
      </section>

      {/* ======= GLOW SEPARATOR ======= */}
      <div className="glow-line opacity-50" />

      {/* ======= PRODUCT HERO (details) ======= */}
      <ProductHero product={product} />

      {/* ======= MOBILE STICKY CTA ======= */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 backdrop-blur-xl"
        style={{ background: 'rgba(6,6,10,0.9)', borderTop: '1px solid var(--color-border)' }}>
        <BuyButton price={product.price} stock={product.stock} />
      </div>

      {/* ======= FEATURES ======= */}
      <section id="features" className="py-24" style={{ background: 'var(--color-surface)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: 'var(--color-accent)' }}>Specifications</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3">
              Un chargeur, trois appareils, zero cable
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: 'Charge rapide 15W', desc: 'Technologie Qi2 certifiee. Rechargez votre iPhone 50% plus vite qu\'avec un chargeur classique.' },
              { icon: Briefcase, title: 'Ultra-compact & pliable', desc: 'Se plie a plat en 2 secondes. Parfait pour le bureau, la table de nuit ou le voyage.' },
              { icon: Smartphone, title: '3 appareils en 1', desc: 'iPhone + Apple Watch + AirPods charges en meme temps. Un seul cable USB-C suffit.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-shadow duration-300"
                  style={{ background: 'rgba(79,110,255,0.1)', border: '1px solid rgba(79,110,255,0.2)' }}>
                  <Icon className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-3">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Extra badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
            {[
              { icon: Battery, label: 'Protection surcharge' },
              { icon: Shield, label: 'Certifie CE, FCC, RoHS' },
              { icon: Sparkles, label: 'Finition soft-touch premium' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-3.5 rounded-xl"
                style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                <Icon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= HOW IT WORKS ======= */}
      <HowItWorks />

      {/* ======= REVIEWS ======= */}
      <Reviews />

      {/* ======= FAQ ======= */}
      <FAQ />

      {/* ======= FINAL CTA ======= */}
      <section className="relative py-32 overflow-hidden">
        {/* Glow background */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 50%, var(--color-accent-glow), transparent 70%)',
        }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Simplifiez votre bureau.
            <br />
            <span style={{ color: 'var(--color-accent)' }}>Chargez tout en un geste.</span>
          </h2>
          <p className="mt-6 text-lg" style={{ color: 'var(--color-text-muted)' }}>
            Livraison offerte en France. Retour gratuit sous 14 jours.
          </p>
          <div className="mt-10">
            <BuyButton price={product.price} stock={product.stock} variant="large" />
          </div>
        </div>
      </section>

      {/* Mobile bottom padding */}
      <div className="lg:hidden h-24" />
    </div>
  )
}

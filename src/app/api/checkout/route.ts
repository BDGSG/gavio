import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '../../../lib/stripe'
import { createPayPalOrder } from '../../../lib/paypal'
import { supabaseAdmin } from '../../../lib/supabase'
import type { CheckoutData } from '../../../types'

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutData = await req.json()
    const { email, shipping, payment_method, product_id, quantity } = body

    // Validation
    if (!email || !shipping.first_name || !shipping.last_name || !shipping.address || !shipping.city || !shipping.postal_code || !shipping.phone) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }

    // Recuperer le produit
    let product
    if (product_id === 'demo') {
      product = { id: 'demo', price: 4990, name: 'Produit Gavio', currency: 'EUR' }
    } else {
      const { data, error } = await supabaseAdmin
        .from('products')
        .select('*')
        .eq('id', product_id)
        .eq('active', true)
        .single()
      if (error || !data) {
        return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 })
      }
      product = data
    }

    const amount = product.price * (quantity || 1)

    // Creer la commande en BDD (status pending)
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        email,
        product_id: product_id === 'demo' ? null : product_id,
        quantity: quantity || 1,
        amount,
        currency: product.currency || 'EUR',
        status: 'pending',
        payment_method,
        shipping_address: shipping,
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json({ error: 'Erreur creation commande' }, { status: 500 })
    }

    // Stripe
    if (payment_method === 'stripe') {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: email,
        line_items: [{
          price_data: {
            currency: product.currency || 'eur',
            product_data: { name: product.name },
            unit_amount: product.price,
          },
          quantity: quantity || 1,
        }],
        metadata: { order_id: order.id },
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      })

      // Sauvegarder le session ID
      await supabaseAdmin
        .from('orders')
        .update({ stripe_session_id: session.id })
        .eq('id', order.id)

      return NextResponse.json({ url: session.url })
    }

    // PayPal
    if (payment_method === 'paypal') {
      const paypalOrder = await createPayPalOrder(amount, product.currency || 'EUR')

      await supabaseAdmin
        .from('orders')
        .update({ paypal_order_id: paypalOrder.id })
        .eq('id', order.id)

      const approveLink = paypalOrder.links?.find((l: { rel: string }) => l.rel === 'approve')
      return NextResponse.json({ url: approveLink?.href })
    }

    return NextResponse.json({ error: 'Methode de paiement invalide' }, { status: 400 })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

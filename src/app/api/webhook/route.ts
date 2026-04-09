import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { createOrder as createCJOrder } from '@/lib/cjdropshipping'
import { sendOrderConfirmation } from '@/lib/resend'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.order_id

    if (!orderId) {
      console.error('No order_id in session metadata')
      return NextResponse.json({ received: true })
    }

    // Mettre a jour le statut → paid
    const { data: order } = await supabaseAdmin
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', orderId)
      .select()
      .single()

    if (!order) {
      console.error('Order not found:', orderId)
      return NextResponse.json({ received: true })
    }

    // Recuperer le produit
    const { data: product } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', order.product_id)
      .single()

    // Envoyer email de confirmation
    if (product) {
      try {
        await sendOrderConfirmation(order, product)
      } catch (err) {
        console.error('Email send error:', err)
      }
    }

    // Transmettre la commande a CJ Dropshipping
    if (product?.cj_variant_id) {
      try {
        const address = order.shipping_address
        const cjResponse = await createCJOrder({
          orderNumber: order.id,
          shippingZip: address.postal_code,
          shippingCountryCode: address.country,
          shippingCountry: address.country,
          shippingProvince: '',
          shippingCity: address.city,
          shippingAddress: `${address.address}${address.address2 ? ', ' + address.address2 : ''}`,
          shippingCustomerName: `${address.first_name} ${address.last_name}`,
          shippingPhone: address.phone,
          products: [{
            vid: product.cj_variant_id,
            quantity: order.quantity,
          }],
        })

        if (cjResponse.result) {
          await supabaseAdmin
            .from('orders')
            .update({
              status: 'processing',
              cj_order_id: cjResponse.data.cjOrderId,
            })
            .eq('id', orderId)
        } else {
          console.error('CJ order failed:', cjResponse.message)
        }
      } catch (err) {
        console.error('CJ order error:', err)
      }
    }
  }

  return NextResponse.json({ received: true })
}

import { NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase'
import { getTracking } from '../../../lib/cjdropshipping'
import { sendTrackingEmail } from '../../../lib/resend'

// Cron endpoint : met a jour le tracking de toutes les commandes en cours
// Appeler via cron externe (Coolify cron ou n8n) toutes les 4h
export async function GET() {
  try {
    // Recuperer les commandes processing (envoyees a CJ, pas encore expediees)
    const { data: orders } = await supabaseAdmin
      .from('orders')
      .select('*, products(*)')
      .in('status', ['processing'])
      .not('cj_order_id', 'is', null)

    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: 'No orders to track', updated: 0 })
    }

    let updated = 0

    for (const order of orders) {
      try {
        const tracking = await getTracking(order.cj_order_id)

        if (tracking.result && tracking.data?.trackNumber) {
          const wasShipped = !order.tracking_number && tracking.data.trackNumber

          await supabaseAdmin
            .from('orders')
            .update({
              tracking_number: tracking.data.trackNumber,
              status: 'shipped',
            })
            .eq('id', order.id)

          // Envoyer email tracking si c'est la premiere fois
          if (wasShipped && order.products) {
            try {
              await sendTrackingEmail(
                { ...order, tracking_number: tracking.data.trackNumber },
                order.products
              )
            } catch (err) {
              console.error(`Tracking email failed for ${order.id}:`, err)
            }
          }

          updated++
        }
      } catch (err) {
        console.error(`Tracking check failed for ${order.id}:`, err)
      }
    }

    return NextResponse.json({ message: 'Tracking updated', updated })
  } catch (err) {
    console.error('Tracking cron error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

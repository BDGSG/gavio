import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '../../../lib/supabase'
import { getTracking } from '../../../lib/cjdropshipping'
import { sendTrackingEmail } from '../../../lib/resend'

// Cron secret to prevent unauthorized access
const CRON_SECRET = process.env.CRON_SECRET || process.env.NEXT_PUBLIC_ADMIN_PASSWORD

export async function GET(req: NextRequest) {
  // Auth check
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // 1. Update tracking for processing orders
    const { data: orders } = await supabaseAdmin
      .from('orders')
      .select('*')
      .in('status', ['processing'])
      .not('cj_order_id', 'is', null)

    let trackingUpdated = 0

    if (orders) {
      for (const order of orders) {
        try {
          const tracking = await getTracking(order.cj_order_id)
          if (tracking.result && tracking.data?.trackNumber) {
            const wasShipped = !order.tracking_number
            await supabaseAdmin
              .from('orders')
              .update({ tracking_number: tracking.data.trackNumber, status: 'shipped' })
              .eq('id', order.id)

            if (wasShipped) {
              const { data: product } = await supabaseAdmin
                .from('products')
                .select('*')
                .eq('id', order.product_id)
                .single()
              if (product) {
                await sendTrackingEmail({ ...order, tracking_number: tracking.data.trackNumber }, product)
              }
            }
            trackingUpdated++
          }
        } catch (err) {
          console.error(`Tracking failed for ${order.id}:`, err)
        }
      }
    }

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      tracking_updated: trackingUpdated,
      orders_checked: orders?.length || 0,
    })
  } catch (err) {
    console.error('Cron error:', err)
    return NextResponse.json({ error: 'Cron failed' }, { status: 500 })
  }
}

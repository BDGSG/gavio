import { Resend } from 'resend'
import type { Order, Product } from '../types'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM_EMAIL = process.env.FROM_EMAIL || 'Gavio <noreply@gavio.fr>'

export async function sendOrderConfirmation(order: Order, product: Product) {
  const amount = (order.amount / 100).toFixed(2)
  const address = order.shipping_address

  await resend.emails.send({
    from: FROM_EMAIL,
    to: order.email,
    subject: `Gavio — Confirmation de commande #${order.id.slice(0, 8)}`,
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;">
        <h1 style="color:#4263eb;font-size:24px;">Merci pour votre commande !</h1>
        <p>Bonjour ${address.first_name},</p>
        <p>Votre commande a bien ete enregistree et sera expediee dans les plus brefs delais.</p>

        <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin:24px 0;">
          <h3 style="margin:0 0 12px;">${product.name}</h3>
          <p style="margin:4px 0;color:#666;">Quantite : ${order.quantity}</p>
          <p style="margin:4px 0;font-size:18px;font-weight:600;">Total : ${amount} EUR</p>
        </div>

        <div style="margin:24px 0;">
          <h3>Adresse de livraison</h3>
          <p style="color:#666;">
            ${address.first_name} ${address.last_name}<br/>
            ${address.address}<br/>
            ${address.address2 ? address.address2 + '<br/>' : ''}
            ${address.postal_code} ${address.city}<br/>
            ${address.country}
          </p>
        </div>

        <p>Vous recevrez un email avec le numero de suivi des que votre colis sera expedie.</p>
        <p style="color:#666;font-size:14px;">L'equipe Gavio</p>
      </div>
    `,
  })
}

export async function sendTrackingEmail(order: Order, product: Product) {
  const address = order.shipping_address

  await resend.emails.send({
    from: FROM_EMAIL,
    to: order.email,
    subject: `Gavio — Votre colis a ete expedie ! #${order.id.slice(0, 8)}`,
    html: `
      <div style="font-family:Inter,system-ui,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;">
        <h1 style="color:#4263eb;font-size:24px;">Votre colis est en route !</h1>
        <p>Bonjour ${address.first_name},</p>
        <p>Votre commande de <strong>${product.name}</strong> a ete expediee.</p>

        <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin:24px 0;text-align:center;">
          <p style="margin:0 0 8px;color:#666;">Numero de suivi</p>
          <p style="margin:0;font-size:20px;font-weight:700;color:#4263eb;">${order.tracking_number}</p>
        </div>

        <p style="color:#666;font-size:14px;">L'equipe Gavio</p>
      </div>
    `,
  })
}

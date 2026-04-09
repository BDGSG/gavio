// ============================================
// GAVIO — Types globaux
// ============================================

export interface Product {
  id: string
  name: string
  slug: string
  cj_product_id: string
  cj_variant_id: string
  price: number           // prix de vente en centimes
  compare_price: number   // ancien prix barre en centimes
  currency: string
  description: string
  features: string[]
  images: string[]
  stock: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  email: string
  product_id: string
  quantity: number
  amount: number          // montant paye en centimes
  currency: string
  status: OrderStatus
  payment_method: 'stripe' | 'paypal'
  stripe_session_id: string | null
  paypal_order_id: string | null
  cj_order_id: string | null
  tracking_number: string | null
  shipping_address: ShippingAddress
  created_at: string
  updated_at: string
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'refunded'
  | 'cancelled'

export interface ShippingAddress {
  first_name: string
  last_name: string
  address: string
  address2?: string
  city: string
  postal_code: string
  country: string
  phone: string
}

export interface CheckoutData {
  email: string
  shipping: ShippingAddress
  payment_method: 'stripe' | 'paypal'
  product_id: string
  quantity: number
}

// CJ Dropshipping API types
export interface CJProduct {
  pid: string
  productNameEn: string
  productImage: string
  sellPrice: number
  variants: CJVariant[]
}

export interface CJVariant {
  vid: string
  variantNameEn: string
  variantImage: string
  variantSellPrice: number
  variantStock: number
}

export interface CJOrderRequest {
  orderNumber: string
  shippingZip: string
  shippingCountryCode: string
  shippingCountry: string
  shippingProvince: string
  shippingCity: string
  shippingAddress: string
  shippingCustomerName: string
  shippingPhone: string
  products: {
    vid: string
    quantity: number
  }[]
}

export interface CJOrderResponse {
  result: boolean
  message: string
  data: {
    orderNum: string
    cjOrderId: string
  }
}

export interface CJTrackingResponse {
  result: boolean
  data: {
    trackNumber: string
    logisticsStatus: string
    trackInfo: {
      date: string
      info: string
    }[]
  }
}

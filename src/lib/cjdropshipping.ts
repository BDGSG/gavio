import type { CJOrderRequest, CJOrderResponse, CJTrackingResponse } from '@/types'

const CJ_API_KEY = process.env.CJ_API_KEY!
const CJ_BASE_URL = 'https://developers.cjdropshipping.com/api2.0/v1'

async function getAccessToken(): Promise<string> {
  const res = await fetch(`${CJ_BASE_URL}/authentication/getAccessToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: CJ_API_KEY }),
  })
  const data = await res.json()
  if (!data.result) throw new Error(`CJ Auth failed: ${data.message}`)
  return data.data.accessToken
}

// Cache token (expire apres 14 jours, on refresh a 12j)
let cachedToken: string | null = null
let tokenExpiry = 0

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken
  cachedToken = await getAccessToken()
  tokenExpiry = Date.now() + 12 * 24 * 60 * 60 * 1000 // 12 jours
  return cachedToken
}

async function cjFetch(endpoint: string, options: RequestInit = {}) {
  const token = await getToken()
  const res = await fetch(`${CJ_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'CJ-Access-Token': token,
      ...options.headers,
    },
  })
  return res.json()
}

// Recuperer les details d'un produit
export async function getProduct(productId: string) {
  return cjFetch(`/product/query?pid=${productId}`)
}

// Recuperer le stock d'un variant
export async function getVariantStock(variantId: string) {
  return cjFetch(`/product/stock/queryByVid?vid=${variantId}`)
}

// Creer une commande CJ
export async function createOrder(order: CJOrderRequest): Promise<CJOrderResponse> {
  return cjFetch('/shopping/order/createOrder', {
    method: 'POST',
    body: JSON.stringify(order),
  })
}

// Recuperer le tracking
export async function getTracking(orderId: string): Promise<CJTrackingResponse> {
  return cjFetch(`/logistic/getTrackInfo?orderNum=${orderId}`)
}

// Lister les produits par categorie
export async function listProducts(categoryId: string, page: number = 1) {
  return cjFetch(`/product/list?categoryId=${categoryId}&pageNum=${page}&pageSize=20`)
}

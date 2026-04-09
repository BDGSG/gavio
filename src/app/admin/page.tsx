'use client'

import { useEffect, useState, useMemo } from 'react'
import {
  Package, TrendingUp, Clock, Truck, Users, CreditCard,
  RefreshCw, ArrowUpRight, ArrowDownRight, Eye, ShoppingBag,
  BarChart3, Activity, Calendar, Filter
} from 'lucide-react'
import { formatPrice, formatDate } from '@/lib/utils'
import type { Order } from '@/types'

// ============================================
// GAVIO ADMIN DASHBOARD
// ============================================

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'activity'>('overview')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | 'all'>('30d')

  // ---- Auth ----
  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      alert('Mot de passe incorrect')
    }
  }

  // ---- Fetch ----
  async function fetchOrders() {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data.orders || [])
    } catch {
      console.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authenticated) {
      fetchOrders()
      const interval = setInterval(fetchOrders, 30000)
      return () => clearInterval(interval)
    }
  }, [authenticated])

  // ---- Computed stats ----
  const stats = useMemo(() => {
    const now = new Date()
    const filterDate = (days: number) => new Date(now.getTime() - days * 86400000)

    const rangeStart = dateRange === 'today' ? filterDate(1)
      : dateRange === '7d' ? filterDate(7)
      : dateRange === '30d' ? filterDate(30)
      : new Date(0)

    const filtered = orders.filter(o => new Date(o.created_at) >= rangeStart)
    const prevStart = dateRange === 'today' ? filterDate(2)
      : dateRange === '7d' ? filterDate(14)
      : dateRange === '30d' ? filterDate(60)
      : new Date(0)
    const prevFiltered = orders.filter(o => {
      const d = new Date(o.created_at)
      return d >= prevStart && d < rangeStart
    })

    const revenue = filtered
      .filter(o => !['cancelled', 'refunded'].includes(o.status))
      .reduce((s, o) => s + o.amount, 0)
    const prevRevenue = prevFiltered
      .filter(o => !['cancelled', 'refunded'].includes(o.status))
      .reduce((s, o) => s + o.amount, 0)

    const totalOrders = filtered.length
    const prevTotalOrders = prevFiltered.length

    const uniqueEmails = new Set(filtered.map(o => o.email)).size
    const prevUniqueEmails = new Set(prevFiltered.map(o => o.email)).size

    const avgOrderValue = totalOrders > 0 ? revenue / totalOrders : 0

    const paidCount = filtered.filter(o => o.status === 'paid').length
    const processingCount = filtered.filter(o => o.status === 'processing').length
    const shippedCount = filtered.filter(o => o.status === 'shipped').length
    const deliveredCount = filtered.filter(o => o.status === 'delivered').length
    const refundedCount = filtered.filter(o => o.status === 'refunded').length
    const cancelledCount = filtered.filter(o => o.status === 'cancelled').length

    const stripeCount = filtered.filter(o => o.payment_method === 'stripe').length
    const paypalCount = filtered.filter(o => o.payment_method === 'paypal').length

    function trend(current: number, previous: number) {
      if (previous === 0) return current > 0 ? 100 : 0
      return Math.round(((current - previous) / previous) * 100)
    }

    // Revenue par jour (7 derniers jours)
    const dailyRevenue: { date: string; amount: number; orders: number }[] = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 86400000)
      const dayStr = date.toISOString().split('T')[0]
      const dayOrders = orders.filter(o => o.created_at.startsWith(dayStr) && !['cancelled', 'refunded'].includes(o.status))
      dailyRevenue.push({
        date: date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }),
        amount: dayOrders.reduce((s, o) => s + o.amount, 0),
        orders: dayOrders.length,
      })
    }

    return {
      revenue, prevRevenue, revenueTrend: trend(revenue, prevRevenue),
      totalOrders, prevTotalOrders, ordersTrend: trend(totalOrders, prevTotalOrders),
      uniqueEmails, prevUniqueEmails, clientsTrend: trend(uniqueEmails, prevUniqueEmails),
      avgOrderValue,
      paidCount, processingCount, shippedCount, deliveredCount, refundedCount, cancelledCount,
      stripeCount, paypalCount,
      dailyRevenue,
      filtered,
    }
  }, [orders, dateRange])

  // ---- Login screen ----
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white">GAVIO</h1>
            <p className="text-gray-400 text-sm mt-1">Tableau de bord</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mot de passe admin"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-gray-500"
            />
            <button type="submit" className="w-full py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition">
              Connexion
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ---- Helpers UI ----
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    paid: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    processing: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    shipped: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
    refunded: 'bg-red-500/10 text-red-400 border-red-500/20',
    cancelled: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  }

  const statusLabels: Record<string, string> = {
    pending: 'En attente',
    paid: 'Paye',
    processing: 'En cours',
    shipped: 'Expedie',
    delivered: 'Livre',
    refunded: 'Rembourse',
    cancelled: 'Annule',
  }

  function TrendBadge({ value }: { value: number }) {
    if (value === 0) return <span className="text-xs text-gray-500">—</span>
    return value > 0 ? (
      <span className="flex items-center gap-0.5 text-xs text-emerald-400">
        <ArrowUpRight className="w-3 h-3" />+{value}%
      </span>
    ) : (
      <span className="flex items-center gap-0.5 text-xs text-red-400">
        <ArrowDownRight className="w-3 h-3" />{value}%
      </span>
    )
  }

  const maxDailyRevenue = Math.max(...stats.dailyRevenue.map(d => d.amount), 1)

  const filteredOrders = statusFilter === 'all'
    ? stats.filtered
    : stats.filtered.filter(o => o.status === statusFilter)

  // ---- Activite recente (timeline) ----
  const recentActivity = orders.slice(0, 20).map(order => ({
    id: order.id,
    email: order.email,
    amount: order.amount,
    status: order.status,
    payment_method: order.payment_method,
    date: order.created_at,
  }))

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top bar */}
      <div className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-brand-400">GAVIO</h1>
            <nav className="hidden sm:flex items-center gap-1">
              {(['overview', 'orders', 'activity'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === tab
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {tab === 'overview' && 'Vue d\'ensemble'}
                  {tab === 'orders' && 'Commandes'}
                  {tab === 'activity' && 'Activite'}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {/* Date range */}
            <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
              {(['today', '7d', '30d', 'all'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    dateRange === range ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {range === 'today' ? 'Aujourd\'hui' : range === 'all' ? 'Tout' : range}
                </button>
              ))}
            </div>
            <button
              onClick={() => { setLoading(true); fetchOrders() }}
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ========== OVERVIEW TAB ========== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <TrendBadge value={stats.revenueTrend} />
                </div>
                <p className="text-2xl font-bold">{formatPrice(stats.revenue)}</p>
                <p className="text-sm text-gray-400 mt-1">Chiffre d'affaires</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <ShoppingBag className="w-5 h-5 text-brand-400" />
                  <TrendBadge value={stats.ordersTrend} />
                </div>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
                <p className="text-sm text-gray-400 mt-1">Commandes</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <Users className="w-5 h-5 text-purple-400" />
                  <TrendBadge value={stats.clientsTrend} />
                </div>
                <p className="text-2xl font-bold">{stats.uniqueEmails}</p>
                <p className="text-sm text-gray-400 mt-1">Clients uniques</p>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <CreditCard className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold">{formatPrice(stats.avgOrderValue)}</p>
                <p className="text-sm text-gray-400 mt-1">Panier moyen</p>
              </div>
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue chart (bar) */}
              <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                  <h3 className="font-semibold">Revenue 7 derniers jours</h3>
                </div>
                <div className="flex items-end gap-3 h-48">
                  {stats.dailyRevenue.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs text-gray-400">{day.amount > 0 ? formatPrice(day.amount) : ''}</span>
                      <div
                        className="w-full bg-brand-600/80 rounded-t-lg transition-all duration-500 min-h-[4px]"
                        style={{ height: `${Math.max((day.amount / maxDailyRevenue) * 140, 4)}px` }}
                      />
                      <div className="text-center">
                        <span className="text-xs text-gray-500 block">{day.date}</span>
                        <span className="text-xs text-gray-600">{day.orders} cmd</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status breakdown */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <h3 className="font-semibold">Statuts commandes</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'En attente', count: stats.paidCount, color: 'bg-blue-500' },
                    { label: 'En cours', count: stats.processingCount, color: 'bg-purple-500' },
                    { label: 'Expediees', count: stats.shippedCount, color: 'bg-emerald-500' },
                    { label: 'Livrees', count: stats.deliveredCount, color: 'bg-green-500' },
                    { label: 'Remboursees', count: stats.refundedCount, color: 'bg-red-500' },
                    { label: 'Annulees', count: stats.cancelledCount, color: 'bg-gray-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                        <span className="text-sm text-gray-300">{item.label}</span>
                      </div>
                      <span className="text-sm font-semibold">{item.count}</span>
                    </div>
                  ))}
                </div>

                {/* Payment split */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <h4 className="text-sm text-gray-400 mb-3">Moyens de paiement</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-brand-400" />
                      <span className="text-sm">Carte : <strong>{stats.stripeCount}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#009cde]">PP</span>
                      <span className="text-sm">PayPal : <strong>{stats.paypalCount}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== ORDERS TAB ========== */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-gray-400" />
              <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
                {['all', 'paid', 'processing', 'shipped', 'delivered', 'refunded'].map(status => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                      statusFilter === status ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {status === 'all' ? 'Tous' : statusLabels[status] || status}
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-500">{filteredOrders.length} commandes</span>
            </div>

            {/* Table */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Montant</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Paiement</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">CJ Order</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Tracking</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {loading ? (
                      <tr><td colSpan={8} className="px-6 py-12 text-center text-gray-500">Chargement...</td></tr>
                    ) : filteredOrders.length === 0 ? (
                      <tr><td colSpan={8} className="px-6 py-12 text-center text-gray-500">Aucune commande</td></tr>
                    ) : (
                      filteredOrders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-800/30 transition">
                          <td className="px-6 py-4 text-sm font-mono text-gray-300">{order.id.slice(0, 8)}</td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-white">{order.email}</p>
                            <p className="text-xs text-gray-500">{order.shipping_address?.first_name} {order.shipping_address?.last_name}</p>
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-white">{formatPrice(order.amount)}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[order.status] || ''}`}>
                              {statusLabels[order.status] || order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">{order.payment_method === 'stripe' ? 'Carte' : 'PayPal'}</td>
                          <td className="px-6 py-4 text-sm font-mono text-gray-500">{order.cj_order_id?.slice(0, 10) || '—'}</td>
                          <td className="px-6 py-4 text-sm font-mono text-gray-500">{order.tracking_number || '—'}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{formatDate(order.created_at)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========== ACTIVITY TAB ========== */}
        {activeTab === 'activity' && (
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-semibold">Activite recente</h2>
            </div>
            <div className="space-y-1">
              {recentActivity.length === 0 ? (
                <p className="text-gray-500 py-8 text-center">Aucune activite recente</p>
              ) : (
                recentActivity.map((event, i) => (
                  <div key={event.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-900 transition">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full mt-1 ${
                        event.status === 'paid' ? 'bg-blue-500' :
                        event.status === 'shipped' ? 'bg-emerald-500' :
                        event.status === 'delivered' ? 'bg-green-500' :
                        event.status === 'refunded' ? 'bg-red-500' :
                        'bg-gray-500'
                      }`} />
                      {i < recentActivity.length - 1 && <div className="w-px h-full bg-gray-800 mt-1" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${statusColors[event.status]}`}>
                          {statusLabels[event.status] || event.status}
                        </span>
                        <span className="text-sm font-semibold text-white">{formatPrice(event.amount)}</span>
                        <span className="text-xs text-gray-500">via {event.payment_method === 'stripe' ? 'Carte' : 'PayPal'}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1 truncate">{event.email}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                      <Calendar className="w-3 h-3" />
                      {formatDate(event.date)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

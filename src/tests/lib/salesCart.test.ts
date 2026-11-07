import { describe, expect, it } from 'vitest'
import { addItemToCart, calculateCartSummary, type CartItem } from '@/lib/salesCart'
import { applyPayment, createCheckoutSummary } from '@/lib/salesCheckout'

describe('sales cart helpers', () => {
  it('adds a product into cart and keeps quantity aggregated', () => {
    const product = {
      id: 'prod-1',
      sku: 'SKU-001',
      name: 'Whiskas Adult Tuna',
      base_unit: 'pcs',
    }

    const cart = addItemToCart([], product, 120000)
    const nextCart = addItemToCart(cart, product, 120000)

    expect(nextCart).toHaveLength(1)
    expect(nextCart[0].quantity).toBe(2)
  })

  it('calculates subtotal, discount, tax, and total from cart items', () => {
    const items: CartItem[] = [
      { id: 'prod-1', sku: 'SKU-001', name: 'Whiskas Adult Tuna', quantity: 2, unitPrice: 120000, discount: 0 },
      { id: 'prod-2', sku: 'SKU-002', name: 'Vitamin Cacing', quantity: 1, unitPrice: 80000, discount: 10000 },
    ]

    const summary = calculateCartSummary(items)

    expect(summary.subtotal).toBe(320000)
    expect(summary.discount).toBe(10000)
    expect(summary.tax).toBe(34100)
    expect(summary.total).toBe(344100)
  })

  it('creates a valid payment summary for checkout', () => {
    const payment = createCheckoutSummary(344100, 'cash', 400000)

    expect(payment.change).toBe(55900)
    expect(payment.status).toBe('ready')
    expect(payment.amountPaid).toBe(400000)
  })

  it('flags underpayment before transaction is confirmed', () => {
    const payment = applyPayment(344100, 200000)

    expect(payment.change).toBe(0)
    expect(payment.status).toBe('underpaid')
    expect(payment.remaining).toBe(144100)
  })
})

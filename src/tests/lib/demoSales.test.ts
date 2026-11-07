import { beforeEach, describe, expect, it } from 'vitest'
import { clearDemoSales, createDemoSale, getDemoSaleRecord, getDemoSaleRecords, getDemoSales } from '@/lib/demoSales'
import type { DemoCheckoutInput } from '@/lib/demoSales'

const checkout: DemoCheckoutInput = {
  idempotencyKey: 'checkout-1',
  organizationId: 'org-demo',
  branchId: 'branch-demo',
  cashierUserId: 'user-demo-admin',
  items: [
    { id: 'prod-1', sku: 'SKU-001', name: 'Food', quantity: 1, unitPrice: 120000, discount: 0 },
  ],
  subtotal: 120000,
  discount: 0,
  tax: 13200,
  total: 133200,
  paymentMethod: 'cash',
  amountPaid: 140000,
}

describe('demo sales', () => {
  beforeEach(() => clearDemoSales())

  it('records a cash sale and its change in demo storage', () => {
    const result = createDemoSale(checkout)

    expect(result.sale.status).toBe('completed')
    expect(result.payment.status).toBe('paid')
    expect(result.change).toBe(6800)
    expect(getDemoSales().find(sale => sale.id === result.sale.id)).toEqual(result.sale)
    expect(getDemoSaleRecord(result.sale.id)).toEqual(result)
    expect(getDemoSaleRecords()).toHaveLength(1)
  })

  it('returns no receipt record for an unknown sale id', () => {
    expect(getDemoSaleRecord('unknown-sale')).toBeNull()
  })

  it('returns the original result for an idempotent retry', () => {
    const original = createDemoSale(checkout)
    const retry = createDemoSale(checkout)

    expect(retry).toEqual(original)
    expect(getDemoSales().filter(sale => sale.id === original.sale.id)).toHaveLength(1)
  })

  it('rejects reusing an idempotency key with a different payload', () => {
    createDemoSale(checkout)

    expect(() => createDemoSale({ ...checkout, amountPaid: 150000 })).toThrow()
    expect(getDemoSales().filter(sale => sale.status === 'completed')).toHaveLength(3)
  })

  it('keeps non-cash payments pending in demo mode', () => {
    const result = createDemoSale({ ...checkout, idempotencyKey: 'checkout-2', paymentMethod: 'transfer' })

    expect(result.sale.status).toBe('pending')
    expect(result.payment.status).toBe('pending')
  })

  it('rejects underpayment without creating a sale', () => {
    expect(() => createDemoSale({ ...checkout, idempotencyKey: 'checkout-3', amountPaid: 100000 })).toThrow()
    expect(getDemoSales().some(sale => sale.transaction_number.endsWith('0004'))).toBe(false)
  })
})
import { describe, expect, it } from 'vitest'
import {
  filterCustomers,
  getLowStockProducts,
  getSalesSummary,
  mockCustomers,
  mockProducts,
  mockSales,
} from '@/lib/mockData'

describe('mockData helpers', () => {
  it('filters customers by name or phone', () => {
    const result = filterCustomers(mockCustomers, 'sari')

    expect(result.length).toBeGreaterThan(0)
    expect(result[0].full_name.toLowerCase()).toContain('sari')
  })

  it('returns products that are near or below reorder threshold', () => {
    const result = getLowStockProducts(mockProducts, 6)

    expect(result.length).toBeGreaterThan(0)
    expect(result.every(product => Number(product.stock ?? 0) <= 6)).toBe(true)
  })

  it('calculates a sales summary from transaction data', () => {
    const summary = getSalesSummary(mockSales)

    const completedRevenue = mockSales
      .filter(sale => sale.status === 'completed')
      .reduce((total, sale) => total + sale.total_amount, 0)

    expect(summary.totalRevenue).toBe(completedRevenue)
    expect(summary.completed).toBeGreaterThan(0)
    expect(summary.pending).toBeGreaterThanOrEqual(0)
  })
})

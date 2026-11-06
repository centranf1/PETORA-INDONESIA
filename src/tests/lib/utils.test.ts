import { expect, test } from 'vitest'
import { formatCurrency, formatNumber, formatDate, getInitials } from '../lib/utils'

test('formatCurrency should format IDR correctly', () => {
  const result = formatCurrency(1000000)
  expect(result).toContain('1.000.000')
})

test('formatNumber should format numbers with thousand separators', () => {
  const result = formatNumber(1000000)
  expect(result).toBe('1.000.000')
})

test('formatDate should return formatted date', () => {
  const result = formatDate('2026-11-06')
  expect(result).toContain('2026')
})

test('getInitials should return first 2 letters of name', () => {
  const result = getInitials('John Doe')
  expect(result).toBe('JD')
})

test('getInitials should handle single word names', () => {
  const result = getInitials('John')
  expect(result).toBe('J')
})
import { expect, test } from 'vitest'

test('basic math operations', () => {
  expect(1 + 1).toBe(2)
  expect(2 * 3).toBe(6)
  expect(10 / 2).toBe(5)
})

test('string operations', () => {
  const name = 'PETORA'
  expect(name.toLowerCase()).toBe('petora')
  expect(name.length).toBe(6)
})
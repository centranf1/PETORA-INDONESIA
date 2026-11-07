import type { Payment, SalesTransaction } from '@/types'
import { mockSales } from '@/lib/mockData'
import type { CartItem } from '@/lib/salesCart'
import type { PaymentMethod } from '@/lib/salesCheckout'

const STORAGE_KEY = 'petora-demo-sales-v1'

export interface DemoCheckoutInput {
  idempotencyKey: string
  organizationId: string
  branchId: string
  cashierUserId: string
  items: CartItem[]
  subtotal: number
  discount: number
  tax: number
  total: number
  paymentMethod: PaymentMethod
  amountPaid: number
}

export interface DemoSaleRecord {
  sale: SalesTransaction
  payment: Payment
  items: CartItem[]
  change: number
  idempotencyKey: string
  requestFingerprint: string
}

function readRecords(): DemoSaleRecord[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const records: unknown = stored ? JSON.parse(stored) : []
    return Array.isArray(records) ? records as DemoSaleRecord[] : []
  } catch {
    return []
  }
}

function writeRecords(records: DemoSaleRecord[]) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  }
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `demo-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function createRequestFingerprint(input: DemoCheckoutInput) {
  return JSON.stringify({
    organizationId: input.organizationId,
    branchId: input.branchId,
    cashierUserId: input.cashierUserId,
    items: input.items,
    subtotal: input.subtotal,
    discount: input.discount,
    tax: input.tax,
    total: input.total,
    paymentMethod: input.paymentMethod,
    amountPaid: input.amountPaid,
  })
}

function nextTransactionNumber(records: DemoSaleRecord[], year: number) {
  const prefix = `TRX-${year}-`
  const numbers = [...mockSales, ...records.map(record => record.sale)]
    .map(sale => sale.transaction_number)
    .filter(number => number.startsWith(prefix))
    .map(number => Number(number.slice(prefix.length)))
    .filter(Number.isFinite)

  return `${prefix}${String(Math.max(0, ...numbers) + 1).padStart(4, '0')}`
}

export function getDemoSales(): SalesTransaction[] {
  return [...mockSales, ...readRecords().map(record => record.sale)]
    .sort((left, right) => right.created_at.localeCompare(left.created_at))
}

export function getDemoSaleRecords(): DemoSaleRecord[] {
  return readRecords()
}

export function getDemoSaleRecord(saleId: string): DemoSaleRecord | null {
  return readRecords().find(record => record.sale.id === saleId) ?? null
}

export function createDemoSale(input: DemoCheckoutInput): DemoSaleRecord {
  if (!input.idempotencyKey.trim()) throw new Error('Kunci checkout wajib diisi')
  if (input.items.length === 0) throw new Error('Keranjang tidak boleh kosong')

  const amounts = [input.subtotal, input.discount, input.tax, input.total, input.amountPaid]
  if (amounts.some(amount => !Number.isFinite(amount) || amount < 0)) {
    throw new Error('Nominal checkout tidak valid')
  }
  if (input.total <= 0 || input.amountPaid < input.total) {
    throw new Error('Pembayaran belum mencukupi total transaksi')
  }

  const records = readRecords()
  const requestFingerprint = createRequestFingerprint(input)
  const previous = records.find(record => record.idempotencyKey === input.idempotencyKey)

  if (previous) {
    if (previous.requestFingerprint !== requestFingerprint) {
      throw new Error('Kunci checkout yang sama tidak dapat digunakan untuk payload berbeda')
    }
    return previous
  }

  const createdAt = new Date().toISOString()
  const isCash = input.paymentMethod === 'cash'
  const saleId = createId()
  const sale: SalesTransaction = {
    id: saleId,
    organization_id: input.organizationId,
    branch_id: input.branchId,
    transaction_number: nextTransactionNumber(records, new Date(createdAt).getFullYear()),
    customer_id: null,
    cashier_user_id: input.cashierUserId,
    currency: 'IDR',
    subtotal: input.subtotal,
    discount_amount: input.discount,
    tax_amount: input.tax,
    total_amount: input.total,
    status: isCash ? 'completed' : 'pending',
    created_at: createdAt,
    updated_at: createdAt,
  }
  const payment: Payment = {
    id: createId(),
    organization_id: input.organizationId,
    branch_id: input.branchId,
    sales_transaction_id: saleId,
    method: input.paymentMethod,
    amount: input.total,
    currency: 'IDR',
    status: isCash ? 'paid' : 'pending',
    provider_reference: null,
    settled_at: isCash ? createdAt : null,
    created_at: createdAt,
  }
  const record: DemoSaleRecord = {
    sale,
    payment,
    items: input.items.map(item => ({ ...item })),
    change: isCash ? input.amountPaid - input.total : 0,
    idempotencyKey: input.idempotencyKey,
    requestFingerprint,
  }

  writeRecords([...records, record])
  return record
}

export function clearDemoSales() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY)
  }
}
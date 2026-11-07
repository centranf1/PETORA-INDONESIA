export type PaymentMethod = 'cash' | 'transfer' | 'card' | 'ewallet'

export interface PaymentResult {
  amountPaid: number
  change: number
  remaining: number
  status: 'ready' | 'underpaid' | 'overpaid'
  paymentMethod: PaymentMethod
}

export function applyPayment(total: number, amountPaid: number, paymentMethod: PaymentMethod = 'cash'): PaymentResult {
  const normalizedAmount = Math.max(0, Number(amountPaid) || 0)

  if (normalizedAmount < total) {
    return {
      amountPaid: normalizedAmount,
      change: 0,
      remaining: total - normalizedAmount,
      status: 'underpaid',
      paymentMethod,
    }
  }

  return {
    amountPaid: normalizedAmount,
    change: normalizedAmount - total,
    remaining: 0,
    status: 'ready',
    paymentMethod,
  }
}

export function createCheckoutSummary(total: number, paymentMethod: PaymentMethod = 'cash', amountPaid: number) {
  const payment = applyPayment(total, amountPaid, paymentMethod)

  return {
    total,
    paymentMethod,
    amountPaid: payment.amountPaid,
    change: payment.change,
    remaining: payment.remaining,
    status: payment.status,
  }
}

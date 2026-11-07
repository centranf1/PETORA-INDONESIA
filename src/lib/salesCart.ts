export interface CartItem {
  id: string
  sku: string
  name: string
  quantity: number
  unitPrice: number
  discount: number
}

export function addItemToCart(
  items: CartItem[],
  product: Pick<CartItem, 'id' | 'sku' | 'name'>,
  unitPrice: number,
  quantity = 1,
): CartItem[] {
  const existingItem = items.find(item => item.id === product.id)

  if (existingItem) {
    return items.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + quantity, unitPrice }
        : item,
    )
  }

  return [
    ...items,
    {
      id: product.id,
      sku: product.sku,
      name: product.name,
      quantity,
      unitPrice,
      discount: 0,
    },
  ]
}

export function updateCartItemQuantity(items: CartItem[], itemId: string, quantity: number): CartItem[] {
  if (quantity <= 0) {
    return items.filter(item => item.id !== itemId)
  }

  return items.map(item =>
    item.id === itemId ? { ...item, quantity } : item,
  )
}

export function calculateCartSummary(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const discount = items.reduce((sum, item) => sum + item.discount, 0)
  const tax = Math.round((subtotal - discount) * 0.11)
  const total = subtotal - discount + tax
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return {
    subtotal,
    discount,
    tax,
    total,
    itemCount,
  }
}

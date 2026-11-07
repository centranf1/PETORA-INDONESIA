import type {
  Customer,
  InventoryLocation,
  Pet,
  Product,
  SalesTransaction,
  StockLedger,
} from '@/types'

export const mockCustomers: Customer[] = [
  {
    id: 'c-1001',
    organization_id: 'org-demo',
    branch_id: 'branch-1',
    full_name: 'Sari Putri',
    phone: '081234567890',
    normalized_phone: '081234567890',
    email: 'sari@example.com',
    status: 'active',
    membership_number: 'PET-001',
    loyalty_points: 120,
    created_at: '2026-01-11T08:00:00.000Z',
    updated_at: '2026-11-01T08:00:00.000Z',
    created_by: null,
    updated_by: null,
  },
  {
    id: 'c-1002',
    organization_id: 'org-demo',
    branch_id: 'branch-1',
    full_name: 'Rizky Pratama',
    phone: '081298765432',
    normalized_phone: '081298765432',
    email: 'rizky@example.com',
    status: 'active',
    membership_number: 'PET-002',
    loyalty_points: 80,
    created_at: '2026-02-03T10:30:00.000Z',
    updated_at: '2026-11-02T10:30:00.000Z',
    created_by: null,
    updated_by: null,
  },
  {
    id: 'c-1003',
    organization_id: 'org-demo',
    branch_id: 'branch-2',
    full_name: 'Dewi Lestari',
    phone: '082233445566',
    normalized_phone: '082233445566',
    email: 'dewi@example.com',
    status: 'inactive',
    membership_number: 'PET-003',
    loyalty_points: 45,
    created_at: '2026-03-20T09:15:00.000Z',
    updated_at: '2026-11-03T09:15:00.000Z',
    created_by: null,
    updated_by: null,
  },
]

export const mockPets: Pet[] = [
  {
    id: 'pet-1',
    organization_id: 'org-demo',
    name: 'Milo',
    species: 'Dog',
    breed: 'Corgi',
    sex: 'male',
    date_of_birth: '2022-07-10',
    weight: 8.5,
    color: 'Brown',
    microchip_id: 'MC-1122',
    status: 'active',
    notes: 'Aktif dan sehat',
    created_at: '2026-01-11T08:00:00.000Z',
    updated_at: '2026-11-01T08:00:00.000Z',
  },
  {
    id: 'pet-2',
    organization_id: 'org-demo',
    name: 'Luna',
    species: 'Cat',
    breed: 'Persia',
    sex: 'female',
    date_of_birth: '2021-05-15',
    weight: 3.4,
    color: 'White',
    microchip_id: 'MC-3344',
    status: 'active',
    notes: 'Cenderung mudah stres',
    created_at: '2026-02-03T10:30:00.000Z',
    updated_at: '2026-11-02T10:30:00.000Z',
  },
]

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    organization_id: 'org-demo',
    sku: 'SKU-001',
    name: 'Whiskas Adult Tuna',
    item_type: 'product',
    base_unit: 'pcs',
    category: 'Makanan',
    brand: 'Whiskas',
    description: 'Makanan kucing tuna',
    status: 'active',
    stock: 8,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-11-01T00:00:00.000Z',
  },
  {
    id: 'prod-2',
    organization_id: 'org-demo',
    sku: 'SKU-002',
    name: 'Vitamin Cacing',
    item_type: 'product',
    base_unit: 'box',
    category: 'Kesehatan',
    brand: 'PetCare',
    description: 'Vitamin untuk kesehatan hewan',
    status: 'active',
    stock: 3,
    created_at: '2026-01-05T00:00:00.000Z',
    updated_at: '2026-11-02T00:00:00.000Z',
  },
  {
    id: 'prod-3',
    organization_id: 'org-demo',
    sku: 'SKU-003',
    name: 'Grooming Basic Service',
    item_type: 'service',
    base_unit: 'session',
    category: 'Grooming',
    description: 'Layanan grooming dasar',
    status: 'active',
    stock: 99,
    created_at: '2026-02-01T00:00:00.000Z',
    updated_at: '2026-11-03T00:00:00.000Z',
  },
]

export const mockSales: SalesTransaction[] = [
  {
    id: 'sale-001',
    organization_id: 'org-demo',
    branch_id: 'branch-1',
    transaction_number: 'TRX-2026-0001',
    customer_id: 'c-1001',
    cashier_user_id: 'user-100',
    currency: 'IDR',
    subtotal: 300000,
    discount_amount: 25000,
    tax_amount: 24000,
    total_amount: 349000,
    status: 'completed',
    created_at: '2026-11-06T09:15:00.000Z',
    updated_at: '2026-11-06T09:20:00.000Z',
  },
  {
    id: 'sale-002',
    organization_id: 'org-demo',
    branch_id: 'branch-1',
    transaction_number: 'TRX-2026-0002',
    customer_id: 'c-1002',
    cashier_user_id: 'user-100',
    currency: 'IDR',
    subtotal: 760000,
    discount_amount: 50000,
    tax_amount: 61000,
    total_amount: 821000,
    status: 'completed',
    created_at: '2026-11-05T16:40:00.000Z',
    updated_at: '2026-11-05T16:45:00.000Z',
  },
  {
    id: 'sale-003',
    organization_id: 'org-demo',
    branch_id: 'branch-2',
    transaction_number: 'TRX-2026-0003',
    customer_id: 'c-1003',
    cashier_user_id: 'user-201',
    currency: 'IDR',
    subtotal: 275000,
    discount_amount: 0,
    tax_amount: 22000,
    total_amount: 297000,
    status: 'pending',
    created_at: '2026-11-04T12:05:00.000Z',
    updated_at: '2026-11-04T12:05:00.000Z',
  },
]

export const mockInventoryLocations: InventoryLocation[] = [
  {
    id: 'loc-1',
    organization_id: 'org-demo',
    branch_id: 'branch-1',
    code: 'WH-01',
    name: 'Warehouse Utama',
    location_type: 'warehouse',
    status: 'active',
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'loc-2',
    organization_id: 'org-demo',
    branch_id: 'branch-1',
    code: 'SHOP-01',
    name: 'Floor Display',
    location_type: 'shop_floor',
    status: 'active',
    created_at: '2026-01-02T00:00:00.000Z',
  },
]

export const mockStockLedger: StockLedger[] = [
  {
    id: 'ledger-1',
    organization_id: 'org-demo',
    branch_id: 'branch-1',
    location_id: 'loc-1',
    product_id: 'prod-1',
    batch_id: null,
    movement_type: 'in',
    quantity_delta: 20,
    unit: 'pcs',
    source_type: 'purchase_order',
    source_id: 'po-101',
    created_by: 'user-100',
    created_at: '2026-11-01T08:00:00.000Z',
  },
  {
    id: 'ledger-2',
    organization_id: 'org-demo',
    branch_id: 'branch-1',
    location_id: 'loc-2',
    product_id: 'prod-1',
    batch_id: null,
    movement_type: 'out',
    quantity_delta: -5,
    unit: 'pcs',
    source_type: 'sales',
    source_id: 'sale-001',
    created_by: 'user-100',
    created_at: '2026-11-06T09:20:00.000Z',
  },
  {
    id: 'ledger-3',
    organization_id: 'org-demo',
    branch_id: 'branch-1',
    location_id: 'loc-1',
    product_id: 'prod-2',
    batch_id: null,
    movement_type: 'adjustment',
    quantity_delta: -2,
    unit: 'box',
    source_type: 'inventory_check',
    source_id: 'check-003',
    created_by: 'user-110',
    created_at: '2026-11-05T13:00:00.000Z',
  },
]

export function filterCustomers(customers: Customer[], query: string): Customer[] {
  const normalized = query.trim().toLowerCase()

  if (!normalized) {
    return customers
  }

  return customers.filter(customer =>
    customer.full_name.toLowerCase().includes(normalized) ||
    customer.phone.toLowerCase().includes(normalized) ||
    customer.email?.toLowerCase().includes(normalized)
  )
}

export function getInventoryAlerts(products: Product[], threshold = 5): Product[] {
  return products.filter(product => Number(product.stock ?? 0) <= threshold)
}

export function getLowStockProducts(products: Product[], threshold = 5): Product[] {
  return getInventoryAlerts(products, threshold)
}

export function getSalesSummary(transactions: SalesTransaction[]) {
  const completedTransactions = transactions.filter(transaction => transaction.status === 'completed')
  const totalRevenue = completedTransactions.reduce((sum, transaction) => sum + Number(transaction.total_amount || 0), 0)
  const completed = transactions.filter(transaction => transaction.status === 'completed').length
  const pending = transactions.filter(transaction => transaction.status === 'pending').length
  const refunded = transactions.filter(transaction => transaction.status === 'refunded').length

  return {
    totalRevenue,
    completed,
    pending,
    refunded,
  }
}

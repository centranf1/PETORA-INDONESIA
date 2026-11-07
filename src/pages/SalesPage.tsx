import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { useSales, useCreateSale } from '@/services/api/sales'
import { useCustomers } from '@/services/api/customers'
import { useProducts } from '@/services/api/products'
import { getSalesSummary } from '@/lib/mockData'
import { getDemoSaleRecords, type DemoSaleRecord } from '@/lib/demoSales'
import { Search, Plus, ShoppingCart, Receipt, Filter } from 'lucide-react'

export const SalesPage = () => {
  const [search, setSearch] = React.useState('')
  const { data: sales, isLoading, error } = useSales()
  const { data: customers } = useCustomers()
  const { data: products } = useProducts()
  const [selectedReceiptId, setSelectedReceiptId] = React.useState<string | null>(null)
  const summary = React.useMemo(() => getSalesSummary(sales ?? []), [sales])
  const demoReceipts = React.useMemo(
    () => new Map(getDemoSaleRecords().map(record => [record.sale.id, record])),
    [sales],
  )
  const selectedReceipt = selectedReceiptId ? demoReceipts.get(selectedReceiptId) : undefined
  
  const filteredSales = sales?.filter(s => 
    s.transaction_number.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Penjualan (POS)</Text>
          <Text muted>Kelola transaksi penjualan</Text>
        </div>
        <Link to="/sales/new">
          <Button>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Transaksi Baru
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <Text size="sm" muted>Total Revenue</Text>
            <Text size="2xl" weight="bold">Rp {summary.totalRevenue.toLocaleString('id-ID')}</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text size="sm" muted>Completed</Text>
            <Text size="2xl" weight="bold">{summary.completed}</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text size="sm" muted>Pending</Text>
            <Text size="2xl" weight="bold">{summary.pending}</Text>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari transaksi..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div role="alert" className="py-8 text-center text-sm text-destructive">
              Daftar transaksi tidak dapat dimuat.
            </div>
          ) : isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 bg-muted rounded-md animate-pulse" />
              ))}
            </div>
          ) : filteredSales && filteredSales.length > 0 ? (
            <div className="space-y-2">
              {filteredSales.map(sale => {
                const demoReceipt = demoReceipts.get(sale.id)

                return (
                  <div key={sale.id} className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-border p-4 hover:bg-accent/50">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <Receipt className="h-5 w-5" />
                        </div>
                        <div>
                          <Text size="sm" weight="medium">{sale.transaction_number}</Text>
                          <Text size="xs" muted>{new Date(sale.created_at).toLocaleString('id-ID')}</Text>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="text-right">
                          <Text size="sm" weight="semibold">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(sale.total_amount)}
                          </Text>
                          <Text size="xs" muted>{sale.cashier_user_id}</Text>
                        </div>
                        <Badge variant={sale.status === 'completed' ? 'default' : sale.status === 'pending' ? 'secondary' : 'destructive'}>
                          {sale.status}
                        </Badge>
                        {demoReceipt && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            aria-expanded={selectedReceiptId === sale.id}
                            onClick={() => setSelectedReceiptId(current => current === sale.id ? null : sale.id)}
                          >
                            <Receipt className="h-4 w-4" />
                            {selectedReceiptId === sale.id ? 'Tutup struk' : 'Struk demo'}
                          </Button>
                        )}
                      </div>
                    </div>

                    {selectedReceipt?.sale.id === sale.id && (
                      <DemoReceipt record={selectedReceipt} />
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <Text size="lg" weight="medium" className="mb-2">Belum ada transaksi</Text>
              <Text muted>Mulai dengan transaksi baru</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function DemoReceipt({ record }: { record: DemoSaleRecord }) {
  const currency = (amount: number) => new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: record.sale.currency,
    maximumFractionDigits: 0,
  }).format(amount)

  return (
    <section aria-label={`Pratinjau struk demo ${record.sale.transaction_number}`} className="rounded-md border border-dashed border-amber-500/60 bg-amber-50/50 p-4">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-border pb-3">
        <div>
          <Text size="sm" weight="semibold">Pratinjau struk demo</Text>
          <Text size="xs" muted>{record.sale.transaction_number} · {new Date(record.sale.created_at).toLocaleString('id-ID')}</Text>
        </div>
        <Badge variant="secondary">Bukan struk fiskal</Badge>
      </div>

      <div className="space-y-2 py-3">
        {record.items.map(item => (
          <div key={item.id} className="flex justify-between gap-4 text-sm">
            <span>{item.name} × {item.quantity}</span>
            <span className="shrink-0">{currency(item.unitPrice * item.quantity - item.discount)}</span>
          </div>
        ))}
      </div>

      <dl className="space-y-1 border-t border-border pt-3 text-sm">
        <div className="flex justify-between gap-4"><dt>Subtotal</dt><dd>{currency(record.sale.subtotal)}</dd></div>
        <div className="flex justify-between gap-4"><dt>Diskon</dt><dd>{currency(record.sale.discount_amount)}</dd></div>
        <div className="flex justify-between gap-4"><dt>Pajak demo</dt><dd>{currency(record.sale.tax_amount)}</dd></div>
        <div className="flex justify-between gap-4 font-semibold"><dt>Total</dt><dd>{currency(record.sale.total_amount)}</dd></div>
        <div className="flex justify-between gap-4"><dt>Pembayaran ({record.payment.method})</dt><dd>{currency(record.payment.amount)}</dd></div>
        <div className="flex justify-between gap-4"><dt>Status pembayaran</dt><dd>{record.payment.status}</dd></div>
        {record.payment.status === 'paid' && (
          <div className="flex justify-between gap-4"><dt>Kembalian</dt><dd>{currency(record.change)}</dd></div>
        )}
      </dl>
    </section>
  )
}
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { useDemoProducts } from '@/services/api/products'
import { useCreateSale } from '@/services/api/sales'
import { useAuth } from '@/app/providers/AuthProvider'
import { isSupabaseConfigured } from '@/lib/supabase'
import { Search, Package, Minus, Plus, Trash2, ShoppingCart, CheckCircle2, Clock3, CircleAlert } from 'lucide-react'
import { addItemToCart, calculateCartSummary, updateCartItemQuantity, type CartItem } from '@/lib/salesCart'
import { createCheckoutSummary, type PaymentMethod } from '@/lib/salesCheckout'

const getProductPrice = (product: { sku: string; name: string }) => {
  const digits = Number((product.sku.match(/\d+/)?.[0] ?? '0')) || 1
  return Math.max(25000, digits * 120000 + product.name.length * 1200)
}

export const NewSalePage = () => {
  const [search, setSearch] = React.useState('')
  const { data: products = [] } = useDemoProducts()
  const [cart, setCart] = React.useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('cash')
  const [amountPaid, setAmountPaid] = React.useState('')
  const [lastCheckout, setLastCheckout] = React.useState<{
    transactionNumber: string
    status: 'completed' | 'pending'
    change: number
  } | null>(null)
  const [checkoutError, setCheckoutError] = React.useState<string | null>(null)
  const checkoutKey = React.useRef<string | null>(null)
  const createSale = useCreateSale()
  const { user, organization, branch } = useAuth()

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.sku.toLowerCase().includes(search.toLowerCase()),
  )

  const summary = React.useMemo(() => calculateCartSummary(cart), [cart])
  const paymentState = React.useMemo(
    () => createCheckoutSummary(summary.total, paymentMethod, Number(amountPaid || 0)),
    [summary.total, paymentMethod, amountPaid],
  )

  const handleAddToCart = (product: { id: string; sku: string; name: string }) => {
    checkoutKey.current = null
    setLastCheckout(null)
    setCheckoutError(null)
    setCart(current => addItemToCart(current, product, getProductPrice(product), 1))
  }

  const handleUpdateQuantity = (itemId: string, nextQuantity: number) => {
    checkoutKey.current = null
    setLastCheckout(null)
    setCheckoutError(null)
    setCart(current => updateCartItemQuantity(current, itemId, nextQuantity))
  }

  const handleCheckout = async () => {
    if (isSupabaseConfigured) {
      setCheckoutError('Checkout belum tersedia sampai harga cabang dan API transaksi disetujui.')
      return
    }

    if (!user || !organization || !branch) {
      setCheckoutError('Sesi kasir atau cakupan cabang tidak tersedia; transaksi tidak disimpan.')
      return
    }

    checkoutKey.current ??= globalThis.crypto?.randomUUID?.() ?? `checkout-${Date.now()}`
    setCheckoutError(null)

    try {
      const result = await createSale.mutateAsync({
        idempotencyKey: checkoutKey.current,
        organizationId: organization.id,
        branchId: branch.id,
        cashierUserId: user.id,
        items: cart,
        subtotal: summary.subtotal,
        discount: summary.discount,
        tax: summary.tax,
        total: summary.total,
        paymentMethod,
        amountPaid: Number(amountPaid || 0),
      })

      if (result.sale.status !== 'completed' && result.sale.status !== 'pending') {
        throw new Error('Status transaksi checkout tidak dikenali.')
      }

      setLastCheckout({
        transactionNumber: result.sale.transaction_number,
        status: result.sale.status,
        change: result.change,
      })
      checkoutKey.current = null
      setCart([])
      setAmountPaid('')
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'Transaksi gagal disimpan.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Text size="2xl" weight="bold">Transaksi Penjualan Baru</Text>
        <Text muted>Buat transaksi penjualan dengan katalog produk yang siap dijual</Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari produk..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isSupabaseConfigured ? (
              <div role="status" className="py-8 text-center text-sm text-muted-foreground">
                POS belum tersedia untuk katalog live.
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-accent/50">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <Text size="sm" weight="medium">{product.name}</Text>
                        <Text size="xs" muted>SKU: {product.sku} • {product.base_unit}</Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Text size="sm" weight="semibold">Rp {getProductPrice(product).toLocaleString('id-ID')}</Text>
                      <Button variant="outline" size="sm" onClick={() => handleAddToCart(product)}>
                        Tambah
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <Text muted>Cari produk untuk memulai transaksi</Text>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Keranjang</CardTitle>
            <CardDescription>{summary.itemCount} item dipilih</CardDescription>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <Text size="sm" muted>Keranjang kosong</Text>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="rounded-md border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <Text size="sm" weight="medium">{item.name}</Text>
                        <Text size="xs" muted>{item.sku}</Text>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleUpdateQuantity(item.id, 0)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Text size="sm" weight="semibold">{item.quantity}</Text>
                        <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Text size="sm" weight="semibold">Rp {(item.unitPrice * item.quantity).toLocaleString('id-ID')}</Text>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3 border-t border-border pt-4 mt-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Metode Pembayaran</label>
                <select
                  value={paymentMethod}
                  onChange={e => {
                    checkoutKey.current = null
                    setLastCheckout(null)
                    setCheckoutError(null)
                    setPaymentMethod(e.target.value as PaymentMethod)
                  }}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="cash">Cash</option>
                  <option value="transfer">Transfer</option>
                  <option value="card">Kartu</option>
                  <option value="ewallet">E-Wallet</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Nominal Dibayar</label>
                <Input
                  type="number"
                  min="0"
                  value={amountPaid}
                  onChange={e => {
                    checkoutKey.current = null
                    setLastCheckout(null)
                    setCheckoutError(null)
                    setAmountPaid(e.target.value)
                  }}
                  placeholder="Masukkan nominal"
                />
              </div>

              <div className="flex justify-between">
                <Text size="sm">Subtotal</Text>
                <Text size="sm">Rp {summary.subtotal.toLocaleString('id-ID')}</Text>
              </div>
              <div className="flex justify-between">
                <Text size="sm">Diskon</Text>
                <Text size="sm">Rp {summary.discount.toLocaleString('id-ID')}</Text>
              </div>
              <div className="flex justify-between">
                <Text size="sm">Pajak</Text>
                <Text size="sm">Rp {summary.tax.toLocaleString('id-ID')}</Text>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <Text size="lg">Total</Text>
                <Text size="lg">Rp {summary.total.toLocaleString('id-ID')}</Text>
              </div>
              <div className="flex justify-between">
                <Text size="sm">Kembalian</Text>
                <Text size="sm">Rp {paymentState.change.toLocaleString('id-ID')}</Text>
              </div>
            </div>

            {lastCheckout && (
              <div className={`mt-4 flex items-start gap-2 rounded-md border p-3 text-sm ${lastCheckout.status === 'completed' ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-amber-200 bg-amber-50 text-amber-950'}`}>
                {lastCheckout.status === 'completed'
                  ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  : <Clock3 className="mt-0.5 h-4 w-4 shrink-0" />}
                <span>
                  Demo {lastCheckout.transactionNumber}: status {lastCheckout.status}.
                  {lastCheckout.status === 'completed'
                    ? ` Kembalian Rp ${lastCheckout.change.toLocaleString('id-ID')}.`
                    : ' Pembayaran menunggu konfirmasi provider.'}
                </span>
              </div>
            )}

            {checkoutError && (
              <div role="alert" className="mt-4 flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{checkoutError}</span>
              </div>
            )}

            <Button
              className="w-full mt-4"
              disabled={isSupabaseConfigured || cart.length === 0 || paymentState.status === 'underpaid' || createSale.isPending}
              onClick={handleCheckout}
            >
              {createSale.isPending ? 'Menyimpan...' : 'Bayar'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
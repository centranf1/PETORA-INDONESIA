import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import { useProducts } from '@/services/api/products'
import { useCreateProduct } from '@/services/api/products'
import { Search, Plus, Package, Hash, Tag, Ruler } from 'lucide-react'

export const NewSalePage = () => {
  const [search, setSearch] = React.useState('')
  const { data: products } = useProducts()
  const { mutate: createProduct } = useCreateProduct()
  
  const [formData, setFormData] = React.useState({
    sku: '',
    name: '',
    item_type: 'product',
    base_unit: 'pcs',
    category: '',
    brand: '',
    description: '',
  })
  
  const filteredProducts = products?.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="space-y-6">
      <div>
        <Text size="2xl" weight="bold">Transaksi Penjualan Baru</Text>
        <Text muted>Buat transaksi penitian baru</Text>
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
            {filteredProducts && filteredProducts.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredProducts.map(product => (
                  <div key={product.id} className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <Text size="sm" weight="medium">{product.name}</Text>
                        <Text size="xs" muted>SKU: {product.sku} • {product.base_unit}</Text>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Tambah
                    </Button>
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
            <CardDescription>Item yang akan dibeli</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <Text size="sm" muted>Keranjang kosong</Text>
            </div>
            <div className="space-y-2 border-t border-border pt-4">
              <div className="flex justify-between">
                <Text size="sm">Subtotal</Text>
                <Text size="sm">Rp 0</Text>
              </div>
              <div className="flex justify-between">
                <Text size="sm">Diskon</Text>
                <Text size="sm">Rp 0</Text>
              </div>
              <div className="flex justify-between">
                <Text size="sm">Pajak</Text>
                <Text size="sm">Rp 0</Text>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <Text size="lg">Total</Text>
                <Text size="lg">Rp 0</Text>
              </div>
            </div>
            <Button className="w-full mt-4" disabled>
              Bayar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
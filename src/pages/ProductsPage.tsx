import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { useProducts, useCreateProduct } from '@/services/api/products'
import { Search, Plus, Package, Tag, Hash } from 'lucide-react'

export const ProductsPage = () => {
  const [search, setSearch] = React.useState('')
  const { data: products, isLoading } = useProducts()
  
  const filteredProducts = products?.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">ManajemenProduk</Text>
          <Text muted>Kelola katalog produk dan layanan</Text>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          TambahProduk
        </Button>
      </div>
      
      <Card>
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
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 bg-muted rounded-md animate-pulse" />
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="space-y-2">
              {filteredProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-accent/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <Text size="sm" weight="medium">{product.name}</Text>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>SKU: {product.sku}</span>
                        <span>•</span>
                        <span>{product.item_type}</span>
                        <span>•</span>
                        <span>{product.base_unit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                      {product.status}
                    </Badge>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <Text size="lg" weight="medium" className="mb-2">Belum ada produk</Text>
              <Text muted>Tambahkan produk atau layanan</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
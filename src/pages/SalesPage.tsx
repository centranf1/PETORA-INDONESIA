import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { useSales, useCreateSale } from '@/services/api/sales'
import { useCustomers } from '@/services/api/customers'
import { useProducts } from '@/services/api/products'
import { Search, Plus, ShoppingCart, Receipt, Filter } from 'lucide-react'

export const SalesPage = () => {
  const [search, setSearch] = React.useState('')
  const { data: sales, isLoading } = useSales()
  const { data: customers } = useCustomers()
  const { data: products } = useProducts()
  
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
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 bg-muted rounded-md animate-pulse" />
              ))}
            </div>
          ) : filteredSales && filteredSales.length > 0 ? (
            <div className="space-y-2">
              {filteredSales.map(sale => (
                <div key={sale.id} className="flex items-center justify-between p-4 rounded-md border border-border hover:bg-accent/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Receipt className="h-5 w-5" />
                    </div>
                    <div>
                      <Text size="sm" weight="medium">{sale.transaction_number}</Text>
                      <Text size="xs" muted>{new Date(sale.created_at).toLocaleString('id-ID')}</Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Text size="sm" weight="semibold">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(sale.total_amount)}
                      </Text>
                      <Text size="xs" muted>{sale.cashier_user_id}</Text>
                    </div>
                    <Badge variant={sale.status === 'completed' ? 'default' : sale.status === 'pending' ? 'secondary' : 'destructive'}>
                      {sale.status}
                    </Badge>
                  </div>
                </div>
              ))}
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

import { Badge } from '@/shared/components/ui/badge'
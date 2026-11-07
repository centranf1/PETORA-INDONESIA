import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { useInventoryLocations, useStockLedger } from '@/services/api/products'
import { useDemoProducts } from '@/services/api/products'
import { isSupabaseConfigured } from '@/lib/supabase'
import { getLowStockProducts } from '@/lib/mockData'
import { Search, Warehouse, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react'

export const InventoryPage = () => {
  const { data: locations, error: locationsError, isLoading: locationsLoading } = useInventoryLocations()
  const { data: ledger, error: ledgerError, isLoading: ledgerLoading } = useStockLedger()
  const { data: demoProducts } = useDemoProducts()
  const lowStockProducts = getLowStockProducts(demoProducts ?? [])
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Manajemen Persediaan</Text>
          <Text muted>Kelola stok dan pergerakan barang</Text>
        </div>
        <Button>
          <TrendingUp className="h-4 w-4 mr-2" />
          Transfer Stok
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/20">
                <Warehouse className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">{locations?.length || 0}</Text>
                <Text size="sm" muted>Gudang/Lokasi</Text>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950/20">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">{ledger?.length || 0}</Text>
                <Text size="sm" muted>Mutasi Stok</Text>
              </div>
            </div>
          </CardContent>
        </Card>
        {!isSupabaseConfigured && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/20">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <Text size="2xl" weight="bold">{lowStockProducts.length}</Text>
                  <Text size="sm" muted>Stok Minimum</Text>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lokasi Gudang</CardTitle>
            <CardDescription>Daftar gudang dan lokasi stok</CardDescription>
          </CardHeader>
          <CardContent>
            {locationsError ? (
              <div role="alert" className="text-sm text-destructive">Lokasi inventori tidak dapat dimuat.</div>
            ) : locationsLoading ? (
              <Text muted>Memuat lokasi...</Text>
            ) : locations && locations.length > 0 ? (
              <div className="space-y-2">
                {locations.map(loc => (
                  <div key={loc.id} className="flex items-center justify-between p-3 rounded-md border border-border">
                    <div className="flex items-center gap-3">
                      <Warehouse className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Text size="sm" weight="medium">{loc.name}</Text>
                        <Text size="xs" muted>Kode: {loc.code}</Text>
                      </div>
                    </div>
                    <Badge variant={loc.status === 'active' ? 'default' : 'secondary'}>
                      {loc.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <Text muted>Belum ada lokasi gudang</Text>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Mutasi Stok</CardTitle>
            <CardDescription>Pergerakan stok terbaru</CardDescription>
          </CardHeader>
          <CardContent>
            {ledgerError ? (
              <div role="alert" className="text-sm text-muted-foreground">Data ledger live belum tersedia.</div>
            ) : ledgerLoading ? (
              <Text muted>Memuat ledger...</Text>
            ) : ledger && ledger.length > 0 ? (
              <div className="space-y-2">
                {ledger.slice(0, 10).map(entry => (
                  <div key={entry.id} className="flex items-center justify-between p-3 rounded-md border border-border">
                    <div className="flex items-center gap-3">
                      {entry.movement_type === 'in' || entry.movement_type === 'adjustment' ? (
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <Text size="sm" weight="medium">{entry.movement_type}</Text>
                        <Text size="xs" muted>{entry.created_at}</Text>
                      </div>
                    </div>
                    <Text size="sm" weight="semibold">
                      {entry.quantity_delta > 0 ? '+' : ''}{entry.quantity_delta} {entry.unit}
                    </Text>
                  </div>
                ))}
              </div>
            ) : (
              <Text muted>Belum ada riwayat mutasi</Text>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
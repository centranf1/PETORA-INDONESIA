import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { usePharmacyStock, useDispenseMedication } from '@/services/api/clinical'
import { Search, Pill, Plus, AlertTriangle, Package } from 'lucide-react'

export const PharmacyPage = () => {
  const [search, setSearch] = React.useState('')
  const { data: stock, isLoading } = usePharmacyStock()
  
  const filteredStock = stock?.filter(s => 
    s.product_id?.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Manajemen Farmasi</Text>
          <Text muted>Kelola stok obat dan resep</Text>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Obat
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/20">
                <Pill className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">{stock?.length || 0}</Text>
                <Text size="sm" muted>Jenis Obat</Text>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950/20">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">
                  {stock?.reduce((sum, s) => sum + (s.quantity || 0), 0) || 0}
                </Text>
                <Text size="sm" muted>Total Stok</Text>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/20">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">0</Text>
                <Text size="sm" muted>Mendekati Kedaluwarsa</Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari obat..."
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
          ) : filteredStock && filteredStock.length > 0 ? (
            <div className="space-y-2">
              {filteredStock.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-md border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Pill className="h-5 w-5" />
                    </div>
                    <div>
                      <Text size="sm" weight="medium">Obat #{item.id.slice(0, 8)}</Text>
                      <Text size="xs" muted>Batch: {item.batch_code || '-'}</Text>
                      {item.expiry_date && (
                        <Text size="xs" muted>Expired: {item.expiry_date}</Text>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <Text size="sm" weight="semibold">{item.quantity} {item.unit}</Text>
                    </div>
                    <Button variant="outline" size="sm">
                      Keluarkan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Pill className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <Text size="lg" weight="medium" className="mb-2">Belum ada stok obat</Text>
              <Text muted>Tambahkan obat ke farmasi</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { useSuppliers } from '@/services/api/products'
import { Search, Plus, Building2 } from 'lucide-react'

export const SuppliersPage = () => {
  const [search, setSearch] = React.useState('')
  const { data: suppliers, isLoading } = useSuppliers()
  
  const filteredSuppliers = suppliers?.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.code.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Manajemen Supplier</Text>
          <Text muted>Kelola data pemasok dan mitra bisnis</Text>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Supplier
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari supplier..."
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
          ) : filteredSuppliers && filteredSuppliers.length > 0 ? (
            <div className="space-y-2">
              {filteredSuppliers.map(supplier => (
                <div key={supplier.id} className="flex items-center justify-between p-4 rounded-md border border-border hover:bg-accent/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <Text size="sm" weight="medium">{supplier.name}</Text>
                      <Text size="xs" muted>Kode: {supplier.code}</Text>
                      {supplier.contact_name && (
                        <Text size="xs" muted>Kontak: {supplier.contact_name}</Text>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                      {supplier.status}
                    </Badge>
                    <Button variant="ghost" size="sm">Detail</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <Text size="lg" weight="medium" className="mb-2">Belum ada supplier</Text>
              <Text muted>Tambahkan supplier baru</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
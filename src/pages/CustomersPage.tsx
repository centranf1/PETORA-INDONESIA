import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { useCustomers } from '@/services/api/customers'
import { usePets } from '@/services/api/customers'
import { Input } from '@/shared/components/ui/input'
import { Search, Plus, Users, PawPrint } from 'lucide-react'

export const CustomersPage = () => {
  const [search, setSearch] = React.useState('')
  const { data: customers, isLoading } = useCustomers()
  const { data: pets } = usePets()
  
  const filteredCustomers = customers?.filter(c => 
    c.full_name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Manajemen Pelanggan</Text>
          <Text muted>Kelola data pelanggan dan hewan peliharaan</Text>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Pelanggan
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/20">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <Text size="2xl" weight="bold">{customers?.length || 0}</Text>
              <Text size="sm" muted>Total Pelanggan</Text>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950/20">
              <PawPrint className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <Text size="2xl" weight="bold">{pets?.length || 0}</Text>
              <Text size="sm" muted>Total Hewan</Text>
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
                placeholder="Cari pelanggan..."
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
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-muted rounded-md animate-pulse" />
              ))}
            </div>
          ) : filteredCustomers && filteredCustomers.length > 0 ? (
            <div className="space-y-2">
              {filteredCustomers.map(customer => (
                <Link
                  key={customer.id}
                  to={`/customers/${customer.id}`}
                  className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <Text size="sm" weight="medium">{customer.full_name}</Text>
                      <Text size="xs" muted>{customer.phone}</Text>
                    </div>
                  </div>
                  <div className="text-right">
                    <Text size="sm" weight="semibold">{formatCurrency(0)}</Text>
                    <Text size="xs" muted>{customer.status}</Text>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <PawPrint className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <Text muted>Belum ada pelanggan</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { formatCurrency } from '@/lib/utils'
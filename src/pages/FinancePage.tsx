import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { useFinanceTransactions, useAccounts } from '@/services/api/finance'
import { Search, Banknote, TrendingUp, TrendingDown, Plus } from 'lucide-react'

export const FinancePage = () => {
  const [search, setSearch] = React.useState('')
  const { data: transactions, isLoading } = useFinanceTransactions()
  const { data: accounts } = useAccounts()
  
  const filteredTransactions = transactions?.filter(t => 
    t.category.toLowerCase().includes(search.toLowerCase()) ||
    (t.description || '').toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Manajemen Keuangan</Text>
          <Text muted>Kelola kas, pemasukan, dan pengeluaran</Text>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Transaksi Baru
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950/20">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
                    .format(transactions?.filter(t => t.type === 'income').reduce((sum, t) => sum + (t.amount || 0), 0) || 0)}
                </Text>
                <Text size="sm" muted>Pemasukan</Text>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-950/20">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
                    .format(transactions?.filter(t => t.type === 'expense').reduce((sum, t) => sum + (t.amount || 0), 0) || 0)}
                </Text>
                <Text size="sm" muted>Pengeluaran</Text>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/20">
                <Banknote className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">{accounts?.length || 0}</Text>
                <Text size="sm" muted>Akun</Text>
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
                placeholder="Cari transaksi..."
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
          ) : filteredTransactions && filteredTransactions.length > 0 ? (
            <div className="space-y-2">
              {filteredTransactions.map(t => (
                <div key={t.id} className="flex items-center justify-between p-4 rounded-md border border-border">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'h-10 w-10 rounded-md flex items-center justify-center',
                      t.type === 'income' ? 'bg-green-100 dark:bg-green-950/20' : 'bg-red-100 dark:bg-red-950/20'
                    )}>
                      {t.type === 'income' ? (
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <Text size="sm" weight="medium">{t.category}</Text>
                      <Text size="xs" muted>{t.description || '-'} - {new Date(t.transaction_date).toLocaleDateString('id-ID')}</Text>
                    </div>
                  </div>
                  <Text size="sm" weight="semibold" className={t.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                    {t.type === 'income' ? '+' : '-'}
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(t.amount)}
                  </Text>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Banknote className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <Text size="lg" weight="medium" className="mb-2">Belum ada transaksi</Text>
              <Text muted>Tambahkan transaksi keuangan</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/lib/utils'
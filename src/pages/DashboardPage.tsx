import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { Text } from '@/shared/components/ui/text'
import { useDashboardSummary } from '@/services/api/reports'
import { useSales } from '@/services/api/sales'
import { useCustomers } from '@/services/api/customers'
import { useProducts } from '@/services/api/products'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  BarChart3,
  ShoppingBag,
  Users,
  PawPrint,
  TrendingUp,
  Clock,
  AlertTriangle,
} from 'lucide-react'

export const DashboardPage = () => {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary()
  const { data: sales, isLoading: salesLoading } = useSales()
  const { data: customers, isLoading: customersLoading } = useCustomers()
  const { data: products, isLoading: productsLoading } = useProducts()
  
  const isLoading = summaryLoading || salesLoading || customersLoading || productsLoading
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-12 w-12 rounded-lg mb-2" />
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-6 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }
  
  const stats = [
    {
      title: 'Total Penjualan',
      value: formatCurrency(sales?.reduce((sum, s) => sum + (s.total_amount || 0), 0) || 0),
      icon: ShoppingBag,
      trend: '+12.5%',
      color: 'text-green-600',
    },
    {
      title: 'Total Pelanggan',
      value: customers?.length || 0,
      icon: Users,
      trend: '+5.2%',
      color: 'text-blue-600',
    },
    {
      title: 'Total Produk',
      value: products?.length || 0,
      icon: PawPrint,
      trend: '+2.1%',
      color: 'text-purple-600',
    },
    {
      title: 'Pendapatan Hari Ini',
      value: formatCurrency(
        sales?.filter(s => {
          const saleDate = new Date(s.created_at).toDateString()
          const today = new Date().toDateString()
          return saleDate === today
        }).reduce((sum, s) => sum + (s.total_amount || 0), 0) || 0
      ),
      icon: TrendingUp,
      trend: 'Hari ini',
      color: 'text-orange-600',
    },
  ]
  
  return (
    <div className="space-y-6">
      <div>
        <Text size="2xl" weight="bold">Dashboard</Text>
        <Text muted>Ringkasan aktivitas bisnis dan operasional</Text>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text size="sm" muted>{stat.title}</Text>
                    <Text size="xl" weight="bold" className="mt-1">{stat.value}</Text>
                  </div>
                  <div className={cn('p-3 rounded-lg bg-primary/10', stat.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {stat.trend}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaksi Terbaru</CardTitle>
            <CardDescription>5 transaksi terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            {sales && sales.length > 0 ? (
              <div className="space-y-3">
                {sales.slice(0, 5).map(sale => (
                  <div key={sale.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <div>
                      <Text size="sm" weight="medium">{sale.transaction_number}</Text>
                      <Text size="xs" muted>{formatDate(sale.created_at)}</Text>
                    </div>
                    <div className="text-right">
                      <Text size="sm" weight="semibold">{formatCurrency(sale.total_amount)}</Text>
                      <Badge 
                        variant={sale.status === 'completed' ? 'default' : 'secondary'}
                        className="text-xs ml-2"
                      >
                        {sale.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Text muted>Belum ada transaksi</Text>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Peringatan</CardTitle>
            <CardDescription>Item yang membutuhkan perhatian</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-md bg-orange-50 dark:bg-orange-950/20">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <Text size="sm">Stok minimum tercapai</Text>
                  <Text size="xs" muted>{products?.length || 0} produk perlu dicek</Text>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-md bg-blue-50 dark:bg-blue-950/20">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <Text size="sm">Booking hari ini</Text>
                  <Text size="xs" muted>Ada jadwal layanan yang terjadwal</Text>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
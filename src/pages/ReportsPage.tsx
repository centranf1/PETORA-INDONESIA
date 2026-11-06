import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { useReports, useSalesReport, useInventoryReport } from '@/services/api/reports'
import { Search, FileBarChart, Download, Calendar, BarChart3, PieChart } from 'lucide-react'

export const ReportsPage = () => {
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const { data: reports } = useReports()
  const { data: salesReport } = useSalesReport({ startDate, endDate })
  const { data: inventoryReport } = useInventoryReport()
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Laporan & Analitik</Text>
          <Text muted>Lihat laporan bisnis dan analisis performa</Text>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Filter Laporan</CardTitle>
          <CardDescription>Pilih periode untuk melihat laporan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="startDate">Dari</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="endDate">Sampai</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports?.map(report => (
          <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="p-2 rounded-lg bg-primary/10">
                  {report.category === 'sales' ? (
                    <BarChart3 className="h-6 w-6" />
                  ) : report.category === 'inventory' ? (
                    <PieChart className="h-6 w-6" />
                  ) : (
                    <FileBarChart className="h-6 w-6" />
                  )}
                </div>
              </div>
              <Text size="sm" weight="medium" className="mt-3">{report.name}</Text>
              <Text size="xs" muted className="mt-1">{report.category}</Text>
              <Button variant="ghost" size="sm" className="mt-2">
                Lihat Laporan
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Laporan Penjualan</CardTitle>
            <CardDescription>Ringkasan penjian berdasarkan periode</CardDescription>
          </CardHeader>
          <CardContent>
            {salesReport ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                  <Text size="sm">Total Transaksi</Text>
                  <Text size="sm" weight="semibold">{salesReport.total_transactions || 0}</Text>
                </div>
                <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                  <Text size="sm">Total Penjian</Text>
                  <Text size="sm" weight="semibold">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
                      .format(salesReport.total_amount || 0)}
                  </Text>
                </div>
              </div>
            ) : (
              <Text muted>Pilih periode untuk melihat laporan</Text>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Laporan Persediaan</CardTitle>
            <CardDescription>Ringkasan stok dan mutasi</CardDescription>
          </CardHeader>
          <CardContent>
            {inventoryReport ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                  <Text size="sm">Total Produk</Text>
                  <Text size="sm" weight="semibold">{inventoryReport.total_products || 0}</Text>
                </div>
                <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                  <Text size="sm">Stok Minimum</Text>
                  <Text size="sm" weight="semibold">{inventoryReport.low_stock_count || 0}</Text>
                </div>
              </div>
            ) : (
              <Text muted>Memuat laporan persediaan...</Text>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Label } from '@/shared/components/ui/label'
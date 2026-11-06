import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { usePayrollCycles, usePayrollRecords } from '@/services/api/hr'
import { useCommissionRecords } from '@/services/api/hr'
import { Search, Banknote, Calendar, CheckCircle, Plus } from 'lucide-react'

export const PayrollPage = () => {
  const { data: cycles } = usePayrollCycles()
  const { data: records } = usePayrollRecords()
  const { data: commissions } = useCommissionRecords()
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Manajemen Penggajian</Text>
          <Text muted>Kelola perhitungan gaji dan komisi karyawan</Text>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Buat Payroll
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950/20">
                <Banknote className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
                    .format(records?.reduce((sum, r) => sum + (r.net_pay || 0), 0) || 0)}
                </Text>
                <Text size="sm" muted>Total Penggajian</Text>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/20">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">{cycles?.length || 0}</Text>
                <Text size="sm" muted>Periode Payroll</Text>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-950/20">
                <Banknote className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
                    .format(commissions?.reduce((sum, c) => sum + (c.amount || 0), 0) || 0)}
                </Text>
                <Text size="sm" muted>Total Komisi</Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Periode Payroll</CardTitle>
            <CardDescription>Daftar periode penggajian</CardDescription>
          </CardHeader>
          <CardContent>
            {cycles && cycles.length > 0 ? (
              <div className="space-y-2">
                {cycles.map(cycle => (
                  <div key={cycle.id} className="flex items-center justify-between p-3 rounded-md border border-border">
                    <div>
                      <Text size="sm" weight="medium">
                        {new Date(cycle.period_start).toLocaleDateString('id-ID')} - {new Date(cycle.period_end).toLocaleDateString('id-ID')}
                      </Text>
                    </div>
                    <Badge variant={
                      cycle.status === 'paid' ? 'default' :
                      cycle.status === 'approved' ? 'secondary' : 'outline'
                    }>
                      {cycle.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <Text muted>Belum ada periode payroll</Text>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Detail Penggajian</CardTitle>
            <CardDescription>Rekapitulasi gaji karyawan</CardDescription>
          </CardHeader>
          <CardContent>
            {records && records.length > 0 ? (
              <div className="space-y-2">
                {records.slice(0, 5).map(record => (
                  <div key={record.id} className="flex items-center justify-between p-3 rounded-md border border-border">
                    <div>
                      <Text size="sm" weight="medium">Karyawan #{record.id.slice(0, 8)}</Text>
                      <Text size="xs" muted>Bruto: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(record.gross_pay)}</Text>
                    </div>
                    <div className="text-right">
                      <Text size="sm" weight="semibold">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(record.net_pay)}
                      </Text>
                      <Badge variant={
                        record.status === 'paid' ? 'default' :
                        record.status === 'approved' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {record.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Text muted>Belum ada detail penggajian</Text>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
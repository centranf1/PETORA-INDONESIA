import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { useMedicalRecords, useCreateMedicalRecord } from '@/services/api/clinical'
import { usePets } from '@/services/api/customers'
import { Search, Stethoscope, FileText, Plus, Activity } from 'lucide-react'

export const ClinicPage = () => {
  const [search, setSearch] = React.useState('')
  const { data: records, isLoading } = useMedicalRecords()
  const { data: pets } = usePets()
  
  const filteredRecords = records?.filter(r => 
    r.diagnosis?.toLowerCase().includes(search.toLowerCase()) ||
    r.summary?.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Manajemen Klinik</Text>
          <Text muted>Kelola kunjungan dan pemeriksaan dokter hewan</Text>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Catatan Baru
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-950/20">
                <Stethoscope className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">{records?.length || 0}</Text>
                <Text size="sm" muted>Total Rekam Medis</Text>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950/20">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">{pets?.length || 0}</Text>
                <Text size="sm" muted>Pasien Terdaftar</Text>
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
                placeholder="Cari diagnosis atau catatan..."
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
          ) : filteredRecords && filteredRecords.length > 0 ? (
            <div className="space-y-2">
              {filteredRecords.map(record => (
                <div key={record.id} className="p-4 rounded-md border border-border hover:bg-accent/50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <Text size="sm" weight="medium">Rekam Medis #{record.id.slice(0, 8)}</Text>
                        <Text size="xs" muted>Keluhan: {record.chief_complaint || '-'}</Text>
                        <Text size="xs" muted>Diagnosis: {record.diagnosis || 'Belum ada diagnosis'}</Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={record.status === 'finalized' ? 'default' : 'secondary'}>
                        {record.status}
                      </Badge>
                      <Button variant="ghost" size="sm">Detail</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Stethoscope className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <Text size="lg" weight="medium" className="mb-2">Belum ada rekam medis</Text>
              <Text muted>Buat catatan pemeriksaan baru</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
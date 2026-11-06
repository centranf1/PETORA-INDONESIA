import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import { Textarea } from '@/shared/components/ui/textarea'
import { useMedicalRecords, useCreateMedicalRecord } from '@/services/api/clinical'
import { usePrescriptions, useCreatePrescription } from '@/services/api/clinical'
import { Stethoscope, FileText, Plus, Activity } from 'lucide-react'

export const MedicalRecordsPage = () => {
  const { data: records } = useMedicalRecords()
  const { data: prescriptions } = usePrescriptions()
  
  const [formData, setFormData] = React.useState({
    chief_complaint: '',
    physical_examination: '',
    diagnosis: '',
    treatment_plan: '',
    summary: '',
  })
  
  return (
    <div className="space-y-6">
      <div>
        <Text size="2xl" weight="bold">Rekam Medis</Text>
        <Text muted>Kelola riwayat kesehatan hewan</Text>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Catatan Pemeriksaan Baru</CardTitle>
            <CardDescription>Buat rekam medis</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chief_complaint">Keluhan Utama</Label>
                <Input id="chief_complaint" placeholder="Keluhan yang dialami" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="physical_examination">Hasil Pemeriksaan Fisik</Label>
                <Textarea id="physical_examination" rows={3} placeholder="Temuan pemeriksaan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Input id="diagnosis" placeholder="Diagnosis penyakit" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="treatment_plan">Rencana Pengobatan</Label>
                <Textarea id="treatment_plan" rows={3} placeholder="Rencana tindakan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Ringkasan</Label>
                <Textarea id="summary" rows={2} placeholder="Ringkasan kunjungan" />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Simpan Draft
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Riwayat Rekam Medis</CardTitle>
            <CardDescription>Daftar catatan medis</CardDescription>
          </CardHeader>
          <CardContent>
            {records && records.length > 0 ? (
              <div className="space-y-2">
                {records.map(record => (
                  <div key={record.id} className="p-4 rounded-md border border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <Text size="sm" weight="medium">Rekam Medis #{record.id.slice(0, 8)}</Text>
                          <Text size="xs" muted>Diagnosis: {record.diagnosis || 'Belum ada'}</Text>
                          <Text size="xs" muted>Keluhan: {record.chief_complaint || '-'}</Text>
                        </div>
                      </div>
                      <Badge variant={record.status === 'finalized' ? 'default' : 'secondary'}>
                        {record.status}
                      </Badge>
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
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
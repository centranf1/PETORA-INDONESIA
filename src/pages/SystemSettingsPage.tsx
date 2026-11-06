import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useSettings } from '@/services/api/settings'
import { useCreateSetting, useApproveSetting, useRejectSetting } from '@/services/api/settings'
import { Settings, Key, Shield, Save, Lock, Unlock, AlertTriangle } from 'lucide-react'

export const SystemSettingsPage = () => {
  const { data: settings, isLoading } = useSettings()
  const createSetting = useCreateSetting()
  const approveSetting = useApproveSetting()
  const rejectSetting = useRejectSetting()
  
  const [formData, setFormData] = React.useState({
    setting_group: 'stock_policy',
    key: 'allow_negative_stock',
    value: false,
    reason: '',
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createSetting.mutate({
      ...formData,
      value_json: { value: formData.value },
      value_type: 'boolean',
    })
  }
  
  return (
    <div className="space-y-6">
      <div>
        <Text size="2xl" weight="bold">Konfigurasi Sistem</Text>
        <Text muted>Kelola pengaturan sistem dan kebijakan bisnis</Text>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Tambah Setting</CardTitle>
            <CardDescription>Buat proposal konfigurasi baru</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="setting_group">Kelompok</Label>
                <Input
                  id="setting_group"
                  value={formData.setting_group}
                  onChange={e => setFormData({ ...formData, setting_group: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="key">Kunci</Label>
                <Input
                  id="key"
                  value={formData.key}
                  onChange={e => setFormData({ ...formData, key: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Alasan</Label>
                <Input
                  id="reason"
                  value={formData.reason}
                  onChange={e => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Alasan perubahan"
                />
              </div>
              <Button type="submit" className="w-full" disabled={createSetting.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {createSetting.isPending ? 'Menyimpan...' : 'Simpan Draft'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Daftar Setting Aktif</CardTitle>
            <CardDescription>Konfigurasi yang sedang berlaku</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-muted rounded-md animate-pulse" />
                ))}
              </div>
            ) : settings && settings.length > 0 ? (
              <div className="space-y-2">
                {settings.map((setting: any) => (
                  <div key={setting.id} className="p-4 rounded-md border border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          {setting.requires_approval ? (
                            <Lock className="h-5 w-5" />
                          ) : (
                            <Unlock className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <Text size="sm" weight="medium">{setting.key}</Text>
                          <Text size="xs" muted>Kelompok: {setting.setting_group}</Text>
                          <Text size="xs" muted>Nilai: {JSON.stringify(setting.value_json)}</Text>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {setting.is_system_locked && (
                          <Badge variant="destructive" className="text-xs">
                            <Lock className="h-3 w-3 mr-1" />
                            Terkunci
                          </Badge>
                        )}
                        {setting.requires_approval && (
                          <Badge variant="secondary" className="text-xs">
                            Perlu Approval
                          </Badge>
                        )}
                        <Badge variant={setting.is_active ? 'default' : 'secondary'} className="text-xs">
                          v{setting.version_no}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Settings className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <Text size="lg" weight="medium" className="mb-2">Belum ada setting</Text>
                <Text muted>Buat konfigurasi sistem baru</Text>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
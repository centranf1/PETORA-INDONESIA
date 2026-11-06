import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/ui/tabs'
import { useSettings, useCreateSetting } from '@/services/api/settings'
import { useAuditLogs } from '@/services/api/finance'
import { Settings, Key, Bell, Shield, Database, Globe, Save, History } from 'lucide-react'

export const SettingsPage = () => {
  const { data: settings, isLoading } = useSettings()
  const { data: auditLogs } = useAuditLogs({ limit: 10 })
  
  return (
    <div className="space-y-6">
      <div>
        <Text size="2xl" weight="bold">Pengaturan Sistem</Text>
        <Text muted>Konfigurasi sistem dan preferensi organisasi</Text>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            Umum
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Keamanan
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifikasi
          </TabsTrigger>
          <TabsTrigger value="audit">
            <History className="h-4 w-4 mr-2" />
            Audit Log
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Organisasi</CardTitle>
              <CardDescription>Data identitas perusahaan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Nama Perusahaan</Label>
                  <Input id="orgName" placeholder="Nama perusahaan" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgCode">Kode Organisasi</Label>
                  <Input id="orgCode" placeholder="Kode" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgAddress">alamat</Label>
                <Input id="orgAddress" placeholder="alamat perusahaan" />
              </div>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Simpan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keamanan Akun</CardTitle>
              <CardDescription>Pengaturan autentikasi dan otorisasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md border border-border">
                <div>
                  <Text size="sm" weight="medium">Autentikasi Dua Faktor (2FA)</Text>
                  <Text size="xs" muted>Aktifkan 2FA untuk akun</Text>
                </div>
                <Button variant="outline" size="sm">
                  Konfigurasi
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md border border-border">
                <div>
                  <Text size="sm" weight="medium">Kebijakan Sandi</Text>
                  <Text size="xs" muted>Persyaratan kekuatan sandi</Text>
                </div>
                <Button variant="outline" size="sm">
                  Atur
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Konfigurasi notifikasi otomatis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md border border-border">
                <div>
                  <Text size="sm" weight="medium">Notifikasi Email</Text>
                  <Text size="xs" muted>Aktifkan notifikasi email</Text>
                </div>
                <Button variant="outline" size="sm">
                  Konfigurasi
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md border border-border">
                <div>
                  <Text size="sm" weight="medium">Notifikasi WhatsApp</Text>
                  <Text size="xs" muted>Aktifkan notifikasi WhatsApp</Text>
                </div>
                <Button variant="outline" size="sm">
                  Konfigurasi
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Log</CardTitle>
              <CardDescription>Riwayat aktivitas dan perubahan</CardDescription>
            </CardHeader>
            <CardContent>
              {auditLogs && auditLogs.length > 0 ? (
                <div className="space-y-2">
                  {auditLogs.map(log => (
                    <div key={log.id} className="flex items-center justify-between p-3 rounded-md border border-border">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                          <History className="h-4 w-4" />
                        </div>
                        <div>
                          <Text size="sm" weight="medium">{log.action}</Text>
                          <Text size="xs" muted>{log.entity_type} - {new Date(log.created_at).toLocaleString('id-ID')}</Text>
                        </div>
                      </div>
                      <Text size="xs" muted>{log.actor_id || 'System'}</Text>
                    </div>
                  ))}
                </div>
              ) : (
                <Text muted>Belum ada audit log</Text>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { Label } from '@/shared/components/ui/label'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { useStaff, useCreateStaff } from '@/services/api/hr'
import { Search, Plus, User, Mail, Phone, Building } from 'lucide-react'

export const StaffPage = () => {
  const [search, setSearch] = React.useState('')
  const { data: staff, isLoading } = useStaff()
  
  const filteredStaff = staff?.filter(s => 
    s.full_name.toLowerCase().includes(search.toLowerCase()) ||
    s.position.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Manajemen Karyawan</Text>
          <Text muted>Kelola data karyawan dan informasi SDM</Text>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Karyawan
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <Text size="2xl" weight="bold">{staff?.length || 0}</Text>
            <Text size="sm" muted>Total Karyawan</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text size="2xl" weight="bold">
              {staff?.filter(s => s.status === 'active').length || 0}
            </Text>
            <Text size="sm" muted>Aktif</Text>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari karyawan..."
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
          ) : filteredStaff && filteredStaff.length > 0 ? (
            <div className="space-y-2">
              {filteredStaff.map(member => (
                <div key={member.id} className="flex items-center justify-between p-4 rounded-md border border-border hover:bg-accent/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <Text size="sm" weight="medium">{member.full_name}</Text>
                      <Text size="xs" muted>{member.position}</Text>
                      {member.department && (
                        <Text size="xs" muted>Departemen: {member.department}</Text>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      {member.phone && (
                        <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                      )}
                      {member.email && (
                        <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                      )}
                    </div>
                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                      {member.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <Text size="lg" weight="medium" className="mb-2">Belum ada karyawan</Text>
              <Text muted>Tambahkan k baru</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { useAttendance, useClockIn, useClockOut } from '@/services/api/hr'
import { Search, Clock, Calendar, CheckCircle, XCircle, User } from 'lucide-react'

export const AttendancePage = () => {
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0])
  const { data: attendance, isLoading } = useAttendance({ date })
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Manajemen Absensi</Text>
          <Text muted>Kelola kehadiran dan waktu kerja karyawan</Text>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-auto"
          />
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            Clock In
          </Button>
          <Button variant="outline">
            <Clock className="h-4 w-4 mr-2" />
            Clock Out
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <Text size="2xl" weight="bold">
              {attendance?.filter(a => a.status === 'present').length || 0}
            </Text>
            <Text size="sm" muted>Hadir</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text size="2xl" weight="bold">
              {attendance?.filter(a => a.status === 'late').length || 0}
            </Text>
            <Text size="sm" muted>Terlambat</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text size="2xl" weight="bold">
              {attendance?.filter(a => a.status === 'absent').length || 0}
            </Text>
            <Text size="sm" muted>Absen</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text size="2xl" weight="bold">
              {attendance?.filter(a => a.status === 'permission' || a.status === 'leave').length || 0}
            </Text>
            <Text size="sm" muted>Izin/Cuti</Text>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Absensi Karyawan</CardTitle>
          <CardDescription>Rekapitulasi kehadiran hari ini</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 bg-muted rounded-md animate-pulse" />
              ))}
            </div>
          ) : attendance && attendance.length > 0 ? (
            <div className="space-y-2">
              {attendance.map(record => (
                <div key={record.id} className="flex items-center justify-between p-4 rounded-md border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <Text size="sm" weight="medium">Karyawan #{record.id.slice(0, 8)}</Text>
                      <Text size="xs" muted>{record.date}</Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Text size="xs" muted>Masuk: {record.check_in || '-'}</Text>
                      <Text size="xs" muted>Keluar: {record.check_out || '-'}</Text>
                    </div>
                    <Badge variant={
                      record.status === 'present' ? 'default' :
                      record.status === 'late' ? 'secondary' :
                      record.status === 'absent' ? 'destructive' : 'secondary'
                    }>
                      {record.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <Text size="lg" weight="medium" className="mb-2">Tidak ada data absensi</Text>
              <Text muted>Belum ada kehadiran untuk hari ini</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
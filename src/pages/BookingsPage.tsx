import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { useBookings } from '@/services/api/clinical'
import { Search, Calendar, Clock, User, Dog, AlertCircle } from 'lucide-react'

export const BookingsPage = () => {
  const [search, setSearch] = React.useState('')
  const { data: bookings, isLoading } = useBookings()
  
  const filteredBookings = bookings?.filter(b => 
    b.service_type.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Manajemen Booking</Text>
          <Text muted>Kelola reservasi dan jadwal layanan</Text>
        </div>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Booking Baru
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <Text size="2xl" weight="bold">{bookings?.filter(b => b.status === 'pending').length || 0}</Text>
            <Text size="sm" muted>Menunggu</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text size="2xl" weight="bold">{bookings?.filter(b => b.status === 'confirmed').length || 0}</Text>
            <Text size="sm" muted>Dikonfirmasi</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text size="2xl" weight="bold">{bookings?.filter(b => b.status === 'completed').length || 0}</Text>
            <Text size="sm" muted>Selesai</Text>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <Text size="2xl" weight="bold">{bookings?.filter(b => b.status === 'cancelled').length || 0}</Text>
            <Text size="sm" muted>Dibatalkan</Text>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari booking..."
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
          ) : filteredBookings && filteredBookings.length > 0 ? (
            <div className="space-y-2">
              {filteredBookings.map(booking => (
                <div key={booking.id} className="flex items-center justify-between p-4 rounded-md border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <Text size="sm" weight="medium">{booking.service_type}</Text>
                      <Text size="xs" muted>
                        {new Date(booking.scheduled_at).toLocaleString('id-ID')}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <Text size="xs" muted>{booking.customer_id}</Text>
                      <Text size="xs" muted>{booking.pet_id}</Text>
                    </div>
                    <Badge variant={
                      booking.status === 'confirmed' ? 'default' :
                      booking.status === 'pending' ? 'secondary' :
                      booking.status === 'completed' ? 'default' :
                      booking.status === 'cancelled' ? 'destructive' : 'secondary'
                    }>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <Text size="lg" weight="medium" className="mb-2">Belum ada booking</Text>
              <Text muted>Buat reservasi layanan baru</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
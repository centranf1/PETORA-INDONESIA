import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Text } from '@/shared/components/ui/text'
import { useAuditLogs } from '@/services/api/finance'
import { Search, Filter, User, Clock, FileText, AlertTriangle } from 'lucide-react'

export const AuditLogPage = () => {
  const { data: logs, isLoading } = useAuditLogs({ limit: 50 })
  
  return (
    <div className="space-y-6">
      <div>
        <Text size="2xl" weight="bold">Audit Log</Text>
        <Text muted>Riwayat aktivitas dan perubahan data</Text>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Aktivitas</CardTitle>
          <CardDescription>Semua perubahan dan akses yang tercatat</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="h-16 bg-muted rounded-md animate-pulse" />
              ))}
            </div>
          ) : logs && logs.length > 0 ? (
            <div className="space-y-2">
              {logs.map(log => (
                <div key={log.id} className="flex items-center gap-4 p-4 rounded-md border border-border">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Text size="sm" weight="medium">{log.action}</Text>
                      <Badge variant="outline" className="text-xs">
                        {log.entity_type}
                      </Badge>
                    </div>
                    <Text size="xs" muted className="mt-1">
                      {new Date(log.created_at).toLocaleString('id-ID')}
                    </Text>
                    {log.reason && (
                      <Text size="xs" muted>Alasan: {log.reason}</Text>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Text size="xs" muted>Aktor</Text>
                    <Text size="xs" weight="medium">{log.actor_id?.slice(0, 8) || 'System'}</Text>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <Text size="lg" weight="medium" className="mb-2">Belum ada audit log</Text>
              <Text muted>Aktivitas akan tercatat secara otomatis</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
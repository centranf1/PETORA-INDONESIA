import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { useJournalEntries, useJournalLines } from '@/services/api/finance'
import { Search, BookOpen, Plus, FileText } from 'lucide-react'

export const AccountingPage = () => {
  const [search, setSearch] = React.useState('')
  const { data: entries, isLoading } = useJournalEntries()
  
  const filteredEntries = entries?.filter(e => 
    e.source_type.toLowerCase().includes(search.toLowerCase())
  )
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Manajemen Akuntansi</Text>
          <Text muted>Kelola jurnal umum dan laporan keuangan</Text>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Buat Jurnal
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/20">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">{entries?.length || 0}</Text>
                <Text size="sm" muted>Total Jurnal</Text>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-950/20">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">
                  {entries?.filter(e => e.status === 'posted').length || 0}
                </Text>
                <Text size="sm" muted>Sudah Diposting</Text>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-950/20">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <Text size="2xl" weight="bold">
                  {entries?.filter(e => e.status === 'draft').length || 0}
                </Text>
                <Text size="sm" muted>Draft</Text>
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
                placeholder="Cari jurnal..."
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
          ) : filteredEntries && filteredEntries.length > 0 ? (
            <div className="space-y-2">
              {filteredEntries.map(entry => (
                <div key={entry.id} className="flex items-center justify-between p-4 rounded-md border border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <Text size="sm" weight="medium">Jurnal #{entry.id.slice(0, 8)}</Text>
                      <Text size="xs" muted>Sumber: {entry.source_type}</Text>
                      {entry.posted_at && (
                        <Text size="xs" muted>Diposting: {new Date(entry.posted_at).toLocaleDateString('id-ID')}</Text>
                      )}
                    </div>
                  </div>
                  <Badge variant={
                    entry.status === 'posted' ? 'default' : 'secondary'
                  }>
                    {entry.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <Text size="lg" weight="medium" className="mb-2">Belum ada jurnal</Text>
              <Text muted>Buat jurnal umum baru</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
import { CheckCircle } from 'lucide-react'
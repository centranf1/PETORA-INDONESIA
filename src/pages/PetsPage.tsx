import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { usePets, useCreatePet } from '@/services/api/customers'
import { useCustomers } from '@/services/api/customers'
import { Search, Plus, PawPrint, Dog, Cat } from 'lucide-react'

export const PetsPage = () => {
  const [search, setSearch] = React.useState('')
  const { data: pets, isLoading } = usePets()
  const { data: customers } = useCustomers()
  
  const filteredPets = pets?.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.species.toLowerCase().includes(search.toLowerCase())
  )
  
  const getOwnerName = (petId: string) => {
    return 'Pemilik'
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Text size="2xl" weight="bold">Manajemen Hewan</Text>
          <Text muted>Kelola data hewan peliharaan pelanggan</Text>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Hewan
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari hewan..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-40 bg-muted rounded-md animate-pulse" />
              ))}
            </div>
          ) : filteredPets && filteredPets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPets.map(pet => (
                <Card key={pet.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {pet.species.toLowerCase() === 'dog' ? (
                            <Dog className="h-6 w-6" />
                          ) : pet.species.toLowerCase() === 'cat' ? (
                            <Cat className="h-6 w-6" />
                          ) : (
                            <PawPrint className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <Text size="sm" weight="semibold">{pet.name}</Text>
                          <Text size="xs" muted>{pet.species} - {pet.breed || 'Campuran'}</Text>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <Text size="xs" muted>Jenis Kelamin: {pet.sex || '-'}</Text>
                      <Text size="xs" muted>Umur: {pet.date_of_birth ? '-' : '-'}</Text>
                      <Text size="xs" muted> Berat: {pet.weight ? `${pet.weight} kg` : '-'}</Text>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Detail
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Rekam Medis
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <PawPrint className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <Text size="lg" weight="medium" className="mb-2">Belum ada hewan</Text>
              <Text muted>Tambahkan hewan peliharaan pelanggan</Text>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
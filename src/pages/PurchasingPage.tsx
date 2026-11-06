import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Text } from '@/shared/components/ui/text'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import { Textarea } from '@/shared/components/ui/textarea'
import { useSuppliers, useCreateSupplier } from '@/services/api/products'
import { Building2, Plus } from 'lucide-react'

export const PurchasingPage = () => {
  const { data: suppliers } = useSuppliers()
  const { mutate: createSupplier } = useCreateSupplier()
  
  const [formData, setFormData] = React.useState({
    code: '',
    name: '',
    contact_name: '',
    phone: '',
    email: '',
    address: '',
  })
  
  return (
    <div className="space-y-6">
      <div>
        <Text size="2xl" weight="bold">Manajemen Pembelian</Text>
        <Text muted>Kelola purchase order dan penerimaan barang</Text>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Tambah Supplier</CardTitle>
            <CardDescription>Daftarkan supplier baru</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Kode Supplier</Label>
                <Input id="code" placeholder="Kode unik" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nama Supplier</Label>
                <Input id="name" placeholder="Nama perusahaan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_name">Nama Kontak</Label>
                <Input id="contact_name" placeholder="Nama kontak" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telepon</Label>
                <Input id="phone" placeholder="Nomor telepon" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">alamat</Label>
                <Textarea id="address" placeholder="alamat supplier" rows={3} />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Simpan Supplier
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Daftar Supplier</CardTitle>
            <CardDescription>Supplier yang terdaftar</CardDescription>
          </CardHeader>
          <CardContent>
            {suppliers && suppliers.length > 0 ? (
              <div className="space-y-2">
                {suppliers.map(supplier => (
                  <div key={supplier.id} className="flex items-center justify-between p-4 rounded-md border border-border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <Text size="sm" weight="medium">{supplier.name}</Text>
                        <Text size="xs" muted>Kode: {supplier.code}</Text>
                        {supplier.contact_name && (
                          <Text size="xs" muted>Kontak: {supplier.contact_name}</Text>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                        {supplier.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Buat PO
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Building2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <Text size="lg" weight="medium" className="mb-2">Belum ada supplier</Text>
                <Text muted>Tambahkan supplier di sebelah kiri</Text>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Badge } from '@/shared/components/ui/badge'
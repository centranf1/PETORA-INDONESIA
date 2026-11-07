import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Text } from '@/shared/components/ui/text'
import { Alert, AlertDescription } from '@/shared/components/ui/alert'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { authenticateDemo, saveDemoSession } from '@/lib/demoAuth'
import { PawPrint } from 'lucide-react'

export const LoginPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const navigate = useNavigate()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      if (!isSupabaseConfigured) {
        const session = authenticateDemo(email, password)
        saveDemoSession(session)
        navigate('/')
        return
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (authError) {
        setError(authError.message)
        return
      }

      if (data.session) {
        navigate('/')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Kata Sandi</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk'}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            try {
              const session = authenticateDemo('admin@petora.local', 'password123')
              saveDemoSession(session)
              navigate('/')
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Login demo gagal')
            }
          }}
        >
          Masuk sebagai Demo Admin
        </Button>
        
        <div className="text-center">
          <Text size="xs" muted>
            Demo credentials: admin@petora.local / password123
          </Text>
        </div>
      </form>
    </div>
  )
}
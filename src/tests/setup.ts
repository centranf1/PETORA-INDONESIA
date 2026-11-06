import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Supabase client
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } })),
      signOut: vi.fn(),
      signUp: vi.fn(),
      signIn: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().returnThis(),
      insert: vi.fn().returnThis(),
      update: vi.fn().returnThis(),
      delete: vi.fn().returnThis(),
      eq: vi.fn().returnThis(),
      single: vi.fn(),
      order: vi.fn().returnThis(),
      limit: vi.fn().returnThis(),
      in: vi.fn().returnThis(),
    })),
  },
}))

// Mock React Router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/' }),
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
    Outlet: () => <div>Outlet</div>,
  }
})

// Mock TanStack Query
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query')
  return {
    ...actual,
    useQuery: vi.fn(),
    useMutation: vi.fn(),
    useQueryClient: vi.fn(() => ({ invalidateQueries: vi.fn() })),
  }
})

global.matchMedia = global.matchMedia || ((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}))

window.resizeTo = vi.fn()
window.scrollTo = vi.fn()
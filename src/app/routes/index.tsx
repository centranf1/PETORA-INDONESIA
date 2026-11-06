import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/app/providers/AuthProvider'
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'
import { AuthLayout } from '@/shared/layouts/AuthLayout'
import { LoadingSpinner } from '@/shared/components/ui/spinner'

const LazyPage = ({ loader }: { loader: () => Promise<any> }) => {
  const [Component, setComponent] = React.useState<any>(null)
  
  React.useEffect(() => {
    loader().then(mod => setComponent(mod.default))
  }, [loader])
  
  if (!Component) return <LoadingSpinner />
  return <Component />
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  
  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" replace />
  
  return <>{children}</>
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth()
  
  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to="/" replace />
  
  return <>{children}</>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><DashboardLayout><Outlet /></DashboardLayout></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <LazyPage loader={() => import('@/pages/DashboardPage')} />,
      },
      {
        path: 'customers',
        element: <LazyPage loader={() => import('@/pages/CustomersPage')} />,
      },
      {
        path: 'pets',
        element: <LazyPage loader={() => import('@/pages/PetsPage')} />,
      },
      {
        path: 'products',
        element: <LazyPage loader={() => import('@/pages/ProductsPage')} />,
      },
      {
        path: 'inventory',
        element: <LazyPage loader={() => import('@/pages/InventoryPage')} />,
      },
      {
        path: 'sales',
        element: <LazyPage loader={() => import('@/pages/SalesPage')} />,
      },
      {
        path: 'sales/new',
        element: <LazyPage loader={() => import('@/pages/NewSalePage')} />,
      },
      {
        path: 'suppliers',
        element: <LazyPage loader={() => import('@/pages/SuppliersPage')} />,
      },
      {
        path: 'purchasing',
        element: <LazyPage loader={() => import('@/pages/PurchasingPage')} />,
      },
      {
        path: 'bookings',
        element: <LazyPage loader={() => import('@/pages/BookingsPage')} />,
      },
      {
        path: 'clinic',
        element: <LazyPage loader={() => import('@/pages/ClinicPage')} />,
      },
      {
        path: 'medical-records',
        element: <LazyPage loader={() => import('@/pages/MedicalRecordsPage')} />,
      },
      {
        path: 'pharmacy',
        element: <LazyPage loader={() => import('@/pages/PharmacyPage')} />,
      },
      {
        path: 'staff',
        element: <LazyPage loader={() => import('@/pages/StaffPage')} />,
      },
      {
        path: 'attendance',
        element: <LazyPage loader={() => import('@/pages/AttendancePage')} />,
      },
      {
        path: 'payroll',
        element: <LazyPage loader={() => import('@/pages/PayrollPage')} />,
      },
      {
        path: 'finance',
        element: <LazyPage loader={() => import('@/pages/FinancePage')} />,
      },
      {
        path: 'accounting',
        element: <LazyPage loader={() => import('@/pages/AccountingPage')} />,
      },
      {
        path: 'reports',
        element: <LazyPage loader={() => import('@/pages/ReportsPage')} />,
      },
      {
        path: 'settings',
        element: <LazyPage loader={() => import('@/pages/SettingsPage')} />,
      },
      {
        path: 'settings/system',
        element: <LazyPage loader={() => import('@/pages/SystemSettingsPage')} />,
      },
      {
        path: 'settings/audit',
        element: <LazyPage loader={() => import('@/pages/AuditLogPage')} />,
      },
    ],
  },
  {
    path: '/login',
    element: <PublicRoute><AuthLayout><Outlet /></AuthRoute>,
    children: [
      {
        index: true,
        element: <LazyPage loader={() => import('@/pages/LoginPage')} />,
      },
    ],
  },
])
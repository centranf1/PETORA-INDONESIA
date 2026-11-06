import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import './styles/globals.css'

import { queryClient } from './lib/queryClient'
import { router } from './app/routes'
import { SupabaseProvider } from './app/providers/SupabaseProvider'
import { ThemeProvider } from './app/providers/ThemeProvider'
import { AuthProvider } from './app/providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SupabaseProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </SupabaseProvider>
    </ThemeProvider>
  </React.StrictMode>
)
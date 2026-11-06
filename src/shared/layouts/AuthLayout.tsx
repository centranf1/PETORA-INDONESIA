import React from 'react'
import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className={cn(
        'w-full max-w-md space-y-8 p-8 rounded-lg border border-border bg-card shadow-sm'
      )}>
        <div className="text-center">
          <span className="text-4xl">🐾</span>
          <h2 className="mt-4 text-2xl font-bold">PETORA</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Integrated Petshop & Pet Care Management System
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
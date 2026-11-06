import React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
}

export const Badge = ({ variant = 'default', className, ...props }: BadgeProps) => {
  const variants = {
    default: 'bg-primary/10 text-primary hover:bg-primary/20',
    secondary: 'bg-secondary/10 text-secondary-foreground hover:bg-secondary/20',
    destructive: 'bg-destructive/10 text-destructive hover:bg-destructive/20',
    outline: 'border border-border text-foreground',
  }
  
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
Badge.displayName = 'Badge'
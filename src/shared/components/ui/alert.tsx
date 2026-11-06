import React from 'react'
import { cn } from '@/lib/utils'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive'
  className?: string
}

export const Alert = ({ variant = 'default', className, ...props }: AlertProps) => {
  const variants = {
    default: 'bg-card text-card-foreground',
    destructive: 'border-destructive/50 bg-destructive/10 text-destructive [&>svg]:text-destructive',
  }
  
  return (
    <div
      role="alert"
      className={cn(
        'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:h-4 [&>svg]:w-4',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
Alert.displayName = 'Alert'

export const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
)
AlertTitle.displayName = 'AlertTitle'

export const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-sm [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
)
AlertDescription.displayName = 'AlertDescription'
import React from 'react'
import { cn } from '@/lib/utils'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 max-w-lg w-full mx-4">
        {children}
      </div>
    </div>
  )
}
Dialog.displayName = 'Dialog'

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative rounded-lg border border-border bg-card p-6 shadow-lg',
        className
      )}
      {...props}
    />
  )
)
DialogContent.displayName = 'DialogContent'

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 text-left', className)}
      {...props}
    />
  )
)
DialogHeader.displayName = 'DialogHeader'

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string
}

export const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  )
)
DialogTitle.displayName = 'DialogTitle'

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string
}

export const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
DialogDescription.displayName = 'DialogDescription'

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
      {...props}
    />
  )
)
DialogFooter.displayName = 'DialogFooter'
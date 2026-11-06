import React from 'react'
import { cn } from '@/lib/utils'

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const ScrollArea = ({ className, ...props }: ScrollAreaProps) => {
  return (
    <div
      className={cn('relative overflow-auto', className)}
      {...props}
    />
  )
}
ScrollArea.displayName = 'ScrollArea'
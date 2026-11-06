import React from 'react'
import { cn } from '@/lib/utils'

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  muted?: boolean
  className?: string
}

export const Text = ({ size = 'base', weight = 'normal', muted = false, className, ...props }: TextProps) => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  }
  
  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }
  
  return (
    <p
      className={cn(
        sizes[size],
        weights[weight],
        muted && 'text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}
Text.displayName = 'Text'
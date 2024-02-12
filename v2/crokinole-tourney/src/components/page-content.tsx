import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function PageContent ({children, className, ...props}:Props) {
  return ( 
    <div className={cn('w-full sm:x-xl2 grid gap-2 px-2', className)} {...props}>
      {children}
    </div>
  )
}
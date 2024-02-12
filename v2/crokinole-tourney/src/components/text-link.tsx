import { cn } from '@/lib/utils'
import { Link, LinkProps } from 'react-router-dom'

export const TextLink = ({ className, ...props }:LinkProps) => {
  const style = 'font-bold rounded hover:underline'
    + ' cursor-pointer border-2 border-transparent transition-colors'
    + ' focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
  return <Link className={cn(style, className)} {...props}/>
}
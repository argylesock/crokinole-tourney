import { cn } from "@/lib/utils"

interface Props extends React.InputHTMLAttributes<HTMLParagraphElement> {
  danger?: boolean
  warning?: boolean
}

export const InputDescription = ({className, danger, warning, children, ...props}:Props) => {
  if (!children) return undefined
  return (
    <p
      className={cn(
        danger ? 'text-red-600' : warning ? 'text-amber-600' : 'text-muted-foreground',
        'mt-1 text-[0.8rem]',
        className
      )}
      {...props}
    >{children}</p>
  )
}
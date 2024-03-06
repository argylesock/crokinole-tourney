import * as React from "react"

import { cn } from "@/lib/utils"

// pbatey: added danger and warning to shadcn ui implementation
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    danger?: boolean
    warning?: boolean
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, danger, warning, ...props }, ref) => {

    return (
      <input
        type={type}
        className={cn(
          danger ? 'border-red-600 focus-visible:ring-red-600/75'
          : warning ? 'border-amber-600 focus-visible:ring-amber-600/75'
          : 'border-input focus-visible:ring-ring',
          "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

import { cn } from "@/lib/utils"
import { MinusIcon, PlusIcon } from "lucide-react"
import React, { useState } from "react"

interface Props extends Omit<React.InputHTMLAttributes<HTMLParagraphElement>,'onChange'> {
  value?: number
  onValueChange?: (x:number) => void
  min?: number
  max?: number
}

export const NumberInput = ({className, value:controlledValue=0, onValueChange, min, max, readOnly, disabled, ...props}:Props) => {
  const [value, _setValue] = useState(controlledValue)
  const setValue = (x:number) => {
    if (min !== undefined) x = Math.max(min, x)
    if (max !== undefined) x = Math.min(max, x)
    _setValue(x)
    if (onValueChange) onValueChange(x)
  }
  const numDigits = (x:number|undefined) => {
    if (x === undefined) return x
    return Math.log(x) * Math.LOG10E + 1 | 0
  }
  const onChange = (s:string) => {
    if (s.length > (numDigits(max) || Infinity)) return
    setValue(parseInt(s))
  }

  let widthClass = 'max-w-16'
  if (max && max <= 999) widthClass = 'max-w-14'
  if (max && max <= 99) widthClass = 'max-w-11'
  if (max && max <= 9) widthClass = 'max-w-9'

  const divClass =
    'relative flex items-center'
  const inputClass =
    'flex text-right h-9 border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground'
    + ' focus-visible:outline-none focus-visible:ring-1'
    + ' disabled:cursor-not-allowed disabled:opacity-50'
    + ' border-input focus-visible:ring-ring'
    + ' [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
    + ' focus:z-10 pl-1'
  const buttonClass =
    'flex h-9 shrink-0 border bg-transparent py-1 text-sm shadow-sm transition-colors'
    + ' placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50'
    + ' border-input focus-visible:ring-ring'
    + ' text-secondary-foreground shadow-sm hover:bg-secondary/80'
    + ' focus:z-10 py-2.5 px-1'
  const leftButtonClass = 'rounded-l-md border-r-0'
  const rightButtonClass = 'rounded-r-md border-l-0'

  const onIncrement = ()=>setValue(value+1)
  const onDecrement = ()=>setValue(value-1)

  return (
    <div className={cn(divClass, className)}>
      {readOnly ? undefined : (
        <button disabled={disabled} type="button"
          onClick={onDecrement}
          id="decrement-button"
          className={cn(buttonClass, leftButtonClass)}
        ><MinusIcon strokeWidth={1} size={'sm'} className='w-4 shrink-0'/></button>
      )}
      <input type="number" value={value} onChange={e=>onChange(e.target.value)}
        className={cn(widthClass, inputClass, readOnly ? 'rounded-md' : 'rounded-none')}
        {...props}
        disabled={disabled}
        readOnly={readOnly}
      />
      {readOnly ? undefined : (
        <button disabled={disabled} type="button"
          onClick={onIncrement}
          id="increment-button"
          className={cn(buttonClass, rightButtonClass)}
        ><PlusIcon strokeWidth={1} size={'sm'} className='w-4 shrink-0'/></button>
      )}
    </div>
  )
}
import { cn } from "@/lib/utils"
import { MinusIcon, PlusIcon } from "lucide-react"
import React, { ReactNode, useState } from "react"

interface Props extends Omit<React.InputHTMLAttributes<HTMLParagraphElement>,'onChange'> {
  inputClassName?: string
  decrementClassName?: string
  decrementLabel?: ReactNode
  incrementClassName?: string
  incrementLabel?: ReactNode
  value?: number
  setValue?: (x:number) => void
  min?: number
  max?: number
}

export const NumberInput = React.forwardRef<HTMLInputElement, Props>(
  ({className, value:controlledValue=0, setValue:setControlledValue, decrementClassName, decrementLabel, incrementClassName, incrementLabel, inputClassName, min, max, readOnly, disabled, ...props}:Props, ref) => {
    const [value, _setValue] = useState(controlledValue)
    const setValue = (x:number) => {
      if (min !== undefined) x = Math.max(min, x)
      if (max !== undefined) x = Math.min(max, x)
      _setValue(x)
      if (setControlledValue) setControlledValue(x)
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
      + ' focus:z-50 pl-1'
    const buttonClass =
      'flex h-9 shrink-0 border bg-transparent py-1 text-sm shadow-sm transition-colors'
      + ' placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50'
      + ' border-input focus-visible:ring-ring'
      + ' text-secondary-foreground shadow-sm hover:bg-secondary/80'
      + ' focus:z-50 py-2.5 px-1'
    const leftButtonClass = 'rounded-l-md border-r-0'
    const rightButtonClass = 'rounded-r-md border-l-0'

    const onIncrement = ()=>setValue(value+1)
    const onDecrement = ()=>setValue(value-1)

    decrementLabel = decrementLabel || <MinusIcon size={'sm'}/>
    incrementLabel = incrementLabel || <PlusIcon size={'sm'}/>

    return (
      <div className={cn(divClass, className)}>
        {readOnly ? undefined : (
          <button disabled={disabled} type="button"
            onClick={onDecrement}
            id="decrement-button"
            className={cn(buttonClass, leftButtonClass, decrementClassName)}
          >{decrementLabel}</button>
        )}
        <input type="number" value={value} onChange={e=>onChange(e.target.value)}
          className={cn(widthClass, inputClass, inputClassName)}
          {...props}
          ref={ref}
          disabled={disabled}
          readOnly={readOnly}
        />
        {readOnly ? undefined : (
          <button disabled={disabled} type="button"
            onClick={onIncrement}
            id="increment-button"
            className={cn(buttonClass, rightButtonClass, incrementClassName)}
          >{incrementLabel}</button>
        )}
      </div>
    )
  }
)
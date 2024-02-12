import { cn } from "@/lib/utils"
import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (s:string)=>void
  divClassName?: string
}
const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set

export default function SearchInput (props:Props) {
  const inputProps = {...props}
  delete inputProps.divClassName
  delete inputProps.onValueChange

  const [value, setValue] = useState<string|number|readonly string[]>('')
  const rawValue = props.value || ''
  useEffect(()=>setValue(rawValue),[rawValue])

  const onValueChange = (value:string) => {
    setValue(value)
    if (props.onValueChange) props.onValueChange(value)
  }

  const className = 'flex h-7 w-full rounded-full'
    +' bg-slate-200 hover:bg-slate-100 focus-visible:bg-slate-100'
    +' px-7 py-0 text-sm shadow-sm transition-colors'
    +' placeholder:text-muted-foreground'
    +' focus-visible:outline-none focus:outline-none'
    +' focus-visible:ring-2 focus-visible:ring-ring'
    +' focus-visible:ring-offset-2 focus-visible:ring-offset-background'
    +' disabled:cursor-not-allowed disabled:opacity-50'
  const magClassName = 'absolute text-muted-foreground left-[0.5rem] top-[0.5rem] pointer-events-none text-sm'
  const cancelClassName = 'absolute h-5 w-5 rounded-full absolute top-1 right-[0.25rem] text-muted-foreground mx-0'
    +' hover:bg-slate-300'
  return (
    <div className={cn('relative text-sm', props.divClassName)}>
      <input placeholder='Search...' type='text' {...inputProps} className={cn(className, props.className)} value={value} onChange={e=>onValueChange(e.target.value)}/>
      <MagnifyingGlassIcon className={magClassName}/>
      {(value && nativeInputValueSetter) ? <Button onClick={()=>onValueChange('')} variant='ghost' size='icon' className={cancelClassName}><Cross2Icon/></Button> : undefined }
    </div>
  )
}
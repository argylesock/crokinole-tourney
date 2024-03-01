import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { calcElimRounds } from "@/lib/calc-nrounds"
import { sequence } from "@/lib/utils"
 
interface Props {
  nPresent: number
  value: number
  onValueChange: (x:number)=>void
  className?: string
}
export const ElimRoundsRadioGroup = ({nPresent, value, onValueChange, className}:Props) => {
  const recommended = calcElimRounds(nPresent)
  const maxElimRounds = Math.floor(Math.log2(nPresent))

  return (
    <RadioGroup className={className} value={value.toString()} onValueChange={v=>onValueChange(parseInt(v))}>
      {sequence(maxElimRounds).reverse().map(n=>{
        const nRounds = n+1
        const nPlayers = Math.pow(2, nRounds)
        return (
          <div key={nRounds} className="flex items-center space-x-2">
            <RadioGroupItem value={`${nRounds}`} id={`r${nRounds}`} />
            <Label htmlFor={`r${nRounds}`}>
              Top {nPlayers} Players &bull; {nRounds} Round{nRounds > 1 ? 's' : undefined}
              {recommended == nRounds ? <span className={'text-muted-foreground italic'}> Recommended</span> : undefined}
            </Label>
          </div>
        )
      })}
    </RadioGroup>
  )
}
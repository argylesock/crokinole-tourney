import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Props {
  empty?: boolean
  duplicate?: boolean
}
export default function PlayerNameAlertBadge ({empty, duplicate}:Props) {
  const isInvalid = duplicate === true
  const isClose = duplicate === undefined
  const invalidReason = empty ? 'empty' : (duplicate === true) ? `duplicate` : `possible duplicate`

  return (<>
    {(isInvalid || isClose)? <Badge className={cn('text-center', {'bg-amber-500 hover:bg-amber-400':isClose})} variant={isInvalid ? 'destructive' : undefined}>{invalidReason}</Badge> : undefined}
  </>)
}
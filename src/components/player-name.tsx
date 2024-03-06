import { Player } from "@/db";
import { cn } from "@/lib/utils";
import Shape from '../pages/matches/shape'

const colors = [
  'text-red-500',
  'text-orange-500',
  'text-amber-500',
  'text-yellow-500',
  'text-lime-500',
  'text-green-500',
  'text-teal-500',
  'text-cyan-500',
  'text-sky-500',
  'text-blue-500',
  'text-indigo-500',
  'text-violet-500',
  'text-purple-500',
  'text-fuchsia-500',
  'text-pink-500',
  'text-rose-500'
]

interface Props {
  player: Player|undefined
  className?: string
  empty?: string
  noshape?: boolean
  winner?: boolean
}
export default function PlayerName ({player, className, empty='bye', noshape=true, winner}:Props) {
  const noColor = 'text-slate-300'
  const pid = player?.id
  const shapeColor = pid ? colors[pid % colors.length] : noColor
  const absent = player?.present === false
  return (
    <div className={cn(className, 'flex text-left gap-1 items-center', !noshape && 'w-48', winner && '')}>
      <span className={cn("h-2 w-2 shrink-0 rounded-full", (!player || absent) ? "border border-slate-400" : "bg-sky-400")}/>
      <span className={cn('truncate', noshape ? 'w-40 sm:w-48' : 'w-36 sm:w-44', !(player?.alias || player?.name || absent || winner === false) && 'text-muted-foreground')}>{player?.alias || player?.name || empty}</span>
      {noshape ? undefined : <span className={cn('w-4 shrink-0', shapeColor,!player && 'invisible')}><Shape i={pid}/></span>}
    </div>
  )
}
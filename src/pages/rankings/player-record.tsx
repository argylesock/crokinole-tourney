import GamePopover from "@/components/game-popover"
import { Button } from "@/components/ui/button"
import { Game } from "@/db"
import { cn } from "@/lib/utils"

interface Props {
  wld: {wld: ('win'|'loss'|'draw'|'bye'), game: Game}[]
}
export default function PlayerRecord ({wld}:Props) {
  const baseClassNames = 'w-6 h-5 px-0 justify-center uppercase text-white'
  const wldClassNames = {
    'win': 'bg-emerald-700 hover:bg-emerald-600',
    'loss': 'bg-rose-800 hover:bg-rose-700',
    'draw': 'bg-slate-500 hover:bg-slate-400',
    'bye': 'bg-slate-400 hover:bg-slate-300',
  }

  return (
    <div className='flex flex-wrap gap-1 -ml-1 sm:w-60'>
      {wld.map((x,i)=>(
        <GamePopover key={i} readOnly game={x.game} trigger={
          <Button key={i} className={cn(baseClassNames, wldClassNames[x.wld])}>{x.wld.substring(0,1)}</Button>
        }/>
      ))}
    </div>
  )
}
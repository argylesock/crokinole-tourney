import { Game } from '@/db'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  game: Game
  rn: number
  pn: 1|2
  onClick?: ()=>void
  disabled?: boolean
  small?:boolean
}
export default function WinLossToggle ({game, rn, pn, onClick, disabled, small}:Props) {
  const gameRound = game.gameRounds?.[rn]
  let wld:('win'|'loss'|'draw'|'?') =
    (isNaN(gameRound?.p1points||NaN) && isNaN(gameRound?.p2points||NaN)) ? '?' :
    ((gameRound?.p1points||0) > (gameRound?.p2points||0)) ? 'win' : 
    ((gameRound?.p1points||0) < (gameRound?.p2points||0)) ? 'loss' : 'draw'

  if (pn == 2) {
    // swap win/loss
    wld = (wld == 'win') ? 'loss' : (wld == 'loss') ? 'win' : wld
  }

  const mdClassNames = ''
  const smClassNames = ''
  const baseClassNames = 'w-9 justify-center uppercase text-white'
  const wldClassNames = {
    'win': 'bg-emerald-700 hover:bg-emerald-600',
    'loss': 'bg-rose-800 hover:bg-rose-700',
    'draw': 'bg-slate-500 hover:bg-slate-400',
    '?': 'bg-slate-300 hover:bg-slate-200',
  }

  return (<Button onClick={onClick} disabled={disabled} className={cn(baseClassNames, wldClassNames[wld], small ? smClassNames : mdClassNames )}>{wld.substring(0,1)}</Button>)
}
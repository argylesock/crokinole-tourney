import GamePopover from '@/components/game-popover'
import PlayerName from '@/components/player-name'
import { Button } from '@/components/ui/button'
import { usePlayers } from '@/contexts/players-context'
import { Game, Player } from '@/db'
import gameWinner, { gameIsTie, gameIsUnscored } from '@/lib/game-winner'
import { cn } from '@/lib/utils'

interface Props {
  game: Game
  hasNextRound: boolean
}
export const Match = ({game:g, hasNextRound}:Props) => {
  const { players } = usePlayers()
  const p1 = g ? players.find(p=>p.id==g?.p1id) : undefined
  const p2 = g ? players.find(p=>p.id==g?.p2id) : undefined
  const winner = gameWinner(g)
  const isTie = gameIsTie(g)
  const isUnscored = gameIsUnscored(g)
  const isWinner = (p:(Player|undefined)) => !isUnscored && winner != undefined && winner == p?.id || isTie
  const isLoser = (p:(Player|undefined)) => !isUnscored && winner != undefined && winner != p?.id
  const winnerClass = 'bg-slate-300 bg-opacity-50'
  const loserClass = 'text-muted-foreground'
  return (
    <GamePopover key={g.id} readOnly={hasNextRound} game={g} trigger={
      <Button className='py-0 px-0 block w-fit h-fit' key={g.id} variant='outline'>
        {[p1,p2].map((p,i)=>(
          <span key={p!==undefined ? p.id : `bye-${i}`}>
            <PlayerName className={cn('py-2 px-2', !i && 'border-b', isWinner(p) && winnerClass, isLoser(p) && loserClass)} player={p}/>
          </span>
        ))}
      </Button>
    }/>
  )
}
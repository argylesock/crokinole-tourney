import { PlayersContext } from '@/contexts/players-context'
import { Button } from './ui/button'
import PlayerName from './player-name'
import { Game } from '@/db'
import { useContext } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  game: Game
  noshape?: boolean
}
export default function GameButton ({game: g, noshape}:Props) {
  const { findPlayer } = useContext(PlayersContext)
  const p1 = findPlayer(g.p1id)
  const p2 = findPlayer(g.p2id)

  return (
    <Button className='py-0 px-0 block w-fit h-fit' key={g.id} variant='outline'>
      {[p1,p2].map((p,i)=>(
        <span key={p!==undefined ? p.id : `bye-${i}`}>
          <PlayerName className={cn('py-2 px-2', !i && 'border-b')} player={p} noshape={noshape}/>
        </span>
      ))}
    </Button>
  )
}
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import WinLossToggle from '@/components/win-loss-toggle'
import { PlayersContext } from '@/contexts/players-context'
import db, { Game } from '@/db'
import { ReactNode, useContext, useEffect, useState } from 'react'
import { gameHasTieBreaker } from '@/lib/game-winner'
import { cn, sequence } from '@/lib/utils'
import GameButton from './game-button'
import { Input } from './ui/input'
 
interface Props {
  trigger?: ReactNode
  game: Game
  readonly?: boolean
  numRounds?: number
}
export default function GamePopover({trigger, game:g, readonly,  numRounds=4}:Props) {
  const { findPlayer } = useContext(PlayersContext)
  const p1 = findPlayer(g.p1id)
  const p2 = findPlayer(g.p2id)
  const disabled = readonly || !p1 || !p2

  const [p1points, setP1points] = useState(g.p1points)
  const [p2points, setP2points] = useState(g.p2points)
  const [p1twenties, setP1twenties] = useState(g.p1twenties)
  const [p2twenties, setP2twenties] = useState(g.p2twenties)
  useEffect(()=>{
    setP1points(g.p1points)
    setP2points(g.p2points)
    setP1twenties(g.p1twenties)
    setP2twenties(g.p2twenties)
  }, [g])

  useEffect(()=>{
    if (readonly) return
    if (!p1 || !p2) {
      g.gameRounds = new Array(numRounds).fill({
        p1points: 1, p2points: 1
      })
      saveGame(g)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p1, p2, readonly])

  const totalPoints = () => {
    const gameRounds = g.gameRounds || []
    return gameRounds.reduce(([p1pts,p2pts],gr)=>[p1pts + (gr?.p1points||0), p2pts + (gr?.p2points)], [0,0])
  }

  const saveGame = async (g:Game) => {
    [g.p1points, g.p2points] = totalPoints()
    if (g.p1points == 0 && g.p2points == 0) {
      g.p1points = g.p2points = undefined
    }
    if (g.id == undefined) {
      await db.games.add(g)
    } else {
      await db.games.update(g.id, g)
    }
  }

  const setPoints = (pn:1|2, points:number|undefined) => {
    points = isNaN(points || NaN) ? undefined : points
    if (pn == 1) {
      setP1points(points)
      g.p1points = points
    } else {
      setP2points(points)
      g.p2points = points
    }
    saveGame(g)
  }

  const setTwenties = (pn:1|2, twenties:number|undefined) => {
    twenties = isNaN(twenties || NaN) ? undefined : twenties
    if (pn == 1) {
      setP1twenties(twenties)
      g.p1twenties = twenties
    } else {
      setP2twenties(twenties)
      g.p2twenties = twenties
    }
    saveGame(g)
  }

  const toggleGameRound = (pn:1|2, n:number, numRounds:number) => {
    if (!g.gameRounds) g.gameRounds = Array(n)
    if (!g.gameRounds[n]) {
      g.gameRounds[n] = { p1points: 0, p2points: 0}
    }
    const states = [
      { p1points: 0, p2points: 0 },
      { p1points: 2, p2points: 0 },
      { p1points: 0, p2points: 2 },
      { p1points: 1, p2points: 1 },
    ]
    const currState = g.gameRounds[n].p1points*10 + g.gameRounds[n].p2points
    let nextState = 0
    switch (`p${pn}-${currState}`) {
      case('p1-0'): nextState = 1; break
      case('p1-20'): nextState = 2; break
      case('p1-2'): nextState = 3; break
      case('p1-11'): nextState = 0; break

      case('p2-0'): nextState = 2; break
      case('p2-2'): nextState = 1; break
      case('p2-20'): nextState = 3; break
      case('p2-11'): nextState = 0; break
    }
    g.gameRounds[n] = states[nextState]
    g.gameRounds = g.gameRounds.slice(0, numRounds)
    saveGame(g)
  }

  trigger = trigger || <GameButton game={g}/>

  const pdata = [
    {player: p1, points: p1points, twenties: p1twenties},
    {player: p2, points: p2points, twenties: p2twenties},
  ]

  const showTieBreaker = gameHasTieBreaker(g, numRounds)

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-60 sm:w-fit p-0 divide-y text-sm">
        {pdata.map(({player, points, twenties}, i)=>{
          const pn = (i+1) as 1|2
          const isBye = !player
          return (
            <div key={pn} className='p-2 sm:px-3 sm:py-1'>
              <div key={i} className='flex flex-wrap gap-2 items-center'>
                <div className={cn('w-56 sm:w-40 font-bold truncate', isBye && 'text-muted-foreground')}>{player?.alias || player?.name || 'bye'}</div>
                <div className={cn('flex gap-1 items-center', isBye && 'invisible')}>
                  {sequence(numRounds).map(rn=>(
                    <div key={rn} className='game'><WinLossToggle small={readonly} disabled={disabled} game={g} rn={rn} pn={pn} onClick={()=>toggleGameRound(pn, rn, numRounds)}/></div>
                  ))}
                  {g.stage == 'elim' ? (
                    <div  className={cn('game', (!showTieBreaker) && 'invisible')}><WinLossToggle small={readonly} disabled={disabled} game={g} rn={numRounds} pn={pn} onClick={()=>toggleGameRound(pn, numRounds, numRounds + 1)}/></div>
                  ): undefined}
                </div>
                <div className={cn('flex gap-1 items-center', isBye && 'invisible')}>
                  <Input readOnly disabled={disabled} id='points' className='w-10 pl-1 text-right' onChange={e=>setPoints(pn, parseInt(e.target.value))} value={isNaN(points || NaN) ? '' : points} /> <span className='text-muted-foreground'>pts</span>
                  <Input disabled={disabled} id='twenties' className='w-10 pl-1 text-right' onChange={e=>setTwenties(pn, parseInt(e.target.value))} value={isNaN(twenties || NaN) ? '' : twenties} /> <span className='text-muted-foreground'>20s</span>
                </div>
              </div>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
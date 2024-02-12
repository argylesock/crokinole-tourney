import { useMemo, useState } from 'react'
import { useTournament } from '@/contexts/tournament-context'
import { gameHasAnyScore, gameIsBye } from '@/lib/game-winner'
import { Alert, AlertDescription } from '@/components/ui/alert'
import WorkingButton from '@/components/working-button'
import db from '@/db'
import rollcall from '@/lib/rollcall'
import { seedGames } from '@/lib/seed-games'
import { usePlayers } from '@/contexts/players-context'
import { Match } from './match'

interface Props {
  stage: string
  round: number
  nRounds: number
}
export default function StageRound ({stage, round, nRounds}:Props) {
  const {games} = useTournament()
  const {players} = usePlayers()
  const [working, setWorking] = useState(false)

  const {thisRound, hasNextRound} = useMemo(()=>{
    const thisRound = games.filter(g=>g.stage == stage && g.round == round)
    const isLastSeed = stage == 'seed' && round == nRounds-1
    let hasNextRound:boolean
    if (isLastSeed) {
      hasNextRound = !!games.find(g=>g.stage == 'elim' && g.round == 0)
    } else {
      hasNextRound = !!games.find(g=>g.stage == stage && g.round == round+1)
    }
    return {thisRound, hasNextRound}
  }, [games, nRounds, round, stage])

  const {canResetMatches, canAddMatches, canDeleteMatches} = useMemo(()=>{
    const gameWithScore = thisRound.find(g=>gameIsBye(g) ? false : gameHasAnyScore(g))
    console.log('gameWithScore', gameWithScore)
    const canResetMatches = !hasNextRound && !gameWithScore
    const {unmatchedPlayers, gamesToDelete, byeGames} = rollcall(players, thisRound)
    const canAddMatches = stage == 'seed' && !hasNextRound && unmatchedPlayers.length > 1
    const canDeleteMatches = stage == 'seed' && !hasNextRound && (gamesToDelete.length - byeGames.length) > 0
    return {canResetMatches, canAddMatches, canDeleteMatches}
  }, [thisRound, hasNextRound, players, stage])

  const resetMatches = () => {
    if (!canResetMatches) return
    setWorking(true)
    db.games.bulkDelete(thisRound.map(g=>g.id as number))
    .finally(()=>{
      setTimeout(()=>setWorking(false), 750)
    })
  }

  const seedMatches = () => {
    if (!canAddMatches && !canDeleteMatches) return
    setWorking(true)
    const {gamesToDelete, gamesToAdd} = seedGames(round, players, games, nRounds)
    db.games.bulkDelete(gamesToDelete)
    .then(()=>db.games.bulkAdd(gamesToAdd))
    .finally(()=>{
      setTimeout(()=>setWorking(false), 750)
    })
  }

  return (<>
    <div className='p-2 w-full text-sm text-center text-muted-foreground'>Round {round+1}</div>
    <div className="p-1 flex flex-wrap gap-2 justify-center">
      {thisRound.map(g=><Match key={g.id} game={g} hasNextRound={hasNextRound}/>)}
    </div>

    {(canAddMatches || canDeleteMatches) ? (
      <div className="p-1 flex justify-center">
        <Alert className='max-w-80 sm:max-w-md sm:w-md flex gap-2 items-center justify-between'>
          <div>
          <AlertDescription>
            {canAddMatches ? 'There are unmatched players.' : 'Some matches have abset players.'}
          </AlertDescription>
          </div>
          <WorkingButton variant='secondary' working={working} onClick={seedMatches}>{canAddMatches ? 'Add' : 'Delete'} Matches</WorkingButton>
        </Alert>
      </div>
    ) : undefined}

    {canResetMatches ? (
      <div className="p-1 flex justify-center">
        <Alert className='max-w-80 sm:max-w-md sm:w-md flex gap-2 items-center justify-between'>
          <div>
          <AlertDescription>
            No games have been scored this round.
          </AlertDescription>
          </div>
          <WorkingButton variant='secondary' working={working} onClick={resetMatches}>Reset Matches</WorkingButton>
        </Alert>
      </div>
    ) : undefined}
  </>)
}
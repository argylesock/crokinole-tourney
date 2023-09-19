import { sequence } from "../../utils"
import { Game, Player } from "../../db"
import GameControl from "./GameControl"
import './ElimStage.css'
import Winner from "./Winner"

interface BracketRoundProps {
  round:number
  players:Player[]
  games:Game[]
}
const ElimRound = ({round, players, games}:BracketRoundProps) => {
  const nmatches = players.length/Math.pow(2,round+1)
  //const lastRoundGames = games.filter(g=>g.round==round-1)
  const thisRoundGames = games.filter(g=>g.round==round)

  return (<div className='elim-round'>
    {sequence(nmatches).map((n) => {
      const g = thisRoundGames.find(g=>g.n == n) || {stage:'elim', round, n, p1id: undefined, p2id: undefined}
      const p1 = g ? players.find(p=>p.id==g?.p1id) : undefined
      const p2 = g ? players.find(p=>p.id==g?.p2id) : undefined
      return (<GameControl key={n} g={g} p1={p1} p2={p2}/>)
    })}
  </div>)
}

interface EliminationStageProps {
  players: Player[]
  games: Game[]
}
const ElimStage = ({players, games}:EliminationStageProps) => {
  let nrounds = 0
  for (let np=players.length; np>1; np/=2) nrounds++

  return (<>
    <div className={`elim-stage elim-${Math.pow(2,nrounds)}`}>
      {sequence(nrounds).map(n=><ElimRound key={n} round={n} players={players} games={games}/>)}
      <Winner player={undefined}/>
    </div>
  </>)
}

export default ElimStage
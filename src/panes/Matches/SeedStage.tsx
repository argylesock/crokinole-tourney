import { sequence } from "../../utils"
import { Game, Player } from "../../db"
import GameControl from "./GameControl"
import { Carousel } from "react-bootstrap"
import './SeedStage.css'

interface MatchRoundProps {
  round:number
  players: Player[]
  games: Game[]
}
const SeedRound = ({round, players, games}:MatchRoundProps) => {
  //const lastRoundGames = games.filter(g=>g.round==round-1)
  const thisRoundGames = games.filter(g=>g.round==round)

  return (<>
  <div className='seed-round-title'>Round {round+1}</div>
  <div className='seed-round d-flex flex-wrap gap-2 justify-content-center'>
    {thisRoundGames.map(g=>{
      const p1 = g ? players.find(p=>p.id==g?.p1id) : undefined
      const p2 = g ? players.find(p=>p.id==g?.p2id) : undefined
      return (<GameControl key={g.n} g={g} p1={p1} p2={p2}/>)
    })}
  </div>
  </>
  )
}

interface SeedStageProps {
  nrounds: number
  players: Player[]
  games: Game[]
}
const SeedStage = ({nrounds, players, games}:SeedStageProps) => {
  return (<Carousel className='seed-stage' data-bs-theme="dark" interval={null}>
    {sequence(nrounds).map(n=>{
      return (
        <Carousel.Item key={n}>
          <SeedRound round={n} players={players} games={games}/>
        </Carousel.Item>
      )
    })}
  </Carousel>)
}

export default SeedStage
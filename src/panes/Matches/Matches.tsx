import { useContext } from "react"
import { Card } from "react-bootstrap"
import CollapsableCard from "../../components/CollapsableCard"
import { useLiveQuery } from "dexie-react-hooks"
import db from "../../db"
import MatchesContext from "../../contexts/MatchesContext"
import './Matches.css'
import SeedRange from "./SeedRange"
import SeedStage from "./SeedStage"
import ElimRange from "./ElimRange"
import ElimStage from "./ElimStage"
import rank from "../../utils/rank"

const Matches = () => {
  const players = useLiveQuery(async ()=> await db.players.filter(p=>!!p.present).toArray()) || []
  const seedGames = useLiveQuery(async ()=> await db.games.where('stage').equals('seed').toArray()) || []
  const elimGames = useLiveQuery(async ()=> await db.games.where('stage').equals('elim').toArray()) || []
  const { seedrounds, log2elimplayers } = useContext(MatchesContext)
  const nelimplayers = Math.pow(2,log2elimplayers)
  const rankedPlayers = rank(players, seedGames).slice(0,nelimplayers)

  return (<div className='matches d-grid gap-4 mt-4'>
    <CollapsableCard title='Seed Stage'>
      <>
      <Card.Body className='pt-0 pb-0'>
        <SeedRange nplayers={players.length}/>
      </Card.Body>
      <Card.Body>
        <SeedStage nrounds={seedrounds} players={players} games={seedGames}/>
      </Card.Body>
      </>
    </CollapsableCard>

    <CollapsableCard title='Elimination Stage'>
      <>
      <Card.Body className='pt-0 pb-0'>
        <ElimRange nplayers={players.length}/>
      </Card.Body>
      <Card.Body>
        <ElimStage players={rankedPlayers} games={elimGames}/>
      </Card.Body>
      </>
    </CollapsableCard>
  </div>)
}
export default Matches
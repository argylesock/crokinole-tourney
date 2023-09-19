import { useLiveQuery } from "dexie-react-hooks"
import rank from "../../utils/rank"
import db, { Game, Player } from "../../db"
import { ListGroup, Spinner } from "react-bootstrap"
import gameWinner from "../../utils/gameWinner"
import './Rankings.css'

interface RankItemProps {
  rank:number
  player:Player
  games:Game[]
}
const RankItem = ({rank, player, games}:RankItemProps) => {
  let points = 0
  let twenties = 0
  const winlossdraw = games.reduce((a,g)=>{
    if (g.p1id == player.id) {
      points += g.p1points || 0
      twenties += g.p1twenties || 0
      const w = gameWinner(g)
      if (w == player.id) a.push('win')
      else if (w != undefined) a.push('loss')
      else a.push('draw')
    } else if (g.p2id == player.id) {
      points += g.p2points || 0
      twenties += g.p2twenties || 0
      const w = gameWinner(g)
      if (w == player.id) a.push('win')
      else if (w != undefined) a.push('loss')
      else a.push('draw')
    }
    return a
  }, [] as string[])

  return (
    <ListGroup.Item>
      <div className='rank-item'>
        <div className='rank'>{rank+1}</div>
        <div className='name'>{player.name}</div>
        <div className='record'>{winlossdraw.map(wld=>(<span className={wld}>{wld.charAt(0).toUpperCase()}</span>))}</div>
        <div className='points'>{points}</div>
        <div className='twenties'>{twenties}</div>
      </div>
    </ListGroup.Item>
  )
}

const Rankings = () => {
  const data = useLiveQuery(async ()=>{
    const players = await db.players.filter(x=>!!x.present).toArray()
    const games = await db.games.where('stage').equals('seed').toArray()
    rank(players, games)
    return {players, games}
  })

  if (data == undefined) return <Spinner/>

  const {players, games} = data
  return (<ListGroup className='rankings mt-3'>
    <ListGroup.Item>
      <div className='rank-item-header'>
        <div className='rank'>Rank</div>
        <div className='name'>Name</div>
        <div className='record'>Record</div>
        <div className='points'>Points</div>
        <div className='twenties'>20s</div>
      </div>
    </ListGroup.Item>
    {players.map((p,rank)=><RankItem key={p.id} rank={rank} player={p} games={games}/>)}
  </ListGroup>)
}
export default Rankings
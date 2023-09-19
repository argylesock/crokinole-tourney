import db, { Game } from "../db"
import randomScore from "./randomScore"
import rank from "./rank"
import gameWinner from "./gameWinner"

interface ElimGamesOptions {
  randomScores?: boolean
  removeExisting?: boolean
}
/** Create elimination stage games by matching players up */
const elimGames = async (round:number, nplayers:number, options?:ElimGamesOptions) => {
  const {randomScores=false, removeExisting=false} = options || {}

  // check for existing games
  const exist = await db.games.filter(x=>x.stage=='elim' && x.round >= round).toArray()
  if (exist.length > 0) {
    if (removeExisting) {
      await db.games.bulkDelete(exist.map(x=>x.id as number))
    } else {
      throw new Error(`games for elimination round ${round} already exist`)
    }
  }

  const games:Game[] = []
  if (round == 0) {
    const prevgames = await db.games.filter(x=>x.stage=='seed').toArray()
    let players = (await db.players.filter(x=>!!x.present).toArray())

    // add a bye player if odd number of players are present
    if (players.length % 2 != 0) players.push({name:'bye'})

    rank(players, prevgames)
    players = players.slice(0, nplayers)
    for (let i=0; i< players.length/2; i++) {
      const p1id = players[i].id
      const p2id = players[players.length-1-i].id
      const {p1points, p2points, p1twenties, p2twenties} = randomScore(p1id, p2id, randomScores, true)
      games.push({
        stage: 'elim',
        round,
        n: i,
        p1id, p2id,
        p1points, p2points, p1twenties, p2twenties
      })
    }
  } else {
    // matches from previous elimination round
    const prevgames = await db.games.filter(x=>x.stage=='elim' && x.round == round-1).toArray()
    const winners = prevgames.reduce((a,g)=>{
      const w = gameWinner(g)
      if (w != undefined) a.push(w)
      return a
    },[] as number[])

    for (let i=0; i< winners.length; i+=2) {
      const p1id = winners[i]
      const p2id = winners[i+1]
      const {p1points, p2points, p1twenties, p2twenties} = randomScore(p1id, p2id, randomScores, true)
      games.push({
        stage: 'elim',
        round,
        n: i,
        p1id, p2id,
        p1points, p2points, p1twenties, p2twenties
      })
    }
  }
  return db.games.bulkAdd(games)
}

export default elimGames 
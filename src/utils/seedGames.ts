import { removeFromArray, shuffle } from "."
import db, { Player } from "../db"
import avoidReplays from "./avoidReplays"
import randomScore from "./randomScore"
import rank from "./rank"

interface SeedGamesOptions {
  randomScores: boolean
}
/** Create seed stage games by matching players up */
const seedGames = async (round:number, options?:SeedGamesOptions) => {
  round = Math.max(0, round)
  const {randomScores=false} = options || {}
  let games = await db.games.filter(x=>x.stage=='seed' && x.round === round).toArray()
  const players = (await db.players.filter(x=>!!x.present).toArray())

  const scoredgames = games.filter(x=>x.p1points != undefined || x.p2points != undefined)
  if (scoredgames.length > 0) {
    // remove players in scored games from list of present players
    scoredgames.forEach(g=>removeFromArray(players, (x:Player, v:number|undefined)=>x.id==v, g.p1id, g.p2id))
  }

  // add a bye player if odd number of players are present
  if (players.length % 2 != 0) players.push({name:'bye'})

  if (round === 0) {
    // shuffle present players
    shuffle(players)

  } else {
    const prevgames = await db.games.filter(x=>x.stage=='seed' && x.round < round).toArray()
    // order players by previous score (to match up like players)
    rank(players, prevgames)
    // shuffle down to avoid replaying games
    avoidReplays(players, prevgames)
  }

  // remove unscored games
  const unscoredgames = games.filter(x=>x.p1points == undefined && x.p2points == undefined)
  await db.games.bulkDelete(unscoredgames.map(x=>x.id as number))

  // add games to list
  games = scoredgames
  for (let i=0; i<players.length; i+=2) {
    let p1id = players[i].id
    let p2id = players[i+1].id
    if (p1id == undefined) {
      // ensure bye is on bottom
      [p1id, p2id] = [p2id, p1id]
    }
    const {p1points, p2points, p1twenties, p2twenties, gameRounds} = randomScore(p1id, p2id, randomScores)

    games.push({
      stage: 'seed',
      round,
      n: i/2,
      p1id, p2id,
      p1points, p2points, p1twenties, p2twenties,
      gameRounds
    })
  }
  return await db.games.bulkAdd(games)
}
export default seedGames 
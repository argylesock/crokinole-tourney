import { shuffle } from './utils'
import { Game, Player } from '../db'
import gameWinner from './game-winner'

interface Score {
  points: number
  twenties: number
  wins: number
  draws: number
}

function rank(players:Player[], games:Game[]):Player[]
function rank(players:(number|undefined)[], games:Game[]):(number|undefined)[]
function rank(players:(Player|(number|undefined))[], games:Game[]):(Player|(number|undefined))[] {
  const playerId = (x:Player|number|undefined) => {
    if (typeof(x) == 'number') return x
    if (x?.id == undefined) return Number.NEGATIVE_INFINITY
    return x.id
  }

  // shuffle if no previous games
  if (games.length == 0) return shuffle(players)

  // accumulate scores for each player
  const scores = {} as {[pid:number]:Score}
  games.forEach(g=>{
    if (g.p1id != undefined) {
      const s = scores[g.p1id] = scores[g.p1id] || {points:0, twenties:0, wins:0, draws:0}
      s.points += g.p1points || 0
      s.twenties += g.p1twenties || 0
      const winner = gameWinner(g)
      if (g.p1id == winner) s.wins += 1
      else if (g.p2id == undefined) s.draws += 1
    }
    if (g.p2id != undefined) {
      const s = scores[g.p2id] = scores[g.p2id] || {points:0, twenties:0, wins:0, draws:0}
      s.points += g.p2points || 0
      s.twenties += g.p2twenties || 0
      const winner = gameWinner(g)
      if (g.p2id == winner) s.wins += 1
      else if (g.p2id == undefined) s.draws += 1
    }
  })

  // sort by accumulated scores
  players.sort((p1, p2)=>{
    const p1id = playerId(p1)
    const p2id = playerId(p2)
    const p1score = scores[p1id] || {points:0, twenties:0, wins:0, draws:0}
    const p2score = scores[p2id] || {points:0, twenties:0, wins:0, draws:0}
    return p1score.points > p2score.points ? -1 : 
           p1score.points < p2score.points ? 1 : 
           p1score.twenties > p2score.twenties ? -1 :
           p1score.twenties < p2score.twenties ? 1 : 
           p1score.wins > p2score.wins ? -1 :
           p1score.wins < p2score.wins ? 1 :
           p1score.draws > p2score.draws ? -1 :
           p1score.draws < p2score.draws ? 1 : 0
  })

  return players
}
export default rank
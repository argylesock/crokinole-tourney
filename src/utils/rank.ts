import { shuffle } from '.'
import { Game, Player } from '../db'

interface Score {
  points: number
  twenties: number
}

const rank = (players:Player[], games:Game[]) => {
  // shuffle if no previous games
  if (games.length == 0) return shuffle(players)

  // accumulate scores for each player
  const scores = {} as {[pid:number]:Score}
  games.forEach(g=>{
    if (g.p1id != undefined) {
      const s = scores[g.p1id] = scores[g.p1id] || {points:0, twenties:0}
      s.points += g.p1points || 0
      s.twenties += g.p1twenties || 0
    }
    if (g.p2id != undefined) {
      const s = scores[g.p2id] = scores[g.p2id] || {points:0, twenties:0}
      s.points += g.p2points || 0
      s.twenties += g.p2twenties || 0
    }
  })

  // sort by accumulated scores
  players.sort((p1, p2)=>{
    const p1id = p1.id == undefined ? Number.NEGATIVE_INFINITY : p1.id
    const p2id = p2.id == undefined ? Number.NEGATIVE_INFINITY : p2.id
    const p1score = scores[p1id] || {points:0, twenties:0}
    const p2score = scores[p2id] || {points:0, twenties:0}
    return p1score.points > p2score.points ? -1 : 
           p1score.points < p2score.points ? 1 : 
           p1score.twenties > p2score.twenties ? -1 :
           p1score.twenties < p2score.twenties ? 1 : 0
  })

  return players
}
export default rank
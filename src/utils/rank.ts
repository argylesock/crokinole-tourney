import { Game, Player } from '../db'

interface Score {
  points: number
  twenties: number
}

const rank = (players:Player[], games:Game[]) => {
  // accumulate scors for each player
  const scores = {} as {[pid:number]:Score}
  games.forEach(g=>{
    if (g.p1id) {
      const s = scores[g.p1id] = scores[g.p1id] || {points:0, twenties:0}
      s.points += g.p1points || 0
      s.twenties += g.p1twenties || 0
    }
    if (g.p2id) {
      const s = scores[g.p2id] = scores[g.p2id] || {points:0, twenties:0}
      s.points += g.p1points || 0
      s.twenties += g.p1twenties || 0
    }
  })
  return players.sort((p1, p2)=>{
    const p1score = (p1?.id ? scores[p1.id] : undefined) || {points:0, twenties:0}
    const p2score = (p2?.id ? scores[p2.id] : undefined) || {points:0, twenties:0}
    return p1score.points > p2score.points ? -1 : 
           p1score.points < p2score.points ? 1 : 
           p1score.twenties > p2score.twenties ? -1 :
           p1score.twenties < p2score.twenties ? 1 : 0
  })
}
export default rank
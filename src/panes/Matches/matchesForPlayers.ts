import { Player, Match } from "../../db"

interface Score extends Player {
  points: number
  twenties: number
}


const matchesForPlayers = (type: 'swiss' | 'elimination', stage:number, round:number, players:Player[], prevMatches:Match[]=[]) => {
  players = (prevMatches.length) ? rankByScore(players, prevMatches) : shuffle(players)
  const matches:Match[] = []

  if (type == 'swiss') {
    if (players.length%2) {
      players.push({name:'bye', present: true})
    }
    // pair p1 vs p2, p3 vs p4, etc
    for (let i=0; i<players.length; i+=2) {
      const m:Match = {stage, round, p1id: players[i].id as number, p2id: players[i+1].id as number}
      matches.push(m)
    }
    // ensure haven't played eachother before
    if (prevMatches) {
      for (let i=matches.length-1; i>0; i-=1) {
        const m1 = matches[i]
        if (prevMatches.find(m=>(m1.p1id == m.p1id && m1.p2id == m.p2id) || (m1.p1id == m.p2id && m1.p2id == m.p1id))) {
          // swap players with another game
          const m2 = matches[i-1]
          ;[m2.p2id, m1.p1id]= [m1.p1id, m2.p2id]
        }
      }
    }

  } else {
    // eliminate players from prev rounds

    // add a bye
    if (players.length%2) {
      players.push({name:'bye', present: true})
    }
  }
}

const rankByScore = (players:Player[], prevMatches:Match[]) => {
  const sortByScore = (a:Score,b:Score) => {return (a.points > b.points ? -1 : a.points < b.points ? 1 : a.twenties > b.twenties ? -1 : a.twenties < b.twenties ? 1 : 0)}

  const scores = players.map(p=>{
    const [points, twenties] = prevMatches.reduce(([points, twenties],m)=>{
      if (m.p1id == p.id) {
        points += m.p1points || 0
        twenties += m.p1twenties || 0
      }
      else if (m.p2id == p.id) {
        points += m.p2points || 0
        twenties += m.p2twenties || 0
      }
      return [points, twenties]
    },[0,0])
    return {...p, points, twenties}
  }).sort(sortByScore) 

  const last = scores.length-1
  if (scores[0].points == scores[last].points && scores[0].twenties == scores[last].twenties) shuffle(scores)
  return scores
}

const shuffle = <T>(a:T[]) => {
  let curr = a.length
  let rand
  while (curr > 0) {
    rand = Math.floor(Math.random() * curr--)
    ;[a[curr], a[rand]] = [a[rand], a[curr]]
  }
  return a
}



export default matchesForPlayers
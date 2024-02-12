import { GameRound } from "../db"

export default function randomScore (p1id:number|undefined, p2id:number|undefined, maxRounds=4, enabled=true, notie=false) {
  let p1points:number|undefined = undefined
  let p2points:number|undefined = undefined
  let p1twenties:number|undefined = undefined
  let p2twenties:number|undefined = undefined
  const gameRounds:GameRound[] = []

  if (p1id == undefined || p2id == undefined) {
    // score a bye as a draw
    p1points = 4
    p2points = 4
    for (let i=0;i<maxRounds;i++) {
      gameRounds.push({p1points:1, p2points:1})
    }

  } else if (enabled) {
    const threshold = ((p1id as number) > (p2id as number)) ? 0.55 : 0.45 // make higher numbered ids more likely to win
    p1points = p2points = 0
    p1twenties = p2twenties = 0
    for (let i=0;i<maxRounds;i++) {
      if (Math.random()<0.02) { // 1 in 50 is a tie/draw
        p1points += 1
        p2points += 1
        gameRounds.push({p1points:1, p2points:1})
        const n20s = Math.floor(Math.random()*5)
        p1twenties += n20s
        p2twenties += n20s
      } else if (Math.random()<threshold) { // player with higher id wins most often (for more consistent rankings in demo)
        p1points += 2
        gameRounds.push({p1points:2, p2points:0})
        const n20s = Math.floor(Math.random()*5)
        p1twenties = n20s
        p2twenties = Math.floor(Math.random()*n20s)
      } else { // p2 wins
        p2points += 2
        gameRounds.push({p1points:0, p2points:2})
        const n20s = Math.floor(Math.random()*5)
        p2twenties = n20s
        p1twenties = Math.floor(Math.random()*n20s)
      }
    }

    if (notie && p1points == p2points && p1twenties == p2twenties) {
      // tie breaker is a coin flip
      const n20s = Math.floor(Math.random()*5)
      if (Math.random()<0.5) {
        p1points += 2
        p1twenties += n20s
        p2twenties += Math.floor(Math.random()*n20s)
      } else {
        p2points += 2
        p2twenties += n20s
        p1twenties += Math.floor(Math.random()*n20s)
      }
    }
  }

  return {
    p1points,
    p2points,
    p1twenties,
    p2twenties,
    gameRounds,
  }
}
const randomScore = (p1id:number|undefined, p2id:number|undefined, enabled=true, notie=false) => {
  const ngamerounds = 4
  let p1points:number|undefined = undefined
  let p2points:number|undefined = undefined
  let p1twenties:number|undefined = undefined
  let p2twenties:number|undefined = undefined
  const bye = p1id == undefined || p2id == undefined

  if (enabled) {
    const threshold = ((p1id as number) > (p2id as number)) ? 0.75 : (p1id == undefined) ? 0 : 1 // ensure bye always looses
    p1points = p2points = 0
    p1twenties = p2twenties = 0
    for (let i=0;i<ngamerounds;i++) {
      if (!bye && Math.random()<0.02) { // 1 in 50 is a tie
        p1points += 1
        p2points += 1
        const n20s = Math.floor(Math.random()*5)
        p1twenties += n20s
        p2twenties += n20s
      } else if (Math.random()<threshold) { // player with higher id wins most often (for more consistent rankings in demo)
        p1points += 2
        // bye round cannot score twenties
        if (!bye) {
          const n20s = Math.floor(Math.random()*5)
          p1twenties = n20s
          p2twenties = Math.floor(Math.random()*n20s)
        }
      } else { // p2 wins
        p2points += 2
        // bye round cannot score twenties
        if (!bye) {
          const n20s = Math.floor(Math.random()*5)
          p2twenties = n20s
          p1twenties = Math.floor(Math.random()*n20s)
        }
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
  }
}
export default randomScore
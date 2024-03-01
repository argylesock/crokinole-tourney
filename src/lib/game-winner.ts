import { Game } from "@/db"

/** returns the id of the game winner or undefined if a draw */
export const gameWinner = (g:Game) => {
  if (g.p1id == undefined) return g.p2id // bye for player 2
  if (g.p2id == undefined) return g.p1id // bye for player 1
  if ((g.p1points||0) > (g.p2points||0)) return g.p1id
  if ((g.p1points||0) < (g.p2points||0)) return g.p2id
  if ((g.p1twenties||0) > (g.p2twenties||0)) return g.p1id
  if ((g.p1twenties||0) < (g.p2twenties||0)) return g.p2id
  return undefined
}

export const gameIsTie = (g:Game, numRounds=4) => {
  if (g.p1twenties != g.p2twenties) return false
  if (gameIsUnscored(g, numRounds)) return false
  const gameRounds = g.gameRounds || []
  const [p1pts, p2pts] = gameRounds.reduce(([p1pts,p2pts],gr)=>[p1pts + (gr?.p1points||0), p2pts + (gr?.p2points)], [0,0])
  return (p1pts == p2pts)
}

export const gameHasTieBreaker = (g:Game, numRounds=4) => {
  if (g.stage != 'elim') return false
  let gameRounds = g.gameRounds || []
  if (gameRounds.length < numRounds) return false
  if (gameIsUnscored(g, numRounds, numRounds)) return false
  gameRounds = gameRounds.slice(0, numRounds)
  const [p1pts, p2pts] = gameRounds.reduce(([p1pts,p2pts],gr)=>[p1pts + (gr?.p1points||0), p2pts + (gr?.p2points)], [0,0])
  return (p1pts == p2pts)
}

export const gameIsUnscored = (g:Game, minRounds=4, maxRounds=0) => {
  if ((g.p1twenties||0) > 0 || (g.p2twenties||0) > 0) return false
  if ((g.p1points||0) > 0 || (g.p2points||0) > 0) return false
  let gameRounds = g.gameRounds || []
  if (gameRounds.length < minRounds) return true
  if (maxRounds > 0) gameRounds = gameRounds.slice(0,maxRounds)
  const anySkipped = gameRounds.findIndex(gr=>gr==undefined) >= 0
  const unscored = gameRounds.find(gr=>gr == undefined ? true : (gr.p1points == 0 && gr.p2points == 0))
  return anySkipped || !!unscored
}

export const gameHasAnyScore = (g:Game) => {
  if ((g.p1twenties||0) > 0 || (g.p2twenties||0) > 0) return true
  if ((g.p1points||0) > 0 || (g.p2points||0) > 0) return true
  const gameRounds = g.gameRounds || []
  const scored = gameRounds.find(gr=>gr == undefined ? false : (gr.p1points > 0 || gr.p2points > 0))
  return !!scored
}

export const gameIsBye = (g:Game) => {
  return g.p1id == undefined || g.p2id == undefined
}

export default gameWinner
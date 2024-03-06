import randomPlayers from './random-players'
import { demoSeedStage } from './seed-games'
import { demoElimStage } from './elim-games'
import db from '@/db'

export const demoPlayers = (minPlayers:number, minPresent:number, nPlayers:number, nPresent:number) => {
  nPresent = Math.max(minPresent - nPresent, 0)
  const nToAdd = Math.max(Math.max(minPlayers - nPlayers, nPresent), 0)
  const nToMarkPresent = Math.min(Math.max(nToAdd - nPresent, 0), nToAdd)
  return randomPlayers(nToAdd, nToMarkPresent)
}

export default async function demoTournament () {
  if (await db.games.count() > 0) {
    throw new Error('games already exist in the tournament')
  }

  // ensure at least 20 players with 15 present
  const players = await db.players.toArray()
  const nPresent = players.filter(p=>p.present).length
  const playersToAdd = demoPlayers(20, 15, players.length, nPresent)
  await db.players.bulkAdd(playersToAdd)
  const allPlayers = await db.players.toArray()

  // add games for seed stage
  const {gamesToAdd:seedGames, nRounds:nSeedRounds} = demoSeedStage(allPlayers)
  await db.games.bulkAdd(seedGames)

  // add games for elimination stage
  const {gamesToAdd:elimGames, nRounds:nElimRounds} = demoElimStage(allPlayers, seedGames)
  await db.games.bulkAdd(elimGames)

  return {nSeedRounds, nElimRounds}
}
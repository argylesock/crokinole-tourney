import { shuffle } from "./utils"
import { Game, Player } from "../db"
import avoidReplays from "./avoid-replays"
import randomScore from "./random-score"
import rank from "./rank"
import rollcall from './rollcall'
import { calcSeedRounds } from "./calc-nrounds"

/** Generate matches for unmatched players */
export const seedMatchups = (round:number, unmatchedPlayers:(number|undefined)[], allGames=([] as Game[]), nGameRounds=4, randomScores=false) => {
  const gamesToAdd = [] as Game[]

  // add a bye player if odd number of players are present
  if (unmatchedPlayers.length % 2 != 0) unmatchedPlayers.push(undefined)

  if (round === 0) {
    // shuffle present players
    shuffle(unmatchedPlayers)

  } else {
    const prevGames = allGames.filter(x=>x.stage=='seed' && x.round < round)
    // order players by previous score (to match up like players)
    rank(unmatchedPlayers, prevGames)
    // shuffle down to avoid replaying games
    avoidReplays(unmatchedPlayers, prevGames)
  }

  // add games
  for (let i=0; i<unmatchedPlayers.length; i+=2) {
    let p1id = unmatchedPlayers[i]
    let p2id = unmatchedPlayers[i+1]
    if (p1id == undefined) {
      // ensure bye is on bottom
      [p1id, p2id] = [p2id, p1id]
    }
    const {p1points, p2points, p1twenties, p2twenties, gameRounds} = randomScore(p1id, p2id, nGameRounds, randomScores)

    gamesToAdd.push({
      stage: 'seed',
      round,
      n: i/2,
      p1id, p2id,
      p1points, p2points, p1twenties, p2twenties,
      gameRounds
    })
  }
  return gamesToAdd
}

/** Create seed stage games by matching players up */
export const seedGames = (round:number, players:Player[], allGames=([] as Game[]), nGameRounds=4, randomScores=false, keepMatchups=true) => {
  const roundGames = allGames.filter(g=>g.stage == 'seed' && g.round == round)
  const {unmatchedPlayers, gamesToDelete} = rollcall(players, roundGames, !keepMatchups)
  const gamesToAdd = seedMatchups(round, unmatchedPlayers, allGames, nGameRounds, randomScores)

  return {gamesToAdd, gamesToDelete}
}

export const demoSeedStage = (allPlayers:Player[], nGameRounds=4) => {
  const allGames:Game[] = []
  const {unmatchedPlayers} = rollcall(allPlayers, [])
  const nRounds = calcSeedRounds(unmatchedPlayers.length)

  for (let round=0;round<nRounds;round++) {
    const randomScores = true
    const {gamesToAdd:roundGames} = seedGames(round, allPlayers, allGames, nGameRounds, randomScores)
    roundGames.forEach(g=>allGames.push(g))
  }

  return {gamesToAdd:allGames, nRounds}
}
import { Game, Player } from '../db'
import randomScore from './random-score'
import rank from './rank'
import gameWinner from './game-winner'
import rollcall from './rollcall'
import { calcElimRounds } from './calc-nrounds'

export const elimMatchups = (round:number, nStageRounds:number, unmatchedPlayers:(number|undefined)[], allGames=([] as Game[]), nGameRounds=4, randomScores=false) => {
  const gamesToAdd = [] as Game[]

  if (round === 0) {
    // use seed rounds to rank first elim round
    const prevGames = allGames.filter(g=>g.stage=='seed')
    const nPlayersInRounds = Math.pow(2, nStageRounds - round) // 8,4,2 for 3 elimination rounds
    rank(unmatchedPlayers, prevGames)
    const topPlayers = unmatchedPlayers.slice(0, nPlayersInRounds)
    unmatchedPlayers = []
    for (let i=0; i < topPlayers.length/2; i++) {
      // first top player plays last top player in round 0
      const p1id = topPlayers[i]
      const p2id = topPlayers[nPlayersInRounds-1-i]
      unmatchedPlayers.push(p1id)
      unmatchedPlayers.push(p2id)
    }
  } else {
    // use winners from previous elim round
    const prevGames = allGames.filter(x=>x.stage=='elim' && x.round == round-1)
    const winners = prevGames.reduce((a,g)=>{
      const w = gameWinner(g)
      if (w != undefined) a.push(w)
      return a
    }, [] as number[])
    unmatchedPlayers = winners
  }

  // add a bye player if odd number of players
  if (unmatchedPlayers.length % 2 != 0) unmatchedPlayers.push(undefined)

  // add games
  for (let i=0; i<unmatchedPlayers.length; i+=2) {
    let p1id = unmatchedPlayers[i]
    let p2id = unmatchedPlayers[i+1]
    if (p1id == undefined) {
      // ensure bye is on bottom
      [p1id, p2id] = [p2id, p1id]
    }
    const notie = true
    const {p1points, p2points, p1twenties, p2twenties, gameRounds} = randomScore(p1id, p2id, nGameRounds, randomScores, notie)

    gamesToAdd.push({
      stage: 'elim',
      round,
      n: i/2,
      p1id, p2id,
      p1points, p2points,
      p1twenties, p2twenties,
      gameRounds
    })
  }
  return gamesToAdd
}

/** Create elimination stage games by matching players up */
export const elimGames = (round:number, nStageRounds:number, allPlayers:Player[], allGames=([] as Game[]), nGameRounds=4, randomScores=false) => {
  const roundGames = allGames.filter(x=>x.stage=='elim' && x.round >= round)
  const keepMatchups = false // use ranking to determine matchups
  const {unmatchedPlayers, gamesToDelete} = rollcall(allPlayers, roundGames, keepMatchups)
  const gamesToAdd = elimMatchups(round, nStageRounds, unmatchedPlayers, allGames, nGameRounds, randomScores)

  return {gamesToAdd, gamesToDelete}
}

export const demoElimStage = (allPlayers:Player[], seedGames:Game[], nGameRounds=4) => {
  const allGames:Game[] = [...seedGames]
  const gamesToAdd:Game[] = []
  const {unmatchedPlayers} = rollcall(allPlayers, [])
  const nRounds = calcElimRounds(unmatchedPlayers.length)

  for (let round=0; round<nRounds; round++) {
    const randomScores = round<nRounds-1 // leave last round unscored
    const {gamesToAdd:roundGames} = elimGames(round, nRounds, allPlayers, allGames, nGameRounds, randomScores)
    roundGames.forEach(g=>{
      allGames.push(g)
      gamesToAdd.push(g)
    })
  }

  return {gamesToAdd, nRounds}
}
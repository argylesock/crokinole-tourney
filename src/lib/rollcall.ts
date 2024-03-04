
import { Game, Player } from '@/db'
import { gameHasAnyScore, gameIsBye } from './game-winner'

/** returns lists of present and absent players */
const getRollcall = (allPlayers:Player[]) => {
  const presentPlayers = [] as number[]
  const absentPlayers = [] as number[]
  allPlayers.forEach(p=>{
    if (p.id == undefined) return
    if (p.present) {
      presentPlayers.push(p.id)
    } else {
      absentPlayers.push(p.id)
    }
  })
  return {presentPlayers, absentPlayers}
}

const applyRollcall = (roundGames:Game[], presentPlayers:number[], absentPlayers:number[], removeUnscored:boolean) => {
  const unmatchedPlayers = [] as number[]
  const matchedPlayers = [] as number[]
  const gamesToDelete = [] as number[]
  const byeGames = [] as number[]
  roundGames.forEach(g=>{
    const p1Absent = g.p1id == undefined || absentPlayers.indexOf(g.p1id) >= 0
    const p2Absent = g.p2id == undefined || absentPlayers.indexOf(g.p2id) >= 0
    const bothAbsent = p1Absent && p2Absent
    const isBye = gameIsBye(g)
    const hasScore = !isBye && gameHasAnyScore(g)
    if (hasScore) {
      if (g.p1id) matchedPlayers.push(g.p1id)
      if (g.p2id) matchedPlayers.push(g.p2id)
    } else if (bothAbsent) {
      if (g.id !== undefined) gamesToDelete.push(g.id)
    } else if (p1Absent) {
      // g.p2id is defined
      unmatchedPlayers.push(g.p2id as number)
      if (g.id !== undefined) {
        gamesToDelete.push(g.id)
        byeGames.push(g.id)
      }
    } else if (p2Absent) {
      // g.p1id is defined
      unmatchedPlayers.push(g.p1id as number)
      if (g.id !== undefined) {
        gamesToDelete.push(g.id)
        byeGames.push(g.id)
      }
    } else {
      // both are defined and game is unscored
      if (removeUnscored) {
        unmatchedPlayers.push(g.p1id as number)
        unmatchedPlayers.push(g.p2id as number)
        if (g.id !== undefined) gamesToDelete.push(g.id)
      } else {
        matchedPlayers.push(g.p1id as number)
        matchedPlayers.push(g.p2id as number)
      }
    }
  })

  presentPlayers.forEach(pid=>{
    const inGame = matchedPlayers.indexOf(pid) >= 0
    const isUnmatched = unmatchedPlayers.indexOf(pid) >= 0
    if (!inGame && !isUnmatched) unmatchedPlayers.push(pid)
  })

  return {unmatchedPlayers, gamesToDelete, byeGames}
}

/** returns list of present players without opponents and a list of games to delete */
export default function rollcall (allPlayers:Player[], roundGames:(Game[]), removeUnscored=false) {
  const {presentPlayers, absentPlayers} = getRollcall(allPlayers)
  const {unmatchedPlayers, gamesToDelete, byeGames} = applyRollcall(roundGames, presentPlayers, absentPlayers, removeUnscored)
  return {unmatchedPlayers, gamesToDelete, byeGames}
}
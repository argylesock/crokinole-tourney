import { Game, Player } from '@/db'
import gameWinner, { gameIsBye } from './game-winner'

export default function getPlayerRecord(player:Player, stage:'seed'|'elim', games:Game[]) {
  let points = 0
  let twenties = 0
  let wins = 0
  const wld = games.reduce((a,g)=>{
    if (g.stage != stage) return a
    if ((g.p1id as number) == player.id) {
      points += g.p1points || 0
      twenties += g.p1twenties || 0
      const isBye = gameIsBye(g)
      const w = gameWinner(g)
      if (isBye) {
        a.push({wld: 'bye', game: g})
      } else if (w == player.id) {
        a.push({wld: 'win', game: g})
        wins += 1
      }
      else if (w != undefined) a.push({wld: 'loss', game: g})
      else a.push({wld: 'draw', game: g})
    } else if (g.p2id == player.id) {
      points += g.p2points || 0
      twenties += g.p2twenties || 0
      const isBye = gameIsBye(g)
      const w = gameWinner(g)
      if (isBye) {
        a.push({wld: 'bye', game: g})
      } else if (w == player.id) {
        a.push({wld: 'win', game: g})
        wins += 1
      }
      else if (w != undefined) a.push({wld: 'loss', game: g})
      else a.push({wld: 'draw', game: g})
    }
    return a
  }, [] as ({wld:'win'|'loss'|'draw'|'bye', game: Game})[])
  return {wld, points, twenties, wins}
}
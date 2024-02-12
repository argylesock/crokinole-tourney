import { Game, Player } from "../db"

const gameWith = (p1id:number|undefined, p2id:number|undefined) => (g:Game)=>(g.p1id == p1id && g.p2id == p2id) || (g.p1id == p2id && g.p2id == p1id)

function avoidReplays (players:Player[], games:Game[]):void
function avoidReplays (players:(number|undefined)[], games:Game[]):void
function avoidReplays (players:(Player|(number|undefined))[], games:Game[]) {
  const playerId = (x:Player|number|undefined) => {
    if (typeof(x) == 'number') return x
    return x?.id
  }

  // shuffle players down if they've played against eachother already
  for (let i = 0; i < players.length; i += 2) {
    let found = games.find(gameWith(playerId(players[i]), playerId(players[i+1])))
    let j = i+2
    while (found != undefined && j < players.length) {
      // swap p2.id with next player down
      [players[i+1], players[j]] = [players[j], players[i+1]]

      // look again
      found = games.find(gameWith(playerId(players[i]), playerId(players[i+1])))
      j += 1
    }
    // last two players may end up playing eachother multiple times?
  }
}
export default avoidReplays
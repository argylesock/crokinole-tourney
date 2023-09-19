import { Game, Player } from "../db"

const gameWith = (p1:Player, p2:Player) => (g:Game)=>(g.p1id == p1.id && g.p2id == p2.id) || (g.p1id == p2.id && g.p2id == p1.id)

const avoidReplays = (players:Player[], games:Game[]) => {
  // shuffle players down if they've played against eachother already
  for (let i = 0; i < players.length; i += 2) {
    let found = games.find(gameWith(players[i], players[i+1]))
    let j = i+2
    while (found != undefined && j < players.length) {
      // swap p2.id with next player down
      [players[i+1], players[j]] = [players[j], players[i+1]]

      // look again
      found = games.find(gameWith(players[i], players[i+1]))
      j += 1
    }
    // last two players may end up playing eachother multiple times?
  }
}
export default avoidReplays
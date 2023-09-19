import { Game } from "../db";

const gameWinner = (g:Game) => {
  if (g.p1id == undefined) return g.p2id
  if (g.p2id == undefined) return g.p1id
  if ((g.p1points as number) > (g.p2points as number)) return g.p1id
  if ((g.p1points as number) < (g.p2points as number)) return g.p2id
  if ((g.p1twenties as number) > (g.p2twenties as number)) return g.p1id
  if ((g.p1twenties as number) < (g.p2twenties as number)) return g.p2id
  return undefined
}
export default gameWinner
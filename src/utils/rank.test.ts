import { sequence } from "."
import { Game, Player } from "../db"
import rank from "./rank"

describe('rank', ()=>{
  it('should sort by rank', () => {
    const players:Player[] = sequence(8).map(n=>({id:n, name: `Player ${n}`}))
    const games:Game[] = [
      { stage: 'seed', round: 0, n: 0, p1id:0, p2id:1, p1points: 2, p2points: 6, p1twenties: 1, p2twenties: 0},
      { stage: 'seed', round: 0, n: 0, p1id:2, p2id:3, p1points: 4, p2points: 4, p1twenties: 1, p2twenties: 0},
      { stage: 'seed', round: 0, n: 0, p1id:4, p2id:5, p1points: 6, p2points: 2, p1twenties: 1, p2twenties: 0},
      { stage: 'seed', round: 0, n: 0, p1id:6, p2id:7, p1points: 8, p2points: 0, p1twenties: 1, p2twenties: 0},
    ]
    rank(players, games)
    expect(players[0].id).toBe(6)
    expect(players[1].id).toBe(4)
    expect(players[2].id).toBe(1)
    expect(players[3].id).toBe(2)
    expect(players[4].id).toBe(3)
    expect(players[5].id).toBe(0)
    expect(players[6].id).toBe(5)
    expect(players[7].id).toBe(7)
  })
})
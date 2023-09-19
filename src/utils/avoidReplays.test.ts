import { sequence } from "."
import { Game, Player } from "../db"
import avoidReplays from "./avoidReplays"

describe('avoidReplays', ()=>{
  it('should not duplicate games', ()=>{
    const players:Player[] = sequence(8).map(x=>({id: x, name:`Player ${x}`}))
    const games:Game[] = [
      { stage: 'seed', round: 0, n: 0, p1id: 0, p2id: 1 },
      { stage: 'seed', round: 0, n: 1, p1id: 2, p2id: 3 },
      { stage: 'seed', round: 0, n: 2, p1id: 4, p2id: 5 },
      { stage: 'seed', round: 0, n: 3, p1id: 6, p2id: 7 },
    ]
    avoidReplays(players, games)
    expect(players[0].id).toBe(0)
    expect(players[1].id).toBe(2)
    expect(players[2].id).toBe(1)
    expect(players[3].id).toBe(3)
    expect(players[4].id).toBe(4)
    expect(players[5].id).toBe(6)
    expect(players[6].id).toBe(5)
    expect(players[7].id).toBe(7)
  })
  it('should not duplicate games from 2 rounds', ()=>{
    const players:Player[] = sequence(8).map(x=>({id: x, name:`Player ${x}`}))
    const games:Game[] = [
      { stage: 'seed', round: 0, n: 0, p1id: 0, p2id: 1 },
      { stage: 'seed', round: 0, n: 1, p1id: 2, p2id: 3 },
      { stage: 'seed', round: 0, n: 2, p1id: 4, p2id: 5 },
      { stage: 'seed', round: 0, n: 3, p1id: 6, p2id: 7 },
      { stage: 'seed', round: 1, n: 0, p1id: 0, p2id: 2 },
      { stage: 'seed', round: 1, n: 1, p1id: 1, p2id: 3 },
      { stage: 'seed', round: 1, n: 2, p1id: 4, p2id: 6 },
      { stage: 'seed', round: 1, n: 3, p1id: 5, p2id: 7 },
    ]

    avoidReplays(players, games)
    expect(players[0].id).toBe(0)
    expect(players[1].id).toBe(3)
    expect(players[2].id).toBe(1)
    expect(players[3].id).toBe(2)
    expect(players[4].id).toBe(4)
    expect(players[5].id).toBe(7)
    expect(players[6].id).toBe(5)
    expect(players[7].id).toBe(6)
  })
  it('should not duplicate games from 3 rounds', ()=>{
    const players:Player[] = sequence(8).map(x=>({id: x, name:`Player ${x}`}))
    const games:Game[] = [
      { stage: 'seed', round: 0, n: 0, p1id: 0, p2id: 1 },
      { stage: 'seed', round: 0, n: 1, p1id: 2, p2id: 3 },
      { stage: 'seed', round: 0, n: 2, p1id: 4, p2id: 5 },
      { stage: 'seed', round: 0, n: 3, p1id: 6, p2id: 7 },
      { stage: 'seed', round: 1, n: 0, p1id: 0, p2id: 2 },
      { stage: 'seed', round: 1, n: 1, p1id: 1, p2id: 3 },
      { stage: 'seed', round: 1, n: 2, p1id: 4, p2id: 6 },
      { stage: 'seed', round: 1, n: 3, p1id: 5, p2id: 7 },
      { stage: 'seed', round: 2, n: 0, p1id: 0, p2id: 3 },
      { stage: 'seed', round: 2, n: 1, p1id: 1, p2id: 2 },
      { stage: 'seed', round: 2, n: 2, p1id: 4, p2id: 7 },
      { stage: 'seed', round: 2, n: 3, p1id: 5, p2id: 6 },
    ]

    avoidReplays(players, games)
    expect(players[0].id).toBe(0)
    expect(players[1].id).toBe(4)
    expect(players[2].id).toBe(1)
    expect(players[3].id).toBe(5)
    expect(players[4].id).toBe(2)
    expect(players[5].id).toBe(6)
    expect(players[6].id).toBe(3)
    expect(players[7].id).toBe(7)
  })

  it('should not endless loop if everyone has played everone', ()=>{
    const players:Player[] = sequence(4).map(x=>({id: x, name:`Player ${x}`}))
    const games:Game[] = [
      { stage: 'seed', round: 0, n: 0, p1id: 0, p2id: 1 },
      { stage: 'seed', round: 0, n: 1, p1id: 2, p2id: 3 },
      { stage: 'seed', round: 1, n: 0, p1id: 0, p2id: 2 },
      { stage: 'seed', round: 1, n: 1, p1id: 1, p2id: 3 },
      { stage: 'seed', round: 2, n: 0, p1id: 0, p2id: 3 },
      { stage: 'seed', round: 2, n: 1, p1id: 1, p2id: 2 },
    ]

    avoidReplays(players, games)
  }, 100)
})
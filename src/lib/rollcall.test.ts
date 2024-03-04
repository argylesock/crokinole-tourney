import { Player } from '@/db'
import rollcall from './rollcall'
import { seedMatchups } from './seed-games'

const names = [
  'Jim Kirk',
  'Spock',
  'Montgomery Scott',
  'Leonard McCoy',
  'Nyota Uhura',
  'Hikaru Sulu',
  'Pavel Chekov',
]
const newPlayerName = 'Janice Rand'

describe('rollcall', ()=>{
  it('should return 7 unmatchedPlayers when no prev round 0', ()=>{
    const players:Player[] = names.map((name,i)=>({id:i+1, name, present: true}))
    const {unmatchedPlayers, gamesToDelete} = rollcall(players, [])
    expect(unmatchedPlayers.length).toBe(7)
    expect(gamesToDelete.length).toBe(0)
  })
  it('should fill bye with new player in seed round', ()=>{
    const players:Player[] = names.map((name,i)=>({id:i+1, name, present: true}))
    const prevGames = seedMatchups(0, players.map(p=>p.id))

    // new player
    players.push({id:8, name: newPlayerName, present:true})

    prevGames.forEach((g,i)=>g.id = i) // so they can be deleted
    const {unmatchedPlayers, gamesToDelete} = rollcall(players, prevGames)
    expect(gamesToDelete.length).toBe(1)
    expect(unmatchedPlayers.length).toBe(2)
  })
  it('should match bye with existing player in seed round', ()=>{
    const players:Player[] = names.map((name,i)=>({id:i+1, name, present: true}))
    const prevGames = seedMatchups(0, players.map(p=>p.id))

    // find a game with two players and make one absent
    const g = prevGames.find(g=>g.p1id && g.p2id)
    expect(g).toBeDefined()
    const p = players.find(p=>p.id == g?.p1id || p.id == g?.p2id)
    expect(p).toBeDefined()
    if (p) p.present = false

    prevGames.forEach((g,i)=>g.id = i) // so they can be deleted
    const {unmatchedPlayers, gamesToDelete} = rollcall(players, prevGames)
    expect(unmatchedPlayers.length).toBe(2)
    expect(gamesToDelete.length).toBe(2)
  })
})

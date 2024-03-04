import { seedGames, seedMatchups } from './seed-games'
import { Player } from '@/db'

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

describe('seedGames', ()=>{
  it('should create 4 games for 7 players', ()=>{
    const players:Player[] = names.map((name,i)=>({id:i+1, name, present: true}))
    const {gamesToAdd:games} = seedGames(0, players)
    expect(games.length).toBe(4)
    const byeGames = games.filter(g=>g.p1id == undefined || g.p2id == undefined)
    expect(byeGames.length).toBe(1)
  })
  it('should fill bye with new player', ()=>{
    const players:Player[] = names.map((name,i)=>({id:i+1, name, present: true}))
    const {gamesToAdd:prevGames} = seedGames(0, players)
    let byeGames = prevGames.filter(g=>!g.p1id || !g.p2id)
    expect(byeGames.length).toBe(1)

    // new player
    players.push({id:8, name: newPlayerName, present:true})

    prevGames.forEach((g,i)=>g.id = i) // so they can be deleted
    const {gamesToAdd, gamesToDelete} = seedGames(0, players, prevGames)
    expect(gamesToAdd.length).toBe(1)
    byeGames = gamesToAdd.filter(g=>!g.p1id || !g.p2id)
    expect(byeGames.length).toBe(0)
    expect(gamesToDelete.length).toBe(1)
  })
  it('should fill bye with existing player', ()=>{
    const players:Player[] = names.map((name,i)=>({id:i+1, name, present: true}))
    const {gamesToAdd:prevGames} = seedGames(0, players)
    
    // find a game with two players and make one absent
    const g = prevGames.find(g=>g.p1id && g.p2id)
    expect(g).toBeDefined()
    const p = players.find(p=>p.id == g?.p1id || p.id == g?.p2id)
    expect(p).toBeDefined()
    if (p) p.present = false

    prevGames.forEach((g,i)=>g.id = i) // so they can be deleted
    const {gamesToAdd, gamesToDelete} = seedGames(0, players, prevGames)
    expect(gamesToAdd.length).toBe(1)
    expect(gamesToAdd[0].p1id).toBeDefined()
    expect(gamesToAdd[0].p2id).toBeDefined()
    expect(gamesToDelete.length).toBe(2)
  })

  describe('matchupGames', ()=>{
    it('should create 4 games with 1 bye', () =>{
      const newGames = seedMatchups(0, [1,2,3,4,5,6,7])
      expect(newGames.length).toBe(4)
      const bye = newGames.filter(g=>!g.p1id || !g.p2id)
      expect(bye.length).toBe(1)
    })
  })

  describe('matchupGames', ()=>{
    it('should create 4 games with 1 bye',()=>{
      const newGames = seedMatchups(0, [1,2,3,4,5,6,7])
      expect(newGames.length).toBe(4)
      const bye = newGames.filter(g=>!g.p1id || !g.p2id)
      expect(bye.length).toBe(1)
    })
  })
})

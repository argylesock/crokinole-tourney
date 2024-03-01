import { elimGames } from './elim-games'
import { demoSeedStage } from './seed-games'
import { Player } from '@/db'

const names = [
  'Jim Kirk',
  'Spock',
  'Montgomery Scott',
  'Leonard McCoy',
  'Nyota Uhura',
  'Hikaru Sulu',
  'Pavel Chekov',

  "Jean-Luc Picard",
  "William Riker",
  "Geordi La Forge",
  "Tasha Yar",
  "Worf",
  "Beverly Crusher",
  "Diana Troi",
  "Data",
  "Wesley Crusher",
]

describe('elimGames', ()=>{
  it('should create 4 games for top 8 players', ()=>{
    const players:Player[] = names.map((name,i)=>({id:i+1, name, present: true}))
    const {gamesToAdd:allGames} = demoSeedStage(players)

    const nTopPlayers = 8
    const nRounds = Math.log2(nTopPlayers) // expect 3

    const {gamesToAdd} = elimGames(0, nRounds, players, allGames)
    expect(gamesToAdd.length).toBe(4)
    const byeGames = gamesToAdd.filter(g=>g.p1id == undefined || g.p2id == undefined)
    expect(byeGames.length).toBe(0)
  })
  it('should create 2 games for second round of top 8 players', ()=>{
    const players:Player[] = names.map((name,i)=>({id:i+1, name, present: true}))
    const {gamesToAdd:allGames} = demoSeedStage(players)

    const nTopPlayers = 8
    const nRounds = Math.log2(nTopPlayers) // expect 3

    const {gamesToAdd:round0Games} = elimGames(0, nRounds, players, allGames)
    round0Games.forEach(g=>allGames.push(g))

    const {gamesToAdd} = elimGames(1, nRounds, players, allGames)
    expect(gamesToAdd.length).toBe(2)
    const byeGames = gamesToAdd.filter(g=>g.p1id == undefined || g.p2id == undefined)
    expect(byeGames.length).toBe(0)
  })
})

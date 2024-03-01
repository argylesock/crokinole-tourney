import Dexie from 'dexie'
import { Player } from './schema/player'
import { Game } from './schema/game'
import { Tournament } from './schema/tournament'

export class MyAppDatabase extends Dexie {
  tournament!: Dexie.Table<Tournament, number>
  players!: Dexie.Table<Player, number>
  games!: Dexie.Table<Game, number>
  
  constructor() {  
    super('crokinole-tourney')
    
    this.version(1).stores({
      tournament: '++id, name',
      players: '++id, name',
      games: '++id, stage, p1id, p2id',
    })
  }

  async anyData() {
    const nplayers = await this.players.count()
    if (nplayers) return true
    const ngames = await this.games.count()
    if (ngames) return true
    return false
  }

  async allData() {
    const players = await this.players.toArray()
    const games = await this.games.toArray()
    return {players, games}
  }

  async reset(keepPlayers:boolean) {
    if (!keepPlayers) await db.players.clear()
    await db.games.clear()
  }

  async replace(payload:{players:Player[], games?:Game[]}) {
    const {players, games=[]} = payload
    await db.games.clear()
    await db.players.bulkPut(players)
    await db.games.bulkPut(games)
  }
}

const db = new MyAppDatabase()

export default db
import Dexie from 'dexie'

export interface Player {
  // id not required to create
  id?: number
  name: string
  present?: boolean
}

export const PlayerSchema = {
  "$id": "/Player",
  "type": "object",
  // id required for validation
  "required": ["id", "name"],
  "properties": {
    "id": { "type": "number" },
    "name": { "type": "string" },
    "present": { "type": "boolean" },
  }
}

export interface GameRound {
  p1points: number
  p2points: number
}
export interface Game {
  // id not required to create
  id?: number
  stage: 'seed'|'elim'
  round: number
  n: number
  p1id: number|undefined
  p2id: number|undefined
  p1points?: number
  p2points?: number
  p1twenties?: number
  p2twenties?: number
  gameRounds?: GameRound[]
}

export const GameSchema = {
  "$id": "/Game",
  "type": "object",
  // requires at least p1id or p2id
  // id required to validate
  "anyOf": [{
    "required": ["id", "stage", "round", "n", "p1id"],
  },{
    "required": ["id", "stage", "round", "n", "p2id"],
  }],
  "properties": {
    "id": { "type": "number" },
    "stage": { "type": "string", "enum": ['seed','elim'] },
    "round": { "type": "number" },
    "n": { "type": "number" },
    "p1id": { "type": "number" },
    "p2id": { "type": "number" },
    "p1points": { "type": "number" },
    "p2points": { "type": "number" },
    "p1twenties": { "type": "number" },
    "p2twenties": { "type": "number" },
    "gameRounds": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "p1points": { "type": "number" },
          "p2points": { "type": "number" },
        },
      }
    }
  }
}

export class MyAppDatabase extends Dexie {
  players!: Dexie.Table<Player, number>
  games!: Dexie.Table<Game, number>
  
  constructor() {  
    super('crokinole-tourney')
    
    this.version(1).stores({
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
export interface GameRound {
  p1points: number
  p2points: number
}
export interface Game {
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
export interface Tournament {
  id?: number
  name?: string
  date?: Date
  tz?: string
  location?: string
  nSeedRounds: number
  nElimPlayers?: number
}

export const TournamentSchema = {
  "$id": "/Tournament",
  "type": "object",
  "required": ["id", "name"],
  "properties": {
    "id": { "type": "number" },
    "name": { "type": "string" },
    "date": { "type": "string", "format": "date-time" },
    "tz": { "type": "string" },
    "nSeedRounds": { "type": "number" },
    "nElimPlayers": { "type": "number" },
  }
}
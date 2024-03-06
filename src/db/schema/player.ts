export interface Player {
  id?: number
  name: string
  present?: boolean
  alias?: string
  tags?: string[]
}

export const PlayerSchema = {
  "$id": "/Player",
  "type": "object",
  "required": ["id", "name"],
  "properties": {
    "id": { "type": "number" },
    "name": { "type": "string" },
    "present": { "type": "boolean" },
  }
}
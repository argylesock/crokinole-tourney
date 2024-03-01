import { Game, Player } from '@/db'
import { GameSchema, PlayerSchema } from '@/db/schema'
import Ajv from "ajv"

const PayloadSchema = {
  "type": "object",
  "required": ["players"],
  "properties": {
    "players": {
      "type": "array",
      "items": {"$ref": "/Player"},
      "minItems": 1,
    },
    "games": {
      "type": "array",
      "items": {"$ref": "/Game"},
    }
  }
}

const ajv = new Ajv()
ajv.addSchema(PlayerSchema, '/Player')
ajv.addSchema(GameSchema, '/Game')
const validate = ajv.compile(PayloadSchema)

interface Payload {
  players: Partial<Player>[]
  games: Partial<Game>[]
}
const validateRestore = (o:unknown) => {
  const payload = o as Partial<Payload>
  if (!validate(payload)) {
    throw new Error(ajv.errorsText())
  }

  // ensure games' p1id and p2id exist in players
  const {players, games} = payload
  if (!games) return

  const found:Set<number> = new Set()
  const findPlayer = (id:number) => {
    if (found.has(id)) return true
    const p = players?.find(p=>p.id === id)
    if (p) found.add(p.id as number)
    return !!p
  }

  const errors:string[] = []
  const notfound:Set<number> = new Set()
  games.forEach((game,i) => {
    if (game.p1id && !notfound.has(game.p1id) && !findPlayer(game.p1id)) {
      if (!notfound.has(game.p1id)) {
        errors.push(`instance.games[${i}].p1id is not found in instance.players`)
      }
      notfound.add(game.p1id)
    }
    if (game.p2id && !notfound.has(game.p2id) && !findPlayer(game.p2id)) {
      if (!notfound.has(game.p2id)) {
        errors.push(`instance.games[${i}].p2id is not found in instance.players`)
      }
      notfound.add(game.p2id)
    }
  })
  if (notfound.size > 0) {
    throw new Error(errors.map((e,i)=>`${i}: ${e}`).join('\n'))
  }
}
export default validateRestore
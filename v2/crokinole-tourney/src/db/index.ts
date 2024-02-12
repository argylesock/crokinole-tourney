import { Game, GameRound } from './schema/game'
import { Player } from './schema/player'
import { Tournament } from './schema/tournament'
import db from './db'

export type { Game, GameRound, Player, Tournament }
export default db
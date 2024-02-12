import { shuffle } from './utils'
import { Player } from '../db'
import names from './names.json'

export default function randomPlayers (n:number, nPresent=0) {
  const items = shuffle(names).slice(0, n).map((name,i)=>{
    return {name, present:i>=nPresent} as Player
  })
  return shuffle(items) // shuffle again to mix in absent players
}
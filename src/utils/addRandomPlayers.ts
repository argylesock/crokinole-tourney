import { shuffle } from '.'
import db, { Player } from '../db'
import names from './names.json'

const addRandomPlayers = async (n:number, notpresent=0) => {
  const items = shuffle(names).slice(0, n).map((name,i)=>{
    return {name, present:i>=notpresent} as Player
  })
  return db.players.bulkAdd(shuffle(items))
}
export default addRandomPlayers
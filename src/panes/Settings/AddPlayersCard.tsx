import { Card } from "react-bootstrap"
import names from './names.json'
import db, { Player } from "../../db"
import { useState } from "react"
import WorkingButton from "../../components/WorkingButton"
import { shuffle } from "../../utils"


const AddPlayersCard = () => {
  const [working, setWorking] = useState(false)

  const addPlayers = (n:number) => {
    setWorking(true)
    setTimeout(()=>setWorking(false),1000)

    const items = shuffle(names).slice(0, n).map(name=>{
      return {name, present: true} as Player
    })
    db.players.bulkAdd(items)
  }

  return (
    <Card className='text-center'>
      <Card.Header>
        Add Random Player Names
        <div style={{color:'var(--bs-gray)', fontSize:'smaller', fontStyle:'italic'}}>
          Adding Players multiple times may result in duplicate player names. They can be removed using the Players panel.
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text className='text-start d-flex gap-4 align-items-center'>
          <span>
            <WorkingButton className='text-nowrap' working={working} onClick={()=>addPlayers(8)}>Add Players</WorkingButton>
          </span>
          <span>
            Adds 8 random names to the roster of players. This is useful for demonstration purposes.
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default AddPlayersCard
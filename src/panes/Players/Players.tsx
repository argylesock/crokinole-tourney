import { Button, Form } from 'react-bootstrap'
import db from '../../db'
import { useLiveQuery } from 'dexie-react-hooks'
import './Players.css'
import PlayerInput from './PlayerInput'
import AddPlayerInput from './AddPlayerInput'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons'

const Players = () => {
  const [sort, setSort] = useState(false)
  const toggleSort = () => setSort(!sort)

  const players = useLiveQuery(async ()=>{
    if (sort) return await db.players.orderBy('name').toArray()
    return await db.players.toArray()
  },[sort]) || []
  const allPresent = players.length ? !players.find(p=>!p.present) : false

  const toggleAllPresent = async () => {
    players.forEach(x=>db.players.update(x.id as number, {present:!allPresent}))
  }

  return (<div className="players">
    <div className="d-grid mt-4 gap-2">
      <div className='tool-bar'>
        <Form.Check id='all-present' style={{marginLeft:'17px'}} disabled={!players.length} type='switch' checked={allPresent} onClick={toggleAllPresent} label="All players present"/>
        <Button size='sm' variant={'link'} className={sort?'active':'inactive'} onClick={toggleSort}>
          <FontAwesomeIcon size='xl' icon={faArrowDownAZ} />
        </Button>
      </div>
      <div className='d-flex flex-wrap gap-2'>
        {players.map(x=><PlayerInput key={x.id} player={x} present={x.present}/>)}
      </div>
      <AddPlayerInput/>
    </div>
  </div>)
}
export default Players
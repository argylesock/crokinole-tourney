import { Button, Form, InputGroup } from 'react-bootstrap'
import db from '../../db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import './AddPlayerInput.css'

const AddPlayerInput = () => {
  const [name, setName] = useState('')
  const [present, setPresent] = useState(false)
  const togglePresent = ()=>setPresent(!present)

  const count = useLiveQuery(()=>db.players.where('name').equalsIgnoreCase(name.trim()).count(), [name]) || 0
  const isUnique = count == 0

  const addPlayer = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) return
    db.players.add({name:name.trim(), present})
    .then(()=>setName(''))
  }

  const isInvalid = !isUnique
  const invalidReason = 'Duplicate player name'

  return (
    <Form onSubmit={addPlayer} className='add-player-input'>
      <InputGroup>
        <InputGroup.Text>
          <Form.Check type="switch" checked={present} onChange={togglePresent}/>
        </InputGroup.Text>
        <Form.Control type='text' placeholder='Player name' value={name} onChange={e=>setName(e.target.value)} isInvalid={isInvalid}/>
        <Form.Control.Feedback tooltip type="invalid">{invalidReason}</Form.Control.Feedback>
        <Button type='submit'>Add Player</Button>
      </InputGroup>
    </Form>
  )
}
export default AddPlayerInput
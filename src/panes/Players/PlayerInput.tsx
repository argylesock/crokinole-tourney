import { Button, Form, InputGroup } from 'react-bootstrap'
import db, { Player } from '../../db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faXmark } from '@fortawesome/free-solid-svg-icons'
import useClickOutside from '../../hooks/useClickOutside'
import './PlayerInput.css'

interface Props {
  player: Player|undefined
  present?: boolean
}
const PlayerInput = (props:Props) => {
  const player = props.player
  const [name, _setName] = useState(player?.name || '')
  const setName = (name:string) => {
    _setName(name)
    if (player) db.players.update(player.id as number, {name:name.trim()})
  }
  const present = !!props.present
  const setPresent = (present:boolean) => {
    if (player) db.players.update(player.id as number, {present})
  }
  const togglePresent = ()=>setPresent(!present)

  const countSameName = useLiveQuery(()=>db.players.where('name').equalsIgnoreCase(name.trim()).count(), [name]) || 0
  const isUnique = countSameName <= 1
  const countGames = useLiveQuery(async ()=>{
    const p1 = await db.games.where('p1id').equals(player?.id || -1).count()
    const p2 = await db.games.where('p2id').equals(player?.id || -1).count()
    return p1+p2
  }, [player?.id]) || 0
  const isLocked = countGames > 0

  const [confirm, setConfirm] = useState(false)
  const onDelete = async () => {
    if (player?.id == undefined) return
    if (!confirm) setConfirm(true)
    else await db.players.delete(player.id)
  }
  const ref = useClickOutside<HTMLButtonElement>(()=>{
    setConfirm(false)
  })

  const variant = confirm ? 'danger' : 'outline-secondary'
  const deleteElem = confirm ? <>Remove Player</> : <FontAwesomeIcon icon={faXmark}/>

  const isInvalid = (player && !name.trim()) || !isUnique
  const invalidReason = !name.trim() ? 'Player name is empty' : 'Duplicate player name'

  return (
    <Form className='player-input' onSubmit={e=>e.preventDefault()}>
      <InputGroup>
        <InputGroup.Text>
          <Form.Check type="switch" checked={present} onChange={togglePresent}/>
        </InputGroup.Text>
        <Form.Control type='text' placeholder='Player name' value={name} onChange={e=>setName(e.target.value)} isInvalid={isInvalid}/>
        <Form.Control.Feedback tooltip type="invalid">{invalidReason}</Form.Control.Feedback>
        {isLocked
          ? <InputGroup.Text className='lock'><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
          : <Button ref={ref} variant={variant} onClick={onDelete} onBlur={()=>setConfirm(false)}>{deleteElem}</Button>
        }
      </InputGroup>
    </Form>
  )
}
export default PlayerInput
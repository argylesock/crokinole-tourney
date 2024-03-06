import db from '@/db'
import { useMemo, useState } from 'react'
import Switch from '@/components/switch'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDebounceValue } from 'usehooks-ts'
import PlayerNameAlertBadge from './player-name-alert-badge'

interface Props {
  isDuplicate: (s:string)=>(true|false|undefined)
}

const AddPlayerInput = ({isDuplicate}:Props) => {
  const [name, _setName] = useState('')
  const [debounced, setDebounced] = useDebounceValue('', 250)
  const setName = (s:string) => {
    _setName(s)
    setDebounced(s)
  }

  const [present, setPresent] = useState(true)
  const togglePresent = ()=>setPresent(!present)

  const addPlayer = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) return
    db.players.add({name:name.trim(), present})
    .then(()=>setName(''))
  }

  const duplicate = useMemo(()=>isDuplicate(debounced), [isDuplicate, debounced])
  const isInvalid = duplicate === true

  return (
    <form onSubmit={addPlayer} className='flex items-center space-x-2'>
      <Switch checked={present} onCheckedChange={togglePresent}/>
      <Input className='max-w-sm' type='text' placeholder='Player name' value={name} onChange={e=>setName(e.target.value)}/>
      <Button type='submit' disabled={isInvalid}>Add</Button>
      <PlayerNameAlertBadge duplicate={duplicate}/>
    </form>
  )
}
export default AddPlayerInput
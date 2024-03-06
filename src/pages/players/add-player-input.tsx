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
  const [alias, _setAlias] = useState<string|undefined>(undefined)
  const [debounced, setDebounced] = useDebounceValue('', 250)

  const setValue = (s:string) => {
    const withAliasPattern = /^([^ ]*) "([^"]+)" (.*)$/
    const re = withAliasPattern.exec(s)
    let name:string, alias:string|undefined
    if (re != null) {
      name = `${re[1]} ${re[3]}`
      alias = re[2]
    } else {
      name = s
      alias = undefined
    }
    _setName(name)
    _setAlias(alias)
    setDebounced(name)
  }

  // format name as `<first> "<alias>" <last>`
  const parts = name.split(' ')
  const rest = parts.slice(1).join(' ')
  const value = alias ? `${parts[0]} "${alias}" ${rest}` : name

  const [present, setPresent] = useState(true)
  const togglePresent = ()=>setPresent(!present)

  const addPlayer = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) return
    db.players.add({name:name.trim(), present})
    .then(()=>setValue(''))
  }

  const duplicate = useMemo(()=>isDuplicate(debounced), [isDuplicate, debounced])
  const isInvalid = duplicate === true

  return (
    <form onSubmit={addPlayer} className='flex items-center space-x-2'>
      <Switch checked={present} onCheckedChange={togglePresent}/>
      <Input className='max-w-sm' type='text' placeholder='Player name' value={value} onChange={e=>setValue(e.target.value)}/>
      <Button type='submit' disabled={isInvalid}>Add</Button>
      <PlayerNameAlertBadge duplicate={duplicate}/>
    </form>
  )
}
export default AddPlayerInput
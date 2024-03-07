import db from '@/db'
import { useMemo, useState } from 'react'
import Switch from '@/components/switch'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDebounceValue } from 'usehooks-ts'
import { formatNameAlias, parseNameAlias } from './name-alias'
import { usePlayers } from '@/contexts/players-context'
import { InputDescription } from '@/components/input-description'
import { closeMatchAliasWarning, closeMatchNameWarning, duplicateAliasError, duplicateNameError } from './text-strings'

const AddPlayerInput = () => {
  const {isDuplicateName, isDuplicateAlias} = usePlayers()
  const [name, _setName] = useState('')
  const [alias, _setAlias] = useState<string|undefined>(undefined)
  const [adding, setAdding] = useState(false)
  const [debounced, setDebounced] = useDebounceValue('', 250)

  const setValue = (s:string) => {
    const {name, alias} = parseNameAlias(s)
    _setName(name)
    _setAlias(alias)
    setDebounced(s)
  }

  // format name as `<first> "<alias>" <last>`
  const value = formatNameAlias(name, alias)

  const [present, setPresent] = useState(true)
  const togglePresent = ()=>setPresent(!present)

  const addPlayer = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim()) return
    setAdding(true)
    db.players.add({name:name.trim(), alias, present})
    .then(()=>setValue(''))
    // wait 250ms to remove red flashing of the border
    .finally(()=>setTimeout(()=>setAdding(false),250))
  }

  const {duplicateName, duplicateAlias} = useMemo(()=>{
    const {name, alias} = parseNameAlias(debounced)
    const duplicateName = isDuplicateName(name, undefined)
    const duplicateAlias = isDuplicateAlias(alias||'', undefined)
    return {duplicateName, duplicateAlias}
  }, [isDuplicateName, isDuplicateAlias, debounced])
  const isInvalid = duplicateName === true || duplicateAlias === true

  const danger = !adding && (duplicateName || duplicateAlias)
  const warning = !adding && (duplicateName === undefined || duplicateAlias === undefined)
  const inputMsg = adding ? ''
  : (duplicateName) ? duplicateNameError
  : (duplicateAlias) ? duplicateAliasError
  : (duplicateName === undefined) ? closeMatchNameWarning
  : (duplicateAlias === undefined) ? closeMatchAliasWarning
  : ''

  return (
    <form onSubmit={addPlayer}>
      <div className='w-full flex items-center space-x-2'>
        <Switch checked={present} onCheckedChange={togglePresent}/>
        <Input danger={danger} warning={warning} className='max-w-sm' type='text' placeholder='Player name' value={value} onChange={e=>setValue(e.target.value)}/>
        <Button type='submit' disabled={isInvalid}>Add</Button>
      </div>
      <InputDescription className='ml-11' danger={danger} warning={warning}>{inputMsg}</InputDescription>
    </form>
  )
}
export default AddPlayerInput
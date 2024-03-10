import db, { Player } from '@/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Switch from '@/components/switch'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { useDebounceValue } from 'usehooks-ts'
import { usePlayers } from '@/contexts/players-context'
import { cn } from '@/lib/utils'
import { UserCircleIcon } from 'lucide-react'
import { formatNameAlias, parseNameAlias } from './name-alias'
import { InputDescription } from '@/components/input-description'
import { closeMatchAliasWarning, closeMatchNameWarning, duplicateAliasError, duplicateNameError } from './text-strings'

interface Props {
  player: Player
}
export default function PlayerInput ({player}:Props) {
  const { showPlayerProfile, isDuplicateName, isDuplicateAlias } = usePlayers()
  const [name, _setName] = useState(player.name || '')
  const [alias, _setAlias] = useState(player.alias || undefined)
  // format name as `<first> "<alias>" <last>`
  const value = formatNameAlias(name, alias)

  const [debounced, setDebounced] = useDebounceValue(value, 250)

  useEffect(()=>{
    _setName(player.name)
    _setAlias(player.alias)
  }, [player])

  /** parse value as `<first> "<alias>" <last>` */
  const setValue = (s:string) => {
    const {name, alias} = parseNameAlias(s)
    _setName(name)
    _setAlias(alias)
    setDebounced(s)
    if (player) db.players.update(player.id as number, {name, alias})
  }

  const present = !!player.present
  const setPresent = (present:boolean) => {
    if (player) db.players.update(player.id as number, {present})
  }
  const togglePresent = ()=>setPresent(!present)

  const {duplicateName, duplicateAlias} = useMemo(()=>{
    const {name, alias} = parseNameAlias(debounced)
    const duplicateName = isDuplicateName(name, player)
    const duplicateAlias = isDuplicateAlias(alias||'', player)
    return {duplicateName, duplicateAlias}
  }, [isDuplicateName, isDuplicateAlias, debounced, player])
  const empty = !name.trim()

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

  const ref = useRef<HTMLButtonElement>(null)
  useOnClickOutside(ref, ()=> setConfirm(false))

  const variant = confirm ? 'destructive' : 'ghost'
  const className = confirm ? '' : 'text-slate-500'
  const deleteElem = confirm ? <>Remove Player</> : <Cross1Icon/>

  const danger = empty || duplicateName || duplicateAlias
  const warning = duplicateName === undefined || duplicateAlias === undefined
  const inputMsg = empty ? 'Should not be empty'
  : (duplicateName) ? duplicateNameError
  : (duplicateAlias) ? duplicateAliasError
  : (duplicateName === undefined) ? closeMatchNameWarning
  : (duplicateAlias === undefined) ? closeMatchAliasWarning
  : ''

  return (
    <form onSubmit={e=>e.preventDefault()}>
      <div className='w-full flex items-center space-x-2'>
        <Switch checked={present} onCheckedChange={togglePresent}/>
        <div className='w-full max-w-sm relative'>
          <Input danger={danger} warning={warning} className='pr-9' type='text' placeholder='Player name' value={value} onChange={e=>setValue(e.target.value)}/>
          <Button variant='ghost' size='icon' className='w-8 h-8 rounded-full absolute right-0.5 inset-y-0.5 text-slate-500 shrink-0 p-2' onClick={()=>showPlayerProfile(player.id)}>
            <UserCircleIcon strokeWidth={1}/>
          </Button>
        </div>
        <span className='shrink-0'>
          {isLocked
            ? <Badge variant='secondary' className='text-slate-500 px-1'>locked</Badge>
            : <Button ref={ref} variant={variant} size={confirm ? undefined : 'icon' }
                className={cn(className,'mr-[13px] sm:mr-0')} onClick={onDelete} onBlur={()=>setConfirm(false)}
              >
                {deleteElem}
              </Button>
          }
        </span>
      </div>
        <InputDescription className='ml-11' danger={danger} warning={warning}>{inputMsg}</InputDescription>
    </form>
  )
}
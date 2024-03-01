import db, { Player } from '@/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Switch from '@/components/switch'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { useDebounceValue } from 'usehooks-ts'
import PlayerNameAlertBadge from './player-name-alert-badge'

interface Props {
  player: Player
  isDuplicate: (s:string, self?:Player)=>(true|false|undefined)
}
export default function PlayerInput ({player, isDuplicate}:Props) {
  const [name, _setName] = useState(player.name || '')
  const [debounced, setDebounced] = useDebounceValue(player.name || '', 250)
  const setName = (name:string) => {
    _setName(name)
    setDebounced(name)
    if (player) db.players.update(player.id as number, {name:name.trim()})
  }
  const present = !!player.present
  const setPresent = (present:boolean) => {
    if (player) db.players.update(player.id as number, {present})
  }
  const togglePresent = ()=>setPresent(!present)

  const duplicate = useMemo(()=>isDuplicate(debounced, player), [isDuplicate, debounced, player])
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


  return (
    <form className='flex items-center space-x-2 mb-1' onSubmit={e=>e.preventDefault()}>
      <Switch checked={present} onCheckedChange={togglePresent}/>
      <Input className='max-w-sm' type='text' placeholder='Player name' value={name} onChange={e=>setName(e.target.value)}/>
      {isLocked
        ? <Badge variant='secondary' className='text-slate-500 px-1'>locked</Badge>
        : <Button ref={ref} variant={variant} size={confirm ? undefined : 'icon' } className={className} onClick={onDelete} onBlur={()=>setConfirm(false)}>{deleteElem}</Button>
      }
      <PlayerNameAlertBadge empty={empty} duplicate={duplicate}/>
    </form>
  )
}
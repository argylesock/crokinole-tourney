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
import PlayerNameAlertBadge from './player-name-alert-badge'
import { usePlayers } from '@/contexts/players-context'
import { cn } from '@/lib/utils'
import { UserCircleIcon } from 'lucide-react'

interface Props {
  player: Player
  isDuplicate: (s:string, self?:Player)=>(true|false|undefined)
}
export default function PlayerInput ({player, isDuplicate}:Props) {
  const { showPlayerProfile } = usePlayers()
  const [name, _setName] = useState(player.name || '')
  const [alias, _setAlias] = useState(player.alias || undefined)
  const [debounced, setDebounced] = useDebounceValue(player.name || '', 250)

  useEffect(()=>{
    _setName(player.name)
    _setAlias(player.alias)
  }, [player])

  /** parse value as `<first> "<alias>" <last>` */
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
    if (player) db.players.update(player.id as number, {name, alias})
  }

  // format name as `<first> "<alias>" <last>`
  const parts = name.split(' ')
  const rest = parts.slice(1).join(' ')
  const value = alias ? `${parts[0]} "${alias}" ${rest}` : name

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
      <div className='w-full max-w-sm relative'>
        <Input className='pr-9' type='text' placeholder='Player name' value={value} onChange={e=>setValue(e.target.value)}/>
        <Button variant='ghost' size='icon' className='w-8 h-8 rounded-full absolute right-0.5 z-50 inset-y-0.5 text-slate-500 shrink-0 p-2' onClick={()=>showPlayerProfile(player.id)}>
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
      <PlayerNameAlertBadge empty={empty} duplicate={duplicate}/>
    </form>
  )
}
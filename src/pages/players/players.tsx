import PageContainer from '@/components/page-container'
import PageTitle from '@/components/page-title'
import Switch from '@/components/switch'
import { Toggle } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import db, { Player } from '@/db'
import PlayerInput from './player-input'
import AddPlayerInput from './add-player-input'
import useFuzzySearch from '@/hooks/useFuzzySearch'
import { Button } from '@/components/ui/button'
import { ResetIcon } from '@radix-ui/react-icons'
import { Badge } from '@/components/ui/badge'
import  Fuse from 'fuse.js'
import SearchInput from '@/components/search-input'
import { usePlayers } from '@/contexts/players-context'
import PageContent from '@/components/page-content'
import { PlayerProfileSheet } from './player-profile-sheet'

export default function PlayersPage () {
  const [sort, setSort] = useState(0)
  const sorting = sort != 0
  const clickSort = () => setSort((sort+2)%3-1) // rotate thru -1, 0, 1
  const [searchTerm, setSearchTerm, search] = useFuzzySearch(250)
  const searching = !!searchTerm.trim()
  const {hasPresentUndo, storePresentUndo, retrievePresentUndo} = usePlayers()

  const allPlayers = useLiveQuery(async () => {
    let players:Player[]|undefined
    if (sort && !searching) {
      players = await db.players.orderBy('name').toArray()
      if (sort == -1) players.reverse()
    } else {
      players = await db.players.toArray()
    }
    return players
  }, [sort])

  const [players, score] = useMemo(()=>search(allPlayers || [], {keys: ['name']}), [allPlayers, search])
  const goodThreshold = 0.3
  const numPresent = allPlayers?.length ? allPlayers.reduce((n,p)=>{if (p.present) n++; return n}, 0) : 0
  const allPresent = allPlayers?.length ? numPresent == allPlayers.length : false
  const allAbsent = numPresent == 0
  const allShown = players.length == allPlayers?.length

  const toggleAllPresent = async () => {
    if (!allPresent && !allAbsent) {
      storePresentUndo(players)
    }
    players.forEach(x=>db.players.update(x.id as number, {present:!allPresent}))
  }
  const resetAllPresent = async () => {
    retrievePresentUndo().forEach(x=>db.players.update(x.id as number, {present:x.present}))
  }

  const showReset = (allPresent || allAbsent) && hasPresentUndo
  const isDuplicate = useCallback((s:string, self?:Player)=>{
    const results = (new Fuse(allPlayers||[], {keys:['name'], includeScore:true}).search(s) || []).filter(x=>x.item.id != self?.id)
    const topMatch = results.slice(0,1)[0]
    const score = topMatch?.score || Number.MAX_SAFE_INTEGER
    const exact = 1e-10
    const almost = 0.3
    const almostAndOne = 0.35
    const foundOne = results.length == 1
    if (score < exact) return true
    if (s.trim().length < 3) return false
    if (score < almost) return undefined
    if (score < almostAndOne && foundOne ) return undefined
    return false
  }, [allPlayers])

  return (<PageContainer>
    <PageTitle id='players-title' title='Players'>
      <p>Add player names to the tournament roster. They can be marked absent between seed or elimination matches.</p>
      <p>Players will be locked and cannot be removed if have been matched in a game. Locked players can be marked absent for future rounds.</p>
    </PageTitle>

    <PageContent>
      <div className='flex justify-center mb-1'>
        <SearchInput divClassName='sm:hidden' value={searchTerm} onValueChange={setSearchTerm}/>
      </div>
      <div className='w-full flex justify-between mb-2 space-x-2 items-center'>
        <div className='flex space-x-2 items-center'>
          <Switch disabled={!allShown} checked={allPresent} onCheckedChange={toggleAllPresent}>
            <span className='hidden sm:inline'>All Players Present</span>
            <span className='sm:hidden'>All&nbsp;Present</span>
          </Switch>
          {allPlayers?.length ? (
            <Badge className='ml-1 text-muted-foreground' variant='outline'>
              {numPresent != allPlayers?.length ? `${numPresent} of` : undefined} {allPlayers?.length}
            </Badge>) : undefined}
          {showReset ? <Button size='icon' variant='ghost' onClick={resetAllPresent}><ResetIcon/></Button> : undefined}
        </div>
        <div className='flex align-end items-center space-x-2'>
          <SearchInput divClassName='hidden sm:block' value={searchTerm} onValueChange={setSearchTerm}/>
          <Toggle className={cn('px-2 py-2 h-9 w-9', {'text-slate-500':!sorting})} pressed={sorting&&!searching} onClick={clickSort} disabled={searching}>{(sort!=-1) ? <ArrowDownAZ strokeWidth={1}/> : <ArrowUpAZ strokeWidth={1}/>}</Toggle>
        </div>
      </div>
      {searching ? (<div className='text-xs my-2 text-muted-foreground w-full text-center'>
        {players.length == 0 ? <>No matches found.</> : undefined}
        {score > goodThreshold ? <>No close matches found.</>: <>Showing top {players.length} matches.</>}
      </div>) : undefined }
      {players.map(p=><PlayerInput key={p.id} player={p} isDuplicate={isDuplicate}/>)}
      <AddPlayerInput isDuplicate={isDuplicate}/>
    </PageContent>
    <PlayerProfileSheet/>
  </PageContainer>)
}
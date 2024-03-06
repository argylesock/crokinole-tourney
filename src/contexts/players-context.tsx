import { Player } from "@/db"
import Fuse from "fuse.js"
import { ReactNode, createContext, useCallback, useContext, useMemo, useRef, useState } from "react"

interface PlayersContextState {
  players: Player[]
  nPlayers: number
  nPresent: number
  findPlayer: (id: number | undefined) => Player | undefined
  hasPresentUndo: boolean
  storePresentUndo: (players: Player[]) => void
  retrievePresentUndo: () => Player[]
  shownPlayerProfile: Player | undefined
  showPlayerProfile: (id: number | undefined) => void
  hidePlayerProfile: () => void
  isDuplicateName: (s:string, self?:Player) => boolean|undefined
  isDuplicateAlias: (s:string, self?:Player) => boolean|undefined
  allTags: string[]
}
export const PlayersContext = createContext<PlayersContextState>({
  players: [],
  nPlayers: 0,
  nPresent: 0,
  findPlayer: () => undefined,
  hasPresentUndo: false,
  storePresentUndo: () => {},
  retrievePresentUndo: () => [],
  shownPlayerProfile: undefined,
  showPlayerProfile: () => {},
  hidePlayerProfile: () => {},
  isDuplicateName: () => false,
  isDuplicateAlias: () => false,
  allTags: []
})

interface Props {
  players: Player[]
  children: ReactNode
}
export const PlayersProvider = ({players=[], children}:Props) => {
  const nPlayers = players.length
  const nPresent = players.filter(p=>p.present).length
  const findPlayer = (id:number|undefined)=>id ? players?.find(p=>p.id == id) : undefined
  const resetAllPresentRef = useRef<Player[]>([])
  const [hasPresentUndo, setHasPresentUndo] = useState(false)
  const [shownPlayerProfile, setShownPlayerProfile] = useState<Player>()
  const showPlayerProfile = (id:number|undefined) => {
    const p = id === undefined ? undefined : findPlayer(id)
    setShownPlayerProfile(p)
  }
  const hidePlayerProfile = () => showPlayerProfile(undefined)

  const storePresentUndo = (players:Player[]) => {
    // deep copy
    resetAllPresentRef.current = [...(players.map(p=>({...p})))]
    setHasPresentUndo(!!players.length)
  }
  const retrievePresentUndo = () => {
    const players = resetAllPresentRef.current
    resetAllPresentRef.current = []
    setHasPresentUndo(false)
    return players
  }

  const isDuplicate = useCallback((s:string, key:('name'|'alias'), self?:Player)=>{
    const results = (new Fuse(players||[], {keys:[key], includeScore:true}).search(s) || []).filter(x=>x.item.id != self?.id)
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
  }, [players])
  const isDuplicateName = (s:string, self?:Player) => isDuplicate(s, 'name', self)
  const isDuplicateAlias = (s:string, self?:Player) => isDuplicate(s, 'alias', self)

  const allTags = useMemo(()=>{
    const tagSuggestions = ['Adult', 'Competitve', 'Junior', 'Rec']
    const allTags = new Set<string>(tagSuggestions)
    if (players) players.forEach(p=>{
      if (p.tags) p.tags.forEach(t=>allTags.add(t))
    })
    return [...allTags].sort()
  }, [players])

  const value = {
    players,
    nPlayers,
    nPresent,
    findPlayer,
    hasPresentUndo,
    storePresentUndo,
    retrievePresentUndo,
    shownPlayerProfile,
    showPlayerProfile,
    hidePlayerProfile,
    isDuplicateName,
    isDuplicateAlias,
    allTags,
  }

  return (
    <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePlayers = () => {
  return useContext(PlayersContext)
}
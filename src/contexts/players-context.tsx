import { Player } from "@/db"
import { ReactNode, createContext, useContext, useRef, useState } from "react"

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
  }

  return (
    <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePlayers = () => {
  return useContext(PlayersContext)
}
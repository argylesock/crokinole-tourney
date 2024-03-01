import { ReactNode, createContext, useContext, useState } from 'react'
import { PlayersProvider } from './players-context'
import { useLiveQuery } from 'dexie-react-hooks'
import db, { Game, Player } from '@/db'
import { calcElimRounds, calcSeedRounds } from '@/lib/calc-nrounds'

type TournamentContextState = {
  nGameRounds: number, setNGameRounds: (n:number)=>void, defaultNGameRounds:number,
  nSeedRounds: number, setNSeedRounds: (n:number)=>void, defaultNSeedRounds:number,
  nElimRounds: number, setNElimRounds: (n:number)=>void, defaultNElimRounds:number,
  players: Player[],
  games: Game[],
}

export const TournamentContext = createContext<TournamentContextState>({
  nGameRounds: 4, setNGameRounds: ()=>{}, defaultNGameRounds: 4,
  nSeedRounds: 4, setNSeedRounds: ()=>{}, defaultNSeedRounds: 4,
  nElimRounds: 4, setNElimRounds: ()=>{}, defaultNElimRounds: 4,
  players: [],
  games: [],
})

interface Props {
  children: ReactNode
}
export const TournamentProvider = ({children}:Props) => {
  const players = useLiveQuery(()=>db.players.toArray()) || []
  const games = useLiveQuery(()=>db.games.toArray()) || []
  const nPresent = players.reduce((s,p)=>s+(p?.present ? 1 : 0), 0)
  const defaultNSeedRounds = calcSeedRounds(nPresent)
  const defaultNElimRounds = calcElimRounds(nPresent)
  const defaultNGameRounds = 4
  const [nGameRounds, setNGameRounds] = useState(defaultNGameRounds)
  const [nSeedRounds, setNSeedRounds] = useState(defaultNSeedRounds)
  const [nElimRounds, setNElimRounds] = useState(defaultNElimRounds)
  const value = {
    nGameRounds, setNGameRounds, defaultNGameRounds,
    nSeedRounds, setNSeedRounds, defaultNSeedRounds,
    nElimRounds, setNElimRounds, defaultNElimRounds,
    players,
    games,
  }
  return (
    <TournamentContext.Provider value={value}>
    <PlayersProvider players={players}>
      {children}
    </PlayersProvider>
    </TournamentContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTournament = () => {
  return useContext(TournamentContext)
}
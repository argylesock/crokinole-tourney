import { createContext } from 'react'

interface Def {
  seedrounds: number
  setSeedrounds: React.Dispatch<React.SetStateAction<number>>
  log2elimplayers: number
  setLog2elimplayers: React.Dispatch<React.SetStateAction<number>>
}

/**
 * Matches settings in a context so they are lost when navigating
 */
const MatchesContext = createContext<Def>({
  seedrounds: 4,
  setSeedrounds: (n:React.SetStateAction<number>)=>{n},
  log2elimplayers: 3,
  setLog2elimplayers: (n:React.SetStateAction<number>)=>{n},
})

export default MatchesContext
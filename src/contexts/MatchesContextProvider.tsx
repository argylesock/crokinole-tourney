import { ReactNode, useState } from 'react'
import MatchesContext from './MatchesContext'

interface Props {
  children: ReactNode
}
const MatchesContextProvider = ({children}:Props) => {
  const [nseedrounds, setNseedrounds] = useState(4)
  const [log2elimplayers, setLog2elimplayers] = useState(3) // log2(3) == 8 players
  return (
    <MatchesContext.Provider value={{
      seedrounds: nseedrounds,
      setSeedrounds: setNseedrounds,
      log2elimplayers,
      setLog2elimplayers,
    }}>{children}</MatchesContext.Provider>
  )
}

export default MatchesContextProvider
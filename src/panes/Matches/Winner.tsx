import { Player } from "../../db"
import './Winner.css'

interface Props {
  player: Player | undefined
}
const Winner = ({player}:Props) => {
  return (
    <div className='winner-wrapper'>
      <div className={`winner${player ? '' : ' empty'}`}>{player?.name}</div>
    </div>
  )
}
export default Winner
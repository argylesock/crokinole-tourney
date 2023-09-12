import ResetTournamentCard from "./ResetTournamentCard"
import AddPlayersCard from "./AddPlayersCard"
import SaveAndReloadCard from "./SaveAndReloadCard"
import { useLiveQuery } from "dexie-react-hooks"
import db from "../../db"

const Settings = () => {
  const anyData = useLiveQuery(async()=>{
    return await db.anyData()
  })

  return (
    <div className='d-flex mt-4 gap-4 flex-column'>
      <SaveAndReloadCard anyData={anyData}/>
      <AddPlayersCard/>
      <ResetTournamentCard anyData={anyData}/>
    </div>
  )
}
export default Settings
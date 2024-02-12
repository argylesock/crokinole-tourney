import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import SaveAndRestoreCard from "./save-and-restore-card";
import { useLiveQuery } from "dexie-react-hooks";
import db from "@/db";
import ResetTournamentCard from "./reset-tournament-card";
import DemoTournamentCard from "./demo-tournament-card";
import PageContent from "@/components/page-content";

export default function SettingsPage () {
  const anyData = useLiveQuery(async()=>await db.anyData())
  const anyGames = useLiveQuery(async()=>(await db.games.count()) > 0)

  return (<PageContainer>
    <PageTitle id='settings-page' title='Settings'>
      <p>Your tournament data will only be stored on your local device.
        You can export and restore your tournament data to a json file.</p>
    </PageTitle>

    <PageContent className='grid gap-2'>
      <SaveAndRestoreCard anyData={anyData}/>
      <DemoTournamentCard anyGames={anyGames}/>
      <ResetTournamentCard anyData={anyData}/>
    </PageContent>
  </PageContainer>)
}
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import demoTournament from '@/lib/demo-tournament'
import WorkingButton from '@/components/working-button'
import { usePlayers } from '@/contexts/players-context'
import { useTournament } from '@/contexts/tournament-context'

interface Props {
  anyGames?: boolean
}
const DemoTournamentCard = ({anyGames}:Props) => {
  const [working, setWorking] = useState(false)
  const {nPresent} = usePlayers()
  const {setNSeedRounds, setNElimRounds} = useTournament()

  const createDemo = async () => {
    setWorking(true)
    const {nSeedRounds, nElimRounds} = await demoTournament()
    .finally(()=>setTimeout(()=>setWorking(false), 750))
    setNSeedRounds(nSeedRounds)
    setNElimRounds(nElimRounds)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demo Tournament</CardTitle>
        <CardDescription>
          If you have no tournament data, you can generate
          a random tournament with scores for all the rounds
          except the final.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WorkingButton variant='secondary' working={working} onClick={createDemo} className="text-nowrap" disabled={anyGames || nPresent == 1}>Create Demo Tournament</WorkingButton>
        <CardDescription>
          {anyGames ? 
            <span className="text-md italic">Reset the current tournament to create a demo tournament.</span>
          : nPresent > 1 ?  <span className="text-md italic">Tournament will use {nPresent} present players.</span>
          : nPresent == 1 ?  <span className="text-md italic">There is only {nPresent} player present.</span>
          : undefined }
        </CardDescription>
      </CardContent>
    </Card>
  )
}
export default DemoTournamentCard
import db from '../../db/db'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  anyData?: boolean
}
const ResetTournamentCard = ({anyData}:Props) => {
  const [keepPlayers, setKeepPlayers] = useState<boolean|'indeterminate'>(true)
  const resetTourney = async () => await db.reset(keepPlayers == true)

  const destructive = "transition-colors bg-destructive text-destructive-foreground hover:bg-destructive/90"
  anyData=true

  return (
    <Card className="text-sm border-destructive/50 dark:border-destructive [&>svg]:text-destructive">
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
        <CardDescription>
          <i>Warning!</i> Resetting the tournament will remove all
          player names, game match-ups, scores, and ranking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="text-nowrap" disabled={!anyData} variant="destructive">{anyData?"Reset Tournament":"No Tournament Data"}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Resetting the tournament will remove
                all {keepPlayers ? '' : 'player names,'} games,
                scores, and rakings.
              </AlertDialogDescription>
            </AlertDialogHeader>
              <div className="flex items-center space-x-2">
                <Checkbox id='keep-players' checked={keepPlayers} onCheckedChange={c=>setKeepPlayers(c)}/>
                <label htmlFor="keep-players" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Keep player names
                </label>
              </div>
            <AlertDialogFooter className='gap-2 sm:gap-0'>
              <AlertDialogAction className={destructive} onClick={resetTourney}>Yes, Reset It</AlertDialogAction>
              <AlertDialogCancel>No, Keep It</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
export default ResetTournamentCard
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { calcSeedRounds } from "@/lib/calc-nrounds"

interface Props {
  nPresent: number
}
export const NotEnoughSeedRoundsAlert = ({nPresent}:Props) => {
  const recommended = calcSeedRounds(nPresent)
  return (
    <Alert className='text-left max-w-80 sm:max-w-md sm:w-md mb-4'>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        There are not enough seed rounds to rank {nPresent} players
        completely.
      <AlertDescription className='mt-1'>
        {recommended} seed rounds are recommended.
      </AlertDescription>
      </AlertDescription>
    </Alert>
  )
}
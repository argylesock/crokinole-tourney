import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Props {
  isStartElim?: boolean
}
export const UnscoredGamesAlert = ({isStartElim}:Props) => {
  return (
    <Alert className='text-left max-w-80 sm:max-w-md sm:w-md mb-4'>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        There are unscored games in the last {isStartElim ? 'seed' : undefined } round.
      </AlertDescription>
    </Alert>
  )
}
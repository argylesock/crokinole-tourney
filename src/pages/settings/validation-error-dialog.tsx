import { AlertDialogAction, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog"

interface Props {
  show: boolean
  onHide: ()=>void
  details?: string
}
const ValidationErrorModal = ({show, onHide, details}:Props) => {
  return (
    <AlertDialog open={show} onOpenChange={onHide}>
      <AlertDialogContent>
        <AlertDialogTitle>
          The chosen file could not be restored.
        </AlertDialogTitle>
        {details ? <>
          <AlertDialogDescription>See details below.</AlertDialogDescription>
          <pre className='text-wrap'>{details}</pre>
        </> : undefined}
        <AlertDialogFooter>
          <AlertDialogAction onClick={onHide}>Ok, I'll try another file</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default ValidationErrorModal
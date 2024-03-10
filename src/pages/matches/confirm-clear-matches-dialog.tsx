import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface Props {
  show: boolean
  onHide: ()=>void
  onConfirm: ()=>void
}
export default function ConfirmClearMatchesDialog ({show, onHide, onConfirm}:Props) {
  const destructive = "transition-colors bg-destructive text-destructive-foreground hover:bg-destructive/90"
  return (
    <AlertDialog open={show} onOpenChange={onHide}>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          If you clear matches you will loose any scores entered this round.
        </AlertDialogDescription>
        <AlertDialogFooter className='gap-1 sm:gap-0'>
          <AlertDialogAction className={destructive} onClick={onConfirm}>Yes, Clear Matches</AlertDialogAction>
          <AlertDialogCancel onClick={onHide}>No, Keep Matches</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
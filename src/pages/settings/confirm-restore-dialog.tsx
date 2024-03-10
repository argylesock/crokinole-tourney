import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from "@/components/ui/alert-dialog"

interface Props {
  show: boolean
  onHide: ()=>void
  onConfirm: ()=>void
}
export default function ConfirmRestoreDialog ({show, onHide, onConfirm}:Props) {
  const destructive = "transition-colors bg-destructive text-destructive-foreground hover:bg-destructive/90"
  return (
    <AlertDialog open={show} onOpenChange={onHide}>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          Restoring a previously saved tournament will replace the current one.
          All current player names, games, scores, and rankings will be lost.
        </AlertDialogDescription>
        <AlertDialogFooter className='gap-1 sm:gap-0'>
          <AlertDialogAction className={destructive} onClick={onConfirm}>Yes, Replace It</AlertDialogAction>
          <AlertDialogCancel onClick={onHide}>No, Keep It</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
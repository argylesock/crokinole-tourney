import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { usePlayers } from "@/contexts/players-context"
import db from "@/db"
import { TagInput } from "../../components/tag-input"
import { InputDescription } from "@/components/input-description"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import { formatNameAlias, parseNameAlias } from "./name-alias"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { closeMatchAliasWarning, closeMatchNameWarning, duplicateAliasError, duplicateNameError } from "./text-strings"


export function PlayerProfileSheet() {
  const {shownPlayerProfile:player, hidePlayerProfile, isDuplicateName, isDuplicateAlias, allTags} = usePlayers()
  const [name, setName] = useState(player?.name || '')
  const [alias, setAlias] = useState(player?.name || '')
  const [tags, setTags] = useState(player?.tags || [])
  const [showConfirmClose, setShowConfirmClose] = useState(false)

  useEffect(()=>{
    setName(player?.name || '')
    setAlias(player?.alias|| '')
    setTags(player?.tags || [])
  },[player])

  const saveChanges = () => {
    if (!player) return
    db.players.update(player, {name, alias, tags})
  }

  const duplicateName = useMemo(()=>isDuplicateName(name||'', player),[name,player,isDuplicateName])
  const invalidName = useMemo(()=>{
    const {alias:a} = parseNameAlias(name)
    return !!a
  }, [name])

  const duplicateAlias = useMemo(()=>isDuplicateAlias(alias||'', player),[alias,player,isDuplicateAlias])
  const invalidAlias = useMemo(()=>{
    const {alias:a} = parseNameAlias(formatNameAlias(name, alias))
    return !!a && a != alias
  }, [name, alias])

  const hasError = duplicateName || duplicateAlias || invalidName || invalidAlias

  const anyChanges = () => {
    if (player?.name && player?.name != name) {
      return true
    }
    if (player?.alias && player?.alias != alias) {
      return true
    }
    const a = player?.tags || []
    const b = tags
    if (a.length !== b.length || a.find((x, i)=>x !== b[i])) {
      return true
    }
    return false
  }
  const confirmClose = () => {
    if (anyChanges()) {
      setShowConfirmClose(true)
    } else {
      hidePlayerProfile()
    }
  }

  return (
    <Sheet open={player !== undefined} onOpenChange={confirmClose}>
      <SheetContent className='overflow-y-auto'>
        <SheetHeader className='text-left'>
          <SheetTitle>Edit Player Details</SheetTitle>
          <SheetDescription>
            Make changes to player details here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col space-y-2 mt-4'>
          <Label htmlFor="player-name">
            Player Name
          </Label>
          <Input
            id="player-name" danger={invalidName || duplicateName} warning={duplicateName === undefined}
            value={name} onChange={e=>setName(e.target.value)}
          />
          <InputDescription danger={invalidName || duplicateName} warning={duplicateName === undefined}>
            {
              invalidName ? 'Cannot contain an alias'
              : duplicateName === true ? duplicateNameError
              : duplicateName === undefined ? closeMatchNameWarning
              : undefined
            }
          </InputDescription>
        </div>
        <div className='flex flex-col space-y-2 mt-4'>
          <Label htmlFor="alias">
            Alias
          </Label>
          <Input
            id="alias" danger={invalidAlias || duplicateAlias} warning={duplicateAlias === undefined}
            value={alias} onChange={e=>setAlias(e.target.value)}
          />
          <InputDescription danger={invalidAlias || duplicateAlias} warning={duplicateAlias === undefined}>
            {
              invalidAlias ? 'Cannot contain quotes'
              : duplicateAlias === true ? duplicateAliasError
              : duplicateAlias === undefined ? closeMatchAliasWarning
              : 'The alias is shown instead of the player name'
            }
          </InputDescription>
        </div>
        <div className='flex flex-col space-y-2 mt-4'>
          <Label htmlFor="tags">
            Tags
          </Label>
          <TagInput id="tags"
            placeholder="Enter a tag name"
            enableAutocomplete
            autocompleteOptions={allTags}
            tags={tags}
            setTags={(tags)=>setTags(tags as string[])}
          />
        </div>
        <SheetFooter className='mt-4'>
          <SheetClose asChild>
            <Button disabled={hasError} onClick={saveChanges}>Save Changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>

      <AlertDialog open={showConfirmClose} onOpenChange={()=>setShowConfirmClose(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. If you leave this panel your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Leave it open</AlertDialogCancel>
            <AlertDialogAction onClick={hidePlayerProfile}>Yes, Close it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  )
}
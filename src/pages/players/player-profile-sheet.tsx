import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { usePlayers } from "@/contexts/players-context"
import db from "@/db"
import { TagInput } from "../../components/tag-input"

const availableTags = ['adult', 'junior', 'competitive', 'rec']
const exclusiveTags = [
  ['adult', 'junior'],
  ['competitive', 'rec']
]

export function PlayerProfileSheet() {
  const {shownPlayerProfile:player, hidePlayerProfile} = usePlayers()

  const changeName = (name:string) => {
    if (!player) return
    db.players.update(player, {name})
  }

  const changeAlias = (alias:string|undefined) => {
    if (!player) return
    if (!alias?.trim()) alias = ''
    db.players.update(player, {alias})
  }

  const changeTags = (tags:string[]) => {
    if (!player) return
    exclusiveTags.forEach(e=>{
      const idxToRemove = tags.map((t,i)=>e.indexOf(t) >=0 ? i : -1).filter(i=>i>=0).slice(0,-1)
      idxToRemove.forEach(idx=>tags.splice(idx,1))
    })
    db.players.update(player, {tags: tags.length ? tags : undefined})
  }

  return (
    <Sheet open={player !== undefined} onOpenChange={hidePlayerProfile}>
      <SheetContent>
        <SheetHeader className='text-left'>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to user details here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col space-y-2 mt-2'>
            <Label htmlFor="player-name">
              Player Name
            </Label>
            <Input id="player-name"
              value={player?.name} onChange={e=>changeName(e.target.value)}
            />
            <Label htmlFor="alias">
              Alias
            </Label>
            <Input id="alias"
              value={player?.alias} onChange={e=>changeAlias(e.target.value)}
            />
            <p className="text-[0.8rem] text-muted-foreground">This will be shown instead of the player name everwhere but the Players page.</p>
            <Label htmlFor="tags">
              Tags
            </Label>
            <TagInput id="tags"
              textCase={'lowercase'}
              enableAutocomplete
              autocompleteOptions={availableTags}
              tags={player?.tags || []}
              setTags={(tags)=>changeTags(tags as string[])}
            />
        </div>
      </SheetContent>
    </Sheet>
  )
}
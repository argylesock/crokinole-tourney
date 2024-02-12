import db from '@/db'
import { FormEvent, useContext, useState } from 'react'
import ConfirmRestoreModal from './confirm-restore-dialog'
import ValidationErrorModal from './validation-error-dialog'
import validateRestore from '@/lib/validate-restore'
import WorkingButton from '@/components/working-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PlayersContext } from '@/contexts/players-context'

interface Props {
  anyData?: boolean
}
const SaveAndRestoreCard = ({anyData}:Props) => {
  const [saving, setSaving] = useState(false)
  const [saveAsFilename, setSaveAsFilename] = useState('crokinole-tourney.json')
  const [restoring, setRestoring] = useState(false)
  const [restoreFile, setRestoreFile] = useState<Blob>()
  const [showConfirmRestore, setShowConfirmRestore] = useState(false)
  const [validationError, setValidationError] = useState<string>()
  const { nPlayers } = useContext(PlayersContext)

  const onSaveAs = async (e:FormEvent) => {
    e.preventDefault()
    if (!anyData) return
    setSaving(true)
    setTimeout(()=>setSaving(false), 1000)
    const link = document.createElement('a')
    const allData = await db.allData()
    link.href = window.URL.createObjectURL(new Blob([JSON.stringify(allData, null, 2)]))
    link.setAttribute('download', saveAsFilename)
    document.body.appendChild(link)
    link.click()
  }

  const restore = () => {
    if (!restoreFile) return
    setShowConfirmRestore(false)
    setRestoring(true)
    setTimeout(()=>setRestoring(false), 1000)

    const reader = new FileReader()
    reader.onload = (event:ProgressEvent<FileReader>) => {
      try {
        const obj = JSON.parse(event.target?.result as string)
        validateRestore(obj)
        db.replace(obj)
      } catch (e) {
        setValidationError(e?.toString())
      }
    }
    reader.readAsText(restoreFile)
  }

  const onRestore = async (e:FormEvent) => {
    e.preventDefault()
    if (restoreFile == undefined) return
    if (anyData) setShowConfirmRestore(true)
    else restore()
  }

  const onRestoreFileSelected = (e:React.ChangeEvent) => {
    const el = (e.target as HTMLInputElement)
    if (!el.files) return
    setRestoreFile(el.files[0])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Save and Restore</CardTitle>
        <CardDescription>
          All data is stored locally and is never uploaded to a server.
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSaveAs}>
        <CardContent className='d-flex flex-column flex-lg-row gap-3 flex-wrap justify-content-lg-stretch'>
          <div className="grid w-full items-center gap-2 sm:flex sm:items-end">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="save-as">Save As</Label>
              <Input id='save-as' className='sm:w-96' disabled={!nPlayers} value={saveAsFilename} onChange={(e)=>setSaveAsFilename(e.target.value)}/>
            </div>
            <WorkingButton variant='secondary' disabled={!nPlayers} working={saving} type='submit'>Save</WorkingButton>
          </div>
          {nPlayers ? undefined :
            <CardDescription className='italic'>
              There is no tournament data to save.
            </CardDescription>
          }
        </CardContent>
        <CardContent className="flex justify-end">
        </CardContent>
      </form>

      <form onSubmit={onRestore}>
        <CardContent className='d-flex flex-column flex-lg-row gap-3 flex-wrap justify-content-lg-stretch'>
          <div className="grid w-full items-center gap-2 sm:flex sm:items-end">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="restore-from">Restore From</Label>
              <Input id='restore-from' className='sm:w-96' type="file" onChange={onRestoreFileSelected}/>
            </div>
            <WorkingButton variant='secondary' disabled={!restoreFile} working={restoring} type='submit'>Restore</WorkingButton>
          </div>
        </CardContent>
      </form>

      <ConfirmRestoreModal
        show={showConfirmRestore}
        onHide={()=>setShowConfirmRestore(false)}
        onConfirm={restore}
      />
      <ValidationErrorModal
        show={!!validationError}
        onHide={()=>setValidationError(undefined)}
        details={validationError}
      />
    </Card>
  )
}

export default SaveAndRestoreCard
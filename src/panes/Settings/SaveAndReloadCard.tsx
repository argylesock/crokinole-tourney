import { Card, Form, InputGroup } from "react-bootstrap"
import db from "../../db"
import { FormEvent, useState } from "react"
import WorkingButton from "../../components/WorkingButton"
import ConfirmRestoreModal from "./ConfirmRestoreModal"
import validateRestore from "./validateRestore"
import ValidationErrorModal from "./ValidationErrorModal"
import NothingToSaveModal from "./NothingToSaveModal"

interface Props {
  anyData?: boolean
}
const SaveAndReloadCard = ({anyData}:Props) => {
  const [saving, setSaving] = useState(false)
  const [saveAsFilename, setSaveAsFilename] = useState('crokinole-tourney.json')
  const [restoring, setRestoring] = useState(false)
  const [restoreFile, setRestoreFile] = useState<Blob>()
  const [showConfirmRestore, setShowConfirmRestore] = useState(false)
  const [validationError, setValidationError] = useState<string>()
  const [showNoData, setShowNoData] = useState(false)

  const onSaveAs = async (e:FormEvent) => {
    e.preventDefault()
    if (!anyData) {
      setShowNoData(true)
      return
    }
    setSaving(true)
    setTimeout(()=>setSaving(false), 1000)
    const link = document.createElement('a')
    const players = await db.players.toArray()
    const games = await db.games.toArray()
    link.href = window.URL.createObjectURL(new Blob([JSON.stringify({players, games},null,2)]))
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
    <Card className='text-center'>
      <Card.Header>
        Save and Restore
        <div style={{color:'var(--bs-gray)', fontSize:'smaller', fontStyle:'italic'}}>
          All data is stored locally and is never uploaded to a server.
        </div>
      </Card.Header>
      <Card.Body className='d-flex flex-column flex-lg-row gap-3 flex-wrap justify-content-lg-stretch'>
          <Form onSubmit={onSaveAs} className='flex-lg-grow-1'>
            <InputGroup>
              <InputGroup.Text>Save As</InputGroup.Text>
              <Form.Control
                placeholder="Filename"
                value={saveAsFilename} onChange={(e)=>setSaveAsFilename(e.target.value)}
                aria-label="filename"
                aria-describedby="basic-addon"
              />
              <WorkingButton working={saving} type='submit' id="button-addon">
                Save
              </WorkingButton>
            </InputGroup>
          </Form>
          <Form onSubmit={onRestore} className='flex-lg-grow-1'>
            <InputGroup>
              <Form.Control type="file" onChange={onRestoreFileSelected}/>
              <WorkingButton working={restoring} type='submit' id="button-addon">
                Restore
              </WorkingButton>
            </InputGroup>
          </Form>
      </Card.Body>
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
      <NothingToSaveModal
        show={showNoData}
        onHide={()=>setShowNoData(false)}
      />
    </Card>
  )
}

export default SaveAndReloadCard
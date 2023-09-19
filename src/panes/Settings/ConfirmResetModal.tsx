import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Form, Modal } from "react-bootstrap"

interface Props {
  show: boolean
  onHide: ()=>void
  keepPlayers: boolean
  setKeepPlayers: (x:boolean)=>void
  onConfirm: ()=>void
}
const ConfirmResetModal = ({show,onHide,keepPlayers,setKeepPlayers,onConfirm}:Props) => {
  return (
    <Modal
    show={show}
    onHide={onHide}
  >
    <Modal.Body>
      <div className='text-center mb-2'><FontAwesomeIcon color='var(--bs-warning)' size='5x' icon={faTriangleExclamation}/></div>
      Do you want to reset the tournament — removing all
      {keepPlayers?'':' player names, '} games, scores, and rankings?
    </Modal.Body>
    <Modal.Body>
      <Form.Check
        type='checkbox'
        checked={keepPlayers}
        onChange={()=>setKeepPlayers(!keepPlayers)}
        label='Keep player names'
        id={'keep-players'}
      />
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onConfirm}>Yes, Reset It</Button>
      <Button variant='dark' onClick={onHide}>No, Keep It</Button>
    </Modal.Footer>

  </Modal>
  )
}
export default ConfirmResetModal
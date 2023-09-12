import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Modal } from "react-bootstrap"

interface Props {
  show: boolean
  onHide: ()=>void
  onConfirm: ()=>void
}
const ConfirmRestoreModal = ({show,onHide,onConfirm}:Props) => {
  return (
    <Modal
    show={show}
    onHide={onHide}
  >
    <Modal.Body>
      <div className='text-center mb-2'><FontAwesomeIcon color='var(--bs-gray)' size='5x' icon={faQuestionCircle}/></div>
      Do you want to restore a previously saved tournament, replacing the current one? All current
      player names, games, scores, and rankings will be lost.
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onConfirm}>Yes, Replace It</Button>
      <Button variant='dark' onClick={onHide}>No, Keep It</Button>
    </Modal.Footer>
  </Modal>
  )
}
export default ConfirmRestoreModal
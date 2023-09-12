import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Modal } from "react-bootstrap"

interface Props {
  show: boolean
  onHide: ()=>void
  details?: string
}
const NothingToSaveModal = ({show,onHide}:Props) => {
  return (
    <Modal
    show={show}
    onHide={onHide}
  >
    <Modal.Body className='text-center'>
      <div className='pb-2'><FontAwesomeIcon color='var(--bs-red)' size='5x' icon={faExclamationCircle}/></div>
      There is no tournament data to save.<br/>Enter some players and try again.
    </Modal.Body>
    <Modal.Footer>
      <Button variant='dark' onClick={onHide}>Ok, I get it</Button>
    </Modal.Footer>

  </Modal>
  )
}
export default NothingToSaveModal
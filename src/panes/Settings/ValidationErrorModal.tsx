import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Modal } from "react-bootstrap"

interface Props {
  show: boolean
  onHide: ()=>void
  details?: string
}
const ValidationErrorModal = ({show,onHide,details}:Props) => {
  return (
    <Modal
    show={show}
    onHide={onHide}
  >
    <Modal.Body className='text-center'>
      <div className='pb-2'><FontAwesomeIcon color='var(--bs-red)' size='5x' icon={faExclamationCircle}/></div>
      The chosen file could not be restored. See details below.
    </Modal.Body>
    {!details ? undefined :
      <Modal.Body>
        <pre className='text-wrap'>{details}</pre>
      </Modal.Body>
    }
    <Modal.Footer>
      <Button variant='dark' onClick={onHide}>Ok, I'll try another file</Button>
    </Modal.Footer>

  </Modal>
  )
}
export default ValidationErrorModal
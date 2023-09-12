import { faAward, faClipboardCheck, faClipboardQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Modal } from "react-bootstrap"
import { Player, Game } from "../../db"
import { useState } from "react"
import './GameControl.css'

interface Props {
  g?:Game
  p1:Player|undefined
  p2:Player|undefined
}
const GameControl = ({p1, p2}:Props) => {
  const [modalShow, setModalShow] = useState(false)
  const scoreEntered = false
  const scoreDisabled = !p1 && !p2
  const variant = scoreEntered ? 'success' : 'outline-secondary'
  const icon = scoreEntered ? faClipboardCheck : faClipboardQuestion

  const p1name = p1 ? p1.name : ''
  const p2name = p2 ? p2.name : ''

  const p1winner = false
  const p2winner = false

  return (
    <div className='game-control'>
      <div>
        <div>
          <div className={`p1${p1winner?' p1-winner':''}`}>{p1name} {p1winner ? <FontAwesomeIcon color="orange" icon={faAward}/>:''}</div>
        </div>
        <div>
          <div className={`p2${p2winner?' p2-winner':''}`}>{p2name} {p2winner ? <FontAwesomeIcon color="orange" icon={faAward}/>:''}</div>
        </div>
      </div>
      <Button variant={variant} size='sm' className='round' disabled={scoreDisabled}>
        <FontAwesomeIcon icon={icon} size="xl"/>
      </Button>
      <Modal
        show={modalShow}
        onHide={()=>setModalShow(false)}
      >
        <Modal.Header>{p1name} v. {p2name}</Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal>
    </div>
  )
}
export default GameControl
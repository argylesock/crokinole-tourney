import { Button, Card } from "react-bootstrap";
import db from "../../db";
import ConfirmResetModal from "./ConfirmResetModal";
import { useState } from "react";

interface Props {
  anyData?: boolean
}
const ResetTournamentCard = ({anyData}:Props) => {
  const [showConfirmReset, _setModalShow] = useState(false);
  const [keepPlayers, setKeepPlayers] = useState(false);
  const setShowConfirmReset = (v:boolean) => {
    _setModalShow(v)
  }

  const resetTourney = async ()=>{
    await db.reset(keepPlayers)
    setShowConfirmReset(false)
  }

  return (
    <Card className='text-center' border='danger'>
      <Card.Header>Danger Zone</Card.Header>
      <Card.Body>
        <Card.Text className='text-start d-flex gap-4 align-items-center'>
          <span>
            <Button className='text-nowrap' disabled={!anyData} variant='danger' onClick={()=>setShowConfirmReset(true)}>{anyData?'Reset Tournament':'No Tournament Data'}</Button>
          </span>
          <span>
            <i>Warning!</i> Resetting the tournament will remove all
            player names, game match-ups, scores, and ranking.
          </span>
        </Card.Text>
      </Card.Body>
      <ConfirmResetModal
        show={showConfirmReset}
        onHide={()=>setShowConfirmReset(false)}
        keepPlayers={keepPlayers}
        setKeepPlayers={setKeepPlayers}
        onConfirm={resetTourney}
      />
    </Card>
  )
}
export default ResetTournamentCard
import { useLiveQuery } from "dexie-react-hooks"
import { Card, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import db, { Game } from "../../db"
import { ReactNode, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faClipboardCheck, faClipboardList, faClipboardQuestion, faClipboardUser, faTrophy } from "@fortawesome/free-solid-svg-icons"
import './GetStarted.css'
import WorkingButton from "../../components/WorkingButton"
import { sequence } from "../../utils"
import addRandomPlayers from "../../utils/addRandomPlayers"
import seedGames from "../../utils/seedGames"
import elimGames from "../../utils/elimGames"


interface StepProps {
  done?: boolean
  icon: IconProp
  doneIcon?: IconProp
  iconColor?: string
  doneIconColor?: string
  children: ReactNode
}
const Step = ({done, icon, doneIcon, iconColor='var(--bs-gray-400)', doneIconColor='var(--bs-success)', children}:StepProps) => {
  return (<div className='d-flex m-1 align-items-center'>
    <FontAwesomeIcon style={{minWidth:'1.5em'}} size='2x' icon={done!=true?icon:doneIcon||icon} color={done?doneIconColor:iconColor}/> {done==true?<del>{children}</del>:<span>{children}</span>}
  </div>)
}

const GetStarted = () => {
  const [working, setWorking] = useState(false)

  const data = useLiveQuery(async () => {
    const players = await db.players.toArray()
    const games = await db.games.toArray()
    const unscored = (x:Game)=>x.p1points == undefined || x.p2points == undefined

    const elimzero = games.filter(x=>x.stage == 'elim' && x.round == 0)
    const nelimrounds = Math.floor(Math.log2(elimzero.length))
    const seedzero = games.filter(x=>x.stage == 'seed' && x.round == 0)
    const prefinals = games.filter(x=>x.stage == 'elim' && x.round == nelimrounds-1)
    const final = games.find(x=>x.stage == 'elim' && x.round == nelimrounds)
    return {
      anyplayers: players.length > 0,
      anypresent: players.find(x=>!!x.present) != undefined,
      seedzerodone: seedzero.length > 0 && seedzero.find(unscored) == undefined,
      semifinaldone: prefinals.length > 0 && prefinals.find(unscored) == undefined,
      finaldone: final != undefined && !unscored(final)
    }
  })
  const {anyplayers=false, anypresent=false, seedzerodone=false, semifinaldone=false, finaldone=false} = data || {};
  if (!data) return <Spinner/>

  const demoTournament = async () => {
    setWorking(true)
    setTimeout(()=>setWorking(false),1000)
    // add 20 random players and
    // mark 5 as not present (there will be one bye)
    addRandomPlayers(20, 5)
    .then(()=>sequence(4).forEach(round=>{
      // create and score 4 seed rounds
      seedGames(round, {randomScores:true})
    }))
    .then(()=>sequence(3).forEach(round=>{
      const nplayers = Math.pow(2,3-round) // 8,4,2
      elimGames(round, nplayers, {randomScores:nplayers>2})
    }))
  }

  return (
  <div className='get-started'>
    <h1 className='w-100 text-center mt-3 mb-3'>Welcome to <b>Crokinole Tourney</b></h1>
    <div className='d-flex gap-3 flex-wrap justify-content-center'>
      <Card>
        <Card.Body>
            <div>
              Just 6 easy steps!
              <Step done={anyplayers} icon={faClipboardUser}>1. Add player names to the <Link to='/players'>Players</Link> tab.</Step>
              <Step done={anypresent} icon={faClipboardUser}>2. Register players as present on the <Link to='/players'>Players</Link> tab.</Step>
              <Step done={seedzerodone} icon={faClipboardQuestion} doneIcon={faClipboardCheck}>3. Score seed stage games on the <Link to='/matches'>Matches</Link> tab.</Step>
              <Step icon={faClipboardList}>4. View rankings of seed stage on the <Link to='/rankings'>Rankings</Link> tab.</Step>
              <Step done={semifinaldone} icon={faClipboardQuestion} doneIcon={faClipboardCheck}>5. Score elimination stage games on the <Link to='/matches'>Matches</Link> tab.</Step>
              <Step done={finaldone} icon={faTrophy} doneIconColor='var(--bs-orange)'>6. Score the final game!</Step>
            </div>
        </Card.Body>
      </Card>

      {anyplayers ? undefined :
      <Card>
        <Card.Body>
          <div className='text-center'>
            To see how it all works, use a <i>demo tournament</i> to
            add random players and game scores, then score the final game!<br/>
          </div>
          <div className='mt-3 text-center'>
            <WorkingButton working={working} onClick={demoTournament}>Demo Tournament</WorkingButton>
          </div>
        </Card.Body>
      </Card>}
    </div>
  </div>)
}
export default GetStarted
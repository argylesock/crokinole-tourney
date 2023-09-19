import { faAward, faClipboardCheck, faClipboardQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, FormControl, FormGroup, FormLabel, ListGroup, Modal } from "react-bootstrap"
import db, { Player, Game, GameRound } from "../../db"
import { useState } from "react"
import gameWinner from "../../utils/gameWinner"
import './GameControl.css'
import { sequence } from "../../utils"

interface Props {
  g:Game
  p1:Player|undefined
  p2:Player|undefined
}
const GameControl = ({g, p1, p2}:Props) => {
  const ngameRounds = 4
  const emptyName = g.stage == 'seed' ? 'bye' : ''
  const [modalShow, setModalShow] = useState(false)
  const scoreEntered = g?.p1points != undefined && g?.p2points != undefined
  const scoreDisabled = !p1 && !p2
  const variant = scoreEntered ? 'success' : 'outline-secondary'
  const icon = scoreEntered ? faClipboardCheck : faClipboardQuestion

  const p1name = p1?.name || emptyName
  const p2name = p2?.name || emptyName

  const w = g != undefined ? gameWinner(g) : undefined
  const p1winner = w !== undefined && w == p1?.id
  const p2winner = w !== undefined && w == p2?.id

  const saveGame = async (g:Game) => {
    g.p1points = totalPoints('p1')
    g.p2points = totalPoints('p2')
    if (g.p1points == 0 && g.p2points == 0) {
      g.p1points = g.p2points = undefined
    }
    if (g.id == undefined) {
      await db.games.add(g)
    } else {
      await db.games.update(g.id, g)
    }
  }

  const toggleGameRound = (p:'p1'|'p2', n:number) => {
    if (!g.gameRounds) g.gameRounds = Array(n)
    if (!g.gameRounds[n]) {
      g.gameRounds[n] = { p1points: 1, p2points: 1 }
    }
    const states = [
      { p1points: 0, p2points: 0 },
      { p1points: 2, p2points: 0 },
      { p1points: 0, p2points: 2 },
      { p1points: 1, p2points: 1 },
    ]
    const currState = g.gameRounds[n].p1points*10 + g.gameRounds[n].p2points
    let nextState = 0
    switch (`${p}-${currState}`) {
      case('p1-0'): nextState = 1; break
      case('p1-20'): nextState = 2; break
      case('p1-2'): nextState = 3; break
      case('p1-11'): nextState = 0; break

      case('p2-0'): nextState = 2; break
      case('p2-2'): nextState = 1; break
      case('p2-20'): nextState = 3; break
      case('p2-11'): nextState = 0; break
    }

    g.gameRounds[n] = states[nextState]
    saveGame(g)
  }
  const setP1twenties = (n:number) => {
    g.p1twenties = n
    saveGame(g)
  }
  const setP2twenties = (n:number) => {
    g.p2twenties = n
    saveGame(g)
  }
  const scoreFor = (p:'p1'|'p2', n:number) => {
    const gr = (g.gameRounds != undefined) ? g.gameRounds[n] : {} as GameRound
    let points:number, opponent:number
    switch (p) {
      case 'p1': points = gr?.p1points; opponent = gr?.p2points; break
      case 'p2': points = gr?.p2points; opponent = gr?.p1points; break
    }
    if (points == undefined) return undefined
    if (points == 0 && opponent == 0) return undefined
    return points
  }
  const scoreLabel = (p:'p1'|'p2', n:number) => {
    const s = scoreFor(p,n)
    if (s == undefined) return '?'
    return s
  }
  const variantFor = (p:'p1'|'p2', n:number) => {
    const gr = (g.gameRounds != undefined) ? g.gameRounds[n] : {} as GameRound
    let points:number, opponent:number
    switch (p) {
      case 'p1': points = gr?.p1points; opponent = gr?.p2points; break
      case 'p2': points = gr?.p2points; opponent = gr?.p1points; break
    }
    if (points > opponent) return 'success' // win
    if (points < opponent) return 'danger' // loss
    if (points == undefined || points == 0) return 'outline-secondary' // dnf
    return 'secondary' // draw
  }
  const totalPoints = (p:'p1'|'p2') => {
    return sequence(ngameRounds).reduce((points,n)=>{
      points += scoreFor(p, n) || 0
      return points
    }, 0)
  }

  return (
    <div className='game-control'>
      <div>
        <div>
          <div className={`p1${p1winner?' p1-winner':''} ${p1 == undefined ? 'bye' : ''}`}>{p1name} {p1winner ? <FontAwesomeIcon color="orange" icon={faAward}/>:''}</div>
        </div>
        <div>
          <div className={`p2${p2winner?' p2-winner':''} ${p2 == undefined ? 'bye' : ''}`}>{p2name} {p2winner ? <FontAwesomeIcon color="orange" icon={faAward}/>:''}</div>
        </div>
      </div>
      <Button variant={variant} size='sm' className='round' disabled={scoreDisabled} onClick={()=>setModalShow(true)}>
        <FontAwesomeIcon icon={icon} size="xl"/>
      </Button>
      <Modal
        size='lg'
        className='score-modal'
        show={modalShow}
        onHide={()=>setModalShow(false)}
      >
        <Modal.Header closeButton>{p1name} v. {p2name}</Modal.Header>
        <Modal.Body>
          <ListGroup>
            <ListGroup.Item>
              <div className='p1-score'>
                <div className={`name p1${p1winner?' p1-winner':''} ${p1 == undefined ? 'bye' : ''}`}>{p1name} {p1winner ? <FontAwesomeIcon color="orange" icon={faAward}/>:''}</div>
                {sequence(ngameRounds).map(n=>(
                  <div key={n} className='game'><Button variant={variantFor('p1',n)} onClick={()=>toggleGameRound('p1',n)}>{scoreLabel('p1',n)}</Button></div>
                ))}
                <div className='points'>
                  <FormGroup>
                    <FormLabel>PTS</FormLabel>
                    <FormControl readOnly value={totalPoints('p1')}/>
                  </FormGroup>
                </div>
                <div className='twenties'>
                  <FormGroup>
                    <FormLabel>20S</FormLabel>
                    <FormControl value={g.p1twenties}
                       type='number' pattern="[0-9]*"
                       onChange={e=>setP1twenties(Number.parseInt(e.target.value))}/>
                  </FormGroup>
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className='p2-score'>
                <div className={`name p2${p2winner?' p2-winner':''} ${p2 == undefined ? 'bye' : ''}`}>{p2name} {p2winner ? <FontAwesomeIcon color="orange" icon={faAward}/>:''}</div>
                {sequence(ngameRounds).map(n=>(
                  <div key={n} className='game'><Button variant={variantFor('p2',n)} onClick={()=>toggleGameRound('p2',n)}>{scoreLabel('p2',n)}</Button></div>
                ))}
                <div className='points'>
                  <FormGroup>
                    <FormLabel>PTS</FormLabel>
                    <FormControl readOnly value={totalPoints('p2')}/>
                  </FormGroup>
                </div>
                <div className='twenties'>
                  <FormGroup>
                    <FormLabel>20S</FormLabel>
                    <FormControl value={g.p2twenties}
                       type='number' pattern="[0-9]*"
                       onChange={e=>setP2twenties(Number.parseInt(e.target.value))}/>
                  </FormGroup>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default GameControl
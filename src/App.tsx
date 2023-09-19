import './App.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'

import { Nav } from 'react-bootstrap'
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import Home from './panes/Home'
import Players from './panes/Players'
import Matches from './panes/Matches'
import Rankings from './panes/Rankings'
import Settings from './panes/Settings'
import MatchesContextProvider from './contexts/MatchesContextProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

function AppTabs() {
  return (
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/"><FontAwesomeIcon icon={faHome}/></Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/players">Players</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/matches">Matches</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/rankings">Ranking</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/settings">Settings</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

function App() {
  // Note: uses HashRouter to be hosted using GitHub Pages
  return (<>
    <MatchesContextProvider>
    <HashRouter>
      <AppTabs/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/players" element={<Players/>}/>
        <Route path="/matches" element={<Matches/>}/>
        <Route path="/rankings" element={<Rankings/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </HashRouter>
    </MatchesContextProvider>
  </>)
}

export default App

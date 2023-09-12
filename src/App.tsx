import './App.css'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'

import { Nav } from 'react-bootstrap'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Players from './panes/Players/Players'
import Matches from './panes/Matches/Matches'
import Rankings from './panes/Rankings/Rankings'
import Settings from './panes/Settings/Settings'
import MatchesContextProvider from './contexts/MatchesContextProvider'

function AppTabs() {
  return (
    <Nav variant="tabs">
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
  return (<>
    <MatchesContextProvider>
    <BrowserRouter>
      <AppTabs/>
      <Routes>
        <Route path="/players" element={<Players/>}/>
        <Route path="/matches" element={<Matches/>}/>
        <Route path="/rankings" element={<Rankings/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </BrowserRouter>
    </MatchesContextProvider>
  </>)
}

export default App

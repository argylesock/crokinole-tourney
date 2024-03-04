import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppMenu from "./components/app-menu"
import HomePage from "./pages/home"
import PlayersPage from "./pages/players"
import MatchesPage from "./pages/matches"
import RankingsPage from "./pages/rankings"
import SettingsPage from "./pages/settings"
import { TournamentProvider } from './contexts/tournament-context'
import { ThemeProvider } from "./contexts/theme-context"
import { ClipboardListIcon, ListOrderedIcon, NetworkIcon, SettingsIcon } from "lucide-react"
import ScrollToTop from "./components/scroll-to-top"

export default function App() {
  const pages = [
    {label: 'Players', path: 'players', element: <PlayersPage/>, icon: <ClipboardListIcon strokeWidth={1}/>},
    {label: 'Matches', path: 'matches', element: <MatchesPage/>, icon: <NetworkIcon strokeWidth={1} className='rotate-90'/>},
    {label: 'Rankings', path: 'rankings', element: <RankingsPage/>, icon: <ListOrderedIcon strokeWidth={1}/>},
    {label: 'Settings', path: 'settings', element: <SettingsPage/>, icon: <SettingsIcon strokeWidth={1}/>},
  ]
  return (
    <ThemeProvider defaultTheme='light'>
    <TournamentProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop/>
        <AppMenu pages={pages}/>
        <Routes>
          {pages.map(page=><Route key={page.label} path={page.path} element={page.element}/>)}
          <Route path='/' element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </TournamentProvider>
    </ThemeProvider>
  )
}
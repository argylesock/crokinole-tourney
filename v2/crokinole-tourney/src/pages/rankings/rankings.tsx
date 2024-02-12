import PageContainer from '@/components/page-container'
import PageTitle from '@/components/page-title'
import db from '@/db'
import rank from '@/lib/rank'
import { useLiveQuery } from 'dexie-react-hooks'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import getPlayerRecord from '@/lib/get-player-record'
import PlayerRecord from './player-record'
import { PlayersProvider } from '@/contexts/players-context'
import PlayerName from '@/components/player-name'
import PageContent from '@/components/page-content'
import { TextLink } from '@/components/text-link'

export default function RankingsPage () {
  const {players, games} = useLiveQuery(async ()=>{
    const players = await db.players.filter(x=>!!x.present).toArray()
    const games = await db.games.where('stage').equals('seed').toArray()
    rank(players, games)
    return {players, games}
  }) || {players:[], games:[]}


  return (<PlayersProvider players={players}>
    <PageContainer>
      <PageTitle id='rankings-page' title='Rankings'>
        <p>Players are ranked based on their win-loss-draw record. Players get
          2 points for a win, 1 point for a draw, and no points for a loss.</p>
        <p>Ties are broken by the total number of twenties scored.</p>
      </PageTitle>

      <PageContent>
        <Table className='w-full'>
          <TableHeader>
            <TableRow className='hidden sm:table-row'>
              <TableHead className='text-right w-2'><span className='hidden sm:inline'>Rank</span></TableHead>
              <TableHead>Name</TableHead>
              <TableHead className='sm:w-3 hidden sm:table-cell'>Record</TableHead>
              <TableHead className='hidden sm:table-cell text-right'>Points</TableHead>
              <TableHead className='hidden sm:table-cell text-right'>20s</TableHead>
              <TableHead className='sm:hidden table-cell text-right'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((p,i)=>{
              const {wld, points, twenties} = getPlayerRecord(p, 'seed', games)
              return (
                <TableRow key={p.id}>
                  <TableCell className='text-right w-2'>{i+1}.</TableCell>
                  <TableCell className='sm:max-w-none'>
                    <div className='flex flex-wrap space-x-2 space-y-2'>
                      <PlayerName player={p}/>
                      <div className='sm:hidden'><PlayerRecord wld={wld}/></div>
                    </div>
                  </TableCell>
                  <TableCell className='hidden sm:table-cell'>
                    <div className='flex flex-wrap sm:w-fit flex-wrap sm:flex-nowrap gap-1'>
                      <PlayerRecord wld={wld}/>
                    </div>
                  </TableCell>
                  <TableCell className='hidden sm:table-cell text-right'>{points}</TableCell>
                  <TableCell className='hidden sm:table-cell text-right'>{twenties}</TableCell>
                  <TableCell className='sm:hidden table-cell text-right'>
                    <div className='w-14'>
                      {points} <span className='text-muted-foreground font-semibold pr-1'>pts</span><br/>
                      {twenties} <span className='text-muted-foreground font-semibold'>20s</span><br/>
                    </div>
                    </TableCell>
                </TableRow>
                )
              }
            )}
          </TableBody>
        </Table>

        {players.length == 0 ? (
          <div className='w-full text-center mt-32'>
            <p>There are no players present.</p>
            <p>Use the <TextLink className='font-bold hover:underline' to='/players'>Players</TextLink> page to add players.</p> 
          </div>
        ): undefined}
      </PageContent>
    </PageContainer>
  </PlayersProvider>
  )
}
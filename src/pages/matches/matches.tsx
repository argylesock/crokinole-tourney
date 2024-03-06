import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sequence } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import StageRound from "./stage-round";
import { useTournament } from "@/contexts/tournament-context";
import { usePlayers } from "@/contexts/players-context";
import { TextLink } from "@/components/text-link";
import { seedGames } from "@/lib/seed-games";
import db from "@/db";
import WorkingButton from "@/components/working-button";
import { gameIsUnscored } from "@/lib/game-winner";
import { elimGames } from "@/lib/elim-games";
import { UnscoredGamesAlert } from "./unscored-games-alert";
import { calcElimRounds, calcSeedRounds } from "@/lib/calc-nrounds";
import { ElimRoundsRadioGroup } from "./elim-rounds-radio-group";
import { NotEnoughSeedRoundsAlert } from "./not-enough-seed-rounds-alert";
import { Label } from "@/components/ui/label";

export default function MatchesPage () {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const {games} = useTournament()
  const {players, nPresent} = usePlayers()
  const [working, setWorking] = useState(false)
  const [sliderElimRounds, setSliderElimRounds] = useState(0)
  const [stage, rawSetStage] = useState('seed')
  const sliderElimRoundsUnset = sliderElimRounds == 0

  // initialize carousel api
  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  useEffect(()=>{
    if (!sliderElimRoundsUnset) return
    const recommended = Math.max(calcElimRounds(nPresent),0)
    setSliderElimRounds(recommended)
  }, [nPresent, sliderElimRoundsUnset])

  const {nSeedRounds, nElimRounds, isLastSeedUnscored, isLastElimUnscored, atEnd} = useMemo(()=>{
    let nSeedRounds = 0
    let nElimRounds = 0
    games.forEach(g=>{
      if (g.stage == 'seed') nSeedRounds = Math.max(nSeedRounds, g.round + 1)
      else nElimRounds = Math.max(nElimRounds, g.round +1)
    })
    const isLastSeedUnscored = !!games.find(g=>g.stage == 'seed' && g.round == (nSeedRounds - 1) && gameIsUnscored(g))
    const isLastElimUnscored = !!games.find(g=>g.stage == 'elim' && g.round == (nElimRounds - 1) && gameIsUnscored(g))
    const atEnd = games.filter(g=>g.stage == 'elim' && g.round == (nElimRounds - 1)).length == 1
    return {nSeedRounds, nElimRounds, isLastSeedUnscored, isLastElimUnscored, atEnd}
  }, [games])

  const nRounds = stage == 'seed' ? nSeedRounds : nElimRounds
  const isLastRoundUnscored = stage == 'seed' ? isLastSeedUnscored : isLastElimUnscored
  const showStartRound = stage == 'seed' ? nElimRounds == 0 : !atEnd
  const recommended = calcSeedRounds(nPresent)

  const setStage = (s:string) => {
    rawSetStage(s)
    const lastRound = (s == 'seed') ? nSeedRounds - (isLastSeedUnscored ? 1 : 0) : nElimRounds - (isLastElimUnscored ? 1 : 0)
    api?.scrollTo(0, true)
    setTimeout(()=>api?.scrollTo(lastRound), 100)
  }

  const startRound = (round:number) => {
    const nGameRounds = 4
    setWorking(true)
    if (stage == 'seed') {
      const {gamesToAdd} = seedGames(round, players, games, nGameRounds)
      db.games.bulkAdd(gamesToAdd)
      .finally(()=>setTimeout(()=>setWorking(false),750))
    } else {
      const {gamesToAdd} = elimGames(round, sliderElimRounds, players, games, nGameRounds)
      db.games.bulkAdd(gamesToAdd)
      .finally(()=>setTimeout(()=>setWorking(false),750))
    }
  }

  return (<PageContainer>
    <PageTitle id='matches-title' title="Matches">
      <p>The first stage is made up of seed rounds where players are matched randomly in the first round,
        then against players they haven't yet been matched against, with similar scores if possible.</p>
      <p>The second stage is a set of elimination rounds where top players are matched based on their
        ranking from the seed rounds.</p>
    </PageTitle>

    <Tabs value={stage} onValueChange={setStage} className="w-full flex justify-center">
      <TabsList className="grid w-80 grid-cols-2 mx-1">
        <TabsTrigger value="seed">Seed</TabsTrigger>
        <TabsTrigger value="elim">Elimination</TabsTrigger>
      </TabsList>
    </Tabs>

    <div className='flex  justify-center'>
      <Carousel className='w-full' setApi={setApi}>
        {nRounds ? (
          <CarouselContent>
            {sequence(nRounds).map(round=>(
              <CarouselItem key={round} className='min-h-80'>
                <StageRound {...{stage, round, nRounds}}/>
              </CarouselItem>
            ))}
            {showStartRound ? (
              <CarouselItem className="p-1 pt-4 flex flex-wrap gap-2 justify-center items-start sm:items-center min-h-80">
                <div className='text-center'>
                  {isLastRoundUnscored ? <UnscoredGamesAlert/>: undefined}
                  {nPresent == 1 ? <p>There is only 1 player present.</p> : stage == 'seed' ? <p>There are {nPresent} players present.</p> : undefined}
                  {nPresent < 2 ? (
                      <p>Use the <TextLink className='font-bold hover:underline' to='/players'>Players</TextLink> page to add players.</p> 
                    ) : (stage == 'seed' || !isLastRoundUnscored) ? (
                      <WorkingButton working={working} onClick={()=>startRound(nRounds)}>Start {stage == 'seed' ? 'Seed' : 'Elimination'} Round {nRounds+1}</WorkingButton>
                    ) : undefined
                  }
                </div>
              </CarouselItem>
            ) : undefined}
          </CarouselContent>
        ) : (
          <CarouselContent>
            <CarouselItem className="p-1 pt-4 flex flex-wrap gap-2 justify-center items-start sm:items-center min-h-80">
              <div className='text-center'>
                {(stage == 'elim' && nElimRounds == 0 && nSeedRounds < recommended) ? <NotEnoughSeedRoundsAlert nPresent={nPresent}/>: undefined }
                {(stage == 'elim' && current == 0 && isLastSeedUnscored) ? <UnscoredGamesAlert isStartElim/>: undefined }
                {nPresent == 0 ? <p>There are no players present.</p> : undefined }
                {nPresent == 1 ? <p>There is only 1 player present.</p> : undefined }
                {nPresent < 2 ? (
                  <p>Use the <TextLink className='font-bold hover:underline' to='/players'>Players</TextLink> page to add players.</p> 
                ) : (<>
                  <WorkingButton disabled={stage == 'elim' && !sliderElimRounds} working={working} onClick={()=>startRound(0)}>Start {stage == 'seed' ? 'Tournament' : 'Elimination'}</WorkingButton>
                  {stage == 'seed' && nPresent > 1 ? (
                    <div>
                      <Label>{nPresent} players &bull; {Math.ceil(nPresent/2)} match{nPresent != 2 ? 'es' : undefined}</Label> 
                    </div>
                  ) : undefined}
                  {stage == 'elim' ? (
                    <div className='max-w-80 m-auto'>
                      <ElimRoundsRadioGroup className='mt-4' nPresent={nPresent} value={sliderElimRounds} onValueChange={setSliderElimRounds}/> 
                    </div>
                  ) : undefined }
                </>)}
              </div>
            </CarouselItem>
          </CarouselContent>
        )}
        <CarouselPrevious className='hidden md:inline-flex'/>
        <CarouselNext className='hidden md:inline-flex'/>
      </Carousel>
    </div>

  </PageContainer>)
}
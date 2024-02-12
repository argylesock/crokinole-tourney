import { Link } from "react-router-dom"
import { TextLink } from "@/components/text-link"
import PageContainer from "@/components/page-container"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ClipboardListIcon, ListOrderedIcon, NetworkIcon } from "lucide-react"

const Home = () => {
  return (
    <PageContainer>
      <div className='text-center mb-6'>
      <h1 className='text-xl font-extrabold my-5'>Welcome to Crokinole Tourney!</h1>
      <p>A super-simple way to score Crokinole tournaments.</p>
      <img className='inline h-24 my-4' alt='hand-flick-logo' src={import.meta.env.BASE_URL+'/hand-flick-sticker.svg'}/>
      <p>Just 3 easy steps.</p>
      </div>
      <div className='flex flex-wrap justify-center'>
        <Card className='my-6 w-60 mx-3'>
          <div className='relative -top-4 w-full'>
            <span className='m-auto bg-sky-700 rounded-full text-center text-white font-black block pt-0.5 w-8 h-8 text-xl'>1</span>
          </div>
          <CardContent className='text-center text-xl'>
            Start by adding <TextLink to='/players'>Players</TextLink> to the tournament.
            <div className='w-full flex justify-center mt-4'>
              <Link to='/players'>
                <Button variant='ghost' className='p-0 w-16 h-16'>
                  <ClipboardListIcon size={'3em'}/>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card className='my-6 w-60 mx-3'>
          <div className='relative -top-4 w-full'>
            <span className='m-auto bg-teal-700 rounded-full text-center text-white font-black block pt-0.5 w-8 h-8 text-xl'>2</span>
          </div>
          <CardContent className='text-center text-xl'>
            Score the Seed <TextLink to='/players'>Matches</TextLink> to <TextLink to='/rankings'>Rank</TextLink> players.
            <div className='w-full flex justify-center items-center mt-4'>
              <TextLink to='/matches'>
                <Button variant='ghost' className='p-0 w-16 h-16'>
                  <NetworkIcon size={'3em'} className='rotate-90'/>
                </Button>
              </TextLink>
              <span className='-mx-2 z-10 text-black text-2xl'>+</span>
              <TextLink to='/rankings'>
                <Button variant='ghost' className='p-0 w-16 h-16'>
                  <ListOrderedIcon size={'3em'}/>
                </Button>
              </TextLink>
            </div>
          </CardContent>
        </Card>
        <Card className='my-6 w-60 mx-3'>
          <div className='relative -top-4 w-full'>
            <span className='m-auto bg-green-700 rounded-full text-center text-white font-black block pt-0.5 w-8 h-8 text-xl'>3</span>
          </div>
          <CardContent className='text-center text-xl'>
            Score the Elimination <TextLink to='/players'>Matches</TextLink> to decide the champion!
            <div className='w-full flex justify-center items-center mt-4'>
              <TextLink to='/matches'>
                <Button variant='ghost' className='p-0 w-16 h-16'>
                  <NetworkIcon size={'3em'} className='rotate-90'/>
                </Button>
              </TextLink>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}
export default Home
import { ReactNode } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { useLocalStorage } from 'usehooks-ts'

interface Props {
  id: string
  title: ReactNode
  children: ReactNode
}
export default function PageTitle ({id, title, children}:Props) {
  const [closed, setClosed] = useLocalStorage(id, false)
  const toggleClosed = () => setClosed(!closed)
  return (
    <Accordion className='pb-2 w-full' type="single" defaultValue={closed?undefined:'item-1'} collapsible onValueChange={toggleClosed}>
      <AccordionItem value='item-1' className='px-2'>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className='grid gap-2'>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
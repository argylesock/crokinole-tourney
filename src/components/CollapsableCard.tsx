import { JSXElementConstructor, ReactElement, ReactNode, useContext } from "react"
import { Accordion, AccordionContext, Card, useAccordionButton } from "react-bootstrap"

import './CollapsableCard.css'

interface HeaderProps {
  eventKey: string
  children: ReactNode
  callback?: (eventKey:string)=>void
}
const Header = ({eventKey, children, callback}:HeaderProps) => {
  const { activeEventKey } = useContext(AccordionContext)
  const expanded = activeEventKey === eventKey;
  const onClick = useAccordionButton(eventKey, () => callback && callback(eventKey))
  return <Card.Header as='button' className={`accordion-button h5${!expanded?' collapsed':''}`} onClick={onClick} aria-expanded={expanded}>
    {children}
  </Card.Header>
}

interface Props {
  title: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ReactElement<any, string | JSXElementConstructor<any>> & ReactNode
}
const CollapsableCard = ({title, children}:Props) => {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Header eventKey="0">{title}</Header>
        <Accordion.Collapse eventKey="0">
          {children}
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}
export default CollapsableCard
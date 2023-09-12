import { Button, ButtonProps, Spinner } from "react-bootstrap"
import './WorkingButton.css'

interface Props {
  working?: boolean
}
const WorkingButton = (props:ButtonProps&Props) => {
  const {working, children} = props
  const disabled = props.disabled || working
  let className = (props.className || '') + ' btn-working'
  if (working) className += ' working'

  const passed = {...props, disabled, className}
  delete passed.children
  delete passed.working

  return <Button {...passed}>
    <span>{children}</span>
    <span className='spinner'>
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    </span>
  </Button>
}
export default WorkingButton
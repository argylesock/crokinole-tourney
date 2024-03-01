import { ReloadIcon } from "@radix-ui/react-icons"
import { Button, ButtonProps } from "./ui/button"

interface Props extends ButtonProps{
  working?: boolean
}
const WorkingButton = (props:Props) => {
  const {working, children} = props
  const disabled = props.disabled || working

  const passed = {...props, disabled}
  delete passed.children
  delete passed.working

  return <Button {...passed}>
    {working ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/> : undefined }
    {children}
  </Button>
}
export default WorkingButton
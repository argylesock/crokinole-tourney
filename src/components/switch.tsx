import { Label } from './ui/label';
import { Switch as RawSwitch } from './ui/switch';
import { SwitchProps } from '@radix-ui/react-switch'
import { LabelProps } from '@radix-ui/react-label'
import { ReactNode } from 'react';

interface Props extends SwitchProps {
  children?: ReactNode
  labelProps?: LabelProps
}
export default function Switch (props:Props) {
  if (!props.children) return <RawSwitch {...props}/>
  const id = props.id || Math.random().toString(36).slice(2)
  return (<div className="flex items-center space-x-2">
    <RawSwitch {...props} id={id}/>
    <Label htmlFor={id} {...props.labelProps}>{props.children}</Label>
  </div>)
}

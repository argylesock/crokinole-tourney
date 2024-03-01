import { ReactNode } from "react"

interface Props {
  children: ReactNode
}
export default function PageContainer ({children}:Props) {
  return (<div className='flex w-full justify-center mb-20'>
    <div className="w-full max-w-2xl">
      {children}
    </div>
  </div>)
}
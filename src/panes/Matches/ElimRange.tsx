import { useContext, useEffect } from "react"
import RangeSlider from "../../components/RangeSlider"
import { limit } from "../../utils"
import MatchesContext from "../../contexts/MatchesContext"

/** return the max number of elimination rounds for nplayers */
const maxelim = (x:number) => Math.pow(2, Math.trunc(Math.log2(x)))

interface ElimRangeProps {
  nplayers:number|undefined
  className?: string
}
const ElimRange = ({nplayers, className}:ElimRangeProps) => {
  const {log2elimplayers, setLog2elimplayers} = useContext(MatchesContext)
  const minLog2elimplayers = 1
  const maxLog2elimplayers = nplayers == undefined ? 3 : Math.log2(maxelim(nplayers))

  useEffect(()=>{
    if (nplayers == undefined) return
    setLog2elimplayers((n)=>limit(n,minLog2elimplayers,maxLog2elimplayers))
  }, [nplayers, minLog2elimplayers, maxLog2elimplayers, setLog2elimplayers])

  return (
    <RangeSlider className={className} value={log2elimplayers}
      size='sm'
      onChange={e=>setLog2elimplayers(Number.parseInt(e.target.value))}
      min={minLog2elimplayers}
      max={maxLog2elimplayers}
      tooltipLabel={(n:number)=>Math.pow(2,n).toString()}
      tooltipPlacement='top'
      //tooltip='on'
    />
  )
}
export default ElimRange
import { useContext, useEffect } from "react"
import MatchesContext from "../../contexts/MatchesContext"
import { limit } from "../../utils"
import RangeSlider from "../../components/RangeSlider"

/** return the min number seed rounds for nplayers */
const maxseed = (x:number) => Math.ceil(Math.log2(x))

interface SeedRangeProps {
  nplayers:number|undefined
  className?: string
}
const SeedRange = ({nplayers, className}:SeedRangeProps) => {
  const {seedrounds, setSeedrounds} = useContext(MatchesContext)
  const minSeedrounds = 1
  const maxSeedrounds = nplayers == undefined ? 4 : maxseed(nplayers)

  useEffect(()=>{
    if (nplayers == undefined) return
    setSeedrounds((n)=>limit(n,minSeedrounds,maxSeedrounds))
  }, [nplayers, minSeedrounds, maxSeedrounds, setSeedrounds])

  return (
    <RangeSlider className={className} value={seedrounds}
      size='sm'
      onChange={e=>setSeedrounds(Number.parseInt(e.target.value))}
      min={minSeedrounds}
      max={maxSeedrounds}
      tooltipPlacement='top'
      //tooltip='on'
    />
  )
}
export default SeedRange
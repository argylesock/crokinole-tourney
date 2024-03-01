import Fuse, { IFuseOptions, FuseIndex } from 'fuse.js'
import { useCallback, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'

/**
 * Returns a stateful value, a function to update it, and a search function
 * that uses a debounced version of the value.
 * 
 * This hook uses _fuse.js_ for the fuzzy search. See (https://www.fusejs.io) for
 * details about the _options_ and _index_ parameters.
 * 
 * @example
 *   const list = [{name: 'Jim Kirk'}, {name: 'Spock'}, {name: 'Leonard McCoy'}]
 *   const [searchTerm, setSearchTerm, search] = useFuzzySearch()
 *   const result = useMemo(()=>{
 *     return search(list, {keys:['name']})
 *   }, [list, search])
 *   return (<>
 *     <input type="search" value={term} onChange={e=>setTerm(e.target.value)}/>
 *     {result.map(x=>(<div>{x.name}</div>))}
 *   </>)
 * @returns [value, debouncedValue, setValue, search]
 */
export default function useFuzzySearch (delay=250) {
  const [value, _setValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useDebounceValue('', delay)
  const setValue = (s:string) => {
    _setValue(s)
    setDebouncedValue(s)
  }

  const search = useCallback(<T> (list:T[], options?:IFuseOptions<T>|undefined, index?:FuseIndex<T>|undefined) => {
    if (!debouncedValue.trim()) return [list, Number.MAX_SAFE_INTEGER] as [T[], number]
    const results = new Fuse(list, {...options, includeScore:true}, index).search(debouncedValue)
    let score = results[0]?.score
    score = score != undefined ? score : Number.MAX_SAFE_INTEGER
    return [results.map(x=>x.item), score] as [T[], number]
  }, [debouncedValue])

  return [value, setValue, search] as [string, (s:string)=>void, typeof search]
}
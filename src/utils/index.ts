export { default as findAsync } from "./findAsync"

/** return an array of numbers 0..n */
export const sequence = (n:number)=> n > 0 ? Array.from(Array(Math.floor(n)).keys()) : []

/** limit a number to a domain */
export const limit = (x:number,min:number,max:number)=>{
  const l = Math.min(Math.max(min, x), max)
  console.log('limit', x, min, '..', max, ':', l)
  return l
}

/** comparator to sort objects by a field */
export const byField = <T>(f:string) => (a:T,b:T) => {
  const x = a as unknown as {[k:string]:string|number}
  const y = b as unknown as {[k:string]:string|number}
  return x[f] > y[f] ? -1 : x[f] < y[f] ? 1 : 0
}

/** shuffle an array */
export const shuffle = <T>(a:T[]) => {
  let c = a.length
  while (c > 0) {
    const r = Math.floor(Math.random() * c--)
    ;[a[c], a[r]] = [ a[r], a[c]]
  }
  return a
}

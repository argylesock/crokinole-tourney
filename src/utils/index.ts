export { default as findAsync } from "./findAsync"

/** return an array of numbers 0..n */
export const sequence = (n:number)=> n > 0 ? Array.from(Array(Math.floor(n)).keys()) : []

/** limit a number to a domain */
export const limit = (x:number,min:number,max:number)=>{
  const l = Math.min(Math.max(min, x), max)
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


/** remove items by value from an array */
export function removeFromArray <T>(a:T[], ...values:T[]):T[]
export function removeFromArray <T,V>(a:T[], comparator:(x:T,v:V)=>boolean, ...values:V[]):T[]
export function removeFromArray <T,V>(a:T[], ...values:V[]) {
  let comparator:(x:T,v:V)=>boolean
  if (typeof values[0] == 'function') {
    comparator = values.shift() as (x:T,v:V)=>boolean
  }
  values.forEach(v=>{
    const i = comparator ? a.findIndex((x)=>comparator(x,v)) : a.indexOf(v as unknown as T)
    if (i>=0) a = a.splice(i,1)
  })
  return a
}
const size = '1.25em'
const scale = (x:number) => `calc(${size}*${x})`
export const Circle = () => <svg xmlns="http://www.w3.org/2000/svg" width={scale(0.85)} height={scale(0.85)} viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>
export const Triangle = () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>
export const Diamond = () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"/></svg>
export const Square = () => <svg xmlns="http://www.w3.org/2000/svg" width={scale(0.9)} height={scale(0.9)} viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
export const Star = () => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>

interface Props {
  i?: number
}
export default function Shape ({i=0}:Props) {
  const shapes = [Circle, Triangle, Diamond, Square]
  const Shape = shapes[Math.abs(i) % shapes.length]
  return <Shape/>
}
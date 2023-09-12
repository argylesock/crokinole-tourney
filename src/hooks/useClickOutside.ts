import { useCallback, useEffect, useRef } from 'react';

export default function useClickOutside<T extends HTMLElement>(cb:()=>void) {
  const ref = useRef<T>(null)

  const handleClickOutside = useCallback((event:MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) cb()
  }, [cb])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [handleClickOutside])

  return ref
}
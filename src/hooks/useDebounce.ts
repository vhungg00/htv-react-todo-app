import { useState, useEffect, useRef } from 'react'

export const useDebounce = (value: unknown, delay = 500) => {
  const [val, setVal] = useState(value)
  const ref = useRef<NodeJS.Timeout>()

  useEffect(() => {
    ref.current = setTimeout(() => {
      setVal(value)
    }, delay)

    return () => clearTimeout(ref.current)
  }, [value, delay])

  return val
}

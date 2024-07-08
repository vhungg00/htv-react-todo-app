import { ChangeEvent, HTMLProps, KeyboardEvent, useCallback } from 'react'

import style from './style.module.scss'

type Props = HTMLProps<HTMLInputElement> & {
  index: number
}

export const InputItem = ({ index, ...props }: Props) => {
  const nextFocus = useCallback((target: HTMLInputElement) => {
    const next = target.nextSibling as HTMLInputElement
    const nextValue = next?.value
    target.value && next && !nextValue && next.focus()
  }, [])

  const prevFocus = useCallback((target: HTMLInputElement) => {
    console.log(target, 'ta')
    const prev = target.previousSibling as HTMLInputElement
    const prevFocus = prev && !target.value
    prevFocus && prev.focus()
  }, [])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    nextFocus(e.target)
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') prevFocus(e.target as HTMLInputElement)
  }, [])

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      (e.target as HTMLInputElement).value &&
        (e.target as HTMLInputElement).value === ''
  }, [])

  return (
    <input
      className={style.inputItem}
      name={`pin-${index}`}
      type="number"
      max={9}
      min={0}
      maxLength={1}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      onKeyDown={handleKeyDown}
      {...props}
    />
  )
}

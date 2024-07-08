import {
  Children,
  FormEvent,
  HTMLProps,
  LegacyRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react'

import style from './style.module.scss'
import { InputItem } from './InputItem'

export type Props = {
  range?: number
  onChange: (value: string[]) => void
  error?: string
  disabled?: boolean
}

type FormRef = HTMLProps<HTMLFormElement> & {
  onReset: () => void
}

export const InputGroup = forwardRef<FormRef, Props>(
  ({ range = 6, onChange, error, disabled }, ref) => {
    const formRef = useRef(ref)
    const cx = useCallback(
      (...className: string[]) => className.join(' ').trim(),
      [],
    )
    useImperativeHandle(ref, () => ({
      onReset: () => {
        (formRef.current as unknown as HTMLFormElement).reset()
        range && onChange(Array(range))
      },
    }))

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
      const form = e.target
      const formData = new FormData(form as HTMLFormElement)
      const formValue = formData.values()
      return (onSubmit: (formValues: any) => void) => onSubmit(formValue)
    }, [])

    return (
      <form
        onSubmit={e => {
          e.preventDefault()
          handleSubmit(e)(formValue => {
            onChange(formValue)
          })
        }}
        ref={formRef as LegacyRef<HTMLFormElement>}
      >
        <input type="submit" />
        <div
          className={cx(style.inputGroup, style.inputGroupWrap)}
          data-error={error}
        >
          {Children.map(Array(range), (_, index) => (
            <InputItem key={index} index={index} disabled={disabled} />
          ))}
        </div>
      </form>
    )
  },
)

InputGroup.displayName = 'InputGroup'

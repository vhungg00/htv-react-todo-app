import { ChangeEvent, useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

export enum Values {
  SMALL = 'small',
  STANDARD = 'standard',
  LARGE = 'large',
}

const Labels: Record<Values, string> = {
  [Values.SMALL]: 'small',
  [Values.STANDARD]: 'standard',
  [Values.LARGE]: 'large',
}

type Option = {
  label: string
  value: Values
}

type Props = {
  defaultValue: Option['value']
  value?: Option['value'] | string
  onChange: (value: Option['value']) => void
  disabled?: boolean
}

export const FontSizePullDown = ({
  defaultValue = Values.STANDARD,
  onChange,
  value,
  disabled,
}: Props) => {
  const ref = useRef<HTMLDetailsElement>(null)

  const options = [
    { label: Labels[Values.SMALL], value: Values.SMALL },
    { label: Labels[Values.STANDARD], value: Values.STANDARD },
    { label: Labels[Values.LARGE], value: Values.LARGE },
  ]

  const onCloseDetails = useCallback(() => {
    if (!ref.current) return
    ref.current.removeAttribute('open')
  }, [])

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return
    onChange(e.target.value as Values)
    onCloseDetails()
  }, [])

  useEffect(() => {
    if (!ref.current) return

    const handleClickOutside = (e: MouseEvent) => {
      if (!e.target) return
      if (ref.current?.contains(e.target as Node)) return
      onCloseDetails()
    }
    window.document.addEventListener('click', handleClickOutside)

    return () => window.removeEventListener('click', handleClickOutside)
  }, [onCloseDetails])

  return (
    <Details defaultValue={defaultValue} ref={ref}>
      <Summary>
        <TextBase>{Labels[(value || defaultValue) as Values]}</TextBase>
      </Summary>
      <Separation />
      <Form>
        {options.map(({ value: valueOption, label }, index) => (
          <Option key={`option_${index}`}>
            <TextBase>{label}</TextBase>
            <input
              type="radio"
              name="font"
              value={valueOption}
              checked={(value || defaultValue) === valueOption}
              hidden
              onChange={handleChange}
            />
          </Option>
        ))}
      </Form>
    </Details>
  )
}

const Details = styled.details`
  width: 142px;
  border-style: solid;
  border-width: 1px;
  border-color: '#d1d1d1';
  font-size: 14px;
  display: flex;
  flex-direction: column;
  height: max-content;
  list-style-type: '';
`

const Summary = styled.summary`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const TextBase = styled.p`
  flex-basis: 100%;
`
const Separation = styled.hr``

const Form = styled.form`
  background-color: black;
  border: inherit;
  display; flex;
  flex-direction: column;
  padding-top: 2px;
  padding-bottom: 1px;
  width: 100%;
`
const Option = styled.label`
  display: flex;
  cursor: pointer;
`

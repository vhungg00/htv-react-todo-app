import React, {
  ChangeEvent,
  useCallback,
  useState,
  FormEvent,
  useEffect,
} from 'react'

import style from './Caculator.module.scss'
import { Helmet } from 'react-helmet-async'
import { Container } from '@/components/Container'

export type TForm = {
  year: string | number
  month: string | number
}

const initializeForm: TForm = {
  year: '',
  month: '',
}

enum NoticeError {
  YEAR_ERROR = 'Năm không hơp lệ',
  MONTH_ERROR = 'Tháng không hợp lệ',
}

export const Caculator: React.FC = () => {
  const [inputs, setInputs] =
    useState<Record<string, string | number>>(initializeForm)
  const [titleNotice, setTitleNotice] = useState<string>('')
  const [styleTitle, setStyleTitle] = useState<boolean>(false)
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const year = Number(inputs.year)
      const month = Number(inputs.month)
      if (year >= 1) {
        console.log('year', year)
        switch (month) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
            setTitleNotice(`Tháng ${month} năm ${year} có 31 ngày`)
            setStyleTitle(true)
            break
          case 4:
          case 6:
          case 9:
          case 11:
            setTitleNotice(`Tháng ${month} năm ${year} có 30 ngày`)
            setStyleTitle(true)
            break
          case 2:
            if (year % 400 === 0 || (year % 100 != 0 && year % 4 === 0)) {
              setTitleNotice(`Tháng ${month} năm ${year} có 29 ngày`)
            } else {
              setTitleNotice(`Tháng ${month} năm ${year} có 28 ngày`)
            }
            break
          default:
            setTitleNotice(NoticeError.MONTH_ERROR)
        }
      } else {
        setTitleNotice(NoticeError.YEAR_ERROR)
        setStyleTitle(false)
      }
    },
    [inputs, titleNotice],
  )
  useEffect(() => {
    const arr: number[] = [
      10, 20, 20, 10, 10, 30, 50, 10, 20, 1, 1, 1, 1, 1, 2, 22, 22, 3, 3, 333,
      3,
    ]
    const newArr = arr.reduce((acc, curr) => {
      if ((acc as number[]).indexOf(curr) === -1) {
        ;(acc as number[]).push(curr)
      }
      return acc
    }, [])

    let count: number = 0
    newArr.forEach(value => {
      let num: number = 0
      arr.forEach(val => {
        if (value === val) {
          num++
        }
      })
      count = count + (num % 2)
    })
    console.log(count, `Có ${count} đôi tất`)
  }, [])

  return (
    <>
      <Helmet>
        <title>Caculator year month</title>
      </Helmet>
      <Container>
        <div className={style.wrapper}>
          <h1 className={style.title}>Caculator year month</h1>
          <form onSubmit={handleSubmit}>
            <dl className={style.formGroup}>
              <dt className={style.formLabel}>Enter year here: </dt>
              <dd>
                <label className={style.inputLabel} htmlFor="year">
                  <input
                    value={inputs.year || ''}
                    id="year"
                    name="year"
                    type="text"
                    className={style.inputGroup}
                    onChange={handleChange}
                  />
                </label>
              </dd>
            </dl>
            <dl className={style.formGroup}>
              <dt className={style.formLabel}>Enter month here: </dt>
              <dd>
                <label className={style.inputLabel} htmlFor="month">
                  <input
                    value={inputs.month || ''}
                    id="month"
                    name="month"
                    type="text"
                    className={style.inputGroup}
                    onChange={handleChange}
                  />
                </label>
              </dd>
            </dl>
            <button type="submit" className={style.btnFormGroup}>
              Submit
            </button>
            <span
              className={style.notice}
              style={!styleTitle ? { color: 'red' } : { color: '#333' }}
            >
              {titleNotice}
            </span>
          </form>
        </div>
      </Container>
    </>
  )
}

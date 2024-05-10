import { ChangeEvent } from 'react'

import { useSearchParams } from 'react-router-dom'
import { useDebounce } from './useDebounce'

type TPagination<D> = {
  page?: number
  size?: number
  initialData?: D
  debounceKey?: string
}

export function useSearchList<D = Record<string, string | number>>(
  props?: TPagination<D>,
) {
  const [searchParams, setSearchParams] = useSearchParams({
    ...props?.initialData,
    page: (props?.page || 1).toString(),
    size: (props?.size || 20).toString(),
  })

  const keyword = props?.debounceKey
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useDebounce(searchParams.get(props.debounceKey) as string)
    : undefined

  const handleChangePage = (page: number, isDisabled: boolean) => () => {
    if (isDisabled) return

    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }

  const handleChangeSize = (size: number) => () => {
    searchParams.set('size', size.toString())
    setSearchParams(searchParams)
  }

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    searchParams.set(name, value)
    setSearchParams(searchParams)
  }

  const handleSort = (name: string, value: string) => {
    searchParams.set('sort', `${name}, ${value}`)
    setSearchParams(searchParams)
  }

  return {
    keyword,
    page: +searchParams.get('page')!,
    size: +searchParams.get('size')!,
    searchParams: Object.fromEntries(searchParams.entries()),
    handleChangePage,
    handleChangeSize,
    handleChangeSearch,
    handleSort,
  }
}

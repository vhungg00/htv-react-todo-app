import {
  CSSProperties,
  ReactNode,
  useCallback,
  MouseEvent,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react'

import * as CSS from 'csstype'
import { Box, Flex, ResponsiveValue, Text } from '@chakra-ui/react'
import { IconShortUp } from '@/components/elements/Icon/IconShortUp'
import { IconShortDown } from '@/components/elements/Icon/IconShortDown'

const SIZE_DRAG = 16

export enum ESortType {
  ASC = 'asc',
  DESC = 'desc',
}

export type TColumn<T = any> = {
  title?: ReactNode
  name?: string
  dataIndex?: string
  key?: string
  sortable?: boolean
  render?: (value: any, record: T) => ReactNode
  width?: number | string
  style?: CSSProperties
  align?: ResponsiveValue<CSS.Property.TextAlign>
}

type ChangeLayoutEvent = {
  x: number
  y: number
  width: number
  height: number
  top: number
  right: number
  left: number
  bottom: number
  scrollWidth: number
  scrollHeight: number
}

type Props<T = any> = {
  data?: T[]
  className?: string
  columns: TColumn<T>[]
  bordered?: boolean
  keyExtractor?: (item: T, index: number) => string | number
  style?: CSSProperties
  thStyle?: CSSProperties
  tdStyle?: CSSProperties
  resizeable?: boolean
  loading?: boolean
  empty?: ReactNode
  minWidthResize?: number
  sortKey?: string
  sortType?: ESortType
  onSort?: (column: TColumn<T>, type: ESortType) => void
  onSelect?: (item: T, index: number) => void
}

export const TableResize = <T extends any>(props: Props<T>) => {
  const {
    data,
    className,
    columns,
    bordered,
    keyExtractor,
    resizeable,
    style,
    minWidthResize = 60,
    thStyle,
  } = props

  const [widthTable] = useState<number>()

  const refTable = useRef<HTMLDivElement>(null)
  const refResize = useRef<HTMLDivElement>(null)
  const refTh = useRef<HTMLDivElement>(null)
  const xControl = useRef<number>()
  const xResControl = useRef<{
    x?: number
    x2?: number
    index?: number
    minX?: number
  }>({})

  // handle resize useEffect
  useEffect(() => {}, [])

  /* get children elements table
   * return children
   */
  const getValueSplit = useCallback((value: T, key?: string) => {
    if (!key) return undefined
    const keys = key.split('.')
    let v: any = value
    keys.forEach(k => {
      v = v[k as keyof T]
    })
    return v
  }, [])

  const getChildren = useCallback(
    (column: TColumn<T>, item: T) => {
      const { render, dataIndex, name, key } = column
      if (typeof render === 'function') {
        return render(getValueSplit(item, name || dataIndex || key), item)
      }
      return <Text>{getValueSplit(item, name || dataIndex || key)}</Text>
    },
    [getValueSplit],
  )

  const onMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
    xControl.current = event.pageX
  }, [])

  const listNoneWidth = useMemo(() => {
    return columns.reduce((a: number[], b, i) => {
      if (b.width === undefined) a.push(i)
      return a
    }, [])
  }, [columns])

  const onApplyNewSizeNonWidth = useCallback(() => {
    const { index } = xResControl.current
    if (index === undefined || !widthTable || !refTh.current) return
    const ths = refTh.current.querySelectorAll('.table-th') as NodeListOf<HTMLDivElement>
    const width = Array.from(ths).reduce((a, b, i) => {
      if (listNoneWidth.includes(i)) {
        a += b.getBoundingClientRect().width
      }
      return a
    }, 0)
    listNoneWidth.forEach(i => {
      const th = refTh.current?.querySelector(
        `.table-th:nth-child(${i + 1})`,
      ) as HTMLElement
      let widthChange: string | number = (widthTable - width) / listNoneWidth.length
    })
  }, [])

  const appendResize = useCallback(
    (element?: HTMLElement, size: number = 0) => {
      if (!element) return
      const { width } = element.getBoundingClientRect()
      element.style.width = `${width + size}px`
      element.style.maxWidth = `${width + size}px`
      element.style.minWidth = `${width + size}px`
      onApplyNewSizeNonWidth()
    },
    [onApplyNewSizeNonWidth],
  )

  const onMouseUpResize = useCallback(() => {
    const { x, x2, index } = xResControl.current
    if ([x, x2, index].includes(undefined) || !refTh.current) return
    const change = x2! - x!
    const th = refTh.current.querySelector(
      `.table-th:nth-child(${index! + 1})`,
    ) as HTMLElement
    appendResize(th, change)
    const tds = refTable.current?.querySelectorAll(
      `.table-tr .table-td:nth-child(${index! + 1})`,
    )
    Array.from(tds || []).forEach(td => appendResize(td as HTMLElement, change))
  }, [appendResize])

  const onMouseUp = useCallback(() => {
    onMouseUpResize()
    xControl.current = undefined
    xResControl.current = {}
    if (refResize.current) refResize.current.style.display = 'none'
  }, [onMouseUpResize])

  const onMouseMoveResize = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const { x, minX } = xResControl.current
      if (x === undefined) return
      if (!refResize.current || !refTable.current) return
      const { left } = refTable.current.getBoundingClientRect()
      xResControl.current.x2 = event.pageX
      if (minX !== undefined && event.pageX <= minX + minWidthResize) {
        xResControl.current.x2 = minX + minWidthResize
      }
      const { scrollLeft } = refTable.current
      refResize.current.style.left = `${
        xResControl.current.x2 - left - SIZE_DRAG / 2 + scrollLeft
      }px`
    },
    [minWidthResize],
  )

  const onMouseDownResize = useCallback(
    (event: MouseEvent<HTMLDivElement>, index: number) => {
      event.preventDefault()
      event.stopPropagation()
      if (!refResize.current || !refTable.current) return
      const { left } = refTable.current.getBoundingClientRect()
      const { scrollLeft } = refTable.current
      const th = refTh.current?.querySelector(
        `.table-th:nth-child(${index! + 1})`,
      ) as HTMLElement
      if (th) {
        const { width } = th.getBoundingClientRect()
        xResControl.current.minX = event.pageX - width
      }
      xResControl.current.x = event.pageX
      xResControl.current.index = index
      refResize.current.style.display = 'block'
      refResize.current.style.left = `${
        event.pageX - left - SIZE_DRAG / 2 + scrollLeft
      }px`
    },
    [],
  )

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const { x } = xResControl.current
      if (x !== undefined) {
        return onMouseMoveResize(event)
      }
      if (!xControl.current || !refTable.current) return
      const { scrollLeft } = refTable.current
      const scrollX = scrollLeft - (xControl.current - event.pageX) / 10
      refTable.current.scrollTo({ left: scrollX })
    },
    [onMouseMoveResize],
  )

  const cx = useCallback((...className: string[]) => className.join(' ').trim(), [])

  return (
    <Box
      _hover={{
        ['.scroll-x-bar']: {
          display: 'block',
        },
        ['.scroll-y-bar']: {
          display: 'block',
        },
      }}
      className={className}
      position={'relative'}
      style={style}
      width={'full'}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <Box ref={refTable}>
        <Box minWidth={'max-content'} position={'relative'}>
          <Flex
            ref={refTh}
            background={'#ffffff'}
            borderBottomColor={'#d1d1d1'}
            borderBottomWidth={1}
            borderTopColor={'#d1d1d1'}
            borderTopWidth={1}
            left={0}
            minWidth={'max-content'}
            position={'sticky'}
            style={thStyle}
            top={0}
            zIndex={3}
          >
            {columns.map((column, i) => (
              <Box
                key={`${column.key || column.dataIndex || column.name}_${i}`}
                borderRightColor={'#dedede'}
                borderRightWidth={bordered && i !== columns.length - 1 ? 1 : 0}
                className="table-th"
                color={'rgba(0 0 0 / 80%)'}
                fontSize={'14px'}
                fontWeight={400}
                padding={'12px 8px'}
                position={'relative'}
              >
                <Flex
                  alignItems={'center'}
                  justifyContent={column.align}
                  overflow={'hidden'}
                  position={'relative'}
                  width={'full'}
                >
                  <Text
                    lineHeight={'32px'}
                    overflow={'hidden'}
                    textOverflow={'ellipsis'}
                    whiteSpace={'nowrap'}
                  >
                    {column.title}
                  </Text>
                  {column.sortable && (
                    <Flex
                      _hover={{ backgroundColor: 'white.10' }}
                      borderRadius={'50%'}
                      flexDirection={'column'}
                      height={'24px'}
                      justifyContent={'center'}
                      marginTop={'-2px'}
                      padding={'4px'}
                      width={'24px'}
                    >
                      <IconShortUp />

                      <IconShortDown />
                    </Flex>
                  )}
                </Flex>
                {resizeable && i < columns.length - 1 ? (
                  <Box
                    cursor={'col-resize'}
                    height={'full'}
                    position={'absolute'}
                    right={`${-SIZE_DRAG / 4}px`}
                    top={0}
                    width={`${SIZE_DRAG / 2}px`}
                    zIndex={1}
                    onMouseDown={e => onMouseDownResize(e, i)}
                  />
                ) : null}
              </Box>
            ))}
          </Flex>
          {data?.map((d, i) => (
            <Flex
              key={keyExtractor?.(d, i) || i}
              borderBottomColor={'#d1d1d1'}
              borderBottomWidth={1}
              className={'table-tr'}
              minWidth={'max-content'}
            >
              {columns.map((column, i) => (
                <Flex
                  key={`${column.key || column.dataIndex || column.name}_${i}`}
                  __css={{
                    '.chakra-text': {
                      lineHeight: '32px',
                    },
                  }}
                  borderRightWidth={bordered && i !== columns.length - 1 ? 1 : 0}
                  borderRightColor={'#d1d1d1'}
                  className={'table-td'}
                  color={'#dedede'}
                  fontSize={'14px'}
                  fontWeight={400}
                  padding={'12px 8px'}
                  position={'relative'}
                >
                  <Box width={'full'}>{getChildren(column, d)}</Box>
                  {resizeable && i < columns.length - 1 ? (
                    <Box
                      cursor="col-resize"
                      height="100%"
                      position={'absolute'}
                      right={`${-SIZE_DRAG / 4}px`}
                      top={0}
                      width={`${SIZE_DRAG / 2}px`}
                      zIndex={1}
                      onMouseDown={e => onMouseDownResize(e, i)}
                    />
                  ) : null}
                </Flex>
              ))}
            </Flex>
          ))}
          <Box
            ref={refResize}
            display={'none'}
            position="absolute"
            top={0}
            height={'100%'}
            cursor="col-resize"
            paddingLeft={`${SIZE_DRAG / 2}px`}
            paddingRight={`${SIZE_DRAG / 2}px`}
            width={`${SIZE_DRAG + 1}px`}
            zIndex={9999}
          >
            <Box background={'rgb(33, 150, 243)'} height={'100%'} width={'1px'} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

import { Box } from '@chakra-ui/react'
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
// import { colors } from 'theme/colors'
// import { IconSelected } from 'app/components/elements/Icon/IconSelected.tsx'
// import { IconChevronDown } from 'app/components/elements/Icon/IconChevronDown'

type TOption<T> = { label: string; value: T }

type Props<T> = {
  options?: TOption<T>[]
  value?: T
  fitWidth?: boolean
  disabled?: boolean
  width?: number | string
  onSelect?: (value: T) => void
  flex?: number
  maxWidth?: number | string
  isSearchable?: boolean
}

export const DropdownCustom = <T,>({
  options,
  fitWidth,
  width,
  value,
  onSelect,
  flex,
  maxWidth,
  disabled,
  isSearchable = false,
}: Props<T>) => {
  const refDom = useRef(document.createElement('div'))
  const isDomExist = useRef(false)
  const refRoot = useRef<HTMLDivElement>(null)
  const refOption = useRef<HTMLDivElement>(null)
  const refInput = useRef<HTMLInputElement>(null)
  const refFrame = useRef<number>()
  const isOpen = useRef(false)

  const [keyword, setKeyword] = useState('')

  const createDom = useCallback(() => {
    if (isDomExist.current) return
    isDomExist.current = true
    const dom = refDom.current
    dom.style.position = 'absolute'
    dom.style.width = '0px'
    dom.style.height = '0px'
    dom.style.left = '0px'
    dom.style.top = '0px'
    document.querySelector('body')?.appendChild(dom)
  }, [])

  const definedPositionOption = useCallback(async () => {
    const option = refOption.current
    const dropdown = refRoot.current
    if (!option || !dropdown) return
    const { top, height: h, width: w, left } = dropdown.getBoundingClientRect()
    const { width, height } = option.getBoundingClientRect()
    if (fitWidth || width < w) {
      option.style.width = `${w}px`
    }
    const topOption = top + h + 4
    if (topOption + height > window.innerHeight) {
      option.style.top = `${top - height - 4}px`
    } else {
      option.style.top = `${topOption}px`
    }
    option.style.display = 'block'
    option.style.left = `${left}px`
  }, [fitWidth])

  const listenerFrame = useCallback(() => {
    definedPositionOption()
    refFrame.current = window.requestAnimationFrame(listenerFrame)
  }, [definedPositionOption])

  const clearFrame = useCallback(() => {
    if (!refFrame.current) return
    window.cancelAnimationFrame(refFrame.current)
  }, [])

  const activeBorder = useCallback((isActive?: boolean) => {
    if (refRoot.current) {
      refRoot.current.style.borderColor = isActive ? colors['clr-default'] : ''
      refRoot.current.style.color = isActive ? colors['clr-default'] : ''
    }
  }, [])

  const onClose = useCallback(() => {
    clearFrame()
    activeBorder(false)
    isOpen.current = false
    refInput.current?.blur()
    setKeyword('')
    if (refOption.current) refOption.current.style.display = 'none'
  }, [activeBorder, clearFrame])

  const onBlur = useCallback(
    (event: MouseEvent) => {
      if (
        refRoot.current?.contains(event.target as Node) ||
        refOption.current?.contains(event.target as Node)
      ) {
        return
      }
      onClose()
    },
    [onClose],
  )

  useEffect(() => {
    window.addEventListener('click', onBlur)
    return () => {
      window.removeEventListener('click', onBlur)
    }
  }, [onBlur])

  useEffect(() => {
    const dom = refDom.current
    return () => {
      if (isDomExist.current) {
        onClose()
        isDomExist.current = false
        document.querySelector('body')?.removeChild(dom)
      }
    }
  }, [clearFrame, onClose])

  const onOpen = useCallback(() => {
    if (disabled) return
    createDom()
    if (isOpen.current) {
      onClose()
    } else {
      isOpen.current = true
      refInput.current?.focus()
      activeBorder(true)
      definedPositionOption()
      listenerFrame()
    }
  }, [
    activeBorder,
    createDom,
    definedPositionOption,
    listenerFrame,
    onClose,
    disabled,
  ])

  const optionSelect = useMemo(() => {
    return options?.find(e => e.value === value)
  }, [options, value])

  const optionsRender = useMemo(() => {
    return options?.filter(e =>
      e.label.toLowerCase().includes(keyword.toLowerCase()),
    )
  }, [options, keyword])
  return (
    <Fragment>
      <Box
        ref={refRoot}
        _hover={{ bgColor: colors.white[10] }}
        alignItems="center"
        borderColor="rgba(255, 255, 255, 0.50)"
        borderRadius="2px"
        borderWidth="1px"
        cursor={disabled ? 'not-allowed' : 'default'}
        display="flex"
        flex={flex}
        flexDirection="row"
        fontSize={14}
        height={8}
        justifyContent={'space-between'}
        maxWidth={maxWidth}
        opacity={disabled ? 0.6 : 1}
        paddingLeft={2}
        paddingRight={2}
        position="relative"
        width={width}
        onClick={onOpen}
      >
        <Box
          fontSize={'14px'}
          overflow={'hidden'}
          paddingRight={1}
          position={'absolute'}
          textOverflow={'ellipsis'}
          top={'50%'}
          transform={`translateY(-50%)`}
          whiteSpace={'nowrap'}
        >
          {keyword ? '' : optionSelect?.label}
        </Box>
        <input
          ref={refInput}
          readOnly={disabled || !isSearchable}
          style={{
            width: '100%',
            border: 0,
            outline: 'none',
            background: 'transparent',
            position: 'relative',
            zIndex: 1,
            marginTop: -1,
            cursor: disabled ? 'not-allowed' : 'auto',
          }}
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <IconChevronDown />
      </Box>
      {createPortal(
        <Box
          ref={refOption}
          backgroundColor={colors['clr-card']}
          borderColor={colors['clr-default']}
          borderRadius="2px"
          borderWidth="1px"
          color={colors['clr-neutral-alpha']}
          display="none"
          left={10}
          maxH={100}
          minWidth={'max-content'}
          paddingBottom={2.5}
          paddingTop={2.5}
          position="absolute"
          top={10}
          zIndex={9999}
        >
          <Box>
            {optionsRender?.map((e, i) => (
              <Box
                key={`${i}_${e.value}`}
                _hover={{
                  backgroundColor: colors['clr-selected-alpha'],
                }}
                alignItems={'center'}
                backgroundColor={
                  optionSelect?.value === e.value
                    ? colors['clr-selected-alpha']
                    : undefined
                }
                color={
                  optionSelect?.value === e.value
                    ? colors.white[100]
                    : undefined
                }
                cursor="pointer"
                display="flex"
                flexDirection="row"
                gap={2}
                paddingBottom={1}
                paddingLeft={4}
                paddingRight={5.5}
                paddingTop={1}
                onClick={() => {
                  onSelect?.(e.value)
                  onClose()
                }}
              >
                {optionSelect?.value === e.value ? (
                  <IconSelected />
                ) : (
                  <Box w={'24px'} />
                )}
                {e.label}
              </Box>
            ))}
            <Box
              display={!optionsRender?.length ? 'block' : 'none'}
              fontSize={14}
              paddingLeft={4}
              paddingRight={5.5}
              textAlign={'center'}
            >
              No Options
            </Box>
          </Box>
        </Box>,
        refDom.current,
      )}
    </Fragment>
  )
}

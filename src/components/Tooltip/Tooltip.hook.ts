import React, { RefObject, useCallback, useEffect, useState } from 'react'

type UseTooltipProps = {
  ref: RefObject<HTMLElement>
  tooltipRef: RefObject<HTMLDivElement>
}

type Position = {
  top?: number
  left?: number
  width?: number
}

export function useTooltip({ ref, tooltipRef }: UseTooltipProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [position, setPosition] = useState<Position>({})

  useEffect(() => {
    if (!ref.current) {
      return
    }

    if (isVisible) {
      const { left, width, bottom } = ref.current.getBoundingClientRect()

      const tooltipWidth =
        tooltipRef?.current?.getBoundingClientRect().width || 0

      const middle = left + width / 2 - tooltipWidth / 2

      const verticalOffset = 12

      setPosition({
        top: bottom + verticalOffset,
        left: left,
        width,
      })
    }

    if (!isVisible) {
      setPosition({})
    }
  }, [isVisible, ref, tooltipRef])

  const onMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  return {
    position: {
      top: position.top ?? 0,
      left: position.left ?? 0,
      width: position.width ?? 0,
    },
    isVisible,
    onMouseEnter,
    onMouseLeave,
  }
}
